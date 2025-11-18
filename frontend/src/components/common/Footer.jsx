import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold">SalonBulucu</h5>
            <p className="text-light-emphasis small">
              Özenle seçilmiş düğün salonlarını keşfedin, size özel paketleri karşılaştırın ve tüm rezervasyon
              detaylarını tek bir panelden yönetin.
            </p>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="text-uppercase text-secondary small">Platform</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light-emphasis text-decoration-none">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/venues" className="text-light-emphasis text-decoration-none">
                  Salonlar
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light-emphasis text-decoration-none">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light-emphasis text-decoration-none">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="text-uppercase text-secondary small">Salon Sahipleri için</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/register?role=owner" className="text-light-emphasis text-decoration-none">
                  İş ortağımız olun
                </Link>
              </li>
              <li>
                <Link to="/owner" className="text-light-emphasis text-decoration-none">
                  Salon sahibi paneli
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-light-emphasis text-decoration-none">
                  Ücretlendirme
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="text-uppercase text-secondary small">Bülten</h6>
            <p className="text-light-emphasis small">
              İlham verici salon önerilerini, planlama listelerini ve sezonluk kampanyaları almak için abone olun.
            </p>
            <form className="d-flex gap-2">
              <input type="email" className="form-control" placeholder="E-posta adresi" />
              <button type="submit" className="btn btn-primary">
                Katıl
              </button>
            </form>
          </div>
        </div>
        <hr className="border-light-subtle my-4" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <small className="text-light-emphasis">© {new Date().getFullYear()} SalonBulucu. Tüm hakları saklıdır.</small>
          <div className="d-flex gap-3 text-light-emphasis small">
            <Link to="/privacy" className="text-decoration-none text-light-emphasis">
              Gizlilik
            </Link>
            <Link to="/terms" className="text-decoration-none text-light-emphasis">
              Şartlar
            </Link>
            <Link to="/cookies" className="text-decoration-none text-light-emphasis">
              Çerezler
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

