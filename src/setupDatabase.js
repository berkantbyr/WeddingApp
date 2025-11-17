const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function kurulum() {
    const dosyaYolu = path.join(__dirname, '..', 'database', 'schema.sql');
    const sql = fs.readFileSync(dosyaYolu, 'utf8');

    const host = process.env.DB_HOST || 'localhost';
    const port = Number(process.env.DB_PORT || 3306);
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME || 'salonbulucu';

    // 1) DB yoksa oluştur
    const baglantiIlk = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
    await baglantiIlk.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await baglantiIlk.end();

    // 2) Şemayı uygula
    const baglanti = await mysql.createConnection({ host, port, user, password, database: dbName, multipleStatements: true });
    await baglanti.query(sql);
    await baglanti.end();

    console.log('Veritabanı kuruldu / güncellendi.');
}

kurulum().catch((e) => {
    console.error('Kurulum hatası:', e);
    process.exit(1);
});