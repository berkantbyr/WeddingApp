const express = require('express');
const havuz = require('../db');
const { kimlikDogrula } = require('../middleware/auth');

const router = express.Router();

router.get('/salonlar/:salonId/paketler', async (req, res) => {
    try {
        const [rows] = await havuz.query(
            'SELECT * FROM paketler WHERE salon_id = ? ORDER BY paket_turu',
            [req.params.salonId]
        );
        res.json(rows);
    } catch {
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

router.post('/salonlar/:salonId/paketler', kimlikDogrula('SALON_SAHIBI'), async (req, res) => {
    try {
        const salonId = Number(req.params.salonId);
        const [[sln]] = await havuz.query('SELECT id, sahip_id FROM salonlar WHERE id = ?', [salonId]);
        if (!sln || sln.sahip_id !== req.kullanici.id) return res.status(404).json({ hata: 'Salon yok veya yetki yok' });

        const { paket_turu, fiyat_hafta_ici, fiyat_hafta_sonu, aciklama } = req.body;
        if (!['EKONOMIK', 'STANDART', 'PREMIUM'].includes(paket_turu)) {
            return res.status(400).json({ hata: 'paket_turu geçersiz' });
        }
        const [r] = await havuz.query(
            'INSERT INTO paketler (salon_id, paket_turu, fiyat_hafta_ici, fiyat_hafta_sonu, aciklama) VALUES (?,?,?,?,?)',
            [salonId, paket_turu, fiyat_hafta_ici, fiyat_hafta_sonu, aciklama || null]
        );
        res.status(201).json({ id: r.insertId });
    } catch (e) {
        if (e && e.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ hata: 'Bu salon için bu paket zaten var' });
        }
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

module.exports = router;