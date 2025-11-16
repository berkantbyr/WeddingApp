const express = require('express');
const havuz = require('../db');
const { kimlikDogrula } = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');

const router = express.Router();

// Tüm salonları listele veya filtrele
router.get('/salonlar', async (req, res) => {
    try {
        const { sehir, minKapasite, dugun_turu } = req.query;
        const kosullar = [];
        const paramlar = [];
        
        // Şehir filtresi
        if (sehir) { 
            kosullar.push('s.sehir = ?'); 
            paramlar.push(sehir); 
        }
        
        // Minimum kapasite filtresi
        if (minKapasite) { 
            kosullar.push('s.kapasite >= ?'); 
            paramlar.push(Number(minKapasite)); 
        }
        
        // Düğün türü filtresi
        if (dugun_turu) {
            kosullar.push('s.dugun_turu = ?');
            paramlar.push(dugun_turu);
        }

        // Ana fotoğrafı ve şirket adını da çek
        // Önce ana_foto_url'i kullan, yoksa salon_fotograflari tablosundan ilk fotoğrafı al
        const sql = `
            SELECT s.*, 
                   k.ad_soyad AS sahip_adi,
                   k.sirket_adi,
                   COALESCE(
                       s.ana_foto_url,
                       (SELECT foto_url FROM salon_fotograflari 
                        WHERE salon_id = s.id 
                        ORDER BY sira ASC, id ASC 
                        LIMIT 1)
                   ) AS ana_foto
            FROM salonlar s
            JOIN kullanicilar k ON k.id = s.sahip_id
            ${kosullar.length ? 'WHERE ' + kosullar.join(' AND ') : ''}
            ORDER BY s.olusturulma_zamani DESC
            LIMIT 100
        `;
        const [satirlar] = await havuz.query(sql, paramlar);
        res.json(satirlar);
    } catch (err) {
        console.error('Salon listesi hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

// Yeni salon ilanı oluştur (fotoğraf yükleme ile)
router.post('/salonlar', kimlikDogrula('SALON_SAHIBI'), upload.fields([
    { name: 'ana_foto', maxCount: 1 },
    { name: 'gallery_0', maxCount: 1 },
    { name: 'gallery_1', maxCount: 1 },
    { name: 'gallery_2', maxCount: 1 },
    { name: 'gallery_3', maxCount: 1 },
    { name: 'gallery_4', maxCount: 1 }
]), async (req, res) => {
    const baglanti = await havuz.getConnection();
    try {
        const { ad, adres, sehir, kapasite, aciklama, dugun_turu, fiyat } = req.body;
        
        // Yüklenen dosya varsa URL'yi oluştur
        let ana_foto_url = null;
        if (req.files && req.files['ana_foto'] && req.files['ana_foto'][0]) {
            // Dosya yüklendi, URL'yi oluştur
            ana_foto_url = `/uploads/${req.files['ana_foto'][0].filename}`;
        } else if (req.body.ana_foto_url) {
            // URL ile gönderilmişse kullan
            ana_foto_url = req.body.ana_foto_url;
        }
        
        // Zorunlu alanları kontrol et
        if (!ad || !adres) {
            return res.status(400).json({ hata: 'Salon adı ve adres zorunludur' });
        }
        
        if (!sehir) {
            return res.status(400).json({ hata: 'Şehir seçimi zorunludur' });
        }
        
        if (!fiyat || fiyat <= 0) {
            return res.status(400).json({ hata: 'Geçerli bir fiyat girmelisiniz' });
        }
        
        if (!dugun_turu || !['EN_LUX', 'ORTA', 'NORMAL'].includes(dugun_turu)) {
            return res.status(400).json({ hata: 'Düğün türü seçimi zorunludur (EN_LUX, ORTA, NORMAL)' });
        }

        await baglanti.beginTransaction();

        // Salonu veritabanına ekle
        const [r] = await baglanti.query(
            `INSERT INTO salonlar (sahip_id, ad, adres, sehir, kapasite, aciklama, dugun_turu, fiyat, ana_foto_url) 
             VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                req.kullanici.id, 
                ad, 
                adres, 
                sehir, 
                kapasite || null, 
                aciklama || null,
                dugun_turu,
                fiyat,
                ana_foto_url || null
            ]
        );
        
        const salonId = r.insertId;
        
        // Eğer ana fotoğraf URL'i verildiyse, fotoğraflar tablosuna da ekle
        if (ana_foto_url) {
            await baglanti.query(
                'INSERT INTO salon_fotograflari (salon_id, foto_url, sira) VALUES (?, ?, 0)',
                [salonId, ana_foto_url]
            );
        }
        
        // Galeri fotoğraflarını ekle
        const galleryCount = parseInt(req.body.gallery_count) || 0;
        for (let i = 0; i < galleryCount; i++) {
            const galleryKey = `gallery_${i}`;
            if (req.files && req.files[galleryKey] && req.files[galleryKey][0]) {
                const galleryUrl = `/uploads/${req.files[galleryKey][0].filename}`;
                await baglanti.query(
                    'INSERT INTO salon_fotograflari (salon_id, foto_url, sira) VALUES (?, ?, ?)',
                    [salonId, galleryUrl, i + 1]
                );
            }
        }

        // Opsiyonel paketleri ekle (varsa)
        let opsiyonelPaketler = req.body.opsiyonelPaketler;
        // Eğer string olarak gelmişse parse et
        if (typeof opsiyonelPaketler === 'string') {
            try {
                opsiyonelPaketler = JSON.parse(opsiyonelPaketler);
            } catch (e) {
                opsiyonelPaketler = [];
            }
        }
        if (opsiyonelPaketler && Array.isArray(opsiyonelPaketler) && opsiyonelPaketler.length > 0) {
            for (const op of opsiyonelPaketler) {
                if (op.ad && op.fiyat) {
                    await baglanti.query(
                        'INSERT INTO opsiyonel_paketler (salon_id, ad, fiyat, aciklama) VALUES (?, ?, ?, ?)',
                        [salonId, op.ad, op.fiyat, op.aciklama || null]
                    );
                }
            }
        }

        await baglanti.commit();
        res.status(201).json({ id: salonId, mesaj: 'Salon ilanı başarıyla oluşturuldu' });
    } catch (err) {
        await baglanti.rollback();
        console.error('Salon oluşturma hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası: ' + err.message });
    } finally {
        baglanti.release();
    }
});

// Salon sahibinin kendi salonlarını listele
router.get('/salonlar/sahip', kimlikDogrula('SALON_SAHIBI'), async (req, res) => {
    try {
        const [salonlar] = await havuz.query(
            `SELECT s.*, 
                   (SELECT foto_url FROM salon_fotograflari 
                    WHERE salon_id = s.id 
                    ORDER BY sira ASC, id ASC 
                    LIMIT 1) AS ana_foto
             FROM salonlar s
             WHERE s.sahip_id = ?
             ORDER BY s.olusturulma_zamani DESC`,
            [req.kullanici.id]
        );
        res.json(salonlar);
    } catch (err) {
        console.error('Salon sahibi salonları hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

// Salon sahibi kendi salonunu silebilir
router.delete('/salonlar/:id', kimlikDogrula('SALON_SAHIBI'), async (req, res) => {
    const baglanti = await havuz.getConnection();
    try {
        const salonId = req.params.id;
        
        // Salonun sahibi olduğunu kontrol et
        const [salonlar] = await baglanti.query(
            'SELECT sahip_id FROM salonlar WHERE id = ?',
            [salonId]
        );
        
        if (salonlar.length === 0) {
            return res.status(404).json({ hata: 'Salon bulunamadı' });
        }
        
        if (Number(salonlar[0].sahip_id) !== Number(req.kullanici.id)) {
            return res.status(403).json({ hata: 'Bu salonu silme yetkiniz yok' });
        }
        
        // Rezervasyon kontrolü - onaylanmış rezervasyon varsa silme
        const [rezervasyonlar] = await baglanti.query(
            'SELECT id FROM rezervasyonlar WHERE salon_id = ? AND durum = "ONAYLANDI"',
            [salonId]
        );
        
        if (rezervasyonlar.length > 0) {
            return res.status(400).json({ 
                hata: 'Bu salonun onaylanmış rezervasyonları var. Önce rezervasyonları iptal etmelisiniz.' 
            });
        }
        
        await baglanti.beginTransaction();
        
        // İlişkili kayıtları sil (CASCADE ile otomatik silinir ama manuel de silebiliriz)
        await baglanti.query('DELETE FROM rezervasyon_opsiyonel_paketler WHERE rezervasyon_id IN (SELECT id FROM rezervasyonlar WHERE salon_id = ?)', [salonId]);
        await baglanti.query('DELETE FROM rezervasyonlar WHERE salon_id = ?', [salonId]);
        await baglanti.query('DELETE FROM opsiyonel_paketler WHERE salon_id = ?', [salonId]);
        await baglanti.query('DELETE FROM paketler WHERE salon_id = ?', [salonId]);
        await baglanti.query('DELETE FROM salon_fotograflari WHERE salon_id = ?', [salonId]);
        await baglanti.query('DELETE FROM salonlar WHERE id = ?', [salonId]);
        
        await baglanti.commit();
        res.json({ mesaj: 'Salon başarıyla silindi' });
    } catch (err) {
        await baglanti.rollback();
        console.error('Salon silme hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası: ' + err.message });
    } finally {
        baglanti.release();
    }
});

// Tek bir salonun detaylarını getir
router.get('/salonlar/:id', async (req, res) => {
    try {
        const salonId = req.params.id;
        
        // Salon bilgilerini ve sahibini getir
        const [salonlar] = await havuz.query(
            `SELECT s.*, k.ad_soyad AS sahip_adi, k.telefon AS sahip_telefon
             FROM salonlar s
             JOIN kullanicilar k ON k.id = s.sahip_id
             WHERE s.id = ?`,
            [salonId]
        );
        
        if (salonlar.length === 0) {
            return res.status(404).json({ hata: 'Salon bulunamadı' });
        }
        
        const salon = salonlar[0];
        
        // Salon fotoğraflarını getir
        const [fotograflar] = await havuz.query(
            'SELECT * FROM salon_fotograflari WHERE salon_id = ? ORDER BY sira ASC, id ASC',
            [salonId]
        );
        
        // Salon paketlerini getir
        const [paketler] = await havuz.query(
            'SELECT * FROM paketler WHERE salon_id = ? ORDER BY paket_turu',
            [salonId]
        );
        
        // Opsiyonel paketleri getir
        const [opsiyonelPaketler] = await havuz.query(
            'SELECT * FROM opsiyonel_paketler WHERE salon_id = ? ORDER BY id',
            [salonId]
        );
        
        res.json({
            ...salon,
            fotograflar: fotograflar,
            paketler: paketler,
            opsiyonelPaketler: opsiyonelPaketler
        });
    } catch (err) {
        console.error('Salon detay hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

module.exports = router;