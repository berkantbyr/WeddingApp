import React from 'react';

// Profesyonel renk paleti
const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

const TermsPage = () => {
  const terms = [
    {
      title: 'Hesap Sorumlulukları',
      description: 'Hesaplar doğru bilgiler içermeli ve güvenli şekilde korunmalıdır. Şifrelerinizi güvende tutmak ve hesap güvenliğinizden sorumlusunuz.',
      icon: 'bi-person-shield',
      color: primaryColor,
      bgColor: 'rgba(99, 102, 241, 0.1)',
      number: '1'
    },
    {
      title: 'Salon Sahipleri İçin',
      description: 'Salon sahipleri, onaylanan rezervasyon taleplerini yerine getirmekle yükümlüdür. Rezervasyon bilgilerini doğru ve güncel tutmalıdırlar.',
      icon: 'bi-building-check',
      color: secondaryColor,
      bgColor: 'rgba(249, 115, 22, 0.1)',
      number: '2'
    },
    {
      title: 'Müşteri Sorumlulukları',
      description: 'Müşteriler, misafir sayısı ve etkinlik detaylarını doğru iletmekten sorumludur. Rezervasyon iptal koşullarını dikkatlice okumalıdırlar.',
      icon: 'bi-people',
      color: accentColor,
      bgColor: 'rgba(20, 184, 166, 0.1)',
      number: '3'
    },
    {
      title: 'Ödeme İşlemleri',
      description: 'Ödeme özelliği aktif edildiğinde işlemler güvenli üçüncü taraf sağlayıcılar üzerinden gerçekleştirilir. Tüm ödemeler şifrelenmiş kanallar üzerinden yapılır.',
      icon: 'bi-credit-card-2-front',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      number: '4'
    },
    {
      title: 'Kullanım İhlalleri',
      description: 'Bu şartları ihlal eden hesaplar SalonBulucu tarafından askıya alınabilir. Ciddi ihlallerde kalıcı yasaklama uygulanabilir.',
      icon: 'bi-exclamation-triangle',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      number: '5'
    },
    {
      title: 'Fikri Mülkiyet',
      description: 'Platform içeriği, tasarım ve markalar SalonBulucu\'ya aittir. İzinsiz kullanım yasal işlemlerle sonuçlanabilir.',
      icon: 'bi-copyright',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)',
      number: '6'
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
              <i className="bi bi-file-text-fill me-2"></i>Kullanım Şartları
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
              Haklarınız ve Sorumluluklarınız
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
              SalonBulucu'yu kullanarak aşağıdaki şartları kabul etmiş olursunuz. Müşteri, salon sahibi veya yönetici olarak
              haklarınızı ve sorumluluklarınızı anlamak için lütfen dikkatlice okuyun.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="container py-5 mb-5">
        <div className="row g-4">
          {terms.map((term, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div
                className="h-100 rounded-4 p-4 position-relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  border: `2px solid ${term.bgColor}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  paddingTop: '60px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 12px 32px ${term.color}25`;
                  e.currentTarget.style.borderColor = term.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = term.bgColor;
                }}
              >
                {/* Numara Rozeti */}
                <div
                  className="position-absolute top-0 start-0 rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                  style={{
                    width: '50px',
                    height: '50px',
                    background: `linear-gradient(135deg, ${term.color} 0%, ${term.color}dd 100%)`,
                    color: 'white',
                    fontSize: '20px',
                    margin: '10px',
                    boxShadow: `0 4px 12px ${term.color}40`
                  }}
                >
                  {term.number}
                </div>

                {/* İkon */}
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '55px',
                    height: '55px',
                    background: term.bgColor,
                    color: term.color,
                    fontSize: '24px',
                    marginTop: '10px'
                  }}
                >
                  <i className={`bi ${term.icon}`}></i>
                </div>

                {/* Başlık */}
                <h5 
                  className="fw-bold mb-3"
                  style={{ 
                    color: darkColor,
                    fontSize: '18px'
                  }}
                >
                  {term.title}
                </h5>

                {/* Açıklama */}
                <p 
                  style={{ 
                    color: '#64748b',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    margin: 0
                  }}
                >
                  {term.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Önemli Notlar Bölümü */}
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
                  Önemli Notlar
                </h4>
                <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                  Bu kullanım şartları, platformunuzu kullanırken uymanız gereken kuralları ve sorumluluklarınızı belirler. 
                  Şartlar değişiklik gösterebilir ve değişikliklerden haberdar olmak için sayfayı düzenli olarak kontrol etmenizi öneririz. 
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
                  <i className="bi bi-file-earmark-text"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kabul Etme Bildirimi */}
        <div className="mt-4">
          <div
            className="rounded-4 p-4 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(45, 212, 191, 0.05) 100%)',
              border: '2px solid rgba(20, 184, 166, 0.2)'
            }}
          >
            <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
              <i className="bi bi-check-circle-fill" style={{ color: accentColor, fontSize: '24px' }}></i>
              <p className="mb-0 fw-semibold" style={{ color: darkColor, fontSize: '16px' }}>
                Platformumuzu kullanarak bu şartları kabul etmiş sayılırsınız.
              </p>
            </div>
            <p className="mb-0 small" style={{ color: '#64748b', fontSize: '13px' }}>
              Şartları okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.
            </p>
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

export default TermsPage;

