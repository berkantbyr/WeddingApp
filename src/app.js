const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// Statik dosyaları servis et (yüklenen resimler için)
app.use('/uploads', express.static('uploads'));

app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/salonlar'));
app.use('/api', require('./routes/paketler'));
app.use('/api', require('./routes/rezervasyonlar'));

app.get('/api/saglik', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT} üzerinde çalışıyor`);
});