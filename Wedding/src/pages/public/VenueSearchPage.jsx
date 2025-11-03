import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Input from '../../components/common/Input.jsx';
import { searchVenues } from '../../services/venueService.js';

const VenueSearchPage = () => {
  const [filters, setFilters] = useState({ city: '', capacity: '', eventDate: '', packageTier: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      try {
        const venues = await searchVenues({ city: '', capacity: '', eventDate: '', packageTier: '' });
        setResults(venues);
      } catch (err) {
        setError(err?.message || 'Salonlar yüklenemedi');
      } finally {
        setLoading(false);
      }
    };
    initialLoad();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const venues = await searchVenues(filters);
      setResults(venues);
      setSearched(true);
    } catch (err) {
      setError(err?.message || 'Arama işlemi tamamlanamadı');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4 p-md-5">
          <h1 className="section-heading">Düğün salonu ara</h1>
          <p className="text-muted mb-4">Şehre, kapasiteye, paket türüne veya uygun tarihe göre filtreleyin.</p>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <Input
                id="city"
                name="city"
                label="Şehir"
                placeholder="İstanbul, Ankara..."
                value={filters.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <Input
                id="capacity"
                name="capacity"
                type="number"
                label="Minimum kapasite"
                placeholder="200"
                value={filters.capacity}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                label="Etkinlik tarihi"
                value={filters.eventDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted" htmlFor="packageTier">
                  Paket türü
                </label>
                <select
                  id="packageTier"
                  name="packageTier"
                  className="form-select"
                  value={filters.packageTier}
                  onChange={handleChange}
                >
                  <option value="">Tüm paketler</option>
                  <option value="economic">Ekonomik</option>
                  <option value="standard">Standart</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <Button type="submit" isLoading={loading}>
                Salonları ara
              </Button>
            </div>
          </form>
        </div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}

      {loading ? (
        <div className="py-5">
          <LoadingSpinner label="Salonlar aranıyor" />
        </div>
      ) : (
        <div className="row g-4">
          {results.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">
                {searched ? 'Filtrelerinize uygun salon bulunamadı.' : 'Henüz gösterilecek salon yok. Lütfen filtreleri güncelleyin.'}
              </div>
            </div>
          ) : (
            results.map((venue) => (
              <div className="col-md-4" key={venue.id}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="ratio ratio-4x3">
                    <img src={venue.coverImage} alt={venue.name} className="object-fit-cover rounded-top" />
                  </div>
                  <div className="card-body d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                      <span className="badge-soft">{venue.city}</span>
                      <span className="small text-muted">Kapasite {venue.capacity}</span>
                    </div>
                    <h5 className="fw-semibold">{venue.name}</h5>
                    <p className="text-muted small flex-grow-1">{venue.description?.slice(0, 110)}...</p>
                    <Link to={`/venues/${venue.id}`} className="btn btn-outline-primary">
                      Detayları gör
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default VenueSearchPage;

