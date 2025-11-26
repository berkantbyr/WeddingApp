// Projenin genel akışı: Bu dosya Express sunucusunu kurup `./api` altındaki auth/salon/paket/rezervasyon
// rotalarını MySQL'e bağlıyor; `middleware` klasörü yükleme ve yetki süreçlerini yönetiyor; `frontend/src`'deki
// React ekranları bu API'yi kullanarak kullanıcı, salon sahibi ve admin panellerini sunuyor. Tüm kod bu iş
// akışını destekleyecek şekilde organize edildi.
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'https://wedding-app-sigma-five.vercel.app'
];

const extraOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const allowedOrigins = new Set([...defaultOrigins, ...extraOrigins]);
const allowAllOrigins = allowedOrigins.size === 0;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && (allowAllOrigins || allowedOrigins.has(origin))) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());
// Statik dosyaları servis et (yüklenen resimler için)
app.use('/uploads', express.static('uploads'));

app.use('/api', require('./api/auth'));
app.use('/api', require('./api/salonlar'));
app.use('/api', require('./api/paketler'));
app.use('/api', require('./api/rezervasyonlar'));

app.get('/api/saglik', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT} üzerinde çalışıyor`);
});