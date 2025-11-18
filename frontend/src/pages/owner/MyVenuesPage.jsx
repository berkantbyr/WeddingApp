import React, { useEffect, useState } from 'react';
import { fetchOwnerVenues, deleteVenue } from '../../services/venueService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { useNavigate } from 'react-router-dom';

// Onay mekanizması kaldırıldı - artık status yok

const MyVenuesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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

  const handleDelete = async (venueId) => {
    if (!window.confirm('Bu salonu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
      return;
    }
    
    setDeletingId(venueId);
    try {
      await deleteVenue(venueId);
      // Salonları yeniden yükle
      const data = await fetchOwnerVenues(user?.id);
      setVenues(data);
    } catch (err) {
      alert(err?.message || 'Salon silinirken bir hata oluştu');
    } finally {
      setDeletingId(null);
    }
  };

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
                  <div className="text-muted small">Eklendiği tarih {new Date(venue.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="mt-3 d-flex flex-wrap gap-2 align-items-center">
                <div className="d-flex flex-wrap gap-2">
                  {venue.packages?.map((pkg) => (
                    <span key={pkg.id} className="badge bg-primary-subtle text-primary">
                      {pkg.name}: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(pkg.price)}
                    </span>
                  ))}
                </div>
                <div className="ms-auto d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate(`/owner/venues/${venue.id}/edit`)}
                  >
                    Düzenle
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(venue.id)}
                    disabled={deletingId === venue.id}
                  >
                    {deletingId === venue.id ? 'Siliniyor...' : 'Sil'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyVenuesPage;

