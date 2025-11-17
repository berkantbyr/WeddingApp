const express = require('express');
const havuz = require('../db');
const { kimlikDogrula } = require('../middleware/auth');

const router = express.Router();

router.post('/rezervasyonlar', kimlikDogrula('MUSTERI'), async (req, res) => {
    const baglanti = await havuz.getConnection();
    try {
        const { salon_id, paket_id, etkinlik_tarihi, notlar } = req.body;
        const bugun = new Date().toISOString().slice(0, 10);
        if (!etkinlik_tarihi || etkinlik_tarihi < bugun) {
            return res.status(400).json({ hata: 'Geçmiş tarihe rezervasyon olamaz' });
        }

        await baglanti.beginTransaction();

        const [[pkg]] = await baglanti.query(
            'SELECT id, salon_id FROM paketler WHERE id = ? FOR UPDATE',
            [paket_id]
        );
        if (!pkg || Number(pkg.salon_id) !== Number(salon_id)) {
            await baglanti.rollback();
            return res.status(400).json({ hata: 'Geçersiz paket/salon' });
        }

        const [[cakisma]] = await baglanti.query(
            'SELECT id FROM rezervasyonlar WHERE salon_id = ? AND etkinlik_tarihi = ? AND durum = "ONAYLANDI" FOR UPDATE',
            [salon_id, etkinlik_tarihi]
        );
        if (cakisma) {
            await baglanti.rollback();
            return res.status(409).json({ hata: 'Bu tarih dolu' });
        }

        // Temel fiyatı hesapla
        const [[paketBilgi]] = await baglanti.query(
            'SELECT fiyat_hafta_ici, fiyat_hafta_sonu FROM paketler WHERE id = ?',
            [paket_id]
        );
        let toplamFiyat = paketBilgi ? Number(paketBilgi.fiyat_hafta_ici) : 0;

        // Opsiyonel paketleri ekle ve fiyatı hesapla
        const { opsiyonelPaketler } = req.body;
        if (opsiyonelPaketler && Array.isArray(opsiyonelPaketler) && opsiyonelPaketler.length > 0) {
            for (const opId of opsiyonelPaketler) {
                const [[op]] = await baglanti.query(
                    'SELECT fiyat FROM opsiyonel_paketler WHERE id = ? AND salon_id = ?',
                    [opId, salon_id]
                );
                if (op) {
                    toplamFiyat += Number(op.fiyat);
                }
            }
        }

        const [r] = await baglanti.query(
            'INSERT INTO rezervasyonlar (musteri_id, salon_id, paket_id, etkinlik_tarihi, durum, notlar, toplam_fiyat) VALUES (?,?,?,?, "BEKLEMEDE", ?, ?)',
            [req.kullanici.id, salon_id, paket_id, etkinlik_tarihi, notlar || null, toplamFiyat]
        );

        const rezervasyonId = r.insertId;

        // Opsiyonel paketleri rezervasyon_opsiyonel_paketler tablosuna ekle
        if (opsiyonelPaketler && Array.isArray(opsiyonelPaketler) && opsiyonelPaketler.length > 0) {
            for (const opId of opsiyonelPaketler) {
                await baglanti.query(
                    'INSERT INTO rezervasyon_opsiyonel_paketler (rezervasyon_id, opsiyonel_paket_id) VALUES (?, ?)',
                    [rezervasyonId, opId]
                );
            }
        }

        await baglanti.commit();
        res.status(201).json({ id: rezervasyonId, durum: 'BEKLEMEDE', toplam_fiyat: toplamFiyat });
    } catch {
        await baglanti.rollback();
        res.status(500).json({ hata: 'Sunucu hatası' });
    } finally {
        baglanti.release();
    }
});

router.post('/rezervasyonlar/:id/karar', kimlikDogrula('SALON_SAHIBI'), async (req, res) => {
    const baglanti = await havuz.getConnection();
    try {
        const rezervasyonId = req.params.id;
        const { karar } = req.body; // "ONAYLANDI" | "REDDEDILDI"

        await baglanti.beginTransaction();

        const [[rez]] = await baglanti.query(
            'SELECT r.id, r.salon_id, r.etkinlik_tarihi, r.durum, s.sahip_id FROM rezervasyonlar r JOIN salonlar s ON s.id = r.salon_id WHERE r.id = ? FOR UPDATE',
            [rezervasyonId]
        );
        if (!rez) {
            await baglanti.rollback();
            return res.status(404).json({ hata: 'Rezervasyon bulunamadı' });
        }
        if (rez.sahip_id !== req.kullanici.id) {
            await baglanti.rollback();
            return res.status(403).json({ hata: 'Bu salon size ait değil' });
        }
        if (rez.durum !== 'BEKLEMEDE') {
            await baglanti.rollback();
            return res.status(400).json({ hata: 'Sadece BEKLEMEDE karar verilebilir' });
        }

        if (karar === 'ONAYLANDI') {
            const [[cakisma]] = await baglanti.query(
                'SELECT id FROM rezervasyonlar WHERE salon_id = ? AND etkinlik_tarihi = ? AND durum = "ONAYLANDI" FOR UPDATE',
                [rez.salon_id, rez.etkinlik_tarihi]
            );
            if (cakisma) {
                await baglanti.rollback();
                return res.status(409).json({ hata: 'Bu tarih artık dolu' });
            }
        }

        await baglanti.query(
            'UPDATE rezervasyonlar SET durum = ? WHERE id = ?',
            [karar === 'ONAYLANDI' ? 'ONAYLANDI' : 'REDDEDILDI', rezervasyonId]
        );

        await baglanti.commit();
        res.json({ id: rezervasyonId, durum: karar });
    } catch {
        await baglanti.rollback();
        res.status(500).json({ hata: 'Sunucu hatası' });
    } finally {
        baglanti.release();
    }
});

// Müşterinin kendi rezervasyonlarını getir
router.get('/rezervasyonlar/benim', kimlikDogrula('MUSTERI'), async (req, res) => {
    try {
        const [rows] = await havuz.query(
            `SELECT r.*, s.ad AS salon_adi, s.sehir AS salon_sehir
             FROM rezervasyonlar r
             JOIN salonlar s ON s.id = r.salon_id
             WHERE r.musteri_id = ?
             ORDER BY r.olusturulma_zamani DESC`,
            [req.kullanici.id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Müşteri rezervasyonları hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

// Salon sahibinin salonlarına gelen rezervasyon isteklerini getir
router.get('/rezervasyonlar/salon-sahibi', kimlikDogrula('SALON_SAHIBI'), async (req, res) => {
    try {
        const [rows] = await havuz.query(
            `SELECT r.*, 
                    s.ad AS salon_adi, 
                    s.sehir AS salon_sehir,
                    k.ad_soyad AS musteri_adi,
                    k.telefon AS musteri_telefon,
                    k.kullanici_adi AS musteri_kullanici_adi,
                    p.paket_turu,
                    p.fiyat_hafta_ici,
                    p.fiyat_hafta_sonu
             FROM rezervasyonlar r
             JOIN salonlar s ON s.id = r.salon_id
             JOIN kullanicilar k ON k.id = r.musteri_id
             LEFT JOIN paketler p ON p.id = r.paket_id
             WHERE s.sahip_id = ?
             ORDER BY r.olusturulma_zamani DESC`,
            [req.kullanici.id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Salon sahibi rezervasyonları hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

module.exports = router;