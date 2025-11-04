const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const havuz = require('../db');

const router = express.Router();

router.post('/kayit', async (req, res) => {
    try {
        const { ad_soyad, eposta, sifre, rol, telefon } = req.body;
        if (!ad_soyad || !eposta || !sifre || !rol) {
            return res.status(400).json({ hata: 'ad_soyad, eposta, sifre, rol zorunlu' });
        }
        if (!['MUSTERI', 'SALON_SAHIBI'].includes(rol)) {
            return res.status(400).json({ hata: 'Rol geçersiz' });
        }
        const sifre_ozeti = await bcrypt.hash(sifre, 10);
        await havuz.query(
            'INSERT INTO kullanicilar (ad_soyad, eposta, sifre_ozeti, rol, telefon) VALUES (?,?,?,?,?)',
            [ad_soyad, eposta, sifre_ozeti, rol, telefon || null]
        );
        res.status(201).json({ mesaj: 'Kayıt başarılı' });
    } catch (e) {
        if (e && e.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ hata: 'Bu e-posta zaten kayıtlı' });
        }
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

router.post('/giris', async (req, res) => {
    try {
        const { eposta, sifre } = req.body;
        const [[k]] = await havuz.query(
            'SELECT id, ad_soyad, eposta, sifre_ozeti, rol FROM kullanicilar WHERE eposta = ?',
            [eposta]
        );
        if (!k) return res.status(401).json({ hata: 'E-posta veya şifre hatalı' });

        const dogru = await bcrypt.compare(sifre, k.sifre_ozeti);
        if (!dogru) return res.status(401).json({ hata: 'E-posta veya şifre hatalı' });

        const token = jwt.sign(
            { id: k.id, rol: k.rol, ad_soyad: k.ad_soyad, eposta: k.eposta },
            process.env.JWT_SECRET || 'dev-secret',
            { expiresIn: '7d' }
        );
        res.json({ token, kullanici: { id: k.id, ad_soyad: k.ad_soyad, eposta: k.eposta, rol: k.rol } });
    } catch {
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

module.exports = router;