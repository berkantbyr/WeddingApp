// Projenin genel akışı: Bu dosya Express sunucusunu kurup `./api` altındaki auth/salon/paket/rezervasyon
// rotalarını MySQL'e bağlıyor; `middleware` klasörü yükleme ve yetki süreçlerini yönetiyor; `frontend/src`'deki
// React ekranları bu API'yi kullanarak kullanıcı, salon sahibi ve admin panellerini sunuyor. Tüm kod bu iş
// akışını destekleyecek şekilde organize edildi.
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'https://wedding-app-sigma-five.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      console.warn('CORS engellendi:', origin);
      return callback(new Error('CORS engellendi'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    maxAge: 86400
  })
);

app.options('*', cors());
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