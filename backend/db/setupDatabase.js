const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function kurulum() {
    const dosyaYolu = path.join(__dirname, 'sql', 'schema.sql');
    const sql = fs.readFileSync(dosyaYolu, 'utf8');

    const host = process.env.DB_HOST || 'localhost';
    const port = Number(process.env.DB_PORT || 3306);
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME || 'salonbulucu';

    console.log('Veritabanı bağlantı ayarları:');
    console.log(`  Host: ${host}`);
    console.log(`  Port: ${port}`);
    console.log(`  User: ${user}`);
    console.log(`  Database: ${dbName}`);
    console.log('');

    try {
        // 1) DB yoksa oluştur
        console.log('Veritabanına bağlanılıyor...');
        const baglantiIlk = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
        console.log('Bağlantı başarılı!');
        
        console.log(`Veritabanı oluşturuluyor: ${dbName}...`);
        await baglantiIlk.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await baglantiIlk.end();
        console.log('Veritabanı oluşturuldu.');

        // 2) Şemayı uygula
        console.log('Şema uygulanıyor...');
        const baglanti = await mysql.createConnection({ host, port, user, password, database: dbName, multipleStatements: true });
        await baglanti.query(sql);
        await baglanti.end();

        console.log('✓ Veritabanı kuruldu / güncellendi.');
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error('\n❌ HATA: MySQL sunucusuna bağlanılamıyor!');
            console.error('Lütfen şunları kontrol edin:');
            console.error('  1. MySQL sunucusu çalışıyor mu?');
            console.error('  2. .env dosyasındaki DB_HOST ve DB_PORT ayarları doğru mu?');
            console.error('  3. MySQL servisini başlatmak için:');
            console.error('     - Windows: net start MySQL (veya servis adınız)');
            console.error('     - Veya XAMPP/WAMP kontrol panelinden MySQL\'i başlatın');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n❌ HATA: Veritabanı erişim hatası!');
            console.error('Kullanıcı adı veya şifre yanlış olabilir.');
            console.error('Lütfen .env dosyasındaki DB_USER ve DB_PASSWORD ayarlarını kontrol edin.');
        } else {
            console.error('\n❌ HATA:', error.message);
            console.error('Detay:', error);
        }
        throw error;
    }
}

kurulum().catch((e) => {
    process.exit(1);
});