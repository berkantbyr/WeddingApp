import React, { useEffect, useState } from 'react';
import { fetchCustomerReservations } from '../../services/venueService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const statusColors = {
  pending: 'warning',
  confirmed: 'success',
  declined: 'danger'
};

const MyReservationsPage = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadReservations = async () => {
      try {
        const data = await fetchCustomerReservations(user?.id);
        if (mounted) setReservations(data);
      } catch (err) {
        if (mounted) setError(err?.message || 'Rezervasyonlar yüklenemedi');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadReservations();
    return () => {
      mounted = false;
    };
  }, [user?.id]);

  if (loading) {
    return <LoadingSpinner label="Rezervasyonlar yükleniyor" />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!reservations.length) {
    return <div className="alert alert-info">Henüz rezervasyonun yok. Tarihini garantilemek için salonları incelemeye başla.</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {reservations.map((reservation) => (
        <div key={reservation.id} className="card border-0 shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row gap-4 align-items-center">
            <div className="ratio ratio-4x3 rounded-3 overflow-hidden" style={{ maxWidth: 220 }}>
              <img src={reservation.venue?.coverImage} alt={reservation.venue?.name} className="object-fit-cover" />
            </div>
            <div className="flex-grow-1 w-100">
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
                <div>
                  <h5 className="fw-semibold mb-1">{reservation.venue?.name}</h5>
                  <p className="text-muted small mb-0">Etkinlik tarihi: {reservation.eventDate}</p>
                  <p className="text-muted small mb-0">Misafir sayısı: {reservation.guestCount}</p>
                </div>
                <div className="text-lg-end">
                  <span
                    className={`badge bg-${statusColors[reservation.status] ?? 'secondary'} text-uppercase fw-semibold`}
                  >
                    {reservation.status === 'pending'
                      ? 'Onay bekliyor'
                      : reservation.status === 'confirmed'
                      ? 'Onaylandı'
                      : 'Reddedildi'}
                  </span>
                  <div className="text-muted small mt-2">Paket: {reservation.package?.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReservationsPage;

