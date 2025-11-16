import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

// API servis fonksiyonu - salonları getir
const fetchSalonlar = async (sehir = '') => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const url = sehir 
      ? `${API_URL}/api/salonlar?sehir=${encodeURIComponent(sehir)}`
      : `${API_URL}/api/salonlar`;
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error('API yanıt hatası:', response.status, response.statusText);
      throw new Error('Salonlar yüklenemedi');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API hatası:', error);
    return [];
  }
};

// Popüler şehirler - buton olarak gösterilecek
// Kullanıcının eklediği şehir resimleri: istanbul.webp, ankata.jpg, antalya.jpg, rize.jpg
const populerSehirler = [
  {
    id: 'istanbul',
    ad: 'İstanbul',
    resim: '/images/istanbul.webp', // Galata Kulesi resmi
    aciklama: 'Türkiye\'nin en popüler düğün şehri'
  },
  {
    id: 'ankara',
    ad: 'Ankara',
    resim: '/images/ankata.jpg', // Anıtkabir resmi (kullanıcı ankata.jpg olarak eklemiş)
    aciklama: 'Başkent\'te unutulmaz düğünler'
  },
  {
    id: 'antalya',
    ad: 'Antalya',
    resim: '/images/antalya.jpg', // Alanya resmi
    aciklama: 'Sahil kenarında romantik düğünler'
  },
  {
    id: 'rize',
    ad: 'Rize',
    resim: '/images/rize.jpg', // Rize resmi (Bodrum yerine Rize var)
    aciklama: 'Karadeniz\'in incisi, doğal güzellikler'
  }
];

// Düğün salonu görselleri - kullanıcının eklediği salon resimleri
const dugunSalonuGorselleri = [
  '/images/ankara-salon.jpg', // Ankara düğün salonu
  '/images/antalya-salon.jpg', // Antalya düğün salonu
  '/images/rize-salon.jpg'     // Rize düğün salonu
];

// Düğün türü açıklamaları
const dugunTuruAciklamalari = {
  'EN_LUX': {
    ad: 'En Lüks',
    aciklama: 'Yemekli, kuruyemiş, içecekli',
    renk: '#dc2626'
  },
  'ORTA': {
    ad: 'Orta',
    aciklama: 'Kuruyemiş ve içecek',
    renk: '#f97316'
  },
  'NORMAL': {
    ad: 'Normal',
    aciklama: 'Sadece kuruyemiş',
    renk: '#14b8a6'
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  
  // Arama formu state'leri
  const [sehir, setSehir] = useState('');
  const [tarih, setTarih] = useState('');
  const [kapasite, setKapasite] = useState('');
  
  // Yaklaşan fırsatlar (salonlar)
  const [yaklasanFirsatlar, setYaklasanFirsatlar] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Sayfa yüklendiğinde salonları getir
  useEffect(() => {
    const loadSalonlar = async () => {
      setLoading(true);
      try {
        const salonlar = await fetchSalonlar();
        // Backend'den gelen veriyi formatla
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const getImageUrl = (url) => {
          if (!url) return null;
          if (url.startsWith('http')) return url; // Zaten tam URL ise
          if (url.startsWith('/uploads/')) {
            // API URL ile birleştir
            return `${API_URL}${url}`;
          }
          return url;
        };
        
        const formatlanmisSalonlar = (Array.isArray(salonlar) ? salonlar : []).map(salon => {
          // Önce ana_foto_url'i kontrol et, sonra ana_foto'yu
          const imageUrl = salon.ana_foto_url || salon.ana_foto;
          const finalImageUrl = getImageUrl(imageUrl);
          
          return {
            id: salon.id,
            ad: salon.ad || salon.name,
            sehir: salon.sehir || salon.city,
            dugun_turu: salon.dugun_turu || salon.dugun_turu || 'NORMAL',
            fiyat: salon.fiyat || salon.fiyat || 0,
            ana_foto: finalImageUrl,
            ana_foto_url: finalImageUrl,
            coverImage: finalImageUrl,
            kapasite: salon.kapasite || salon.capacity,
            sirket_adi: salon.sirket_adi
          };
        });
        // En yeni 4 salonu al
        setYaklasanFirsatlar(formatlanmisSalonlar.slice(0, 4));
      } catch (error) {
        console.error('Salonlar yüklenemedi:', error);
        setYaklasanFirsatlar([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadSalonlar();
  }, []);
  
  // Şehir butonuna tıklandığında
  const handleSehirClick = (sehirAdi) => {
    navigate(`/venues?sehir=${encodeURIComponent(sehirAdi)}`);
  };
  
  // Arama formu gönderildiğinde
  const handleAra = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (sehir) params.append('sehir', sehir);
    if (tarih) params.append('tarih', tarih);
    if (kapasite) params.append('kapasite', kapasite);
    
    navigate(`/venues?${params.toString()}`);
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
  
  // Tarihi formatla
  const formatTarih = (tarih) => {
    if (!tarih) return '';
    const date = new Date(tarih);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <div 
        className="position-relative"
        style={{
          background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)',
          padding: '90px 0 110px',
          marginTop: '-20px',
          marginBottom: '50px',
          overflow: 'hidden'
        }}
      >
        {/* Dekoratif arka plan elemanları - daha sade */}
        <div 
          style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            filter: 'blur(50px)'
          }}
        ></div>
        <div 
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-5%',
            width: '250px',
            height: '250px',
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}
        ></div>
        
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="mb-4">
                <span 
                  className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'white',
                    letterSpacing: '0.3px'
                  }}
                >
                  <i className="bi bi-heart-fill" style={{ fontSize: '11px' }}></i>
                  Türkiye'nin En Güvenilir Düğün Salonu Platformu
                </span>
              </div>
              
              <h1 
                className="text-white fw-bold mb-4"
                style={{ 
                  fontSize: 'clamp(36px, 6vw, 58px)',
                  lineHeight: '1.15',
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.15)',
                  fontWeight: '800'
                }}
              >
                Hayalinizdeki Düğün<br />
                Salonunu Bulun
              </h1>
              
              <p 
                className="text-white mb-5"
                style={{ 
                  fontSize: 'clamp(17px, 2vw, 21px)',
                  lineHeight: '1.7',
                  opacity: 0.95,
                  maxWidth: '520px',
                  fontWeight: '400'
                }}
              >
                Zarif ve lüks salonlar, çiçeklerle süslenmiş mekanlar ve unutulmaz anılar için mükemmel yerler. Binlerce mutlu çiftin tercihi.
              </p>
              
              <div className="d-flex flex-wrap gap-4">
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(255, 255, 255, 0.18)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <i className="bi bi-building text-white" style={{ fontSize: '22px' }}></i>
                  </div>
                  <div>
                    <div className="fw-bold text-white" style={{ fontSize: '22px', lineHeight: '1.2' }}>100+</div>
                    <div className="text-white" style={{ fontSize: '14px', opacity: 0.9, fontWeight: '500' }}>Düğün Salonu</div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(255, 255, 255, 0.18)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <i className="bi bi-star-fill text-white" style={{ fontSize: '22px' }}></i>
                  </div>
                  <div>
                    <div className="fw-bold text-white" style={{ fontSize: '22px', lineHeight: '1.2' }}>4.8/5</div>
                    <div className="text-white" style={{ fontSize: '14px', opacity: 0.9, fontWeight: '500' }}>Müşteri Memnuniyeti</div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(255, 255, 255, 0.18)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <i className="bi bi-heart-fill text-white" style={{ fontSize: '22px' }}></i>
                  </div>
                  <div>
                    <div className="fw-bold text-white" style={{ fontSize: '22px', lineHeight: '1.2' }}>5000+</div>
                    <div className="text-white" style={{ fontSize: '14px', opacity: 0.9, fontWeight: '500' }}>Mutlu Çift</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div 
                className="position-relative rounded-4 overflow-hidden"
                style={{
                  boxShadow: '0 25px 70px rgba(0, 0, 0, 0.25)',
                  border: 'none'
                }}
              >
                <img
                  src="/images/99d6f7a3526a21f42765c9fab7782396.jpg"
                  alt="Düğün Salonu"
                  className="w-100"
                  style={{ 
                    height: '400px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arama Çubuğu - Trivago benzeri */}
      <div className="container mb-5">
        <div 
          className="card shadow-lg border-0"
          style={{ 
            borderRadius: '16px',
            padding: '30px',
            backgroundColor: 'white'
          }}
        >
          <form onSubmit={handleAra}>
            <div className="row g-3 align-items-end">
              {/* Şehir Seçimi */}
              <div className="col-md-3">
                <label className="form-label fw-semibold text-muted mb-2">
                  <i className="bi bi-geo-alt me-2"></i>Nereye?
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Şehir seçin"
                  value={sehir}
                  onChange={(e) => setSehir(e.target.value)}
                  style={{ borderRadius: '8px' }}
                />
              </div>
              
              {/* Tarih Seçimi */}
              <div className="col-md-3">
                <label className="form-label fw-semibold text-muted mb-2">
                  <i className="bi bi-calendar3 me-2"></i>Düğün Tarihi
                </label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  value={tarih}
                  onChange={(e) => setTarih(e.target.value)}
                  style={{ borderRadius: '8px' }}
                />
              </div>
              
              {/* Kapasite */}
              <div className="col-md-3">
                <label className="form-label fw-semibold text-muted mb-2">
                  <i className="bi bi-people me-2"></i>Misafir Sayısı
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="200"
                  value={kapasite}
                  onChange={(e) => setKapasite(e.target.value)}
                  style={{ borderRadius: '8px' }}
                />
              </div>
              
              {/* Arama Butonu */}
              <div className="col-md-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold"
                  style={{
                    borderRadius: '8px',
                    backgroundColor: '#1e40af',
                    border: 'none',
                    padding: '12px',
                    fontSize: '16px'
                  }}
                >
                  <i className="bi bi-search me-2"></i>Ara
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Popüler Aramalar - Şehir Butonları */}
      <div className="container mb-5">
        <h2 className="fw-bold mb-4" style={{ color: '#1e293b', fontSize: '28px' }}>
          Popüler Aramalar
        </h2>
        <div className="row g-4">
          {populerSehirler.map((sehir) => (
            <div key={sehir.id} className="col-md-3 col-sm-6">
              <button
                onClick={() => handleSehirClick(sehir.ad)}
                className="btn p-0 border-0 w-100"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="position-relative" style={{ height: '200px', backgroundColor: '#e5e7eb' }}>
                  <img
                    src={sehir.resim}
                    alt={sehir.ad}
                    className="w-100 h-100"
                    style={{ 
                      objectFit: 'cover',
                      filter: 'brightness(0.7)'
                    }}
                    onError={(e) => {
                      // Resim yüklenemezse placeholder göster
                      console.error('Resim yüklenemedi:', sehir.resim);
                      e.target.style.display = 'none';
                      // Placeholder div göster
                      const placeholder = e.target.parentElement.querySelector('.placeholder-text');
                      if (placeholder) {
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  {/* Placeholder - resim yüklenemezse göster */}
                  <div 
                    className="placeholder-text position-absolute top-0 start-0 w-100 h-100 d-none align-items-center justify-content-center text-white fw-bold"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      fontSize: '18px'
                    }}
                  >
                    {sehir.ad}
                  </div>
                  <div 
                    className="position-absolute bottom-0 start-0 w-100 p-3 text-white"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                    }}
                  >
                    <h5 className="fw-bold mb-1">{sehir.ad}</h5>
                    <small>{sehir.aciklama}</small>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Yaklaşan Düğün Salonu Fırsatları - Trivago benzeri */}
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0" style={{ color: '#1e293b', fontSize: '28px' }}>
            Tarihleri yaklaşan düğün salonu fırsatları
          </h2>
          <Link 
            to="/venues"
            className="text-decoration-none fw-semibold"
            style={{ color: '#1e40af' }}
          >
            Daha fazla fırsat görüntüle <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <LoadingSpinner label="Salonlar yükleniyor..." />
          </div>
        ) : yaklasanFirsatlar.length === 0 ? (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            Henüz salon ilanı bulunmamaktadır.
          </div>
        ) : (
          <div 
            className="d-flex gap-4"
            style={{
              overflowX: 'auto',
              paddingBottom: '10px',
              scrollbarWidth: 'thin'
            }}
          >
            {yaklasanFirsatlar.map((salon, index) => {
              const dugunTuru = dugunTuruAciklamalari[salon.dugun_turu] || dugunTuruAciklamalari['NORMAL'];
              // Önce salonun kendi fotoğrafını kullan, yoksa fallback resimler
              let anaFoto = salon.coverImage || salon.ana_foto_url || salon.ana_foto;
              if (!anaFoto) {
                // Fallback resimler
                anaFoto = dugunSalonuGorselleri[index % dugunSalonuGorselleri.length] || '/images/99d6f7a3526a21f42765c9fab7782396.jpg';
              }
              
              return (
                <div
                  key={salon.id}
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
                  <div className="position-relative" style={{ height: '200px', backgroundColor: '#e5e7eb' }}>
                    <img
                      src={anaFoto}
                      alt={salon.ad}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        console.error('Salon resmi yüklenemedi:', anaFoto);
                        // Fallback resimleri dene
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
                        // Eğer fallback de yüklenemezse, placeholder göster
                        e.target.onerror = () => {
                          e.target.style.display = 'none';
                          const placeholder = document.createElement('div');
                          placeholder.className = 'position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
                          placeholder.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                          placeholder.innerHTML = '<i class="bi bi-image" style="font-size: 48px; color: white; opacity: 0.5;"></i>';
                          e.target.parentElement.appendChild(placeholder);
                        };
                      }}
                    />
                    {/* İndirim Badge */}
                    <div
                      className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded"
                      style={{
                        backgroundColor: '#dc2626',
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
                    <h5 className="fw-bold mb-2" style={{ fontSize: '16px', color: '#1e293b' }}>
                      {salon.ad}
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
                        {salon.sehir || 'Şehir belirtilmemiş'}
                      </small>
                    </div>
                    
                    {/* Şirket Adı */}
                    {(salon.sirket_adi || salon.sirketAdi) && (
                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <i className="bi bi-building me-1"></i>
                          <strong>{salon.sirket_adi || salon.sirketAdi}</strong>
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
                        <div className="fw-bold" style={{ color: '#1e40af', fontSize: '18px' }}>
                          {formatFiyat(salon.fiyat)}
                        </div>
                        <small className="text-muted">/gece</small>
                      </div>
                      
                      <Link
                        to={`/venues/${salon.id}`}
                        className="btn btn-sm fw-semibold"
                        style={{
                          backgroundColor: '#1e40af',
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
    </div>
  );
};

export default HomePage;
