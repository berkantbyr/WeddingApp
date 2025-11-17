const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const havuz = require('../db');

const router = express.Router();

const KULLANICI_ADI_REGEX = /^[a-zA-Z0-9_.-]{4,30}$/;

router.post('/kayit', async (req, res) => {
    try {
        const { ad_soyad, kullanici_adi, eposta, sifre, rol, telefon, sirket_adi } = req.body;
        if (!ad_soyad || !kullanici_adi || !sifre || !rol) {
            return res.status(400).json({ hata: 'ad_soyad, kullanici_adi, sifre, rol zorunlu' });
        }
        if (!['MUSTERI', 'SALON_SAHIBI'].includes(rol)) {
            return res.status(400).json({ hata: 'Rol geçersiz' });
        }
        if (!KULLANICI_ADI_REGEX.test(kullanici_adi)) {
            return res.status(400).json({ hata: 'Kullanıcı adı 4-30 karakter olmalı ve sadece harf, rakam, . _ - içerebilir' });
        }
        // Salon sahibi için şirket adı zorunlu
        if (rol === 'SALON_SAHIBI' && !sirket_adi) {
            return res.status(400).json({ hata: 'Salon sahibi için şirket adı zorunludur' });
        }

        const [[varMi]] = await havuz.query(
            'SELECT id FROM kullanicilar WHERE kullanici_adi = ?',
            [kullanici_adi]
        );
        if (varMi) {
            return res.status(409).json({ hata: 'Bu kullanıcı adı zaten kullanılıyor' });
        }

        const sifre_ozeti = await bcrypt.hash(sifre, 10);
        await havuz.query(
            'INSERT INTO kullanicilar (ad_soyad, kullanici_adi, eposta, sifre_ozeti, rol, telefon, sirket_adi) VALUES (?,?,?,?,?,?,?)',
            [ad_soyad, kullanici_adi.trim(), eposta || null, sifre_ozeti, rol, telefon || null, sirket_adi || null]
        );
        res.status(201).json({ mesaj: 'Kayıt başarılı' });
    } catch (e) {
        if (e && e.code === 'ER_DUP_ENTRY') {
            const mesaj = e.sqlMessage?.includes('kullanici_adi')
                ? 'Bu kullanıcı adı zaten kullanılıyor'
                : 'Bu e-posta zaten kayıtlı';
            return res.status(409).json({ hata: mesaj });
        }
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

router.post('/giris', async (req, res) => {
    try {
        const { kullanici_adi, identifier, sifre } = req.body;
        const username = kullanici_adi || identifier;
        if (!username || !sifre) {
            return res.status(400).json({ hata: 'Kullanıcı adı ve şifre zorunludur' });
        }

        const [[k]] = await havuz.query(
            'SELECT id, ad_soyad, kullanici_adi, eposta, sifre_ozeti, rol FROM kullanicilar WHERE kullanici_adi = ?',
            [username.trim()]
        );
        if (!k) return res.status(401).json({ hata: 'Kullanıcı adı veya şifre hatalı' });

        const dogru = await bcrypt.compare(sifre, k.sifre_ozeti);
        if (!dogru) return res.status(401).json({ hata: 'Kullanıcı adı veya şifre hatalı' });

        const token = jwt.sign(
            { id: k.id, rol: k.rol, ad_soyad: k.ad_soyad, kullanici_adi: k.kullanici_adi, eposta: k.eposta },
            process.env.JWT_SECRET || 'dev-secret',
            { expiresIn: '7d' }
        );
        res.json({ 
            token, 
            kullanici: { 
                id: k.id, 
                ad_soyad: k.ad_soyad, 
                kullanici_adi: k.kullanici_adi,
                eposta: k.eposta, 
                rol: k.rol 
            } 
        });
    } catch (err) {
        console.error('Giriş hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

module.exports = router;