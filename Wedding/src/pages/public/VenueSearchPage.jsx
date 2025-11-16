import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Input from '../../components/common/Input.jsx';
import { fetchVenues } from '../../services/venueService.js';

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
        // URL parametrelerinden filtreleri al
        const params = new URLSearchParams(window.location.search);
        const sehirParam = params.get('sehir');
        if (sehirParam) {
          setFilters(prev => ({ ...prev, city: sehirParam }));
        }
        
        const venues = await fetchVenues();
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
      // Backend API'ye filtreli istek gönder
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const params = new URLSearchParams();
      if (filters.city) params.append('sehir', filters.city);
      if (filters.capacity) params.append('minKapasite', filters.capacity);
      
      const url = `${API_URL}/api/salonlar?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Arama başarısız');
      
      const data = await response.json();
      // Resim URL'lerini tam path'e çevir
      const getImageUrl = (url) => {
        if (!url) return '/images/99d6f7a3526a21f42765c9fab7782396.jpg';
        if (url.startsWith('http')) return url; // Zaten tam URL ise
        if (url.startsWith('/uploads/')) {
          // API URL ile birleştir
          return `${API_URL}${url}`;
        }
        return url;
      };
      
      // Backend formatını frontend formatına çevir
      const venues = (Array.isArray(data) ? data : []).map(salon => {
        const imageUrl = salon.ana_foto || salon.ana_foto_url;
        const finalImageUrl = getImageUrl(imageUrl);
        return {
          id: salon.id,
          name: salon.ad,
          city: salon.sehir,
          address: salon.adres,
          capacity: salon.kapasite,
          description: salon.aciklama,
          dugun_turu: salon.dugun_turu,
          fiyat: salon.fiyat,
          ana_foto_url: finalImageUrl,
          coverImage: finalImageUrl,
          ownerId: salon.sahip_id,
          ownerName: salon.sahip_adi
        };
      });
      
      setResults(venues);
      setSearched(true);
    } catch (err) {
      setError(err?.message || 'Arama işlemi tamamlanamadı');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Bölümü - Lüks Salon Görseli */}
      <div 
        className="position-relative"
        style={{
          minHeight: '450px',
          marginTop: '-20px',
          marginBottom: '40px',
          borderRadius: '0 0 30px 30px',
          overflow: 'hidden'
        }}
      >
        {/* Arka plan görseli */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/images/99d6f7a3526a21f42765c9fab7782396.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        ></div>
        
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.75) 0%, rgba(139, 92, 246, 0.65) 50%, rgba(249, 115, 22, 0.55) 100%)'
          }}
        ></div>
        
        {/* İçerik */}
        <div className="container position-relative" style={{ zIndex: 2, paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="text-white" style={{ maxWidth: '650px' }}>
            <h1 
              className="display-4 fw-bold mb-4"
              style={{
                textShadow: '0 3px 12px rgba(0,0,0,0.4)',
                lineHeight: '1.2',
                fontSize: 'clamp(28px, 5vw, 48px)'
              }}
            >
              Hayalinizdeki Düğün Salonunu Bulun
            </h1>
            <p 
              className="lead mb-0"
              style={{
                fontSize: '18px',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                lineHeight: '1.6'
              }}
            >
              Zarif ve lüks salonlar, çiçeklerle süslenmiş mekanlar ve unutulmaz anılar için mükemmel yerler.
            </p>
          </div>
        </div>
      </div>

      {/* Arama Formu */}
      <div className="container py-3">
        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
          <div className="card-body p-4 p-md-5">
            <h2 className="fw-bold mb-3" style={{ fontSize: '28px', color: '#1e293b' }}>
              <i className="bi bi-search me-2" style={{ color: '#6366f1' }}></i>
              Düğün salonu ara
            </h2>
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
      </div>

      {/* Sonuçlar Bölümü */}
      <div className="container pb-5">
        {error ? (
          <div className="alert alert-danger" style={{ borderRadius: '12px' }}>{error}</div>
        ) : null}

        {loading ? (
          <div className="py-5">
            <LoadingSpinner label="Salonlar aranıyor" />
          </div>
        ) : (
          <>
            {results.length > 0 && (
              <div className="mb-4">
                <h3 className="fw-bold" style={{ color: '#1e293b', fontSize: '24px' }}>
                  <i className="bi bi-building me-2" style={{ color: '#6366f1' }}></i>
                  {results.length} Salon Bulundu
                </h3>
              </div>
            )}
            <div className="row g-4">
              {results.length === 0 ? (
                <div className="col-12">
                  <div 
                    className="alert alert-info d-flex align-items-center gap-3"
                    style={{ 
                      borderRadius: '16px',
                      border: 'none',
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                    }}
                  >
                    <i className="bi bi-info-circle" style={{ fontSize: '24px', color: '#6366f1' }}></i>
                    <div>
                      <strong>{searched ? 'Filtrelerinize uygun salon bulunamadı.' : 'Henüz gösterilecek salon yok.'}</strong>
                      <p className="mb-0 mt-1">{searched ? 'Lütfen farklı kriterler deneyin.' : 'Lütfen filtreleri güncelleyin.'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                results.map((venue, index) => {
                  // Her karta farklı renk
                  const colors = ['#6366f1', '#f97316', '#14b8a6'];
                  const cardColor = colors[index % colors.length];
                  
                  return (
                    <div className="col-md-4" key={venue.id}>
                      <div
                        className="card border-0 h-100"
                        style={{
                          borderRadius: '20px',
                          overflow: 'hidden',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s ease',
                          border: `1px solid ${cardColor}15`,
                          background: 'white'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-8px)';
                          e.currentTarget.style.boxShadow = `0 12px 32px ${cardColor}25`;
                          e.currentTarget.style.borderColor = `${cardColor}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                          e.currentTarget.style.borderColor = `${cardColor}15`;
                        }}
                      >
                        <div className="ratio ratio-4x3 position-relative" style={{ backgroundColor: '#e5e7eb' }}>
                          <img 
                            src={venue.coverImage} 
                            alt={venue.name} 
                            className="object-fit-cover"
                            style={{ borderRadius: '18px 18px 0 0' }}
                            onError={(e) => {
                              console.error('Resim yüklenemedi:', venue.coverImage);
                              // Fallback resim göster
                              e.target.src = '/images/99d6f7a3526a21f42765c9fab7782396.jpg';
                              // Eğer fallback de yüklenemezse, placeholder göster
                              e.target.onerror = () => {
                                e.target.style.display = 'none';
                                const placeholder = document.createElement('div');
                                placeholder.className = 'position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
                                placeholder.style.background = cardColor;
                                placeholder.style.borderRadius = '18px 18px 0 0';
                                placeholder.innerHTML = '<i class="bi bi-image" style="font-size: 48px; color: white; opacity: 0.5;"></i>';
                                e.target.parentElement.appendChild(placeholder);
                              };
                            }}
                          />
                          <div
                            className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded-pill fw-semibold"
                            style={{
                              background: cardColor,
                              color: 'white',
                              fontSize: '12px'
                            }}
                          >
                            {venue.city}
                          </div>
                        </div>
                        <div className="card-body d-flex flex-column gap-2 p-4">
                          <h5 className="fw-bold mb-2" style={{ color: '#2d3436', fontSize: '18px' }}>
                            {venue.name}
                          </h5>
                          <p className="text-muted small flex-grow-1" style={{ lineHeight: '1.6' }}>
                            {venue.description?.slice(0, 110)}...
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className="fw-semibold" style={{ color: cardColor, fontSize: '14px' }}>
                              <i className="bi bi-people me-1"></i>Kapasite {venue.capacity}
                            </span>
                            <Link
                              to={`/venues/${venue.id}`}
                              className="btn btn-sm fw-semibold"
                              style={{
                                background: cardColor,
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '6px 15px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = `0 3px 10px ${cardColor}60`;
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                              }}
                            >
                              Detaylar
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VenueSearchPage;

