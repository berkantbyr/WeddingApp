const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const havuz = require('../db');

const router = express.Router();

router.post('/kayit', async (req, res) => {
    try {
        const { ad_soyad, eposta, sifre, rol, telefon, sirket_adi } = req.body;
        if (!ad_soyad || !eposta || !sifre || !rol) {
            return res.status(400).json({ hata: 'ad_soyad, eposta, sifre, rol zorunlu' });
        }
        if (!['MUSTERI', 'SALON_SAHIBI'].includes(rol)) {
            return res.status(400).json({ hata: 'Rol geçersiz' });
        }
        // Salon sahibi için şirket adı zorunlu
        if (rol === 'SALON_SAHIBI' && !sirket_adi) {
            return res.status(400).json({ hata: 'Salon sahibi için şirket adı zorunludur' });
        }
        const sifre_ozeti = await bcrypt.hash(sifre, 10);
        await havuz.query(
            'INSERT INTO kullanicilar (ad_soyad, eposta, sifre_ozeti, rol, telefon, sirket_adi) VALUES (?,?,?,?,?,?)',
            [ad_soyad, eposta, sifre_ozeti, rol, telefon || null, sirket_adi || null]
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
        const { identifier, sifre } = req.body; // identifier: şirket adı veya ad soyad
        if (!identifier || !sifre) {
            return res.status(400).json({ hata: 'Şirket adı/Ad Soyad ve şifre zorunludur' });
        }
        
        // Önce ad_soyad ile ara, bulamazsa şirket adı ile ara (şirket adı için ek tablo gerekebilir ama şimdilik ad_soyad ile yapıyoruz)
        // Not: Şirket adı şu an kullanicilar tablosunda yok, bu yüzden sadece ad_soyad ile arama yapıyoruz
        // İleride şirket adı için ayrı bir tablo veya alan eklenebilir
        const [[k]] = await havuz.query(
            'SELECT id, ad_soyad, eposta, sifre_ozeti, rol FROM kullanicilar WHERE ad_soyad = ?',
            [identifier]
        );
        if (!k) return res.status(401).json({ hata: 'Şirket adı/Ad Soyad veya şifre hatalı' });

        const dogru = await bcrypt.compare(sifre, k.sifre_ozeti);
        if (!dogru) return res.status(401).json({ hata: 'Şirket adı/Ad Soyad veya şifre hatalı' });

        const token = jwt.sign(
            { id: k.id, rol: k.rol, ad_soyad: k.ad_soyad, eposta: k.eposta },
            process.env.JWT_SECRET || 'dev-secret',
            { expiresIn: '7d' }
        );
        res.json({ token, kullanici: { id: k.id, ad_soyad: k.ad_soyad, eposta: k.eposta, rol: k.rol } });
    } catch (err) {
        console.error('Giriş hatası:', err);
        res.status(500).json({ hata: 'Sunucu hatası' });
    }
});

module.exports = router;