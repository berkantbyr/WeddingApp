import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container py-5">
      <h1 className="section-heading">Gizlilik politikası</h1>
      <p className="text-muted mb-4">
        Gizliliğinize saygı duyuyor ve kişisel verilerinizi korumaya özen gösteriyoruz. Bu politika, SalonBulucu
        platformunda verilerinizi nasıl topladığımızı, kullandığımızı ve sakladığımızı açıklar.
      </p>
      <div className="d-flex flex-column gap-3 text-muted">
        <div>
          <h5 className="fw-semibold">Topladığımız veriler</h5>
          <p className="small mb-0">Hesap bilgileri, rezervasyon geçmişi ve iletişim tercihleri.</p>
        </div>
        <div>
          <h5 className="fw-semibold">Verileri nasıl kullanıyoruz</h5>
          <p className="small mb-0">Rezervasyonları kolaylaştırmak, kişiselleştirilmiş öneriler sunmak ve güvenli erişim sağlamak için.</p>
        </div>
        <div>
          <h5 className="fw-semibold">Haklarınız</h5>
          <p className="small mb-0">Destek ekibimizle iletişime geçerek verilerinize erişebilir, güncelleyebilir veya silinmesini talep edebilirsiniz.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

