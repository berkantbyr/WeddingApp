import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const getRoleRedirect = (role) => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'owner':
      return '/owner';
    default:
      return '/account';
  }
};

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ 
    identifier: '', // Şirket adı veya müşteri adı soyadı
    password: '' 
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login({ identifier: formData.identifier, password: formData.password });
      const redirectTo = location.state?.redirectTo || getRoleRedirect(user.role);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || 'Giriş yapılamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ gap: '20px' }}>
      {error ? (
        <div 
          className="alert mb-0 d-flex align-items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: '#dc2626'
          }}
        >
          <i className="bi bi-exclamation-circle-fill"></i>
          <span style={{ fontSize: '14px' }}>{error}</span>
        </div>
      ) : null}

      <div style={{ marginBottom: '8px' }}>
        <Input
          id="identifier"
          name="identifier"
          type="text"
          label="Şirket adı veya Ad Soyad"
          placeholder="Şirket adınızı veya adınızı soyadınızı girin"
          value={formData.identifier}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <Input
          id="password"
          name="password"
          type="password"
          label="Şifre"
          placeholder="Şifrenizi girin"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '8px' }}>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="remember"
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              borderColor: '#cbd5e1',
              marginTop: '2px'
            }}
          />
          <label 
            className="form-check-label" 
            htmlFor="remember"
            style={{
              fontSize: '14px',
              color: '#64748b',
              cursor: 'pointer',
              marginLeft: '8px',
              userSelect: 'none'
            }}
          >
            Beni hatırla
          </label>
        </div>
        <Link 
          to="/forgot-password" 
          style={{
            fontSize: '14px',
            color: '#6366f1',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#8b5cf6';
            e.target.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#6366f1';
            e.target.style.textDecoration = 'none';
          }}
        >
          Şifremi unuttum
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px 24px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          fontSize: '15.5px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.3)';
          }
        }}
      >
        {loading ? (
          <span className="d-flex align-items-center justify-content-center gap-2">
            <span 
              className="spinner-border spinner-border-sm" 
              role="status" 
              aria-hidden="true"
              style={{ width: '18px', height: '18px', borderWidth: '2px' }}
            ></span>
            Giriş yapılıyor...
          </span>
        ) : (
          <span className="d-flex align-items-center justify-content-center gap-2">
            <i className="bi bi-box-arrow-in-right"></i>
            Giriş Yap
          </span>
        )}
      </button>

      <p 
        className="text-center mb-0"
        style={{
          color: '#64748b',
          fontSize: '14px',
          marginTop: '8px'
        }}
      >
        SalonBulucu'da yeni misin?{' '}
        <Link 
          to="/register" 
          style={{
            color: '#6366f1',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#8b5cf6';
            e.target.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#6366f1';
            e.target.style.textDecoration = 'none';
          }}
        >
          Hemen kayıt ol
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

