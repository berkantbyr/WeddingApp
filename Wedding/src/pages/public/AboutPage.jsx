import React from 'react';

const AboutPage = () => {
  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6">
          <img
            src="https://images.unsplash.com/photo-1529257414771-1960ab1f80ca?auto=format&fit=crop&w=1100&q=80"
            alt="Team working"
            className="img-fluid rounded-4 shadow-soft"
          />
        </div>
        <div className="col-lg-6">
          <span className="badge-soft mb-3">Hikayemiz</span>
          <h1 className="section-heading">Salon sahipleri ile çiftleri zahmetsizce buluşturuyoruz</h1>
          <p className="text-muted mb-4">
            SalonBulucu, salon arayışının stresini bizzat yaşamış organizasyon profesyonelleri tarafından kuruldu.
            Güvenilir salonların atmosferlerini sergileyebildiği, çiftlerin özenle hazırlanmış paketleri keşfederek tüm
            detayları kolayca yönettiği modern bir platform hayal ettik.
          </p>
          <div className="row g-4">
            <div className="col-sm-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="fw-semibold">Çiftler için</h5>
                  <p className="text-muted small mb-0">
                    Salonları keşfedin, paketleri karşılaştırın, salon sahipleriyle iletişime geçin ve dakikalar içinde
                    rezervasyon isteği gönderin.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="fw-semibold">Salon sahipleri için</h5>
                  <p className="text-muted small mb-0">
                    Salonunuzun ayrıcalıklarını öne çıkarın, gelen talepleri yönetin ve rezervasyon takviminizi düzenli
                    tutun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="row g-4 mt-5">
        <div className="col-md-4">
          <div className="p-4 bg-white rounded-4 shadow-sm h-100">
            <h3 className="display-6 fw-bold text-primary">120+</h3>
            <p className="text-muted mb-0">Paketlerini ve uygunluklarını paylaşan seçkin salon sayısı.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-white rounded-4 shadow-sm h-100">
            <h3 className="display-6 fw-bold text-primary">4.9/5</h3>
            <p className="text-muted mb-0">Etkinlik sonrası geri bildirimlerde çiftlerin memnuniyet puanı ortalaması.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-white rounded-4 shadow-sm h-100">
            <h3 className="display-6 fw-bold text-primary">48 hrs</h3>
            <p className="text-muted mb-0">Operasyon ekibimizin yeni salonları onaylama süresinin ortalaması.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

