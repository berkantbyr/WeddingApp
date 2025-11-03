import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const navLinks = [
  { to: '/admin', label: 'Genel Bakış', icon: 'bi-speedometer2' },
  { to: '/admin/venues', label: 'Salon Onayları', icon: 'bi-building' },
  { to: '/admin/users', label: 'Kullanıcılar', icon: 'bi-people' }
];

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-vh-100 bg-light">
      <div className="d-flex">
        <aside className="bg-white shadow-sm" style={{ width: 260 }}>
          <div className="p-4 border-bottom">
            <h5 className="fw-bold text-primary mb-0">Yönetici Paneli</h5>
            <small className="text-muted">{user?.fullName}</small>
          </div>
          <nav className="nav flex-column p-3 gap-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 rounded px-3 py-2 fw-medium ${
                    isActive ? 'bg-primary text-white' : 'text-muted'
                  }`
                }
              >
                <i className={`bi ${item.icon}`} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="p-3 mt-auto">
            <Button variant="outline" fullWidth onClick={logout}>
              Çıkış Yap
            </Button>
          </div>
        </aside>

        <main className="flex-grow-1 p-4 p-lg-5">
          <div className="d-flex flex-column gap-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

