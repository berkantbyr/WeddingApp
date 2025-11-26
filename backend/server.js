// Projenin genel akışı: Bu dosya Express sunucusunu kurup `./api` altındaki auth/salon/paket/rezervasyon
// rotalarını MySQL'e bağlıyor; `middleware` klasörü yükleme ve yetki süreçlerini yönetiyor; `frontend/src`'deki
// React ekranları bu API'yi kullanarak kullanıcı, salon sahibi ve admin panellerini sunuyor. Tüm kod bu iş
// akışını destekleyecek şekilde organize edildi.
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
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