import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const customerLinks = [
  { to: '/account', label: 'Kontrol Paneli', icon: 'bi-speedometer' },
  { to: '/account/reservations', label: 'Rezervasyonlarım', icon: 'bi-calendar-heart' },
  { to: '/account/profile', label: 'Profil Ayarları', icon: 'bi-person' }
];

const CustomerLayout = () => {
  const { user } = useAuth();

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.fullName ?? 'Guest')}`}
                alt={user?.fullName}
                className="rounded-circle mb-3"
                width="88"
                height="88"
              />
              <h6 className="fw-bold mb-1">{user?.fullName}</h6>
              <p className="text-muted small mb-0">@{user?.username}</p>
            </div>
            <div className="list-group list-group-flush">
              {customerLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/account'}
                  className={({ isActive }) =>
                    `list-group-item list-group-item-action d-flex align-items-center gap-2 ${
                      isActive ? 'active' : ''
                    }`
                  }
                >
                  <i className={`bi ${item.icon}`} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;

