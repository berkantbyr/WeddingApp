import React from 'react';

const PricingPage = () => {
  return (
    <div className="container py-5">
      <h1 className="section-heading">İş ortaklığı paketleri</h1>
      <p className="text-muted mb-4">Salonunuzu tanıtmak ve rezervasyonları sorunsuz yönetmek için en uygun planı seçin.</p>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-semibold">Başlangıç</h5>
              <p className="text-muted small">SalonBulucu’yu denemek isteyen tek salon sahibi işletmeler için ideal.</p>
              <h3 className="fw-bold">₺0</h3>
              <ul className="list-unstyled text-muted small">
                <li>• Sınırsız rezervasyon talebi</li>
                <li>• Temel salon profili</li>
                <li>• E-posta desteği</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100 border-primary">
            <div className="card-body p-4">
              <h5 className="fw-semibold">Premium</h5>
              <p className="text-muted small">Öne çıkarılan listeler ve performans analizleri ile görünürlüğünüzü artırın.</p>
              <h3 className="fw-bold">₺399 / ay</h3>
              <ul className="list-unstyled text-muted small">
                <li>• Öne çıkartılmış konumlandırma</li>
                <li>• Detaylı rapor ve analizler</li>
                <li>• Özel başarı danışmanı</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-semibold">Kurumsal</h5>
              <p className="text-muted small">Salon zincirleri ve etkinlik ajansları için.</p>
              <h3 className="fw-bold">Bizimle iletişime geçin</h3>
              <ul className="list-unstyled text-muted small">
                <li>• Çoklu kullanıcı yönetimi</li>
                <li>• Özel entegrasyonlar</li>
                <li>• SLA güvenceli destek</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

