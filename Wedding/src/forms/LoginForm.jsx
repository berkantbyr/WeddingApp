import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
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
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const user = await login(formData);
      const redirectTo = location.state?.redirectTo || getRoleRedirect(user.role);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || 'Giriş yapılamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

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
        placeholder="Şifrenizi girin"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <div className="d-flex justify-content-between align-items-center">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="remember" />
          <label className="form-check-label" htmlFor="remember">
            Beni hatırla
          </label>
        </div>
        <Link to="/forgot-password" className="text-primary small">
          Şifremi unuttum
        </Link>
      </div>

      <Button type="submit" fullWidth isLoading={loading}>
        Giriş Yap
      </Button>

      <p className="text-center text-muted small mb-0">
        SalonBulucu'da yeni misin?{' '}
        <Link to="/register" className="fw-semibold text-primary">
          Hemen kayıt ol
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

