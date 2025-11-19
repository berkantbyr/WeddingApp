import React from 'react';

// Profesyonel renk paleti
const primaryColor = '#c75b7a';
const secondaryColor = '#e08997';
const accentColor = '#f7b7c3';
const darkColor = '#2f1b25';

const TermsPage = () => {
  const terms = [
    {
      title: 'Hesap Sorumlulukları',
      description: 'Kayıt olurken doğru bilgi vermek, şifrenizi gizli tutmak ve hesabınız üzerinden yapılan tüm işlemlerden sorumlu olmak zorundasınız.',
      icon: 'bi-person-shield',
      color: primaryColor,
      bgColor: 'rgba(199, 91, 122, 0.12)',
      number: '1'
    },
    {
      title: 'Salon Sahipleri İçin',
      description: 'Profildeki fiyat, kapasite ve hizmet bilgilerini güncel tutmak; onaylanan rezervasyonlarda sözleşmeye uygun hizmet sağlamakla yükümlüsünüz.',
      icon: 'bi-building-check',
      color: secondaryColor,
      bgColor: 'rgba(224, 137, 151, 0.15)',
      number: '2'
    },
    {
      title: 'Müşteri Sorumlulukları',
      description: 'Talep formunda belirttiğiniz tarih, kişi sayısı ve özel ihtiyaçların doğru olması gerekir. Salonun iptal/değişiklik koşullarını kabul etmiş sayılırsınız.',
      icon: 'bi-people',
      color: accentColor,
      bgColor: 'rgba(247, 183, 195, 0.25)',
      number: '3'
    },
    {
      title: 'Ödeme İşlemleri',
      description: 'Ödeme altyapısı devreye alındığında işlemler lisanslı ödeme kuruluşları tarafından yürütülür. SalonBulucu, tahsilat komisyonları ve güvenli aktarım protokollerini açıklar.',
      icon: 'bi-credit-card-2-front',
      color: '#b15b85',
      bgColor: 'rgba(177, 91, 133, 0.12)',
      number: '4'
    },
    {
      title: 'Kullanım İhlalleri',
      description: 'Yanlış bilgi paylaşımı, spam talep gönderimi veya üçüncü taraf haklarını ihlal eden davranışlarda hesaplar askıya alınabilir; ciddi ihlallerde kalıcı erişim engellenir.',
      icon: 'bi-exclamation-triangle',
      color: '#f2b6c5',
      bgColor: 'rgba(242, 182, 197, 0.18)',
      number: '5'
    },
    {
      title: 'Fikri Mülkiyet',
      description: 'SalonBulucu markası, yazılımı ve içerikleri telif hakkı kapsamındadır. İzinsiz kopyalama veya dağıtım tespit edildiğinde hukuki haklarımızı kullanırız.',
      icon: 'bi-copyright',
      color: '#e38daa',
      bgColor: 'rgba(227, 141, 170, 0.16)',
      number: '6'
    }
  ];

  return (
    <div className="d-flex flex-column">
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
                    color: '#7a5360',
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
              background: 'linear-gradient(135deg, rgba(199, 91, 122, 0.08) 0%, rgba(247, 183, 195, 0.05) 100%)',
              border: '2px solid rgba(199, 91, 122, 0.15)'
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
                <p style={{ color: '#7a5360', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                  Şartlar zaman zaman güncellenebilir; değişiklikleri bu sayfadan yayınlar ve önemli durumlarda e-posta ile bildiririz.
                  Platformu kullanmaya devam ederek güncel şartları kabul etmiş sayılırsınız. Sorularınız için destek kanalımızdan bize ulaşabilirsiniz.
                </p>
              </div>
              <div className="col-md-4 text-center text-md-end">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: `linear-gradient(135deg, ${primaryColor} 0%, #f7b7c3 100%)`,
                    color: 'white',
                    fontSize: '36px',
                    boxShadow: '0 4px 16px rgba(199, 91, 122, 0.25)'
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
              background: 'linear-gradient(135deg, rgba(247, 183, 195, 0.2) 0%, rgba(255, 239, 244, 0.6) 100%)',
              border: '2px solid rgba(247, 183, 195, 0.35)'
            }}
          >
            <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
              <i className="bi bi-check-circle-fill" style={{ color: accentColor, fontSize: '24px' }}></i>
              <p className="mb-0 fw-semibold" style={{ color: darkColor, fontSize: '16px' }}>
                Platformumuzu kullanarak bu şartları kabul etmiş sayılırsınız.
              </p>
            </div>
            <p className="mb-0 small" style={{ color: '#7a5360', fontSize: '13px' }}>
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

