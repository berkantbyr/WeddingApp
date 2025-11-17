import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const roleRedirect = {
  admin: '/admin',
  owner: '/owner',
  customer: '/account'
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, roles } = useAuth();
  const initialRole = searchParams.get('role') ?? 'customer';
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: initialRole,
    company: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const roleOptions = useMemo(() => roles.filter((role) => role !== 'admin'), [roles]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await register(formData);
      navigate(roleRedirect[user.role] ?? '/account', { replace: true });
    } catch (err) {
      setError(err?.message || 'Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.');
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

      <Input
        id="fullName"
        name="fullName"
        label="Ad Soyad"
        placeholder="Adınızı ve soyadınızı yazın"
        value={formData.fullName}
        onChange={handleChange}
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="E-posta adresi"
        placeholder="kullanici@ornek.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Şifre"
        placeholder="En az 6 karakter"
        value={formData.password}
        onChange={handleChange}
        helperText="Daha güvenli bir şifre için en az bir sayı kullanın."
        required
        minLength={6}
      />

      <div style={{ marginBottom: '8px' }}>
        <label 
          className="form-label d-block mb-3"
          htmlFor="role"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            letterSpacing: '0.2px'
          }}
        >
          Hesap Türü <span className="text-danger">*</span>
        </label>
        <div className="d-flex gap-3">
          <div 
            className="form-check flex-fill position-relative"
            style={{
              cursor: 'pointer'
            }}
            onClick={() => handleChange({ target: { name: 'role', value: 'customer' } })}
          >
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="role-customer"
              value="customer"
              checked={formData.role === 'customer'}
              onChange={handleChange}
              required
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                marginTop: '2px',
                accentColor: '#6366f1'
              }}
            />
            <label 
              className="form-check-label w-100" 
              htmlFor="role-customer"
              style={{
                cursor: 'pointer',
                padding: '16px',
                borderRadius: '12px',
                border: formData.role === 'customer' 
                  ? '2px solid #6366f1' 
                  : '2px solid #e2e8f0',
                background: formData.role === 'customer' 
                  ? 'rgba(99, 102, 241, 0.05)' 
                  : '#ffffff',
                transition: 'all 0.3s ease',
                marginLeft: '8px'
              }}
              onMouseEnter={(e) => {
                if (formData.role !== 'customer') {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.background = '#f8fafc';
                }
              }}
              onMouseLeave={(e) => {
                if (formData.role !== 'customer') {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#ffffff';
                }
              }}
            >
              <strong style={{ color: '#1e293b', fontSize: '15px', display: 'block', marginBottom: '4px' }}>
                <i className="bi bi-person-heart me-2" style={{ color: '#6366f1' }}></i>
                Müşteri
              </strong>
              <small style={{ color: '#64748b', fontSize: '13px' }}>
                Düğün salonu rezervasyonu yapmak için
              </small>
            </label>
          </div>
          <div 
            className="form-check flex-fill position-relative"
            style={{
              cursor: 'pointer'
            }}
            onClick={() => handleChange({ target: { name: 'role', value: 'owner' } })}
          >
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="role-owner"
              value="owner"
              checked={formData.role === 'owner'}
              onChange={handleChange}
              required
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                marginTop: '2px',
                accentColor: '#6366f1'
              }}
            />
            <label 
              className="form-check-label w-100" 
              htmlFor="role-owner"
              style={{
                cursor: 'pointer',
                padding: '16px',
                borderRadius: '12px',
                border: formData.role === 'owner' 
                  ? '2px solid #6366f1' 
                  : '2px solid #e2e8f0',
                background: formData.role === 'owner' 
                  ? 'rgba(99, 102, 241, 0.05)' 
                  : '#ffffff',
                transition: 'all 0.3s ease',
                marginLeft: '8px'
              }}
              onMouseEnter={(e) => {
                if (formData.role !== 'owner') {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.background = '#f8fafc';
                }
              }}
              onMouseLeave={(e) => {
                if (formData.role !== 'owner') {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#ffffff';
                }
              }}
            >
              <strong style={{ color: '#1e293b', fontSize: '15px', display: 'block', marginBottom: '4px' }}>
                <i className="bi bi-building me-2" style={{ color: '#6366f1' }}></i>
                Salon Sahibi
              </strong>
              <small style={{ color: '#64748b', fontSize: '13px' }}>
                Salon ilanı oluşturmak için
              </small>
            </label>
          </div>
        </div>
      </div>

      {formData.role === 'owner' ? (
        <Input
          id="company"
          name="company"
          label="Şirket adı"
          placeholder="Şirket adınızı yazın"
          value={formData.company}
          onChange={handleChange}
          required
        />
      ) : null}

      <div className="form-check" style={{ marginBottom: '8px' }}>
        <input 
          className="form-check-input" 
          type="checkbox" 
          value="" 
          id="terms" 
          required
          style={{
            width: '18px',
            height: '18px',
            cursor: 'pointer',
            borderColor: '#cbd5e1',
            marginTop: '2px',
            accentColor: '#6366f1'
          }}
        />
        <label 
          className="form-check-label" 
          htmlFor="terms"
          style={{
            fontSize: '14px',
            color: '#64748b',
            cursor: 'pointer',
            marginLeft: '8px',
            lineHeight: '1.5',
            userSelect: 'none'
          }}
        >
          SalonBulucu{' '}
          <Link 
            to="/terms" 
            style={{
              color: '#6366f1',
              textDecoration: 'none',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = 'none';
            }}
          >
            Kullanım Şartları
          </Link>
          'nı okudum ve kabul ediyorum.
        </label>
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
            Kayıt yapılıyor...
          </span>
        ) : (
          <span className="d-flex align-items-center justify-content-center gap-2">
            <i className="bi bi-person-plus-fill"></i>
            Kayıt Ol
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
        Zaten bir hesabın var mı?{' '}
        <Link 
          to="/login" 
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
          Giriş Yap
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;

