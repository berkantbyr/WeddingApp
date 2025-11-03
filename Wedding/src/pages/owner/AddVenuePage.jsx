import React, { useState } from 'react';
import VenueForm from '../../forms/VenueForm.jsx';
import { createVenue } from '../../services/venueService.js';
import { useAuth } from '../../context/AuthContext.jsx';

const AddVenuePage = () => {
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (payload) => {
    try {
      await createVenue(user.id, payload);
      setNotification({ type: 'success', message: 'Salon kaydınız onaya gönderildi. 48 saat içinde inceleyeceğiz.' });
    } catch (error) {
      setNotification({ type: 'error', message: error?.message || 'Salon kaydı gönderilemedi.' });
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <h1 className="h4 fw-bold">Yeni salon ekle</h1>
        <p className="text-muted">Çiftlerin salonunuzun atmosferini, kapasitesini ve sunduğunuz paketleri anlayabilmesi için detaylı bilgi paylaşın.</p>
      </div>

      {notification ? (
        <div className={`alert alert-${notification.type === 'success' ? 'success' : 'danger'}`}>
          {notification.message}
        </div>
      ) : null}

      <VenueForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddVenuePage;

