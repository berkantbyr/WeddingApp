const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const havuz = require('../db');

const router = express.Router();

router.post('/kayit', async (req, res) => {
    try {
        const { ad_soyad, kullanici_adi, sifre, rol, telefon, sirket_adi } = req.body;
        if (!ad_soyad || !kullanici_adi || !sifre || !rol) {
            return res.status(400).json({ hata: 'ad_soyad, kullanici_adi, sifre, rol zorunlu' });
        }
        if (!['MUSTERI', 'SALON_SAHIBI'].includes(rol)) {
            return res.status(400).json({ hata: 'Rol geçersiz' });
        }
        if (rol === 'SALON_SAHIBI' && !sirket_adi) {
            return res.status(400).json({ hata: 'Salon sahibi için şirket adı zorunludur' });
        }
        const sifre_ozeti = await bcrypt.hash(sifre, 10);
        await havuz.query(
            'INSERT INTO kullanicilar (ad_soyad, kullanici_adi, sifre_ozeti, rol, telefon, sirket_adi) VALUES (?,?,?,?,?,?)',
            [ad_soyad, kullanici_adi, sifre_ozeti, rol, telefon || null, sirket_adi || null]
        );
        res.status(201).json({ mesaj: 'Kayıt başarılı' });
    } catch (e) {
        if (e && e.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ hata: 'Bu kullanıcı adı zaten kayıtlı' });
        }
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

router.post('/giris', async (req, res) => {
    try {
        const { kullanici_adi, sifre } = req.body;
        if (!kullanici_adi || !sifre) {
            return res.status(400).json({ hata: 'Kullanıcı adı ve şifre zorunludur' });
        }

        const [[k]] = await havuz.query(
            'SELECT id, ad_soyad, kullanici_adi, sifre_ozeti, rol FROM kullanicilar WHERE kullanici_adi = ?',
            [kullanici_adi]
        );
        if (!k) return res.status(401).json({ hata: 'Kullanıcı adı veya şifre hatalı' });

        const dogru = await bcrypt.compare(sifre, k.sifre_ozeti);
        if (!dogru) return res.status(401).json({ hata: 'Kullanıcı adı veya şifre hatalı' });

        const token = jwt.sign(
            { id: k.id, rol: k.rol, ad_soyad: k.ad_soyad, kullanici_adi: k.kullanici_adi },
            process.env.JWT_SECRET || 'dev-secret',
            { expiresIn: '7d' }
        );
        res.json({ token, kullanici: { id: k.id, ad_soyad: k.ad_soyad, kullanici_adi: k.kullanici_adi, rol: k.rol } });
    } catch (err) {
        console.error('Giriş hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

module.exports = router;