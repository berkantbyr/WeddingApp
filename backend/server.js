// Projenin genel akışı: Bu dosya Express sunucusunu kurup `./api` altındaki auth/salon/paket/rezervasyon
// rotalarını MySQL'e bağlıyor; `middleware` klasörü yükleme ve yetki süreçlerini yönetiyor; `frontend/src`'deki
// React ekranları bu API'yi kullanarak kullanıcı, salon sahibi ve admin panellerini sunuyor. Tüm kod bu iş
// akışını destekleyecek şekilde organize edildi.
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS ||
  'https://wedding-app-sigma-five.vercel.app,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`CORS engellendi: ${origin}`);
    return callback(new Error('Yetkisiz origin'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
console.log('Allowed origins:', allowedOrigins);
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