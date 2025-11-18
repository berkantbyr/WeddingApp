import React, { useEffect, useState } from 'react';
import { fetchPendingVenues, updateVenueStatus } from '../../services/adminService.js';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const VenueApprovalPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVenues = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPendingVenues();
      setVenues(data);
    } catch (err) {
      setError(err?.message || 'Onay bekleyen salonlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  const handleStatusChange = async (venueId, status) => {
    await updateVenueStatus(venueId, status);
    await loadVenues();
  };

  if (loading) {
    return <LoadingSpinner label="Onay bekleyen salonlar yükleniyor" />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h1 className="h4 fw-bold">Salon onayları</h1>
        <p className="text-muted">
          Yeni eklenen salon başvurularını inceleyin. Onay verdiğinizde salon müşterilere hemen görünür hale gelir.
        </p>
      </div>

      {venues.length === 0 ? (
        <div className="alert alert-success">Şu anda onay bekleyen salon yok 🎉</div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {venues.map((venue) => (
            <div key={venue.id} className="card border-0 shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row gap-4">
                <div className="ratio ratio-4x3 rounded-3 overflow-hidden" style={{ maxWidth: 220 }}>
                  <img src={venue.coverImage} alt={venue.name} className="object-fit-cover" />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="fw-semibold mb-1">{venue.name}</h5>
                      <p className="text-muted small mb-0">
                        {venue.city} • Kapasite {venue.capacity}
                      </p>
                    </div>
                    <span className="badge rounded-pill text-bg-warning text-uppercase">Onay bekliyor</span>
                  </div>
                  <p className="text-muted small mb-3">{venue.description}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => handleStatusChange(venue.id, 'approved')}>
                      Onayla
                    </Button>
                    <Button variant="link" className="text-danger" onClick={() => handleStatusChange(venue.id, 'rejected')}>
                      Reddet
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VenueApprovalPage;

