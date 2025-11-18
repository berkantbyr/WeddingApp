# MySQL Bağlantı Kontrol Scripti
Write-Host "`n=== MySQL Bağlantı Kontrolü ===" -ForegroundColor Cyan
Write-Host ""

# .env dosyasını kontrol et
if (Test-Path .env) {
    Write-Host "✓ .env dosyası bulundu" -ForegroundColor Green
    $envContent = Get-Content .env
    $dbHost = ($envContent | Select-String "DB_HOST=").ToString().Split("=")[1]
    $dbPort = ($envContent | Select-String "DB_PORT=").ToString().Split("=")[1]
    Write-Host "  Host: $dbHost" -ForegroundColor Gray
    Write-Host "  Port: $dbPort" -ForegroundColor Gray
} else {
    Write-Host "✗ .env dosyası bulunamadı!" -ForegroundColor Red
    exit 1
}

# Port kontrolü
Write-Host "`nPort $dbPort kontrol ediliyor..." -ForegroundColor Yellow
$portTest = Test-NetConnection -ComputerName localhost -Port $dbPort -InformationLevel Quiet -WarningAction SilentlyContinue

if ($portTest) {
    Write-Host "✓ Port $dbPort açık - MySQL çalışıyor olabilir" -ForegroundColor Green
    Write-Host "`nVeritabanı kurulumunu çalıştırabilirsiniz:" -ForegroundColor Cyan
    Write-Host "  npm run db:setup" -ForegroundColor White
} else {
    Write-Host "✗ Port $dbPort kapalı - MySQL çalışmıyor!" -ForegroundColor Red
    Write-Host "`nMySQL'i başlatmak için:" -ForegroundColor Yellow
    Write-Host "  1. XAMPP Control Panel'i açın" -ForegroundColor White
    Write-Host "  2. MySQL'in yanındaki 'Start' butonuna tıklayın" -ForegroundColor White
    Write-Host "  3. Bu scripti tekrar çalıştırın" -ForegroundColor White
}

Write-Host ""

