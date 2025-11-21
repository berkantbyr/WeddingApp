const mysql = require('mysql2/promise');

// Railway ve diğer platformlar için environment variable desteği
// Railway otomatik olarak MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE ekler
// Ayrıca manuel DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME de desteklenir
const dbConfig = {
  host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
  port: Number(process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
  user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || 'salonbulucu',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Debug: Hangi değişkenlerin kullanıldığını göster (production'da gizle)
if (process.env.NODE_ENV !== 'production') {
  console.log('Veritabanı bağlantı ayarları:', {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    database: dbConfig.database,
    passwordSet: !!dbConfig.password
  });
}

// Bağlantıyı test et
const havuz = mysql.createPool(dbConfig);

// Bağlantı hatası kontrolü
havuz.getConnection()
  .then((connection) => {
    console.log('✓ Veritabanı bağlantısı başarılı');
    console.log(`  Host: ${dbConfig.host}:${dbConfig.port}`);
    console.log(`  Database: ${dbConfig.database}`);
    connection.release();
  })
  .catch((err) => {
    console.error('✗ Veritabanı bağlantı hatası:', err.message);
    console.error('  Hata kodu:', err.code);
    console.error('  Lütfen environment variable\'larını kontrol edin:');
    console.error('    - MYSQLHOST veya DB_HOST');
    console.error('    - MYSQLPORT veya DB_PORT');
    console.error('    - MYSQLUSER veya DB_USER');
    console.error('    - MYSQLPASSWORD veya DB_PASSWORD');
    console.error('    - MYSQLDATABASE veya DB_NAME');
  });

module.exports = havuz;