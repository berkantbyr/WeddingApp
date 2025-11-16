import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Profesyonel renk paleti
const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

// Galeri resimleri - mevcut resimlerle güncellendi
const galleryImages = [
  '/images/ankara-salon.jpg',
  '/images/antalya-salon.jpg',
  '/images/rize-salon.jpg',
  '/images/1406fe80cc1ca7c7fe7602d7d0dd7ef9.jpg',
  '/images/19572e3fe6b6a653db640affe74bd4b7.jpg',
  '/images/665002685e8c6f536a4378b229a271aa.jpg',
  '/images/eros.jpg',
  '/images/istanbul.webp'
];

const AboutPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

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
                      onError={(e) => {
                        console.error('Resim yüklenemedi:', image);
                        // Fallback resim göster
                        e.target.src = '/images/ankara-salon.jpg';
                        // Eğer fallback de yüklenemezse, placeholder göster
                        e.target.onerror = () => {
                          e.target.style.display = 'none';
                        };
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
                    onClick={() => setSelectedCard({
                      type: 'couples',
                      title: 'Çiftler İçin',
                      icon: 'bi-heart-fill',
                      color: primaryColor,
                      bgColor: 'rgba(99, 102, 241, 0.1)',
                      content: `
                        <h3>Çiftler İçin SalonBulucu</h3>
                        <p>SalonBulucu platformu, düğün planlamanızı kolaylaştırmak için tasarlandı. İşte size sunduğumuz özellikler:</p>
                        
                        <h4>🔍 Salon Keşfetme</h4>
                        <ul>
                          <li>Şehir, kapasite ve bütçe filtreleri ile size uygun salonları bulun</li>
                          <li>Detaylı salon bilgileri, fotoğraflar ve paket seçeneklerini inceleyin</li>
                          <li>Salon sahiplerinin iletişim bilgilerine kolayca ulaşın</li>
                        </ul>
                        
                        <h4>📦 Paket Karşılaştırma</h4>
                        <ul>
                          <li>Farklı salonların paketlerini yan yana karşılaştırın</li>
                          <li>Fiyat, içerik ve hizmetleri detaylıca inceleyin</li>
                          <li>Bütçenize en uygun paketi seçin</li>
                        </ul>
                        
                        <h4>💬 İletişim ve Rezervasyon</h4>
                        <ul>
                          <li>Salon sahipleriyle doğrudan iletişime geçin</li>
                          <li>Dakikalar içinde rezervasyon talebi oluşturun</li>
                          <li>Rezervasyon durumunuzu takip edin</li>
                        </ul>
                        
                        <h4>📱 Kolay Yönetim</h4>
                        <ul>
                          <li>Tüm rezervasyonlarınızı tek bir yerden yönetin</li>
                          <li>Favori salonlarınızı kaydedin</li>
                          <li>Rezervasyon geçmişinize kolayca erişin</li>
                        </ul>
                        
                        <p style="margin-top: 20px;"><strong>Hemen başlamak için:</strong> <a href="/venues" style="color: ${primaryColor}; text-decoration: underline;">Salonları keşfedin</a> veya <a href="/register" style="color: ${primaryColor}; text-decoration: underline;">hesap oluşturun</a>.</p>
                      `
                    })}
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
                    onClick={() => setSelectedCard({
                      type: 'owners',
                      title: 'Salon Sahipleri İçin',
                      icon: 'bi-building',
                      color: secondaryColor,
                      bgColor: 'rgba(249, 115, 22, 0.1)',
                      content: `
                        <h3>Salon Sahipleri İçin SalonBulucu</h3>
                        <p>SalonBulucu platformu, salonunuzu daha fazla çifte ulaştırmanızı ve işinizi büyütmenizi sağlar. İşte size sunduğumuz özellikler:</p>
                        
                        <h4>🏢 Salon Profili Oluşturma</h4>
                        <ul>
                          <li>Salonunuzun detaylı bilgilerini, fotoğraflarını ve özelliklerini ekleyin</li>
                          <li>Kapasite, konum ve atmosfer bilgilerinizi paylaşın</li>
                          <li>Profesyonel bir salon profili oluşturun</li>
                        </ul>
                        
                        <h4>📋 Paket Yönetimi</h4>
                        <ul>
                          <li>Farklı paket seçeneklerinizi oluşturun ve yönetin</li>
                          <li>Fiyatlandırmanızı şeffaf bir şekilde sunun</li>
                          <li>Opsiyonel hizmetlerinizi ekleyin</li>
                        </ul>
                        
                        <h4>📥 Rezervasyon Yönetimi</h4>
                        <ul>
                          <li>Gelen rezervasyon taleplerini görüntüleyin</li>
                          <li>Talepleri onaylayın veya reddedin</li>
                          <li>Rezervasyon takviminizi düzenli tutun</li>
                        </ul>
                        
                        <h4>📊 İstatistikler ve Analiz</h4>
                        <ul>
                          <li>Salonunuzun görüntülenme sayılarını takip edin</li>
                          <li>Rezervasyon istatistiklerinizi inceleyin</li>
                          <li>Performansınızı değerlendirin</li>
                        </ul>
                        
                        <h4>💼 İş Geliştirme</h4>
                        <ul>
                          <li>Daha fazla çifte ulaşın ve rezervasyonlarınızı artırın</li>
                          <li>Profesyonel bir online varlık oluşturun</li>
                          <li>Müşteri portföyünüzü genişletin</li>
                        </ul>
                        
                        <p style="margin-top: 20px;"><strong>Hemen başlamak için:</strong> <a href="/register" style="color: ${secondaryColor}; text-decoration: underline;">Salon sahibi olarak kayıt olun</a> ve salonunuzu ekleyin.</p>
                      `
                    })}
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
                src="/images/ankara-salon.jpg"
                alt="Salon görünümü 1"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '/images/antalya-salon.jpg';
                }}
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
                src="/images/antalya-salon.jpg"
                alt="Salon görünümü 2"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '/images/rize-salon.jpg';
                }}
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
                src="/images/rize-salon.jpg"
                alt="Salon görünümü 3"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '/images/1406fe80cc1ca7c7fe7602d7d0dd7ef9.jpg';
                }}
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
                src="/images/1406fe80cc1ca7c7fe7602d7d0dd7ef9.jpg"
                alt="Salon görünümü 4"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '/images/19572e3fe6b6a653db640affe74bd4b7.jpg';
                }}
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
                src="/images/19572e3fe6b6a653db640affe74bd4b7.jpg"
                alt="Salon görünümü 5"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '/images/665002685e8c6f536a4378b229a271aa.jpg';
                }}
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
                src="/images/665002685e8c6f536a4378b229a271aa.jpg"
                alt="Salon görünümü 6"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '/images/eros.jpg';
                }}
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

      {/* Modal */}
      {selectedCard && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1050,
            padding: '20px'
          }}
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="rounded-4 p-5 position-relative"
            style={{
              background: 'white',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: `3px solid ${selectedCard.color}`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .modal-content h3 {
                background: linear-gradient(135deg, ${selectedCard.color} 0%, ${selectedCard.color}dd 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 26px;
                font-weight: bold;
                margin-bottom: 20px;
              }
              .modal-content h4 {
                color: ${selectedCard.color};
                font-size: 20px;
                font-weight: bold;
                margin-top: 25px;
                margin-bottom: 15px;
              }
              .modal-content ul {
                list-style: none;
                padding-left: 0;
                margin: 15px 0;
              }
              .modal-content ul li {
                color: #475569;
                line-height: 1.8;
                font-size: 16px;
                margin-bottom: 10px;
                padding: 10px 15px 10px 40px;
                background: ${selectedCard.bgColor};
                border-radius: 8px;
                border-left: 4px solid ${selectedCard.color};
                position: relative;
              }
              .modal-content ul li:before {
                content: "✓";
                position: absolute;
                left: 15px;
                color: ${selectedCard.color};
                font-weight: bold;
                font-size: 16px;
              }
              .modal-content p {
                color: #475569;
                line-height: '1.8';
                font-size: 16px;
                margin-bottom: 15px;
              }
              .modal-content a {
                color: ${selectedCard.color};
                text-decoration: underline;
                font-weight: 600;
              }
            `}</style>

            {/* Kapat Butonu */}
            <button
              onClick={() => setSelectedCard(null)}
              className="position-absolute top-0 end-0 m-3 border-0 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                background: selectedCard.bgColor,
                color: selectedCard.color,
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'rotate(90deg) scale(1.1)';
                e.target.style.background = selectedCard.color;
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'rotate(0deg) scale(1)';
                e.target.style.background = selectedCard.bgColor;
                e.target.style.color = selectedCard.color;
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {/* İkon */}
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
              style={{
                width: '70px',
                height: '70px',
                background: selectedCard.bgColor,
                color: selectedCard.color,
                fontSize: '32px',
                boxShadow: `0 4px 16px ${selectedCard.color}30`
              }}
            >
              <i className={`bi ${selectedCard.icon}`}></i>
            </div>

            {/* İçerik */}
            <div
              className="modal-content"
              dangerouslySetInnerHTML={{ __html: selectedCard.content }}
            />

            {/* Butonlar */}
            <div className="mt-4 d-flex gap-2 justify-content-end flex-wrap">
              <button
                onClick={() => setSelectedCard(null)}
                className="btn fw-semibold"
                style={{
                  background: `linear-gradient(135deg, ${selectedCard.color} 0%, ${selectedCard.color}dd 100%)`,
                  color: 'white',
                  borderRadius: '8px',
                  padding: '10px 30px',
                  fontSize: '16px',
                  border: 'none'
                }}
              >
                Kapat
              </button>
              {selectedCard.type === 'couples' && (
                <button
                  onClick={() => {
                    setSelectedCard(null);
                    navigate('/venues');
                  }}
                  className="btn fw-semibold"
                  style={{
                    background: 'white',
                    color: selectedCard.color,
                    borderRadius: '8px',
                    padding: '10px 30px',
                    fontSize: '16px',
                    border: `2px solid ${selectedCard.color}`
                  }}
                >
                  Salonları Keşfet
                </button>
              )}
              {selectedCard.type === 'owners' && (
                <button
                  onClick={() => {
                    setSelectedCard(null);
                    navigate('/register');
                  }}
                  className="btn fw-semibold"
                  style={{
                    background: 'white',
                    color: selectedCard.color,
                    borderRadius: '8px',
                    padding: '10px 30px',
                    fontSize: '16px',
                    border: `2px solid ${selectedCard.color}`
                  }}
                >
                  Kayıt Ol
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;

