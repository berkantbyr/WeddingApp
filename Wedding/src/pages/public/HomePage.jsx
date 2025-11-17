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
    
    console.log('API URL:', url); // Debug için
    const response = await fetch(url);
    if (!response.ok) {
      console.error('API yanıt hatası:', response.status, response.statusText);
      throw new Error('Salonlar yüklenemedi');
    }
    const data = await response.json();
    console.log('API\'den gelen veri:', data); // Debug için
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
        console.log('Gelen salonlar:', salonlar); // Debug için
        // Backend'den gelen veriyi formatla
        const formatlanmisSalonlar = salonlar.map(salon => ({
          id: salon.id,
          ad: salon.ad || salon.name,
          sehir: salon.sehir || salon.city,
          dugun_turu: salon.dugun_turu || salon.dugun_turu || 'NORMAL',
          fiyat: salon.fiyat || salon.fiyat || 0,
          ana_foto: salon.ana_foto || salon.ana_foto_url || salon.coverImage,
          ana_foto_url: salon.ana_foto_url || salon.ana_foto || salon.coverImage,
          kapasite: salon.kapasite || salon.capacity
        }));
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
      {/* Üst Banner - Trivago benzeri */}
      <div 
        style={{
          backgroundColor: '#1e40af',
          padding: '40px 0',
          marginTop: '-20px',
          marginBottom: '30px'
        }}
      >
        <div className="container">
          <div className="text-center text-white">
            <h1 
              className="fw-bold mb-3"
              style={{ fontSize: 'clamp(24px, 5vw, 36px)' }}
            >
              Bir sonraki düğününüzde %50'ye kadar kazanın
            </h1>
            <p className="lead mb-0" style={{ fontSize: '18px' }}>
              100'den fazla düğün salonundan en iyi fiyatları karşılaştırıyoruz
            </p>
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
              // Önce salonun kendi fotoğrafını kullan, yoksa sırayla düğün salonu görsellerini kullan
              // Fotoğraf URL'ini düzelt - eğer /uploads/ ile başlıyorsa backend URL'ini ekle
              let anaFoto = salon.ana_foto || salon.ana_foto_url;
              if (anaFoto && anaFoto.startsWith('/uploads/')) {
                // Backend URL'ini ekle
                const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                anaFoto = backendUrl + anaFoto;
              } else if (!anaFoto) {
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
