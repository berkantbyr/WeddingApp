import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
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
    username: '',
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
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

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
        id="username"
        name="username"
        label="Kullanıcı adı"
        placeholder="ornek.kullanici"
        value={formData.username}
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

      <div className="mb-3">
        <label className="form-label fw-semibold text-muted" htmlFor="role">
          Hesap Türü *
        </label>
        <div className="d-flex gap-3">
          <div className="form-check flex-fill">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="role-customer"
              value="customer"
              checked={formData.role === 'customer'}
              onChange={handleChange}
              required
            />
            <label className="form-check-label w-100" htmlFor="role-customer">
              <strong>Müşteri</strong>
              <br />
              <small className="text-muted">Düğün salonu rezervasyonu yapmak için</small>
            </label>
          </div>
          <div className="form-check flex-fill">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="role-owner"
              value="owner"
              checked={formData.role === 'owner'}
              onChange={handleChange}
              required
            />
            <label className="form-check-label w-100" htmlFor="role-owner">
              <strong>Salon Sahibi</strong>
              <br />
              <small className="text-muted">Salon ilanı oluşturmak için</small>
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

      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="terms" required />
        <label className="form-check-label" htmlFor="terms">
          SalonBulucu{' '}
          <Link to="/terms" className="text-primary">
            Kullanım Şartları
          </Link>
          'nı okudum ve kabul ediyorum.
        </label>
      </div>

      <Button type="submit" fullWidth isLoading={loading}>
        Kayıt Ol
      </Button>

      <p className="text-center text-muted small mb-0">
        Zaten bir hesabın var mı?{' '}
        <Link to="/login" className="fw-semibold text-primary">
          Giriş Yap
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;

