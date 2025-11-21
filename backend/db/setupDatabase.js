const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function kurulum() {
    const dosyaYolu = path.join(__dirname, 'sql', 'schema.sql');
    const sql = fs.readFileSync(dosyaYolu, 'utf8');

    // Yeni Hâl (Tek URL):
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error("HATA: DATABASE_URL Ortam Değişkeni Tanımlı Değil!");
        process.exit(1);
    }

    // URL'den bilgileri parse et (log için)
    let host, port, user, dbName;
    try {
        const url = new URL(connectionString);
        host = url.hostname;
        port = url.port || 3306;
        user = url.username;
        dbName = url.pathname.slice(1); // Başındaki / karakterini kaldır
    } catch (e) {
        console.error('DATABASE_URL formatı geçersiz!');
        throw e;
    }

    console.log('Veritabanı bağlantı ayarları:');
    console.log(`  Host: ${host}`);
    console.log(`  Port: ${port}`);
    console.log(`  User: ${user}`);
    console.log(`  Database: ${dbName}`);
    console.log('');

    try {
        // 1) DB yoksa oluştur
        console.log('Veritabanına bağlanılıyor...');
        // Database olmadan bağlantı kur (veritabanı henüz yok)
        const connectionStringWithoutDb = connectionString.replace(/\/[^\/]*$/, '') + '?multipleStatements=true';
        const baglantiIlk = await mysql.createConnection(connectionStringWithoutDb);
        console.log('Bağlantı başarılı!');
        
        console.log(`Veritabanı oluşturuluyor: ${dbName}...`);
        await baglantiIlk.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await baglantiIlk.end();
        console.log('Veritabanı oluşturuldu.');

        // 2) Şemayı uygula
        console.log('Şema uygulanıyor...');
        const baglanti = await mysql.createConnection(connectionString + '?multipleStatements=true');
        await baglanti.query(sql);
        await baglanti.end();

        console.log('✓ Veritabanı kuruldu / güncellendi.');
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error('\n❌ HATA: MySQL sunucusuna bağlanılamıyor!');
            console.error('Lütfen şunları kontrol edin:');
            console.error('  1. MySQL sunucusu çalışıyor mu?');
            console.error('  2. .env dosyasındaki DATABASE_URL ayarı doğru mu?');
            console.error('  3. MySQL servisini başlatmak için:');
            console.error('     - Windows: net start MySQL (veya servis adınız)');
            console.error('     - Veya XAMPP/WAMP kontrol panelinden MySQL\'i başlatın');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n❌ HATA: Veritabanı erişim hatası!');
            console.error('Kullanıcı adı veya şifre yanlış olabilir.');
            console.error('Lütfen .env dosyasındaki DATABASE_URL ayarını kontrol edin.');
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