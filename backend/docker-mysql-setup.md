# Docker ile MySQL Kurulumu

Eğer Docker Desktop kuruluysa, şu komutu çalıştırın:

```powershell
docker run --name weddingapp-mysql -e MYSQL_ROOT_PASSWORD=123456789bob! -e MYSQL_DATABASE=salonbulucu -p 3306:3306 -d mysql:8.0
```

Bu komut:
- MySQL 8.0'ı indirir ve çalıştırır
- Root şifresini `.env` dosyanızdaki şifreye ayarlar
- `salonbulucu` veritabanını oluşturur
- Port 3306'da çalışır

Docker kurulu değilse, yukarıdaki Seçenek 1 veya 2'yi kullanın.

