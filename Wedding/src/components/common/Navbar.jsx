import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const roleLabels = {
  admin: 'Yönetici',
  owner: 'Salon Sahibi',
  customer: 'Müşteri'
};

const navItems = [
  { label: 'Ana Sayfa', to: '/' },
  { label: 'Salonlar', to: '/venues' },
  { label: 'Hakkımızda', to: '/about' },
  { label: 'İletişim', to: '/contact' }
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const avatarUrl = user
    ? user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.fullName)}`
    : null;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const renderDashboardLink = () => {
    if (!user) return null;

    if (user.role === 'admin') {
      return (
        <NavLink to="/admin" className="dropdown-item">
          Admin Paneli
        </NavLink>
      );
    }

    if (user.role === 'owner') {
      return (
        <NavLink to="/owner" className="dropdown-item">
          Salon Sahibi Paneli
        </NavLink>
      );
    }

    return (
      <NavLink to="/account" className="dropdown-item">
        Hesabım
      </NavLink>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary">
          <span className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
            SB
          </span>
          <div className="d-flex flex-column lh-1">
            <span>SalonBulucu</span>
            <small className="text-muted fw-normal">Hayalinizdeki günü planlayın</small>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink 
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link fw-medium ${isActive ? 'text-primary' : 'text-muted'}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Button variant="link" onClick={() => navigate('/login')}>
                  Giriş Yap
                </Button>
                <Button onClick={() => navigate('/register')}>Kayıt Ol</Button>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={avatarUrl}
                    alt={user.fullName}
                    className="rounded-circle"
                    width="36"
                    height="36"
                  />
                  <div className="d-flex flex-column text-start">
                    <span className="fw-semibold text-dark">{user.fullName}</span>
                    <small className="text-muted text-capitalize">{roleLabels[user.role] ?? user.role}</small>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  {renderDashboardLink()}
                  <li>
                    <NavLink to="/account/profile" className="dropdown-item">
                      Profil Ayarları
                    </NavLink>
                  </li>
                  <li>
                    <button type="button" className="dropdown-item text-danger" onClick={handleLogout}>
                      Çıkış Yap
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

