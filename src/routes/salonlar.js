const express = require('express');
const havuz = require('../db');
const { kimlikDogrula } = require('../middleware/auth');

const router = express.Router();

router.get('/salonlar', async (req, res) => {
    try {
        const { sehir, minKapasite } = req.query;
        const kosullar = [];
        const paramlar = [];
        if (sehir) { kosullar.push('sehir = ?'); paramlar.push(sehir); }
        if (minKapasite) { kosullar.push('kapasite >= ?'); paramlar.push(Number(minKapasite)); }

        const sql = `
      SELECT s.*, k.ad_soyad AS sahip_adi
      FROM salonlar s
      JOIN kullanicilar k ON k.id = s.sahip_id
      ${kosullar.length ? 'WHERE ' + kosullar.join(' AND ') : ''}
      ORDER BY s.olusturulma_zamani DESC
      LIMIT 100
    `;
        const [satirlar] = await havuz.query(sql, paramlar);
        res.json(satirlar);
    } catch {
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

router.post('/salonlar', kimlikDogrula('SALON_SAHIBI'), async (req, res) => {
    try {
        const { ad, adres, sehir, kapasite, aciklama } = req.body;
        if (!ad || !adres) return res.status(400).json({ hata: 'ad ve adres zorunlu' });

        const [r] = await havuz.query(
            'INSERT INTO salonlar (sahip_id, ad, adres, sehir, kapasite, aciklama) VALUES (?,?,?,?,?,?)',
            [req.kullanici.id, ad, adres, sehir || null, kapasite || null, aciklama || null]
        );
        res.status(201).json({ id: r.insertId });
    } catch {
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

module.exports = router;