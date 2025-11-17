const havuz = require('../db');

async function temizleGereksizKullanicilar() {
    try {
        const [sonuc] = await havuz.query(
            `DELETE FROM kullanicilar 
             WHERE kullanici_adi IS NULL 
                OR kullanici_adi = ''`
        );

        if (sonuc?.affectedRows) {
            console.log(`[bakim] ${sonuc.affectedRows} adet eski test kullanıcısı silindi.`);
        }
    } catch (err) {
        console.error('[bakim] Eski kullanıcılar temizlenemedi:', err.message);
    }
}

module.exports = {
    temizleGereksizKullanicilar
};

