const express = require('express');
const havuz = require('../db');
const { kimlikDogrula } = require('../middleware/auth');
const path = require('path');

const router = express.Router();

const ensureAbsoluteUrl = (req, url) => {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) {
        return url;
    }
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const normalized = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${normalized}`;
};

const normalizePhotoRecords = (req, photos = []) =>
    photos.map((photo) => ({
        ...photo,
        foto_url: ensureAbsoluteUrl(req, photo.foto_url)
    }));

const parseUrlList = (value) => {
    if (!value) {
        return [];
    }
    if (Array.isArray(value)) {
        return value
            .map((item) => String(item).trim())
            .filter(Boolean);
    }
    if (typeof value === 'string') {
        return value
            .split(/[\n,]/)
            .map((item) => item.trim())
            .filter(Boolean);
    }
    return [];
};

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
        const sql = `
            SELECT s.*, 
                   k.ad_soyad AS sahip_adi,
                   k.sirket_adi,
                   (SELECT foto_url FROM salon_fotograflari 
                    WHERE salon_id = s.id 
                    ORDER BY sira ASC, id ASC 
                    LIMIT 1) AS ana_foto
            FROM salonlar s
            JOIN kullanicilar k ON k.id = s.sahip_id
            ${kosullar.length ? 'WHERE ' + kosullar.join(' AND ') : ''}
            ORDER BY s.olusturulma_zamani DESC
            LIMIT 100
        `;
        const [satirlar] = await havuz.query(sql, paramlar);
        const duzeltilmisSalonlar = satirlar.map((salon) => ({
            ...salon,
            ana_foto: ensureAbsoluteUrl(req, salon.ana_foto || salon.ana_foto_url),
            ana_foto_url: ensureAbsoluteUrl(req, salon.ana_foto_url || salon.ana_foto)
        }));
        res.json(duzeltilmisSalonlar);
    } catch (err) {
        console.error('Salon listesi hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

// Yeni salon ilanı oluştur (fotoğraf yükleme ile)
router.post('/salonlar', kimlikDogrula('SALON_SAHIBI'), async (req, res) => {
    const baglanti = await havuz.getConnection();
    try {
        const { ad, adres, sehir, kapasite, aciklama, dugun_turu, fiyat } = req.body;
        const ana_foto_url = req.body.ana_foto_url ? req.body.ana_foto_url.trim() : null;
        const galleryUrls = parseUrlList(req.body.gallery_urls || req.body.galleryUrls || req.body.gallery);

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

        if (!ana_foto_url) {
            return res.status(400).json({ hata: 'Ana fotoğraf URL\'i zorunludur' });
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
        if (galleryUrls.length > 0) {
            for (let i = 0; i < galleryUrls.length; i++) {
                await baglanti.query(
                    'INSERT INTO salon_fotograflari (salon_id, foto_url, sira) VALUES (?, ?, ?)',
                    [salonId, galleryUrls[i], i + 1]
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
        const duzeltilmisSalonlar = salonlar.map((salon) => ({
            ...salon,
            ana_foto: ensureAbsoluteUrl(req, salon.ana_foto || salon.ana_foto_url),
            ana_foto_url: ensureAbsoluteUrl(req, salon.ana_foto_url || salon.ana_foto)
        }));
        res.json(duzeltilmisSalonlar);
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
        
        const salon = {
            ...salonlar[0],
            ana_foto_url: ensureAbsoluteUrl(req, salonlar[0].ana_foto_url)
        };
        
        // Salon fotoğraflarını getir
        const [fotograflar] = await havuz.query(
            'SELECT * FROM salon_fotograflari WHERE salon_id = ? ORDER BY sira ASC, id ASC',
            [salonId]
        );
        const duzeltilmisFotograflar = normalizePhotoRecords(req, fotograflar);
        
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
            fotograflar: duzeltilmisFotograflar,
            paketler: paketler,
            opsiyonelPaketler: opsiyonelPaketler
        });
    } catch (err) {
        console.error('Salon detay hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

module.exports = router;