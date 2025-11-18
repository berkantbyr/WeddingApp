import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { fetchCustomerReservations } from '../../services/venueService.js';
import Button from '../../components/common/Button.jsx';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const upcomingReservation = useMemo(() => {
    if (!reservations.length) return null;
    return [...reservations]
      .filter((reservation) => new Date(reservation.eventDate) >= new Date())
      .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))[0];
  }, [reservations]);

  if (loading) {
    return <LoadingSpinner label="Panel yükleniyor" />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="d-flex flex-column gap-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h1 className="h4 fw-bold mb-1">Tekrar hoş geldin, {user.fullName.split(' ')[0]}</h1>
            <p className="text-muted mb-0">Yaklaşan organizasyonlarını takip et ve rezervasyon detaylarını tek ekrandan yönet.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            Ana sayfaya dön
          </Button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <span className="text-muted small">Toplam rezervasyon</span>
              <h3 className="fw-bold mb-0">{reservations.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <span className="text-muted small">Yaklaşan</span>
              <h3 className="fw-bold mb-0">{upcomingReservation ? '1' : '0'}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <span className="text-muted small">Onaylanan</span>
              <h3 className="fw-bold mb-0">
                {reservations.filter((reservation) => reservation.status === 'confirmed').length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {upcomingReservation ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row gap-4 align-items-center">
            <div className="ratio ratio-4x3 rounded-3 overflow-hidden" style={{ maxWidth: 220 }}>
              <img src={upcomingReservation.venue?.coverImage} alt={upcomingReservation.venue?.name} className="object-fit-cover" />
            </div>
            <div className="flex-grow-1">
              <h5 className="fw-semibold mb-1">{upcomingReservation.venue?.name}</h5>
              <p className="text-muted small mb-2">Etkinlik tarihi: {upcomingReservation.eventDate}</p>
              <span className="badge bg-primary-subtle text-primary fw-semibold text-uppercase">
                {upcomingReservation.status === 'confirmed'
                  ? 'Onaylandı'
                  : upcomingReservation.status === 'pending'
                  ? 'Onay bekliyor'
                  : 'Reddedildi'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">Yaklaşan bir rezervasyonun yok. Hayalindeki tarihi garantilemek için salonları incele.</div>
      )}
    </div>
  );
};

export default CustomerDashboard;

