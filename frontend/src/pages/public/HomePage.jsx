import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { fetchVenues } from '../../services/venueService.js';
import { API_HOST } from '../../services/apiClient';

const API_BASE_URL =
  API_HOST ||
  (typeof window !== 'undefined' ? window.location.origin.replace(/\/$/, '') : 'http://localhost:3000');

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

const turkiyeSehirleri = [
  'Adana',
  'Adıyaman',
  'Afyonkarahisar',
  'Ağrı',
  'Aksaray',
  'Amasya',
  'Ankara',
  'Antalya',
  'Ardahan',
  'Artvin',
  'Aydın',
  'Balıkesir',
  'Bartın',
  'Batman',
  'Bayburt',
  'Bilecik',
  'Bingöl',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Bursa',
  'Çanakkale',
  'Çankırı',
  'Çorum',
  'Denizli',
  'Diyarbakır',
  'Düzce',
  'Edirne',
  'Elazığ',
  'Erzincan',
  'Erzurum',
  'Eskişehir',
  'Gaziantep',
  'Giresun',
  'Gümüşhane',
  'Hakkâri',
  'Hatay',
  'Iğdır',
  'Isparta',
  'İstanbul',
  'İzmir',
  'Kahramanmaraş',
  'Karabük',
  'Karaman',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Kırıkkale',
  'Kırklareli',
  'Kırşehir',
  'Kilis',
  'Kocaeli',
  'Konya',
  'Kütahya',
  'Malatya',
  'Manisa',
  'Mardin',
  'Mersin',
  'Muğla',
  'Muş',
  'Nevşehir',
  'Niğde',
  'Ordu',
  'Osmaniye',
  'Rize',
  'Sakarya',
  'Samsun',
  'Siirt',
  'Sinop',
  'Sivas',
  'Şanlıurfa',
  'Şırnak',
  'Tekirdağ',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Uşak',
  'Van',
  'Yalova',
  'Yozgat',
  'Zonguldak'
];

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
    renk: '#e78ea9'
  },
  'NORMAL': {
    ad: 'Normal',
    aciklama: 'Sadece kuruyemiş',
    renk: '#d6889f'
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Arama formu state'leri
  const [sehir, setSehir] = useState('');
  
  // Yaklaşan fırsatlar (salonlar)
  const [yaklasanFirsatlar, setYaklasanFirsatlar] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Sayfa yüklendiğinde salonları getir
  useEffect(() => {
    const loadSalonlar = async () => {
      setLoading(true);
      try {
        // URL'den şehir filtresi varsa al
        const sehirFiltresi = searchParams.get('sehir');
        const filters = sehirFiltresi ? { city: sehirFiltresi } : {};
        
        const salonlar = await fetchVenues(filters);
        const formatlanmisSalonlar = salonlar.map((salon) => ({
          id: salon.id,
          ad: salon.ad || salon.name,
          sehir: salon.sehir || salon.city,
          dugun_turu: salon.dugun_turu || salon.dugunTuru || 'NORMAL',
          fiyat: Number(salon.fiyat ?? salon.price ?? 0),
          ana_foto: salon.ana_foto || salon.ana_foto_url || salon.coverImage,
          ana_foto_url: salon.ana_foto_url || salon.ana_foto || salon.coverImage,
          kapasite: salon.kapasite || salon.capacity,
          sirket_adi: salon.sirket_adi || salon.sirketAdi || salon.ownerName
        }));
        setYaklasanFirsatlar(formatlanmisSalonlar.slice(0, 4));
      } catch (error) {
        console.error('Salonlar yüklenemedi:', error);
        setYaklasanFirsatlar([]);
      } finally {
        setLoading(false);
      }
    };

    loadSalonlar();
  }, [searchParams]);
  
  // Şehir butonuna tıklandığında
  const handleSehirClick = (sehirAdi) => {
    navigate(`/venues?sehir=${encodeURIComponent(sehirAdi)}`);
  };
  
  // Ana sayfadaki salonları şehre göre filtrele (opsiyonel - tüm şehirlerden göster)
  // Şehir filtresi yoksa tüm salonları göster
  
  // Arama formu gönderildiğinde
  const handleAra = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (sehir) params.append('sehir', sehir);

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
  
  return (
    <div style={{ backgroundColor: '#fff6f8', minHeight: '100vh' }}>
      {/* Üst Banner - Trivago benzeri */}
      <div 
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/divarkaplan.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '60px 0',
          marginTop: '-20px',
          marginBottom: '30px',
          borderRadius: '0',
          boxShadow: '0 12px 40px rgba(199, 91, 122, 0.25)'
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
            backgroundColor: '#fffdfd'
          }}
        >
          <form onSubmit={handleAra}>
            <div className="row g-3 align-items-end">
              {/* Şehir Seçimi */}
              <div className="col-lg-9 col-md-8 col-12">
                <label className="form-label fw-semibold text-muted mb-2">
                  <i className="bi bi-geo-alt me-2"></i>Nereye?
                </label>
                <select
                  className="form-select form-select-lg"
                  value={sehir}
                  onChange={(e) => setSehir(e.target.value)}
                  style={{ borderRadius: '8px' }}
                >
                  <option value="">Şehir seçin</option>
                  {turkiyeSehirleri.map((sehirAdi) => (
                    <option key={sehirAdi} value={sehirAdi}>
                      {sehirAdi}
                    </option>
                  ))}
                </select>
              </div>

              {/* Arama Butonu */}
              <div className="col-lg-3 col-md-4 col-12">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold"
                    style={{
                      borderRadius: '8px',
                      backgroundColor: '#c75b7a',
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
        <h2 className="fw-bold mb-4" style={{ color: '#2f1b25', fontSize: '28px' }}>
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
                <div className="position-relative" style={{ height: '200px', backgroundColor: '#ffe6ee' }}>
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
                      background: 'linear-gradient(135deg, #c75b7a 0%, #f7b7c3 100%)',
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
          <h2 className="fw-bold mb-0" style={{ color: '#2f1b25', fontSize: '28px' }}>
            Tarihleri yaklaşan düğün salonu fırsatları
          </h2>
          <Link 
            to="/venues"
            className="text-decoration-none fw-semibold"
            style={{ color: '#c75b7a' }}
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
              // Fotoğraf URL'ini düzelt - eğer relative path ise backend URL'ini ekle
              let anaFoto = salon.ana_foto || salon.ana_foto_url || salon.coverImage;
              if (anaFoto && /^\/?uploads\//i.test(anaFoto)) {
                anaFoto = `${API_BASE_URL}/${anaFoto.replace(/^\/?/, '')}`;
              } else if (anaFoto && !/^https?:\/\//i.test(anaFoto) && !anaFoto.startsWith('/')) {
                anaFoto = `${API_BASE_URL}/${anaFoto}`;
              } else if (anaFoto && anaFoto.startsWith('/') && !anaFoto.startsWith('//')) {
                anaFoto = `${API_BASE_URL}${anaFoto}`;
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
                  <div className="position-relative" style={{ height: '200px', backgroundColor: '#ffe6ee' }}>
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
                        <div className="fw-bold" style={{ color: '#c75b7a', fontSize: '18px' }}>
                          {formatFiyat(salon.fiyat)}
                        </div>
                        <small className="text-muted">/gece</small>
                      </div>
                      
                      <Link
                        to={`/venues/${salon.id}`}
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
    </div>
  );
};

export default HomePage;
