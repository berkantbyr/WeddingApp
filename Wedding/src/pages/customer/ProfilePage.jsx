import React, { useState } from 'react';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { updateProfile } from '../../services/authService.js';

const ProfilePage = () => {
  const { user, refreshProfile } = useAuth();
  const [formData, setFormData] = useState({ fullName: user.fullName, username: user.username });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      await updateProfile(user.id, formData);
      await refreshProfile();
      setStatus({ type: 'success', message: 'Profiliniz başarıyla güncellendi.' });
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'Profil güncellemesi başarısız oldu.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4 p-md-5">
        <h1 className="h4 fw-bold mb-3">Profil bilgileri</h1>
        <p className="text-muted mb-4">Rezervasyon iletişiminde kullanılan kişisel bilgilerinizi güncelleyin.</p>

        {status.message ? (
          <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'}`}>{status.message}</div>
        ) : null}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Input
            id="fullName"
            name="fullName"
            label="Ad Soyad"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <Input
            id="username"
            name="username"
            label="Kullanıcı adı"
            value={formData.username}
            onChange={handleChange}
            required
            helperText="Rezervasyon takibinde bu kullanıcı adı kullanılacaktır."
          />

          <Button type="submit" isLoading={loading} className="align-self-start">
            Değişiklikleri kaydet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

