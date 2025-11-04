import React from 'react';

// Profesyonel renk paleti
const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

const PrivacyPage = () => {
  const privacySections = [
    {
      title: 'Topladığımız Veriler',
      description: 'Hesap bilgileri, rezervasyon geçmişi ve iletişim tercihleri. Platform kullanımınızla ilgili teknik bilgiler ve çerezler.',
      icon: 'bi-database',
      color: primaryColor,
      bgColor: 'rgba(99, 102, 241, 0.1)'
    },
    {
      title: 'Verileri Nasıl Kullanıyoruz',
      description: 'Rezervasyonları kolaylaştırmak, kişiselleştirilmiş öneriler sunmak ve güvenli erişim sağlamak için. Ayrıca platform geliştirme ve hizmet kalitesini artırmak için.',
      icon: 'bi-shield-check',
      color: secondaryColor,
      bgColor: 'rgba(249, 115, 22, 0.1)'
    },
    {
      title: 'Veri Güvenliği',
      description: 'Verilerinizi korumak için endüstri standardı şifreleme ve güvenlik önlemleri kullanıyoruz. Düzenli güvenlik denetimleri yapıyoruz.',
      icon: 'bi-lock',
      color: accentColor,
      bgColor: 'rgba(20, 184, 166, 0.1)'
    },
    {
      title: 'Haklarınız',
      description: 'Destek ekibimizle iletişime geçerek verilerinize erişebilir, güncelleyebilir veya silinmesini talep edebilirsiniz. KVKK kapsamındaki tüm haklarınız korunmaktadır.',
      icon: 'bi-person-check',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      title: 'Çerezler',
      description: 'Platform deneyiminizi iyileştirmek için çerezler kullanıyoruz. Çerez ayarlarınızı tarayıcı ayarlarınızdan yönetebilirsiniz.',
      icon: 'bi-cookie',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      title: 'Üçüncü Taraf Hizmetler',
      description: 'Bazı hizmetler için güvenilir üçüncü taraf sağlayıcılarla çalışıyoruz. Bu sağlayıcılar verilerinizi korumakla yükümlüdür.',
      icon: 'bi-share',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)'
    }
  ];

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
          paddingBottom: '60px'
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <div
              className="d-inline-block px-3 py-1 rounded-pill mb-3 fw-semibold"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
                color: primaryColor,
                fontSize: '14px',
                letterSpacing: '0.5px'
              }}
            >
              <i className="bi bi-shield-lock-fill me-2"></i>Gizlilik Politikası
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
              Verilerinizin Güvenliği Bizim Önceliğimiz
            </h1>
            <p 
              style={{ 
                fontSize: '17px',
                lineHeight: '1.8',
                color: '#475569',
                maxWidth: '700px',
                margin: '0 auto'
              }}
            >
              Gizliliğinize saygı duyuyor ve kişisel verilerinizi korumaya özen gösteriyoruz. Bu politika, SalonBulucu
              platformunda verilerinizi nasıl topladığımızı, kullandığımızı ve sakladığımızı açıklar.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="container py-5 mb-5">
        <div className="row g-4">
          {privacySections.map((section, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div
                className="h-100 rounded-4 p-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  border: `2px solid ${section.bgColor}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 12px 32px ${section.color}25`;
                  e.currentTarget.style.borderColor = section.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = section.bgColor;
                }}
              >
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '55px',
                    height: '55px',
                    background: section.bgColor,
                    color: section.color,
                    fontSize: '24px'
                  }}
                >
                  <i className={`bi ${section.icon}`}></i>
                </div>
                <h5 
                  className="fw-bold mb-3"
                  style={{ 
                    color: darkColor,
                    fontSize: '18px'
                  }}
                >
                  {section.title}
                </h5>
                <p 
                  style={{ 
                    color: '#64748b',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    margin: 0
                  }}
                >
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ek Bilgiler Bölümü */}
        <div className="mt-5">
          <div
            className="rounded-4 p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.03) 100%)',
              border: '2px solid rgba(99, 102, 241, 0.1)'
            }}
          >
            <div className="row g-4 align-items-center">
              <div className="col-md-8">
                <h4 
                  className="fw-bold mb-3"
                  style={{ color: darkColor, fontSize: '24px' }}
                >
                  <i className="bi bi-info-circle-fill me-2" style={{ color: primaryColor }}></i>
                  Önemli Bilgiler
                </h4>
                <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                  Bu gizlilik politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında hazırlanmıştır. 
                  Politika değişikliklerinden haberdar olmak için sayfayı düzenli olarak kontrol etmenizi öneririz. 
                  Sorularınız için bizimle iletişime geçebilirsiniz.
                </p>
              </div>
              <div className="col-md-4 text-center text-md-end">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: `linear-gradient(135deg, ${primaryColor} 0%, #8b5cf6 100%)`,
                    color: 'white',
                    fontSize: '36px',
                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  <i className="bi bi-shield-check"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Son Güncelleme */}
        <div className="mt-4 text-center">
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>
            <i className="bi bi-calendar3 me-2"></i>
            Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

