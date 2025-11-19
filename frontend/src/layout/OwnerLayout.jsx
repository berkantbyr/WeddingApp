import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/common/Button.jsx';

const ownerLinks = [
  { to: '/owner', label: 'Kontrol Paneli' },
  { to: '/owner/venues', label: 'Salonlarım' },
  { to: '/owner/reservations', label: 'Rezervasyonlar' },
  { to: '/owner/add', label: 'Yeni Salon Ekle' }
];

const OwnerLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-white shadow-sm border-bottom">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0 text-primary fw-bold">Salon Sahibi Portalı</h4>
            <small className="text-muted">Tekrar hoş geldiniz, {user?.fullName}</small>
          </div>
          <div className="d-flex gap-2">
            <NavLink to="/">
              <Button variant="outline">
                <i className="bi bi-house me-2"></i>
                Ana Sayfa
              </Button>
            </NavLink>
            <Button variant="outline" onClick={logout}>
              Çıkış Yap
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <nav className="nav flex-column gap-1">
                  {ownerLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/owner'}
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 rounded px-3 py-2 fw-medium ${
                          isActive ? 'bg-primary text-white' : 'text-muted'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerLayout;

