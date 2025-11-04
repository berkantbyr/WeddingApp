import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { fetchFeaturedVenues } from '../../services/venueService.js';

// Profesyonel renk paleti
const primaryColor = '#6366f1'; // Soft indigo
const secondaryColor = '#f97316'; // Modern orange
const accentColor = '#14b8a6'; // Teal

// Özellik kartları - profesyonel renkler
const featureHighlights = [
  {
    title: 'Size özel paketler',
    description: 'Ekonomik, standart ve premium paketleri şeffaf fiyatlarla karşılaştırın.',
    icon: 'bi-stars',
    color: primaryColor,
    bgColor: 'rgba(99, 102, 241, 0.08)',
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
  },
  {
    title: 'Anlık uygunluk',
    description: 'Müsait tarihleri anında görün, rezervasyon talebinizi saniyeler içinde iletin.',
    icon: 'bi-calendar2-event',
    color: secondaryColor,
    bgColor: 'rgba(249, 115, 22, 0.08)',
    gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)'
  },
  {
    title: 'Salon sahibi ile iletişim',
    description: 'Salon sahipleriyle mesajlaşın, özel isteklerde bulunun ve tüm detayları düzenli tutun.',
    icon: 'bi-chat-dots',
    color: accentColor,
    bgColor: 'rgba(20, 184, 166, 0.08)',
    gradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(45, 212, 191, 0.1) 100%)'
  }
];

const HomePage = () => {
  // Aktif sekme - hangi sayfa gösterilecek
  const [activeTab, setActiveTab] = useState('home');
  
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sekmeler
  const tabs = [
    { id: 'home', label: 'Ana Sayfa', icon: 'bi-house' },
    { id: 'features', label: 'Özellikler', icon: 'bi-star' },
    { id: 'venues', label: 'Salonlar', icon: 'bi-building' }
  ];

  useEffect(() => {
    let mounted = true;
    const loadFeatured = async () => {
      try {
        const data = await fetchFeaturedVenues();
        if (mounted) {
          setVenues(data);
        }
      } catch (err) {
        if (mounted) setError(err?.message || 'Salonlar yüklenemedi');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadFeatured();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="d-flex flex-column">
      {/* Sekme Navigasyonu */}
      <div className="container mb-4" style={{ marginTop: '20px' }}>
        <div className="d-flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="btn fw-semibold px-4 py-2"
              style={{
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
                  : 'white',
                color: activeTab === tab.id ? 'white' : '#64748b',
                border: activeTab === tab.id ? 'none' : '2px solid #e2e8f0',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                fontSize: '15px',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(99, 102, 241, 0.25)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.color = '#6366f1';
                  e.target.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.color = '#64748b';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              <i className={`bi ${tab.icon} me-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ana Sayfa Sekmesi */}
      {activeTab === 'home' && (
        <div className="d-flex flex-column gap-5">
          <section 
        className="container py-5"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(139, 92, 246, 0.03) 50%, rgba(249, 115, 22, 0.03) 100%)',
          borderRadius: '24px',
          marginTop: '20px',
          border: '1px solid rgba(99, 102, 241, 0.1)'
        }}
      >
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <span 
              className="badge mb-3 px-3 py-2 fw-semibold"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)'
              }}
            >
              ✨ Güvenle planlayın
            </span>
            <h1 
              className="display-5 fw-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #6366f1 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.2'
              }}
            >
              Unutulmaz kutlamalar için düğün salonlarını keşfedin
            </h1>
            <p className="text-muted mb-4" style={{ fontSize: '16px', lineHeight: '1.7' }}>
              SalonBulucu, onaylı salon sahipleri ile düğününü planlayan çiftleri buluşturur. Paketleri karşılaştırın,
              hayalinizdeki tarihi seçin ve tüm detayları tek bir panelden yönetin.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('venues')}
                className="btn btn-lg px-4 py-3 fw-semibold"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.3)';
                }}
              >
                <i className="bi bi-search me-2"></i>Salonları keşfet
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className="btn btn-lg px-4 py-3 fw-semibold"
                style={{
                  background: 'white',
                  border: '2px solid #6366f1',
                  color: '#6366f1',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                  e.target.style.color = 'white';
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#6366f1';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.1)';
                }}
              >
                Nasıl çalışır?
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src="/images/d0a22ef9af08404f2293374470dc683d.jpg"
                alt="Düğün salonu"
                className="img-fluid rounded-4"
                style={{
                  boxShadow: '0 12px 40px rgba(99, 102, 241, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  width: '100%',
                  height: 'auto'
                }}
              />
              <div 
                className="position-absolute bottom-0 start-0 m-4 p-3 shadow-sm"
                style={{
                  maxWidth: 220,
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                }}
              >
                <p className="mb-1 fw-semibold" style={{ color: '#6366f1', fontSize: '14px' }}>
                  <i className="bi bi-check-circle-fill me-1"></i>Son rezervasyon
                </p>
                <p className="mb-0 small text-muted">Luna Garden Düğün Salonu • 280 misafir • Premium paket</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Görsel Galeri Bölümü */}
      <section className="container py-4">
        <h3 className="text-center mb-4 fw-bold" style={{ color: '#1e293b', fontSize: '28px' }}>
          <i className="bi bi-images me-2" style={{ color: '#6366f1' }}></i>
          Salonlarımızdan Görünümler
        </h3>
        <div className="row g-3">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '250px',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.15)';
              }}
            >
              <img
                src="/images/99d6f7a3526a21f42765c9fab7782396.jpg"
                alt="Salon görünümü 1"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '250px',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.15)';
              }}
            >
              <img
                src="/images/d0a22ef9af08404f2293374470dc683d.jpg"
                alt="Salon görünümü 2"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '250px',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.15)';
              }}
            >
              <img
                src="/images/67c88fe439b8a069a6bd2726ea491d1d.jpg"
                alt="Salon görünümü 3"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '250px',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.15)';
              }}
            >
              <img
                src="/images/d73a53155ab8944f6c3029b699ff4df7.jpg"
                alt="Salon görünümü 4"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '250px',
                boxShadow: '0 4px 16px rgba(249, 115, 22, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(249, 115, 22, 0.15)';
              }}
            >
              <img
                src="/images/bacec54e0ee487c42cd3e4a00e9d9d79.jpg"
                alt="Salon görünümü 5"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '250px',
                boxShadow: '0 4px 16px rgba(20, 184, 166, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(20, 184, 166, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(20, 184, 166, 0.15)';
              }}
            >
              <img
                src="/images/086deedb2098d5b0e6f4520efc38988a.jpg"
                alt="Salon görünümü 6"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '250px',
                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.15)';
              }}
            >
              <img
                src="/images/6a8ab7bbe080425b4c4524a836281097.jpg"
                alt="Salon görünümü 7"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '250px',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.15)';
              }}
            >
              <img
                src="/images/977280d984c431accc7db65e8b9f1315.jpg"
                alt="Salon görünümü 8"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>
      </div>
      )}

      {/* Özellikler Sekmesi */}
      {activeTab === 'features' && (
        <div className="d-flex flex-column gap-5">
          <section className="py-5">
        <div className="container">
          <h2 
            className="text-center mb-3 fw-bold"
            style={{ fontSize: '36px', color: '#2d3436' }}
          >
            Modern planlama rehberiniz
          </h2>
          <p className="text-center mx-auto mb-5 text-muted" style={{ maxWidth: '600px', fontSize: '16px' }}>
            Üç kolay adımda ideal salonu bulun: Seçeneklere göz atın, uygun paketi belirleyin ve talebinizi salon sahibiyle anında paylaşın.
          </p>
          <div className="row g-4">
            {featureHighlights.map((feature) => (
              <div className="col-md-4" key={feature.title}>
                <div
                  className="card border-0 h-100"
                  style={{
                    borderRadius: '20px',
                    border: `2px solid ${feature.bgColor}`,
                    background: feature.gradient || 'white',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = `0 12px 32px ${feature.color}20`;
                    e.currentTarget.style.borderColor = feature.color;
                    e.currentTarget.style.borderWidth = '2px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                    e.currentTarget.style.borderColor = feature.bgColor;
                  }}
                >
                  <div className="card-body p-4">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: 60,
                        height: 60,
                        background: feature.bgColor,
                        color: feature.color,
                        fontSize: '24px'
                      }}
                    >
                      <i className={`bi ${feature.icon}`} />
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: '#2d3436', fontSize: '20px' }}>
                      {feature.title}
                    </h5>
                    <p className="text-muted mb-0" style={{ lineHeight: '1.6', fontSize: '14px' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
      )}

      {/* Salonlar Sekmesi */}
      {activeTab === 'venues' && (
        <div className="d-flex flex-column gap-5">
          <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 
              className="fw-bold mb-2"
              style={{ fontSize: '32px', color: '#2d3436' }}
            >
              Öne çıkan salonlar
            </h2>
            <p className="text-muted mb-0" style={{ fontSize: '15px' }}>
              SalonBulucu ekibinin yakın zamanda onayladığı seçkin salonlar.
            </p>
          </div>
          <Link 
            to="/venues"
            className="btn fw-semibold"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.2)';
            }}
          >
            Tüm salonları gör <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        {loading ? (
          <div className="py-5">
            <LoadingSpinner label="Öne çıkan salonlar yükleniyor" />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-4">
            {venues.map((venue, index) => {
              // Profesyonel renk paleti
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
                    <div className="ratio ratio-4x3 position-relative">
                      <img 
                        src={venue.coverImage} 
                        alt={venue.name} 
                        className="object-fit-cover"
                        style={{ borderRadius: '18px 18px 0 0' }}
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
                        {venue.description?.slice(0, 120)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="fw-semibold" style={{ color: cardColor, fontSize: '15px' }}>
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
            })}
          </div>
        )}
      </section>
      </div>
      )}
    </div>
  );
};

export default HomePage;

