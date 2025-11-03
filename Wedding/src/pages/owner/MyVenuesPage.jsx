import React, { useEffect, useState } from 'react';
import { fetchOwnerVenues } from '../../services/venueService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const statusBadge = {
  approved: 'success',
  pending: 'warning',
  rejected: 'danger'
};

const MyVenuesPage = () => {
  const { user } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadVenues = async () => {
      try {
        const data = await fetchOwnerVenues(user?.id);
        if (mounted) setVenues(data);
      } catch (err) {
        if (mounted) setError(err?.message || 'Salonlarınız yüklenemedi');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadVenues();
    return () => {
      mounted = false;
    };
  }, [user?.id]);

  if (loading) {
    return <LoadingSpinner label="Salonlarınız yükleniyor" />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!venues.length) {
    return <div className="alert alert-info">Henüz eklediğiniz bir salon bulunmuyor.</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {venues.map((venue) => (
        <div key={venue.id} className="card border-0 shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row gap-4">
            <div className="ratio ratio-4x3 rounded-3 overflow-hidden" style={{ maxWidth: 220 }}>
              <img src={venue.coverImage} alt={venue.name} className="object-fit-cover" />
            </div>
            <div className="flex-grow-1">
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-2">
                <div>
                  <h5 className="fw-semibold mb-1">{venue.name}</h5>
                  <p className="text-muted small mb-2">
                    {venue.city}, {venue.district} • Kapasite {venue.capacity}
                  </p>
                  <p className="text-muted small mb-0">{venue.description}</p>
                </div>
                <div className="text-lg-end">
                  <span className={`badge bg-${statusBadge[venue.status] ?? 'secondary'} text-uppercase fw-semibold`}>
                    {venue.status === 'approved'
                      ? 'Onaylandı'
                      : venue.status === 'pending'
                      ? 'Onay bekliyor'
                      : 'Reddedildi'}
                  </span>
                  <div className="text-muted small mt-2">Eklendiği tarih {new Date(venue.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="mt-3 d-flex flex-wrap gap-2">
                {venue.packages?.map((pkg) => (
                  <span key={pkg.id} className="badge bg-primary-subtle text-primary">
                    {pkg.name}: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(pkg.price)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyVenuesPage;

