-- Şirket adı kolonunu ekle
-- Eğer kolon zaten varsa hata verebilir, bu normaldir
ALTER TABLE kullanicilar 
ADD COLUMN sirket_adi VARCHAR(160) AFTER telefon;

