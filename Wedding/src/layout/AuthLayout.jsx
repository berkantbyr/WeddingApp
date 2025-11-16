import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .auth-card {
          backdrop-filter: blur(20px) saturate(180%);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .auth-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2);
        }
        .auth-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #6366f1;
          backdrop-filter: blur(10px);
        }
      `}</style>
      
      {/* Dekoratif arka plan elemanları */}
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-15%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)'
        }}
      ></div>

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-9">
            <div className="auth-card rounded-4 p-4 p-md-5">
              <div className="text-center mb-5">
                <span className="auth-badge mb-3">
                  <i className="bi bi-heart-fill" style={{ fontSize: '10px' }}></i>
                  SalonBulucu
                </span>
                <h1 
                  className="fw-bold mb-3"
                  style={{
                    fontSize: isRegister ? '28px' : '32px',
                    background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1.2'
                  }}
                >
                  {isRegister ? 'Hesabınızı oluşturun' : isLogin ? 'Tekrar hoş geldiniz' : 'Hoş geldiniz'}
                </h1>
                <p 
                  className="mb-0"
                  style={{
                    color: '#64748b',
                    fontSize: '14.5px',
                    lineHeight: '1.6',
                    maxWidth: '400px',
                    margin: '0 auto'
                  }}
                >
                  {isRegister 
                    ? 'Hayalinizdeki düğünü planlamak için hemen başlayın'
                    : 'Rezervasyonlarınıza erişin, salonlarınızı yönetin ve planlamanızı kontrol altında tutun.'
                  }
                </p>
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

