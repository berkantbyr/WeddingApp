import React, { useState, useEffect } from 'react';

// Profesyonel renk paleti
const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

// Galeri resimleri
const galleryImages = [
  '/images/086deedb2098d5b0e6f4520efc38988a.jpg',
  '/images/bacec54e0ee487c42cd3e4a00e9d9d79.jpg',
  '/images/d73a53155ab8944f6c3029b699ff4df7.jpg',
  '/images/67c88fe439b8a069a6bd2726ea491d1d.jpg',
  '/images/d0a22ef9af08404f2293374470dc683d.jpg',
  '/images/99d6f7a3526a21f42765c9fab7782396.jpg',
  '/images/6a8ab7bbe080425b4c4524a836281097.jpg',
  '/images/977280d984c431accc7db65e8b9f1315.jpg'
];

const AboutPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Otomatik geçiş
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4000); // 4 saniyede bir geçiş

    return () => clearInterval(interval);
  }, []);

  // Önceki resim
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  // Sonraki resim
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  // Belirli bir resme git
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="d-flex flex-column">
      {/* Hero Bölümü */}
      <section 
        className="position-relative py-5"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(249, 115, 22, 0.05) 100%)',
          marginTop: '-20px',
          marginBottom: '40px',
          paddingTop: '60px',
          paddingBottom: '80px'
        }}
      >
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div
                className="position-relative rounded-4 overflow-hidden mx-auto"
                style={{
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
                  border: '3px solid rgba(99, 102, 241, 0.1)',
                  maxWidth: '100%',
                  width: '100%'
                }}
              >
                {/* Ana resim */}
                <div className="position-relative" style={{ height: '450px', overflow: 'hidden' }}>
                  {galleryImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Salon görünümü ${index + 1}`}
                      className="w-100 h-100"
                      style={{ 
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: index === currentImageIndex ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  ))}
                </div>

                {/* Gradient overlay */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)',
                    pointerEvents: 'none'
                  }}
                ></div>

                {/* Sol ok butonu */}
                <button
                  onClick={goToPrevious}
                  className="position-absolute top-50 start-0 translate-middle-y border-0 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: primaryColor,
                    fontSize: '20px',
                    marginLeft: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                {/* Sağ ok butonu */}
                <button
                  onClick={goToNext}
                  className="position-absolute top-50 end-0 translate-middle-y border-0 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: primaryColor,
                    fontSize: '20px',
                    marginRight: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>

                {/* Nokta göstergeleri */}
                <div
                  className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 mb-3"
                  style={{ zIndex: 10 }}
                >
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className="border-0 rounded-circle"
                      style={{
                        width: index === currentImageIndex ? '12px' : '8px',
                        height: index === currentImageIndex ? '12px' : '8px',
                        background: index === currentImageIndex ? primaryColor : 'rgba(255, 255, 255, 0.6)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        padding: 0
                      }}
                      onMouseEnter={(e) => {
                        if (index !== currentImageIndex) {
                          e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                          e.target.style.transform = 'scale(1.2)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (index !== currentImageIndex) {
                          e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                          e.target.style.transform = 'scale(1)';
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="d-inline-block px-3 py-1 rounded-pill mb-3 fw-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  color: primaryColor,
                  fontSize: '14px',
                  letterSpacing: '0.5px'
                }}
              >
                <i className="bi bi-star-fill me-2"></i>Hikayemiz
              </div>
              <h1 
                className="fw-bold mb-4"
                style={{ 
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  color: darkColor,
                  lineHeight: '1.2',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Salon Sahipleri ile Çiftleri Zahmetsizce Buluşturuyoruz
              </h1>
              <p 
                className="mb-4"
                style={{ 
                  fontSize: '17px',
                  lineHeight: '1.8',
                  color: '#475569'
                }}
              >
                SalonBulucu, salon arayışının stresini bizzat yaşamış organizasyon profesyonelleri tarafından kuruldu.
                Güvenilir salonların atmosferlerini sergileyebildiği, çiftlerin özenle hazırlanmış paketleri keşfederek tüm
                detayları kolayca yönettiği modern bir platform hayal ettik.
              </p>
              <div className="row g-4">
                <div className="col-sm-6">
                  <div
                    className="h-100 rounded-4 p-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)',
                      border: '2px solid rgba(99, 102, 241, 0.1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.2)';
                      e.currentTarget.style.borderColor = primaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.1)';
                    }}
                  >
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: 50,
                        height: 50,
                        background: `linear-gradient(135deg, ${primaryColor} 0%, #8b5cf6 100%)`,
                        color: 'white',
                        fontSize: '20px'
                      }}
                    >
                      <i className="bi bi-heart-fill"></i>
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: darkColor, fontSize: '18px' }}>
                      Çiftler İçin
                    </h5>
                    <p className="mb-0" style={{ color: '#64748b', lineHeight: '1.6', fontSize: '14px' }}>
                      Salonları keşfedin, paketleri karşılaştırın, salon sahipleriyle iletişime geçin ve dakikalar içinde
                      rezervasyon isteği gönderin.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div
                    className="h-100 rounded-4 p-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 146, 60, 0.05) 100%)',
                      border: '2px solid rgba(249, 115, 22, 0.1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.2)';
                      e.currentTarget.style.borderColor = secondaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.1)';
                    }}
                  >
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: 50,
                        height: 50,
                        background: `linear-gradient(135deg, ${secondaryColor} 0%, #fb923c 100%)`,
                        color: 'white',
                        fontSize: '20px'
                      }}
                    >
                      <i className="bi bi-building"></i>
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: darkColor, fontSize: '18px' }}>
                      Salon Sahipleri İçin
                    </h5>
                    <p className="mb-0" style={{ color: '#64748b', lineHeight: '1.6', fontSize: '14px' }}>
                      Salonunuzun ayrıcalıklarını öne çıkarın, gelen talepleri yönetin ve rezervasyon takviminizi düzenli
                      tutun.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistikler Bölümü */}
      <section className="container py-5 mb-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div
              className="h-100 rounded-4 p-5 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                border: '2px solid rgba(99, 102, 241, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: 70,
                  height: 70,
                  background: `linear-gradient(135deg, ${primaryColor} 0%, #8b5cf6 100%)`,
                  color: 'white',
                  fontSize: '28px',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)'
                }}
              >
                <i className="bi bi-building"></i>
              </div>
              <h3 
                className="fw-bold mb-3"
                style={{ 
                  fontSize: '42px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                120+
              </h3>
              <p className="mb-0" style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
                Paketlerini ve uygunluklarını paylaşan seçkin salon sayısı
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="h-100 rounded-4 p-5 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 146, 60, 0.05) 100%)',
                border: '2px solid rgba(249, 115, 22, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 115, 22, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: 70,
                  height: 70,
                  background: `linear-gradient(135deg, ${secondaryColor} 0%, #fb923c 100%)`,
                  color: 'white',
                  fontSize: '28px',
                  boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)'
                }}
              >
                <i className="bi bi-star-fill"></i>
              </div>
              <h3 
                className="fw-bold mb-3"
                style={{ 
                  fontSize: '42px',
                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                4.9/5
              </h3>
              <p className="mb-0" style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
                Etkinlik sonrası geri bildirimlerde çiftlerin memnuniyet puanı ortalaması
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="h-100 rounded-4 p-5 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(45, 212, 191, 0.05) 100%)',
                border: '2px solid rgba(20, 184, 166, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(20, 184, 166, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: 70,
                  height: 70,
                  background: `linear-gradient(135deg, ${accentColor} 0%, #2dd4bf 100%)`,
                  color: 'white',
                  fontSize: '28px',
                  boxShadow: '0 4px 16px rgba(20, 184, 166, 0.3)'
                }}
              >
                <i className="bi bi-clock-fill"></i>
              </div>
              <h3 
                className="fw-bold mb-3"
                style={{ 
                  fontSize: '42px',
                  background: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                48 saat
              </h3>
              <p className="mb-0" style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
                Operasyon ekibimizin yeni salonları onaylama süresinin ortalaması
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Görsel Galeri Bölümü */}
      <section className="container py-5 mb-5">
        <div className="text-center mb-5">
          <h2 
            className="fw-bold mb-3"
            style={{ 
              fontSize: 'clamp(28px, 4vw, 36px)',
              color: darkColor
            }}
          >
            <i className="bi bi-images me-2" style={{ color: primaryColor }}></i>
            Salonlarımızdan Kareler
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Platformumuzda yer alan seçkin salonların atmosferini keşfedin
          </p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '300px',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.15)';
              }}
            >
              <img
                src="/images/bacec54e0ee487c42cd3e4a00e9d9d79.jpg"
                alt="Salon görünümü 1"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '300px',
                boxShadow: '0 4px 16px rgba(249, 115, 22, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(249, 115, 22, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(249, 115, 22, 0.15)';
              }}
            >
              <img
                src="/images/086deedb2098d5b0e6f4520efc38988a.jpg"
                alt="Salon görünümü 2"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '300px',
                boxShadow: '0 4px 16px rgba(20, 184, 166, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(20, 184, 166, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(20, 184, 166, 0.15)';
              }}
            >
              <img
                src="/images/d73a53155ab8944f6c3029b699ff4df7.jpg"
                alt="Salon görünümü 3"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        <div className="row g-4 mt-2">
          <div className="col-md-4">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '300px',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.15)';
              }}
            >
              <img
                src="/images/67c88fe439b8a069a6bd2726ea491d1d.jpg"
                alt="Salon görünümü 4"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '300px',
                boxShadow: '0 4px 16px rgba(249, 115, 22, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(249, 115, 22, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(249, 115, 22, 0.15)';
              }}
            >
              <img
                src="/images/d0a22ef9af08404f2293374470dc683d.jpg"
                alt="Salon görünümü 5"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="position-relative overflow-hidden rounded-4"
              style={{
                height: '300px',
                boxShadow: '0 4px 16px rgba(20, 184, 166, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(20, 184, 166, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(20, 184, 166, 0.15)';
              }}
            >
              <img
                src="/images/99d6f7a3526a21f42765c9fab7782396.jpg"
                alt="Salon görünümü 6"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon Bölümü */}
      <section 
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(139, 92, 246, 0.02) 100%)'
        }}
      >
        <div className="container">
          <div className="row g-5">
            <div className="col-md-6">
              <div
                className="h-100 rounded-4 p-5"
                style={{
                  background: 'white',
                  border: '2px solid rgba(99, 102, 241, 0.1)',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.08)'
                }}
              >
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: 60,
                    height: 60,
                    background: `linear-gradient(135deg, ${primaryColor} 0%, #8b5cf6 100%)`,
                    color: 'white',
                    fontSize: '24px'
                  }}
                >
                  <i className="bi bi-bullseye"></i>
                </div>
                <h3 className="fw-bold mb-4" style={{ color: darkColor, fontSize: '26px' }}>
                  Misyonumuz
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '16px' }}>
                  Düğün salonu arayışını kolaylaştırarak, çiftlerin hayallerindeki günü sorunsuz bir şekilde planlamalarına yardımcı olmak. 
                  Şeffaf fiyatlandırma, güvenilir bilgiler ve kullanıcı dostu bir platform sunarak düğün planlama sürecini dönüştürmek.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="h-100 rounded-4 p-5"
                style={{
                  background: 'white',
                  border: '2px solid rgba(249, 115, 22, 0.1)',
                  boxShadow: '0 4px 16px rgba(249, 115, 22, 0.08)'
                }}
              >
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: 60,
                    height: 60,
                    background: `linear-gradient(135deg, ${secondaryColor} 0%, #fb923c 100%)`,
                    color: 'white',
                    fontSize: '24px'
                  }}
                >
                  <i className="bi bi-eye"></i>
                </div>
                <h3 className="fw-bold mb-4" style={{ color: darkColor, fontSize: '26px' }}>
                  Vizyonumuz
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '16px' }}>
                  Türkiye'nin en güvenilir ve kapsamlı düğün salonu platformu olmak. 
                  Teknolojinin gücünü kullanarak salon sahipleri ve çiftleri bir araya getiren, 
                  sektörü dijitalleştiren öncü bir platform haline gelmek.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

