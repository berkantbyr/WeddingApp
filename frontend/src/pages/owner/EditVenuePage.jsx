import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VenueForm from '../../forms/VenueForm.jsx';
import { fetchVenueById, updateVenue } from '../../services/venueService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const EditVenuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadVenue = async () => {
      try {
        const data = await fetchVenueById(id);
        if (!data) {
          setError('Salon bulunamadı');
          return;
        }
        // Salon sahibi kontrolü
        if (data.ownerId !== user?.id) {
          setError('Bu salonu düzenleme yetkiniz yok');
          return;
        }
        setVenue(data);
      } catch (err) {
        setError(err?.message || 'Salon yüklenemedi');
      } finally {
        setLoading(false);
      }
    };
    loadVenue();
  }, [id, user?.id]);

  const handleSubmit = async (payload) => {
    try {
      await updateVenue(id, payload);
      setNotification({ type: 'success', message: 'Salon başarıyla güncellendi!' });
      setTimeout(() => {
        navigate('/owner/venues');
      }, 1500);
    } catch (error) {
      setNotification({ type: 'error', message: error?.message || 'Salon güncellenemedi.' });
    }
  };

  if (loading) {
    return <LoadingSpinner label="Salon yükleniyor" />;
  }

  if (error) {
    return (
      <div className="d-flex flex-column gap-3">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-outline-primary" onClick={() => navigate('/owner/venues')}>
          Salonlarım'a Dön
        </button>
      </div>
    );
  }

  if (!venue) {
    return <div className="alert alert-warning">Salon bulunamadı</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <h1 className="h4 fw-bold">Salon düzenle</h1>
        <p className="text-muted">Salon bilgilerinizi güncelleyin.</p>
      </div>

      {notification ? (
        <div className={`alert alert-${notification.type === 'success' ? 'success' : 'danger'}`}>
          {notification.message}
        </div>
      ) : null}

      <VenueForm initialValues={venue} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditVenuePage;

