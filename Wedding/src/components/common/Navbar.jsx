import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  const avatarUrl = user
    ? user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.fullName)}`
    : null;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Profesyonel renk paleti
  const navLinks = [
    { to: '/about', label: 'Hakkımızda', icon: 'bi-info-circle', color: '#6366f1' },
    { to: '/contact', label: 'İletişim', icon: 'bi-envelope', color: '#f97316' },
    { to: '/blog', label: 'Blog/İpuçları', icon: 'bi-book', color: '#8b5cf6' },
    { to: '/faq', label: 'Sıkça Sorulan Sorular', icon: 'bi-question-circle', color: '#14b8a6' },
    { to: '/privacy', label: 'Gizlilik Politikası', icon: 'bi-shield-check', color: '#3b82f6' },
    { to: '/terms', label: 'Kullanım Şartları', icon: 'bi-file-text', color: '#f59e0b' }
  ];

  const renderDashboardLink = () => {
    if (!user) return null;

    if (user.role === 'admin') {
      return (
        <NavLink 
          to="/admin" 
          className="dropdown-item d-flex align-items-center gap-2"
          style={{
            borderRadius: '8px',
            padding: '10px 14px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(99, 102, 241, 0.08)';
            e.target.style.color = '#6366f1';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '';
          }}
        >
          <i className="bi bi-shield-check" style={{ fontSize: '16px' }}></i>
          Admin Paneli
        </NavLink>
      );
    }

    if (user.role === 'owner') {
      return (
        <NavLink 
          to="/owner" 
          className="dropdown-item d-flex align-items-center gap-2"
          style={{
            borderRadius: '8px',
            padding: '10px 14px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(99, 102, 241, 0.08)';
            e.target.style.color = '#6366f1';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '';
          }}
        >
          <i className="bi bi-building" style={{ fontSize: '16px' }}></i>
          Salon Sahibi Paneli
        </NavLink>
      );
    }

    return (
      <NavLink 
        to="/account" 
        className="dropdown-item d-flex align-items-center gap-2"
        style={{
          borderRadius: '8px',
          padding: '10px 14px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(99, 102, 241, 0.08)';
          e.target.style.color = '#6366f1';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '';
        }}
      >
        <i className="bi bi-person-circle" style={{ fontSize: '16px' }}></i>
        Hesabım
      </NavLink>
    );
  };

  return (
    <nav 
      className="navbar navbar-expand-lg sticky-top" 
      style={{ 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
        padding: '12px 0'
      }}
    >
      <div className="container">
        <Link 
          to="/" 
          className="navbar-brand d-flex align-items-center gap-3 fw-bold" 
          style={{ 
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            padding: '10px 16px',
            borderRadius: '14px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Profesyonel Logo */}
          <div 
            className="position-relative d-flex align-items-center justify-content-center"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
              padding: '3px'
            }}
          >
            <img
              src="/images/eros.jpg"
              alt="SalonBulucu Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '9px'
              }}
              onError={(e) => {
                // Eğer resim yüklenemezse, ikon göster
                e.target.style.display = 'none';
                const iconDiv = document.createElement('div');
                iconDiv.className = 'd-flex align-items-center justify-content-center w-100 h-100';
                iconDiv.innerHTML = '<i class="bi bi-building" style="font-size: 28px; color: white;"></i>';
                e.target.parentElement.appendChild(iconDiv);
              }}
            />
            <div
              className="position-absolute top-0 end-0"
              style={{
                width: '12px',
                height: '12px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 1
              }}
            ></div>
          </div>
          
          {/* Marka Metni */}
          <div className="d-flex flex-column lh-1">
            <span 
              style={{ 
                fontSize: '22px', 
                letterSpacing: '-0.8px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '800',
                lineHeight: '1.1',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              SalonBulucu
            </span>
            <small 
              className="fw-medium" 
              style={{ 
                fontSize: '11.5px',
                color: '#64748b',
                letterSpacing: '0.4px',
                marginTop: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ 
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '12px'
              }}>✨</span>
              Hayalinizdeki günü planlayın
            </small>
          </div>
        </Link>

        {/* Navigasyon Linkleri - Desktop */}
        <div className="d-none d-lg-flex align-items-center gap-1 me-auto ms-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `text-decoration-none fw-semibold position-relative nav-link-item ${isActive ? 'active' : ''}`
              }
              style={{
                color: location.pathname === link.to ? link.color : '#64748b',
                padding: '10px 16px',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                fontSize: '14.5px',
                position: 'relative',
                fontWeight: location.pathname === link.to ? '600' : '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = link.color;
                e.currentTarget.style.backgroundColor = link.color + '12';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${link.color}20`;
              }}
              onMouseLeave={(e) => {
                const isActive = location.pathname === link.to;
                e.currentTarget.style.color = isActive ? link.color : '#64748b';
                e.currentTarget.style.backgroundColor = isActive ? link.color + '08' : 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {location.pathname === link.to && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '30px',
                    height: '3px',
                    background: `linear-gradient(135deg, ${link.color} 0%, ${link.color}dd 100%)`,
                    borderRadius: '2px',
                    boxShadow: `0 2px 8px ${link.color}40`
                  }}
                ></span>
              )}
              <i className={`bi ${link.icon} me-2`} style={{ fontSize: '14px' }}></i>
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
          style={{
            border: '2px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '10px',
            padding: '8px 12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#6366f1';
            e.target.style.background = 'rgba(99, 102, 241, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
            e.target.style.background = 'transparent';
          }}
        >
          <span 
            className="navbar-toggler-icon"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(99, 102, 241, 0.85)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`
            }}
          />
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
                    e.currentTarget.style.backgroundColor = link.color + '20';
                    e.currentTarget.style.color = link.color;
                  }}
                  onMouseLeave={(e) => {
                    const isActive = location.pathname === link.to;
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = isActive ? link.color : '#6c757d';
                  }}
                >
                  <i className={`bi ${link.icon} me-2`} style={{ color: link.color, fontSize: '16px' }}></i>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

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
        </div>

        {/* Giriş/Kayıt butonları - her zaman görünür */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          {!isAuthenticated ? (
            <>
              <button
                type="button"
                className="btn fw-semibold"
                onClick={() => navigate('/login')}
                style={{ 
                  color: '#6366f1', 
                  whiteSpace: 'nowrap',
                  background: 'transparent',
                  border: '2px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  transition: 'all 0.3s ease',
                  fontSize: '14.5px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.background = 'rgba(99, 102, 241, 0.08)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Giriş Yap
              </button>
              <button
                type="button"
                className="btn fw-semibold"
                onClick={() => navigate('/register')}
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                  padding: '10px 24px',
                  color: 'white',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
                  transition: 'all 0.3s ease',
                  fontSize: '14.5px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.3)';
                }}
              >
                Kayıt Ol
              </button>
            </>
          ) : (
              <div className="dropdown">
                <button
                  className="btn d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.15)',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)';
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.25)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)';
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid rgba(99, 102, 241, 0.2)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    <img
                      src={avatarUrl}
                      alt={user.fullName}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="d-flex flex-column text-start">
                    <span 
                      className="fw-semibold"
                      style={{ 
                        color: '#1e293b',
                        fontSize: '14.5px',
                        lineHeight: '1.2'
                      }}
                    >
                      {user.fullName}
                    </span>
                    <small 
                      style={{ 
                        color: '#6366f1',
                        fontSize: '11.5px',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}
                    >
                      {roleLabels[user.role] ?? user.role}
                    </small>
                  </div>
                  <i 
                    className="bi bi-chevron-down ms-1"
                    style={{ 
                      fontSize: '12px',
                      color: '#64748b'
                    }}
                  ></i>
                </button>
                <ul 
                  className="dropdown-menu dropdown-menu-end"
                  style={{
                    borderRadius: '12px',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    padding: '8px',
                    marginTop: '8px',
                    minWidth: '220px'
                  }}
                >
                  {renderDashboardLink()}
                  <li>
                    <NavLink 
                      to="/account/profile" 
                      className="dropdown-item d-flex align-items-center gap-2"
                      style={{
                        borderRadius: '8px',
                        padding: '10px 14px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(99, 102, 241, 0.08)';
                        e.target.style.color = '#6366f1';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '';
                      }}
                    >
                      <i className="bi bi-person-gear" style={{ fontSize: '16px' }}></i>
                      Profil Ayarları
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider my-2" style={{ opacity: 0.2 }} /></li>
                  <li>
                    <button 
                      type="button" 
                      className="dropdown-item d-flex align-items-center gap-2 text-danger"
                      onClick={handleLogout}
                      style={{
                        borderRadius: '8px',
                        padding: '10px 14px',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        background: 'transparent',
                        width: '100%',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(239, 68, 68, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                      }}
                    >
                      <i className="bi bi-box-arrow-right" style={{ fontSize: '16px' }}></i>
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

