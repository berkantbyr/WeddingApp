const mysql = require('mysql2/promise');

// Yeni Hâl (Tek URL):
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("HATA: DATABASE_URL Ortam Değişkeni Tanımlı Değil!");
  process.exit(1);
}

// Pool için ekstra ayarlar
const poolConfig = {
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Bağlantı havuzunu oluştur
const havuz = mysql.createPool(connectionString, poolConfig);

// Bağlantıyı test et

// Bağlantı hatası kontrolü
havuz.getConnection()
  .then((connection) => {
    console.log('Veritabanı bağlantısı başarılı');
    connection.release();
  })
  .catch((err) => {
    console.error('Veritabanı bağlantı hatası:', err.message);
    console.error('Lütfen .env dosyasını kontrol edin veya veritabanını kurun: npm run db:setup');
  });

module.exports = havuz;