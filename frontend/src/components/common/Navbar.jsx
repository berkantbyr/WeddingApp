import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Button from './Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const roleLabels = {
  admin: 'Yönetici',
  owner: 'Salon Sahibi',
  customer: 'Müşteri'
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  const avatarUrl = user
    ? user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.fullName)}`
    : null;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Üst bilgi çubuğu bağlantıları
  const navLinks = [
    { to: '/about', label: 'Hakkımızda', icon: 'bi-info-circle', color: '#c75b7a' },
    { to: '/contact', label: 'İletişim', icon: 'bi-envelope', color: '#e08997' },
    { to: '/privacy', label: 'Gizlilik Politikası', icon: 'bi-shield-check', color: '#b15b85' },
    { to: '/terms', label: 'Kullanım Şartları', icon: 'bi-file-text', color: '#f3b4c6' }
  ];

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
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 sticky-top" style={{ borderBottom: '2px solid #ffeef3' }}>
      <div className="container">
        <Link 
          to="/" 
          className="navbar-brand d-flex align-items-center gap-3 fw-bold" 
          style={{ 
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            padding: '8px 12px',
            borderRadius: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(199, 91, 122, 0.08)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {/* Logo */}
          <div className="position-relative">
            <img
              src="/images/wedding-hall-logo.svg"
              alt="SalonBulucu Logo"
              style={{
                width: '56px',
                height: '56px',
                objectFit: 'contain'
              }}
            />
          </div>
          
          {/* Marka Metni */}
          <div className="d-flex flex-column lh-1">
            <span 
              style={{ 
                fontSize: '20px', 
                letterSpacing: '-0.5px',
                color: '#c75b7a',
                fontWeight: '700',
                lineHeight: '1.2'
              }}
            >
              SalonBulucu
            </span>
            <small 
              className="fw-normal" 
              style={{ 
                fontSize: '11px',
                color: '#7a5360',
                letterSpacing: '0.3px',
                marginTop: '2px'
              }}
            >
              Hayalinizdeki günü planlayın
            </small>
          </div>
        </Link>

        {/* Navigasyon Linkleri - Desktop */}
        <div className="d-none d-lg-flex align-items-center gap-2 me-auto ms-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `text-decoration-none fw-medium position-relative nav-link-item ${isActive ? 'active' : ''}`
              }
              style={{
                color: location.pathname === link.to ? link.color : '#6c757d',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = link.color;
                e.currentTarget.style.backgroundColor = link.color + '20';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const isActive = location.pathname === link.to;
                e.currentTarget.style.color = isActive ? link.color : '#6c757d';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

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
          {/* Mobil görünüm için linkler */}
          <div className="d-lg-none mb-3">
            <div className="d-flex flex-column gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `nav-link fw-medium d-flex align-items-center ${isActive ? 'active' : ''}`
                  }
                  style={{
                    color: location.pathname === link.to ? link.color : '#6c757d',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = link.color + '26';
                    e.currentTarget.style.color = link.color;
                  }}
                  onMouseLeave={(e) => {
                    const isActive = location.pathname === link.to;
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = isActive ? link.color : '#6c757d';
                  }}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Giriş/Kayıt butonları - her zaman görünür */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          {!isAuthenticated ? (
            <>
              <button
                type="button"
                className="btn btn-link text-decoration-none fw-semibold"
                onClick={() => navigate('/login')}
                style={{ color: '#c75b7a', whiteSpace: 'nowrap' }}
              >
                Giriş Yap
              </button>
              <button
                type="button"
                className="btn btn-primary fw-semibold px-4"
                onClick={() => navigate('/register')}
                style={{
                  backgroundColor: '#c75b7a',
                  border: 'none',
                  borderRadius: '8px',
                  whiteSpace: 'nowrap'
                }}
              >
                Kayıt Ol
              </button>
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
                    <button type="button" className="dropdown-item text-danger" onClick={handleLogout}>
                      Çıkış Yap
                    </button>
                  </li>
                </ul>
              </div>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

