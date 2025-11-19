import React from 'react';

// Profesyonel renk paleti
const primaryColor = '#c75b7a';
const secondaryColor = '#e08997';
const accentColor = '#f7b7c3';
const darkColor = '#2f1b25';

const PrivacyPage = () => {
  const privacySections = [
    {
      title: 'Topladığımız Veriler',
      description: 'Hesap açarken paylaştığınız kimlik ve iletişim bilgileri, rezervasyon talepleriniz, salon sahiplerinin paket içerikleri ve platform üzerinde bıraktığınız mesajlar.',
      icon: 'bi-database',
      color: primaryColor,
      bgColor: 'rgba(199, 91, 122, 0.12)'
    },
    {
      title: 'Veri İşleme Amaçlarımız',
      description: 'Rezervasyon sürecini tamamlamak, çiftlere uygun salonları önermek, dolandırıcılık girişimlerini engellemek ve hizmet kalitesini ölçmek için verileri işleriz.',
      icon: 'bi-shield-check',
      color: secondaryColor,
      bgColor: 'rgba(224, 137, 151, 0.15)'
    },
    {
      title: 'Saklama Süresi ve Güvenlik',
      description: 'Yasal zorunluluklar kapsamında verileri en fazla 5 yıl saklıyoruz. TLS şifreleme, erişim logları ve düzenli penetrasyon testleriyle altyapıyı koruyoruz.',
      icon: 'bi-lock',
      color: accentColor,
      bgColor: 'rgba(247, 183, 195, 0.2)'
    },
    {
      title: 'Haklarınız ve Tercihleriniz',
      description: 'KVKK ve GDPR kapsamındaki erişim, düzeltme, silme, işlemeyi kısıtlama ve itiraz haklarınızı support@salonbulucu.com üzerinden kullanabilirsiniz.',
      icon: 'bi-person-check',
      color: '#b15b85',
      bgColor: 'rgba(177, 91, 133, 0.12)'
    },
    {
      title: 'Çerez Tercihleri',
      description: 'Zorunlu çerezler oturumunuzu korurken, analitik ve pazarlama çerezleri isteğe bağlıdır. Ayarlarınızı tarayıcınızdan veya çerez banner’ımızdan yönetebilirsiniz.',
      icon: 'bi-cookie',
      color: '#f2b6c5',
      bgColor: 'rgba(242, 182, 197, 0.2)'
    },
    {
      title: 'Üçüncü Taraf Paylaşımları',
      description: 'Ödeme servisleri, bulut sağlayıcıları ve müşteri destek araçları ile çalışırız. Bu firmalarla veri işleme sözleşmeleri yapar ve verilerinizi yalnızca hizmet sunmak için paylaşırız.',
      icon: 'bi-share',
      color: '#e38daa',
      bgColor: 'rgba(227, 141, 170, 0.16)'
    }
  ];

  return (
    <div className="d-flex flex-column">
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
                    color: '#7a5360',
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
                  Önemli Bilgiler
                </h4>
                <p style={{ color: '#7a5360', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                  Bu metin 6698 sayılı KVKK ve Avrupa veri koruma standartları dikkate alınarak hazırlandı.
                  Politika güncellemelerini bu sayfadan duyuruyor, kritik değişikliklerde e-posta bildirimi gönderiyoruz.
                  Veri sorumlusu olarak taleplerinizi yazılı veya destek e-postamız üzerinden kabul ediyoruz.
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

