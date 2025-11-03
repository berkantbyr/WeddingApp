import React from 'react';

const TermsPage = () => {
  return (
    <div className="container py-5">
      <h1 className="section-heading">Kullanım şartları</h1>
      <p className="text-muted mb-4">
        SalonBulucu'yu kullanarak aşağıdaki şartları kabul etmiş olursunuz. Müşteri, salon sahibi veya yönetici olarak
        haklarınızı ve sorumluluklarınızı anlamak için lütfen dikkatlice okuyun.
      </p>
      <ol className="text-muted small d-flex flex-column gap-2">
        <li>Hesaplar doğru bilgiler içermeli ve güvenli şekilde korunmalıdır.</li>
        <li>Salon sahipleri, onaylanan rezervasyon taleplerini yerine getirmekle yükümlüdür.</li>
        <li>Müşteriler, misafir sayısı ve etkinlik detaylarını doğru iletmekten sorumludur.</li>
        <li>Ödeme özelliği aktif edildiğinde işlemler güvenli üçüncü taraf sağlayıcılar üzerinden gerçekleştirilir.</li>
        <li>Bu şartları ihlal eden hesaplar SalonBulucu tarafından askıya alınabilir.</li>
      </ol>
    </div>
  );
};

export default TermsPage;

