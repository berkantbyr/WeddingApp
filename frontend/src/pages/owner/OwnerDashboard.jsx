import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchOwnerVenues, fetchOwnerReservations } from '../../services/venueService.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Button from '../../components/common/Button.jsx';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [venues, setVenues] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const [venueData, reservationData] = await Promise.all([
          fetchOwnerVenues(user?.id),
          fetchOwnerReservations(user?.id)
        ]);
        if (mounted) {
          setVenues(venueData);
          setReservations(reservationData);
        }
      } catch (err) {
        if (mounted) setError(err?.message || 'Panel verileri yüklenemedi');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, [user?.id]);

  const pendingReservations = useMemo(
    () => reservations.filter((reservation) => reservation.status === 'pending'),
    [reservations]
  );

  const statusLabels = useMemo(
    () => ({
      pending: 'Onay bekliyor',
      confirmed: 'Onaylandı',
      declined: 'Reddedildi'
    }),
    []
  );

  if (loading) {
    return <LoadingSpinner label="Salon sahibi paneli yükleniyor" />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="d-flex flex-column gap-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h4 fw-bold mb-1">Merhaba {user.fullName.split(' ')[0]}</h1>
            <p className="text-muted mb-0">Salon performansını takip edin, rezervasyon taleplerini yönetin.</p>
          </div>
          <Link to="/owner/add">
            <Button>
              <i className="bi bi-plus-circle me-2"></i>
              Yeni Salon Ekle
            </Button>
          </Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <span className="text-muted small">Aktif salon</span>
              <h3 className="fw-bold mb-0">{venues.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <span className="text-muted small">Onay bekleyen talepler</span>
              <h3 className="fw-bold mb-0">{pendingReservations.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <span className="text-muted small">Onaylanan rezervasyonlar</span>
              <h3 className="fw-bold mb-0">
                {reservations.filter((reservation) => reservation.status === 'confirmed').length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">Son rezervasyon talepleri</h5>
          {reservations.length === 0 ? (
            <div className="alert alert-info mb-0">Henüz rezervasyon talebi yok.</div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Salon</th>
                    <th scope="col">Tarih</th>
                    <th scope="col">Misafir</th>
                    <th scope="col">Paket</th>
                    <th scope="col">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.slice(0, 5).map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.venue?.name}</td>
                      <td>{reservation.eventDate}</td>
                      <td>{reservation.guestCount}</td>
                      <td>{reservation.package?.name}</td>
                      <td>
                        <span className="badge bg-secondary text-uppercase">
                          {statusLabels[reservation.status] ?? reservation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;

