const mysql = require('mysql2/promise');

// Railway ve diğer platformlar için environment variable desteği
// Öncelikle MYSQL_URL connection string'ini kontrol et (Railway'de en güvenilir yöntem)
let dbConfig;

if (process.env.MYSQL_URL || process.env.MYSQLURL || process.env.DATABASE_URL) {
  // Connection string kullan
  const connectionString = process.env.MYSQL_URL || process.env.MYSQLURL || process.env.DATABASE_URL;
  console.log('🔗 MYSQL_URL connection string kullanılıyor');
  
  // MySQL connection string formatı: mysql://user:password@host:port/database
  const url = new URL(connectionString);
  dbConfig = {
    host: url.hostname,
    port: Number(url.port || 3306),
    user: url.username,
    password: url.password,
    database: url.pathname.replace('/', ''),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
} else {
  // Ayrı ayrı değişkenler kullan
  dbConfig = {
    host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
    port: Number(process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
    user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || 'salonbulucu',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}

// Debug: Hangi değişkenlerin kullanıldığını göster (her zaman göster)
console.log('🔍 Environment Variable Kontrolü:');
console.log('  MYSQL_URL:', process.env.MYSQL_URL ? '***' : '(yok)');
console.log('  MYSQLHOST:', process.env.MYSQLHOST || '(yok)');
console.log('  MYSQLPORT:', process.env.MYSQLPORT || '(yok)');
console.log('  MYSQLUSER:', process.env.MYSQLUSER || '(yok)');
console.log('  MYSQLPASSWORD:', process.env.MYSQLPASSWORD ? '***' : '(yok)');
console.log('  MYSQLDATABASE:', process.env.MYSQLDATABASE || '(yok)');
console.log('  DB_HOST:', process.env.DB_HOST || '(yok)');
console.log('  DB_PORT:', process.env.DB_PORT || '(yok)');
console.log('  DB_USER:', process.env.DB_USER || '(yok)');
console.log('  DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : '(yok)');
console.log('  DB_NAME:', process.env.DB_NAME || '(yok)');
console.log('📊 Kullanılan Bağlantı Ayarları:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
  passwordSet: !!dbConfig.password
});

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