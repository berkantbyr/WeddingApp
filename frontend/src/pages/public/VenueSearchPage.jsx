import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Input from '../../components/common/Input.jsx';
import { fetchVenues } from '../../services/venueService.js';
import { apiClient, API_HOST } from '../../services/apiClient.js';

const API_BASE_URL = API_HOST || (typeof window !== 'undefined' ? window.location.origin.replace(/\/$/, '') : 'http://localhost:3000');

// Düğün türü açıklamaları
const dugunTuruAciklamalari = {
  'EN_LUX': {
    ad: 'En Lüks',
    aciklama: 'Yemekli, kuruyemiş, içecekli',
    renk: '#b74263'
  },
  'ORTA': {
    ad: 'Orta',
    aciklama: 'Kuruyemiş ve içecek',
    renk: '#d96f8a'
  },
  'NORMAL': {
    ad: 'Normal',
    aciklama: 'Sadece kuruyemiş',
    renk: '#c97f9d'
  }
};

// Fiyatı formatla
const formatFiyat = (fiyat) => {
  if (!fiyat) return 'Fiyat bilgisi yok';
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0
  }).format(fiyat);
};

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
        const kapasiteParam = params.get('kapasite');
        
        const currentFilters = {};
        if (sehirParam) {
          currentFilters.city = sehirParam;
          setFilters(prev => ({ ...prev, city: sehirParam }));
        }
        if (kapasiteParam) {
          currentFilters.capacity = kapasiteParam;
          setFilters(prev => ({ ...prev, capacity: kapasiteParam }));
        }
        
        // Filtreli salonları getir
        const venues = await fetchVenues(currentFilters);
        setResults(venues);
        if (sehirParam || kapasiteParam) {
          setSearched(true);
        }
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
      // Filtreleri hazırla
      const searchFilters = {};
      if (filters.city) searchFilters.city = filters.city;
      if (filters.capacity) searchFilters.minKapasite = filters.capacity;
      if (filters.packageTier) searchFilters.dugun_turu = filters.packageTier;

      // Filtreli salonları getir
      const venues = await fetchVenues(searchFilters);
      
      // Şehir filtresi varsa ek filtreleme yap (mock modu için)
      let filteredVenues = venues;
      if (filters.city) {
        filteredVenues = venues.filter(venue => {
          const venueCity = (venue.city || '').toLowerCase().trim();
          const filterCity = filters.city.toLowerCase().trim();
          return venueCity === filterCity;
        });
      }
      
      setResults(filteredVenues);
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
            background: 'linear-gradient(135deg, rgba(199, 91, 122, 0.78) 0%, rgba(247, 183, 195, 0.68) 100%)'
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
            <h2 className="fw-bold mb-3" style={{ fontSize: '28px', color: '#2f1b25' }}>
              <i className="bi bi-search me-2" style={{ color: '#c75b7a' }}></i>
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
                <h3 className="fw-bold" style={{ color: '#2f1b25', fontSize: '24px' }}>
                  <i className="bi bi-building me-2" style={{ color: '#c75b7a' }}></i>
                  {results.length} Salon Bulundu
                </h3>
              </div>
            )}
            <div>
              {results.length === 0 ? (
                <div 
                  className="alert alert-info d-flex align-items-center gap-3"
                  style={{ 
                    borderRadius: '16px',
                    border: 'none',
                    background: 'linear-gradient(135deg, rgba(199, 91, 122, 0.08) 0%, rgba(247, 183, 195, 0.16) 100%)'
                  }}
                >
                  <i className="bi bi-info-circle" style={{ fontSize: '24px', color: '#c75b7a' }}></i>
                  <div>
                    <strong>{searched ? 'Filtrelerinize uygun salon bulunamadı.' : 'Henüz gösterilecek salon yok.'}</strong>
                    <p className="mb-0 mt-1">{searched ? 'Lütfen farklı kriterler deneyin.' : 'Lütfen filtreleri güncelleyin.'}</p>
                  </div>
                </div>
              ) : (
                <div 
                  className="d-flex gap-4"
                  style={{
                    overflowX: 'auto',
                    paddingBottom: '10px',
                    scrollbarWidth: 'thin',
                    flexWrap: 'wrap'
                  }}
                >
                  {results.map((venue, index) => {
                    const dugunTuru = dugunTuruAciklamalari[venue.dugun_turu] || dugunTuruAciklamalari['NORMAL'];
                    // Fotoğraf URL'ini düzelt
                    let anaFoto = venue.coverImage || venue.ana_foto_url || venue.ana_foto;
                    if (anaFoto && /^\/?uploads\//i.test(anaFoto)) {
                      anaFoto = `${API_BASE_URL}/${anaFoto.replace(/^\/?/, '')}`;
                    } else if (anaFoto && !/^https?:\/\//i.test(anaFoto) && !anaFoto.startsWith('/')) {
                      anaFoto = `${API_BASE_URL}/${anaFoto}`;
                    } else if (anaFoto && anaFoto.startsWith('/') && !anaFoto.startsWith('//')) {
                      anaFoto = `${API_BASE_URL}${anaFoto}`;
                    } else if (!anaFoto) {
                      anaFoto = '/images/ankara-salon.jpg';
                    }
                    
                    return (
                      <div
                        key={venue.id}
                        className="card border-0 shadow-sm"
                        style={{
                          minWidth: '320px',
                          maxWidth: '320px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                      >
                        {/* Salon Fotoğrafı */}
                        <div className="position-relative" style={{ height: '200px', backgroundColor: '#ffe6ee' }}>
                          <img
                            src={anaFoto}
                            alt={venue.name}
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                            onError={(e) => {
                              console.error('Salon resmi yüklenemedi:', anaFoto);
                              const fallbackImages = [
                                '/images/ankara-salon.jpg',
                                '/images/antalya-salon.jpg',
                                '/images/rize-salon.jpg',
                                '/images/99d6f7a3526a21f42765c9fab7782396.jpg'
                              ];
                              const currentIndex = fallbackImages.indexOf(anaFoto);
                              if (currentIndex < fallbackImages.length - 1) {
                                e.target.src = fallbackImages[currentIndex + 1];
                              } else {
                                e.target.src = fallbackImages[fallbackImages.length - 1];
                              }
                            }}
                          />
                          {/* İndirim Badge */}
                          <div
                            className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded"
                            style={{
                              backgroundColor: '#c75b7a',
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}
                          >
                            Fırsat
                          </div>
                        </div>
                        
                        {/* Salon Bilgileri */}
                        <div className="card-body p-3">
                          <h5 className="fw-bold mb-2" style={{ fontSize: '16px', color: '#2f1b25' }}>
                            {venue.name}
                          </h5>
                          
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span 
                              className="badge"
                              style={{
                                backgroundColor: dugunTuru.renk,
                                color: 'white',
                                fontSize: '11px'
                              }}
                            >
                              {dugunTuru.ad}
                            </span>
                            <small className="text-muted">
                              <i className="bi bi-geo-alt me-1"></i>
                              {venue.city || 'Şehir belirtilmemiş'}
                            </small>
                          </div>
                          
                          {/* Şirket Adı */}
                          {(venue.sirket_adi || venue.sirketAdi || venue.ownerName) && (
                            <div className="mb-2">
                              <small className="text-muted d-block">
                                <i className="bi bi-building me-1"></i>
                                <strong>{venue.sirket_adi || venue.sirketAdi || venue.ownerName}</strong>
                              </small>
                            </div>
                          )}
                          
                          <div className="mb-2">
                            <small className="text-muted d-block">
                              <i className="bi bi-check-circle-fill text-success me-1"></i>
                              {dugunTuru.aciklama}
                            </small>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                              <div className="fw-bold" style={{ color: '#c75b7a', fontSize: '18px' }}>
                                {formatFiyat(venue.fiyat || venue.price)}
                              </div>
                              <small className="text-muted">/gece</small>
                            </div>
                            
                            <Link
                              to={`/venues/${venue.id}`}
                              className="btn btn-sm fw-semibold"
                              style={{
                                backgroundColor: '#c75b7a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '6px 16px'
                              }}
                            >
                              Fırsatı görün <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VenueSearchPage;

