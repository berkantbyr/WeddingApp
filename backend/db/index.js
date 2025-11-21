const mysql = require('mysql2/promise');

// Veritabanı bağlantı ayarlarını kontrol et
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'salonbulucu',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Bağlantıyı test et
const havuz = mysql.createPool(dbConfig);

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