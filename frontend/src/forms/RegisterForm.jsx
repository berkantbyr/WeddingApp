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

const ROLE_DETAILS = {
  customer: {
    title: 'Müşteri',
    description: 'Düğün salonu rezervasyonu yapmak için'
  },
  owner: {
    title: 'Salon Sahibi',
    description: 'Salon ilanı oluşturmak ve rezervasyon almak için'
  }
};

const DEFAULT_ROLE_ORDER = ['customer', 'owner'];

const RegisterForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, roles } = useAuth();
  const requestedRole = searchParams.get('role');
  const initialRole = DEFAULT_ROLE_ORDER.includes(requestedRole) ? requestedRole : 'customer';
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    role: initialRole,
    company: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const roleOptions = useMemo(() => {
    if (!roles || !Array.isArray(roles)) return DEFAULT_ROLE_ORDER;
    const normalizedRoles = roles.filter((role) => DEFAULT_ROLE_ORDER.includes(role));
    return normalizedRoles.length ? normalizedRoles : DEFAULT_ROLE_ORDER;
  }, [roles]);

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
      const userRole = user?.role || formData.role || 'customer';
      navigate(roleRedirect[userRole] ?? '/account', { replace: true });
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
        <div className="d-flex flex-column flex-lg-row gap-3">
          {roleOptions.map((role) => {
            const roleInfo = ROLE_DETAILS[role] ?? {
              title: role,
              description: ''
            };
            return (
              <div className="form-check flex-fill" key={role}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id={`role-${role}`}
                  value={role}
                  checked={formData.role === role}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label w-100" htmlFor={`role-${role}`}>
                  <strong>{roleInfo.title}</strong>
                  <br />
                  {roleInfo.description ? (
                    <small className="text-muted">{roleInfo.description}</small>
                  ) : null}
                </label>
              </div>
            );
          })}
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

