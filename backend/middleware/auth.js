const jwt = require('jsonwebtoken');

function kimlikDogrula(roller = []) {
  const izinliRoller = Array.isArray(roller) ? roller : [roller];

  return (req, res, next) => {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ hata: 'Token yok' });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
      if (izinliRoller.length && !izinliRoller.includes(payload.rol)) {
        return res.status(403).json({ hata: 'Yetki yok' });
      }
      req.kullanici = payload;
      next();
    } catch {
      return res.status(401).json({ hata: 'Token geçersiz' });
    }
  };
}

module.exports = { kimlikDogrula };