-- Kullanıcı adı zorunluluğu için eski eposta kolonunu yeniden adlandır
-- Bu işlem mevcut e-posta değerlerini kullanıcı adı olarak kullanır
ALTER TABLE kullanicilar
CHANGE COLUMN eposta kullanici_adi VARCHAR(160) NOT NULL UNIQUE;


