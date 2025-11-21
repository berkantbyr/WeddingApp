const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const havuz = require('../db');

const router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123';
const ADMIN_FULLNAME = process.env.ADMIN_FULLNAME || 'Sistem Yöneticisi';

router.post('/kayit', async (req, res) => {
    try {
        const { ad_soyad, kullanici_adi, sifre, rol, telefon, sirket_adi } = req.body;
        if (!ad_soyad || !kullanici_adi || !sifre || !rol) {
            return res.status(400).json({ hata: 'ad_soyad, kullanici_adi, sifre, rol zorunlu' });
        }
        if (!['MUSTERI', 'SALON_SAHIBI'].includes(rol)) {
            return res.status(400).json({ hata: 'Rol geçersiz' });
        }
        if (kullanici_adi === ADMIN_USERNAME) {
            return res.status(409).json({ hata: 'Bu kullanıcı adı rezerve edilmiştir' });
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
        console.error('Kayıt hatası:', e);
        console.error('Hata detayları:', {
            code: e.code,
            message: e.message,
            sqlMessage: e.sqlMessage,
            errno: e.errno
        });
        
        if (e && e.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ hata: 'Bu kullanıcı adı zaten kayıtlı' });
        }
        
        // Veritabanı bağlantı hatası
        if (e.code === 'ECONNREFUSED' || e.code === 'ENOTFOUND' || e.code === 'ETIMEDOUT') {
            return res.status(500).json({ 
                hata: 'Veritabanı bağlantı hatası',
                detay: 'Veritabanı sunucusuna ulaşılamıyor. Lütfen sistem yöneticisine başvurun.'
            });
        }
        
        // SQL hatası
        if (e.code && e.code.startsWith('ER_')) {
            return res.status(500).json({ 
                hata: 'Veritabanı hatası',
                detay: process.env.NODE_ENV !== 'production' ? e.sqlMessage : undefined
            });
        }
        
        // Genel hata
        const hataMesaji = process.env.NODE_ENV === 'production' 
            ? 'Sunucu hatası' 
            : e.message || 'Sunucu hatası';
        res.status(500).json({ 
            hata: hataMesaji, 
            detay: process.env.NODE_ENV !== 'production' ? e.message : undefined 
        });
    }
});

router.post('/giris', async (req, res) => {
    try {
        const { kullanici_adi, sifre } = req.body;
        if (!kullanici_adi || !sifre) {
            return res.status(400).json({ hata: 'Kullanıcı adı ve şifre zorunludur' });
        }

        if (kullanici_adi === ADMIN_USERNAME) {
            if (sifre !== ADMIN_PASSWORD) {
                return res.status(401).json({ hata: 'Kullanıcı adı veya şifre hatalı' });
            }

            const token = jwt.sign(
                { id: 'ADMIN', rol: 'ADMIN', ad_soyad: ADMIN_FULLNAME, kullanici_adi: ADMIN_USERNAME },
                process.env.JWT_SECRET || 'dev-secret',
                { expiresIn: '7d' }
            );

            return res.json({
                token,
                kullanici: {
                    id: 'ADMIN',
                    ad_soyad: ADMIN_FULLNAME,
                    kullanici_adi: ADMIN_USERNAME,
                    rol: 'ADMIN'
                }
            });
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
        console.error('Hata detayları:', {
            code: err.code,
            message: err.message,
            sqlMessage: err.sqlMessage
        });
        
        // Veritabanı bağlantı hatası
        if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.code === 'ETIMEDOUT') {
            return res.status(500).json({ 
                hata: 'Veritabanı bağlantı hatası',
                detay: 'Veritabanı sunucusuna ulaşılamıyor. Lütfen sistem yöneticisine başvurun.'
            });
        }
        
        res.status(500).json({ 
            hata: 'Sunucu hatası',
            detay: process.env.NODE_ENV !== 'production' ? err.message : undefined
        });
    }
});

module.exports = router;