const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { temizleGereksizKullanicilar } = require('./utils/userMaintenance');

dotenv.config();
const app = express();

const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

temizleGereksizKullanicilar();

app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/salonlar'));
app.use('/api', require('./routes/paketler'));
app.use('/api', require('./routes/rezervasyonlar'));

app.get('/api/saglik', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT} üzerinde çalışıyor`);
});