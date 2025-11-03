import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { fetchFeaturedVenues } from '../../services/venueService.js';

const featureHighlights = [
  {
    title: 'Size özel paketler',
    description: 'Ekonomik, standart ve premium paketleri şeffaf fiyatlarla karşılaştırın.',
    icon: 'bi-stars'
  },
  {
    title: 'Anlık uygunluk',
    description: 'Müsait tarihleri anında görün, rezervasyon talebinizi saniyeler içinde iletin.',
    icon: 'bi-calendar2-event'
  },
  {
    title: 'Salon sahibi ile iletişim',
    description: 'Salon sahipleriyle mesajlaşın, özel isteklerde bulunun ve tüm detayları düzenli tutun.',
    icon: 'bi-chat-dots'
  }
];

const HomePage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadFeatured = async () => {
      try {
        const data = await fetchFeaturedVenues();
        if (mounted) {
          setVenues(data);
        }
      } catch (err) {
        if (mounted) setError(err?.message || 'Salonlar yüklenemedi');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadFeatured();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="d-flex flex-column gap-5">
      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <span className="badge-soft mb-3">Güvenle planlayın</span>
            <h1 className="display-5 fw-bold text-dark mb-3">
              Unutulmaz kutlamalar için düğün salonlarını keşfedin
            </h1>
            <p className="text-muted mb-4">
              SalonBulucu, onaylı salon sahipleri ile düğününü planlayan çiftleri buluşturur. Paketleri karşılaştırın,
              hayalinizdeki tarihi seçin ve tüm detayları tek bir panelden yönetin.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}>Salonları keşfet</Button>
              <Button variant="outline" onClick={() => window.location.assign('#how-it-works')}>
                Nasıl çalışır?
              </Button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1000&q=80"
                alt="Wedding venue"
                className="img-fluid rounded-4 shadow-soft"
              />
              <div className="glass-panel position-absolute bottom-0 start-0 m-4 p-3 shadow-sm" style={{ maxWidth: 220 }}>
                <p className="mb-1 fw-semibold text-primary">Son rezervasyon</p>
                <p className="mb-0 small text-muted">Luna Garden Düğün Salonu • 280 misafir • Premium paket</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-5">
        <div className="container">
          <h2 className="section-heading text-center">Modern planlama rehberiniz</h2>
          <p className="section-subheading text-center mx-auto mb-5">
            Üç kolay adımda ideal salonu bulun: Seçeneklere göz atın, uygun paketi belirleyin ve talebinizi salon sahibiyle anında paylaşın.
          </p>
          <div className="row g-4">
            {featureHighlights.map((feature) => (
              <div className="col-md-4" key={feature.title}>
                <div className="card border-0 h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="rounded-circle bg-primary/10 text-primary d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 48, height: 48 }}>
                      <i className={`bi ${feature.icon}`} />
                    </div>
                    <h5 className="fw-semibold">{feature.title}</h5>
                    <p className="text-muted small mb-0">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container" id="featured">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="section-heading mb-1">Öne çıkan salonlar</h2>
            <p className="text-muted mb-0">SalonBulucu ekibinin yakın zamanda onayladığı seçkin salonlar.</p>
          </div>
          <Link to="/venues" className="btn btn-link text-decoration-none">
            Tüm salonları gör
          </Link>
        </div>

        {loading ? (
          <div className="py-5">
            <LoadingSpinner label="Öne çıkan salonlar yükleniyor" />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-4">
            {venues.map((venue) => (
              <div className="col-md-4" key={venue.id}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="ratio ratio-4x3">
                    <img src={venue.coverImage} alt={venue.name} className="object-fit-cover rounded-top" />
                  </div>
                  <div className="card-body d-flex flex-column gap-2">
                    <span className="badge-soft">{venue.city}</span>
                    <h5 className="fw-semibold">{venue.name}</h5>
                    <p className="text-muted small flex-grow-1">{venue.description?.slice(0, 120)}...</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold text-primary">Kapasite {venue.capacity}</span>
                      <Link to={`/venues/${venue.id}`} className="btn btn-sm btn-outline-primary">
                        Detayları gör
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-primary text-white py-5">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
          <div>
            <h2 className="fw-bold mb-2">Salonunuzu öne çıkarmaya hazır mısınız?</h2>
            <p className="mb-0 text-white-50">Rezervasyonlarını SalonBulucu ile kolayca yöneten yüzlerce işletmeye katılın.</p>
          </div>
          <div className="d-flex gap-3">
            <Button variant="light" onClick={() => window.location.assign('/register?role=owner')}>
              İş ortağımız olun
            </Button>
            <Button variant="outline" onClick={() => window.location.assign('/contact')}>
              Ekibimizle iletişime geçin
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

