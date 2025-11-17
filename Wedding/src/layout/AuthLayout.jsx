import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="glass-panel p-4 p-md-5">
              <div className="text-center mb-4">
                <span className="badge-soft mb-2">SalonBulucu</span>
                <h1 className="h3 fw-bold text-dark">Tekrar hoş geldiniz</h1>
                <p className="text-muted small">Rezervasyonlarınıza erişin, salonlarınızı yönetin ve planlamanızı kontrol altında tutun.</p>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

