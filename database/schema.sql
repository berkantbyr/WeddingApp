-- Veritabanı
CREATE DATABASE IF NOT EXISTS salonbulucu
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE salonbulucu;

-- Kullanıcılar (müşteri ve salon sahibi)
CREATE TABLE IF NOT EXISTS kullanicilar (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  ad_soyad VARCHAR(120) NOT NULL,
  eposta VARCHAR(160) NOT NULL UNIQUE,
  sifre_ozeti VARCHAR(255) NOT NULL,
  rol ENUM('MUSTERI','SALON_SAHIBI') NOT NULL,
  telefon VARCHAR(30),
  olusturulma_zamani TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Salonlar
CREATE TABLE IF NOT EXISTS salonlar (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  sahip_id BIGINT UNSIGNED NOT NULL,
  ad VARCHAR(160) NOT NULL,
  adres VARCHAR(255) NOT NULL,
  sehir VARCHAR(100),
  kapasite INT UNSIGNED,
  aciklama TEXT,
  olusturulma_zamani TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_salon_sahip
    FOREIGN KEY (sahip_id) REFERENCES kullanicilar(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- Indeksler (salonlar)
CREATE INDEX idx_salon_sehir ON salonlar(sehir);
CREATE INDEX idx_salon_kapasite ON salonlar(kapasite);

-- Salon fotoğrafları
CREATE TABLE IF NOT EXISTS salon_fotograflari (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  salon_id BIGINT UNSIGNED NOT NULL,
  foto_url VARCHAR(500) NOT NULL,
  sira INT DEFAULT 0,
  olusturulma_zamani TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_foto_salon
    FOREIGN KEY (salon_id) REFERENCES salonlar(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- Paketler
CREATE TABLE IF NOT EXISTS paketler (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  salon_id BIGINT UNSIGNED NOT NULL,
  paket_turu ENUM('EKONOMIK','STANDART','PREMIUM') NOT NULL,
  fiyat_hafta_ici DECIMAL(10,2) NOT NULL,
  fiyat_hafta_sonu DECIMAL(10,2) NOT NULL,
  aciklama TEXT,
  olusturulma_zamani TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_salon_paket (salon_id, paket_turu),
  CONSTRAINT fk_paket_salon
    FOREIGN KEY (salon_id) REFERENCES salonlar(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- Rezervasyonlar
CREATE TABLE IF NOT EXISTS rezervasyonlar (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  musteri_id BIGINT UNSIGNED NOT NULL,
  salon_id BIGINT UNSIGNED NOT NULL,
  paket_id BIGINT UNSIGNED NOT NULL,
  etkinlik_tarihi DATE NOT NULL,
  durum ENUM('BEKLEMEDE','ONAYLANDI','REDDEDILDI','IPTAL') NOT NULL DEFAULT 'BEKLEMEDE',
  notlar TEXT,
  olusturulma_zamani TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  guncellenme_zamani TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_rez_musteri
    FOREIGN KEY (musteri_id) REFERENCES kullanicilar(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_rez_salon
    FOREIGN KEY (salon_id) REFERENCES salonlar(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_rez_paket
    FOREIGN KEY (paket_id) REFERENCES paketler(id)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Indeksler (rezervasyonlar)
CREATE INDEX idx_rez_salon_tarih ON rezervasyonlar(salon_id, etkinlik_tarihi);
CREATE INDEX idx_rez_musteri ON rezervasyonlar(musteri_id);
CREATE INDEX idx_rez_durum ON rezervasyonlar(durum);

-- Ödemeler
CREATE TABLE IF NOT EXISTS odemeler (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  rezervasyon_id BIGINT UNSIGNED NOT NULL,
  tutar DECIMAL(10,2) NOT NULL,
  yontem ENUM('KART','HAVALE','NAKIT') NOT NULL,
  odeme_durumu ENUM('BEKLEMEDE','ODENDI','BASARISIZ','IADE') NOT NULL DEFAULT 'BEKLEMEDE',
  odeme_zamani DATETIME NULL,
  olusturulma_zamani TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_odeme_rez
    FOREIGN KEY (rezervasyon_id) REFERENCES rezervasyonlar(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;
