import React, { useCallback, useEffect, useState } from 'react';
import { fetchOwnerReservations, updateReservationStatus } from '../../services/venueService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const OwnerReservationsPage = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReservations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOwnerReservations(user?.id);
      setReservations(data);
    } catch (err) {
      setError(err?.message || 'Rezervasyonlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    loadReservations();
  }, [user?.id, loadReservations]);

  const handleStatus = useCallback(
    async (reservationId, status) => {
      await updateReservationStatus(reservationId, status);
      await loadReservations();
    },
    [loadReservations]
  );

  if (loading) {
    return <LoadingSpinner label="Rezervasyonlar yükleniyor" />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!reservations.length) {
    return <div className="alert alert-info">Şu anda rezervasyon talebi bulunmuyor.</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {reservations.map((reservation) => (
        <div key={reservation.id} className="card border-0 shadow-sm">
          <div className="card-body d-flex flex-column flex-lg-row gap-4">
            <div className="flex-grow-1">
              <h5 className="fw-semibold mb-1">{reservation.venue?.name}</h5>
              <p className="text-muted small mb-1">Etkinlik tarihi: {reservation.eventDate}</p>
              <p className="text-muted small mb-2">Misafir sayısı: {reservation.guestCount}</p>
              <p className="text-muted small mb-0">
                Paket: {reservation.package?.name}
              </p>
            </div>
            <div className="d-flex flex-column gap-2 align-items-lg-end">
              <span className={`badge bg-${reservation.status === 'pending' ? 'warning' : reservation.status === 'confirmed' ? 'success' : 'secondary'} text-uppercase fw-semibold`}>
                {reservation.status === 'pending'
                  ? 'Onay bekliyor'
                  : reservation.status === 'confirmed'
                  ? 'Onaylandı'
                  : 'Reddedildi'}
              </span>
              {reservation.status === 'pending' ? (
                <div className="d-flex gap-2">
                  <Button variant="outline" onClick={() => handleStatus(reservation.id, 'confirmed')}>
                    Onayla
                  </Button>
                  <Button variant="link" className="text-danger" onClick={() => handleStatus(reservation.id, 'declined')}>
                    Reddet
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OwnerReservationsPage;

