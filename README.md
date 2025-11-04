# SalonBulucu - Düğün Salonu Rezervasyon Platformu

Modern ve kullanıcı dostu bir düğün salonu rezervasyon platformu. Salon sahipleri salonlarını listeleyebilir, müşteriler ise salonları arayıp rezervasyon yapabilir.

## 🚀 Proje Yapısı

Bu proje iki ana bileşenden oluşmaktadır:

### Backend (API)
- **Framework**: Express.js
- **Veritabanı**: MySQL
- **Kimlik Doğrulama**: JWT (JSON Web Token)
- **Konum**: `src/` klasörü

### Frontend (Web Uygulaması)
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5 + Tailwind CSS
- **Konum**: `Wedding/` klasörü

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- MySQL (v8.0 veya üzeri)
- npm veya yarn

## 🛠️ Kurulum

### 1. Veritabanı Kurulumu

MySQL veritabanınızı oluşturun ve şemayı import edin:

```bash
# MySQL'e bağlanın
mysql -u root -p

# Veritabanını oluşturun ve şemayı import edin
source database/schema.sql
```

Alternatif olarak, `schema.sql` dosyasını MySQL Workbench veya phpMyAdmin üzerinden çalıştırabilirsiniz.

### 2. Backend Kurulumu

```bash
# Proje kök dizinine gidin
cd WeddingApp

# Bağımlılıkları yükleyin
npm install

# .env dosyası oluşturun
# .env dosyasına şu bilgileri ekleyin:
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=salonbulucu
# JWT_SECRET=your_secret_key
# PORT=3000

# Veritabanını kurun (isteğe bağlı)
npm run db:setup

# API sunucusunu başlatın
npm start
```

API sunucusu varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

### 3. Frontend Kurulumu

```bash
# Frontend klasörüne gidin
cd Wedding

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Frontend uygulaması varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

## 📁 API Endpoints

### Kimlik Doğrulama
- `POST /api/kayit` - Kullanıcı kaydı
- `POST /api/giris` - Kullanıcı girişi

### Salonlar
- `GET /api/salonlar` - Salonları listele (filtreleme: sehir, minKapasite)
- `POST /api/salonlar` - Yeni salon ekle (SALON_SAHIBI rolü gerekli)

### Paketler
- `GET /api/paketler` - Paketleri listele
- `POST /api/paketler` - Yeni paket ekle

### Rezervasyonlar
- `GET /api/rezervasyonlar` - Rezervasyonları listele
- `POST /api/rezervasyonlar` - Yeni rezervasyon oluştur

### Sağlık Kontrolü
- `GET /api/saglik` - API sağlık kontrolü

## 🌐 Web Sayfaları

### Public Sayfalar (Herkes Erişebilir)
- **Ana Sayfa** (`/`) - Platform tanıtımı ve öne çıkan salonlar
- **Salon Arama** (`/venues`) - Salonları filtreleyerek arama
- **Salon Detayları** (`/venues/:id`) - Salon detay sayfası
- **Hakkımızda** (`/about`) - Platform hakkında bilgiler
- **İletişim** (`/contact`) - İletişim formu
- **Fiyatlandırma** (`/pricing`) - Paket fiyatlandırması
- **Gizlilik Politikası** (`/privacy`) - Gizlilik politikası
- **Kullanım Şartları** (`/terms`) - Kullanım şartları
- **Çerez Politikası** (`/cookies`) - Çerez politikası

### Kimlik Doğrulama Sayfaları
- **Giriş** (`/login`) - Kullanıcı girişi
- **Kayıt** (`/register`) - Yeni kullanıcı kaydı
- **Şifremi Unuttum** (`/forgot-password`) - Şifre sıfırlama

### Müşteri Sayfaları (MUSTERI rolü gerekli)
- **Müşteri Paneli** (`/account`) - Müşteri dashboard
- **Rezervasyonlarım** (`/account/reservations`) - Kullanıcının rezervasyonları
- **Profil** (`/account/profile`) - Kullanıcı profili

### Salon Sahibi Sayfaları (SALON_SAHIBI rolü gerekli)
- **Salon Sahibi Paneli** (`/owner`) - Salon sahibi dashboard
- **Salonlarım** (`/owner/venues`) - Sahibinin salonları
- **Salon Ekle** (`/owner/add`) - Yeni salon ekleme
- **Rezervasyonlar** (`/owner/reservations`) - Salon rezervasyonları

### Admin Sayfaları (admin rolü gerekli)
- **Admin Paneli** (`/admin`) - Admin dashboard
- **Salon Onayları** (`/admin/venues`) - Salon onaylama sayfası
- **Kullanıcı Yönetimi** (`/admin/users`) - Kullanıcı yönetimi

## 🗄️ Veritabanı Yapısı

Veritabanı şeması `database/schema.sql` dosyasında tanımlanmıştır. Ana tablolar:

- **kullanicilar** - Kullanıcı bilgileri (MUSTERI, SALON_SAHIBI rolleri)
- **salonlar** - Salon bilgileri
- **salon_fotograflari** - Salon fotoğrafları
- **paketler** - Paket bilgileri (EKONOMIK, STANDART, PREMIUM)
- **rezervasyonlar** - Rezervasyon kayıtları
- **odemeler** - Ödeme bilgileri

## 🔐 Güvenlik

- Şifreler bcrypt ile hash'lenmiştir
- JWT token tabanlı kimlik doğrulama
- Rol tabanlı yetkilendirme (middleware)
- SQL injection koruması (parametreli sorgular)

## 📝 Scripts

### Backend
- `npm start` - API sunucusunu başlat
- `npm run db:setup` - Veritabanını kur

### Frontend
- `npm run dev` - Geliştirme sunucusunu başlat
- `npm run build` - Production build oluştur
- `npm run preview` - Production build'i önizle

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje ISC lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için GitHub Issues kullanabilirsiniz.

---

**Not**: Bu proje geliştirme aşamasındadır. Production kullanımı için ek güvenlik önlemleri ve testler önerilir.

