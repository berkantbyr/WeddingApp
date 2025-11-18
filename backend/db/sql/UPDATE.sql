-- ============================================
-- VERİTABANI GÜNCELLEME SCRIPTİ
-- ============================================
-- Bu dosyayı MySQL'de çalıştırarak yeni tabloları ekleyin
-- ============================================

-- 1. Opsiyonel Paketler tablosunu oluştur
CREATE TABLE IF NOT EXISTS opsiyonel_paketler (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  salon_id BIGINT UNSIGNED NOT NULL,
  ad VARCHAR(160) NOT NULL,
  fiyat DECIMAL(10,2) NOT NULL,
  aciklama TEXT,
  olusturulma_zamani TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_opsiyonel_salon
    FOREIGN KEY (salon_id) REFERENCES salonlar(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- 2. Rezervasyonlar tablosuna toplam_fiyat kolonunu ekle
-- (Eğer zaten varsa hata verebilir, bu normal)
ALTER TABLE rezervasyonlar 
ADD COLUMN toplam_fiyat DECIMAL(10,2) 
AFTER notlar;

-- 3. Rezervasyon Opsiyonel Paketleri tablosunu oluştur
CREATE TABLE IF NOT EXISTS rezervasyon_opsiyonel_paketler (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  rezervasyon_id BIGINT UNSIGNED NOT NULL,
  opsiyonel_paket_id BIGINT UNSIGNED NOT NULL,
  olusturulma_zamani TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rez_opsiyonel_rez
    FOREIGN KEY (rezervasyon_id) REFERENCES rezervasyonlar(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_rez_opsiyonel_paket
    FOREIGN KEY (opsiyonel_paket_id) REFERENCES opsiyonel_paketler(id)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ============================================
-- GÜNCELLEME TAMAMLANDI
-- ============================================
-- Şimdi backend ve frontend'i başlatabilirsiniz
-- ============================================

