import React, { useState } from 'react';

// Profesyonel renk paleti
const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

const PrivacyPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const privacySections = [
    {
      title: 'Topladığımız Veriler',
      description: 'Hesap bilgileri, rezervasyon geçmişi ve iletişim tercihleri. Platform kullanımınızla ilgili teknik bilgiler ve çerezler.',
      icon: 'bi-database',
      color: primaryColor,
      bgColor: 'rgba(99, 102, 241, 0.1)',
      details: `
        <h3>Topladığımız Veri Türleri</h3>
        <ul>
          <li><strong>Hesap Bilgileri:</strong> Ad, soyad, e-posta adresi, telefon numarası, şirket adı (salon sahipleri için)</li>
          <li><strong>Rezervasyon Bilgileri:</strong> Rezervasyon geçmişi, tercih edilen tarihler, misafir sayıları, paket seçimleri</li>
          <li><strong>İletişim Tercihleri:</strong> Bildirim tercihleri, e-posta abonelik durumu</li>
          <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri, kullanım istatistikleri</li>
          <li><strong>Çerezler:</strong> Oturum çerezleri, tercih çerezleri, analitik çerezler</li>
        </ul>
        <p>Bu veriler, hizmetlerimizi sunmak ve platform deneyiminizi iyileştirmek için toplanmaktadır.</p>
      `
    },
    {
      title: 'Verileri Nasıl Kullanıyoruz',
      description: 'Rezervasyonları kolaylaştırmak, kişiselleştirilmiş öneriler sunmak ve güvenli erişim sağlamak için. Ayrıca platform geliştirme ve hizmet kalitesini artırmak için.',
      icon: 'bi-shield-check',
      color: secondaryColor,
      bgColor: 'rgba(249, 115, 22, 0.1)',
      details: `
        <h3>Veri Kullanım Amaçları</h3>
        <ul>
          <li><strong>Hizmet Sunumu:</strong> Rezervasyon işlemlerini gerçekleştirmek, salon sahipleri ve çiftleri eşleştirmek</li>
          <li><strong>Kişiselleştirme:</strong> Size özel salon önerileri sunmak, tercihlerinize göre içerik göstermek</li>
          <li><strong>Güvenlik:</strong> Hesap güvenliğinizi sağlamak, dolandırıcılık ve kötüye kullanımı önlemek</li>
          <li><strong>İletişim:</strong> Rezervasyon durumları, önemli bildirimler ve hizmet güncellemeleri hakkında bilgilendirmek</li>
          <li><strong>Geliştirme:</strong> Platform performansını analiz etmek, yeni özellikler geliştirmek</li>
          <li><strong>Yasal Yükümlülükler:</strong> Yasal gereklilikleri yerine getirmek, hukuki taleplere yanıt vermek</li>
        </ul>
      `
    },
    {
      title: 'Veri Güvenliği',
      description: 'Verilerinizi korumak için endüstri standardı şifreleme ve güvenlik önlemleri kullanıyoruz. Düzenli güvenlik denetimleri yapıyoruz.',
      icon: 'bi-lock',
      color: accentColor,
      bgColor: 'rgba(20, 184, 166, 0.1)',
      details: `
        <h3>Güvenlik Önlemlerimiz</h3>
        <ul>
          <li><strong>Şifreleme:</strong> Tüm veriler SSL/TLS şifreleme ile korunmaktadır</li>
          <li><strong>Güvenli Sunucular:</strong> Verileriniz güvenli ve yedekli sunucularda saklanmaktadır</li>
          <li><strong>Erişim Kontrolü:</strong> Verilere sadece yetkili personel erişebilir ve tüm erişimler kayıt altına alınır</li>
          <li><strong>Düzenli Denetimler:</strong> Güvenlik açıklarını tespit etmek için düzenli güvenlik denetimleri yapılmaktadır</li>
          <li><strong>Güncellemeler:</strong> Sistemlerimiz düzenli olarak güncellenir ve güvenlik yamaları uygulanır</li>
          <li><strong>Eğitim:</strong> Personelimiz veri güvenliği konusunda düzenli eğitimler almaktadır</li>
        </ul>
        <p>Verilerinizin güvenliği bizim için en önemli önceliktir.</p>
      `
    },
    {
      title: 'Haklarınız',
      description: 'Destek ekibimizle iletişime geçerek verilerinize erişebilir, güncelleyebilir veya silinmesini talep edebilirsiniz. KVKK kapsamındaki tüm haklarınız korunmaktadır.',
      icon: 'bi-person-check',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      details: `
        <h3>KVKK Kapsamındaki Haklarınız</h3>
        <ul>
          <li><strong>Bilgi Alma Hakkı:</strong> Hangi kişisel verilerinizin işlendiğini öğrenme</li>
          <li><strong>Erişim Hakkı:</strong> İşlenen kişisel verilerinize erişme</li>
          <li><strong>Düzeltme Hakkı:</strong> Yanlış veya eksik verilerinizin düzeltilmesini isteme</li>
          <li><strong>Silme Hakkı:</strong> Verilerinizin silinmesini talep etme</li>
          <li><strong>İtiraz Hakkı:</strong> Verilerinizin işlenmesine itiraz etme</li>
          <li><strong>Veri Taşınabilirliği:</strong> Verilerinizin başka bir hizmete aktarılmasını isteme</li>
        </ul>
        <p>Haklarınızı kullanmak için <a href="/contact" style="color: #8b5cf6; text-decoration: underline;">iletişim</a> sayfamızdan bizimle iletişime geçebilirsiniz.</p>
      `
    },
    {
      title: 'Çerezler',
      description: 'Platform deneyiminizi iyileştirmek için çerezler kullanıyoruz. Çerez ayarlarınızı tarayıcı ayarlarınızdan yönetebilirsiniz.',
      icon: 'bi-cookie',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      details: `
        <h3>Çerez Türleri ve Kullanım Amaçları</h3>
        <ul>
          <li><strong>Zorunlu Çerezler:</strong> Platformun temel işlevlerini sağlamak için gerekli çerezler</li>
          <li><strong>Oturum Çerezleri:</strong> Giriş yaptığınızda oturumunuzu korumak için kullanılır</li>
          <li><strong>Tercih Çerezleri:</strong> Dil, tema gibi tercihlerinizi hatırlamak için</li>
          <li><strong>Analitik Çerezler:</strong> Platform kullanımını analiz etmek ve iyileştirmeler yapmak için</li>
          <li><strong>Pazarlama Çerezleri:</strong> Size özel içerik ve reklamlar göstermek için (izin verirseniz)</li>
        </ul>
        <h3>Çerez Yönetimi</h3>
        <p>Çerez ayarlarınızı tarayıcınızın ayarlar bölümünden yönetebilirsiniz. Ancak bazı çerezleri devre dışı bırakmanız platformun bazı özelliklerinin çalışmamasına neden olabilir.</p>
        <p>Daha fazla bilgi için <a href="/cookies" style="color: #f59e0b; text-decoration: underline;">Çerez Politikası</a> sayfamızı ziyaret edebilirsiniz.</p>
      `
    },
    {
      title: 'Üçüncü Taraf Hizmetler',
      description: 'Bazı hizmetler için güvenilir üçüncü taraf sağlayıcılarla çalışıyoruz. Bu sağlayıcılar verilerinizi korumakla yükümlüdür.',
      icon: 'bi-share',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)',
      details: `
        <h3>Kullandığımız Üçüncü Taraf Hizmetler</h3>
        <ul>
          <li><strong>Hosting Hizmetleri:</strong> Verilerinizi güvenli sunucularda barındırmak için</li>
          <li><strong>Ödeme İşlemcileri:</strong> Güvenli ödeme işlemleri için (gelecekte eklenecek)</li>
          <li><strong>Analitik Araçları:</strong> Platform kullanımını analiz etmek için</li>
          <li><strong>E-posta Hizmetleri:</strong> Bildirimler ve iletişim için</li>
        </ul>
        <h3>Veri Koruma</h3>
        <p>Tüm üçüncü taraf hizmet sağlayıcılarımız, verilerinizi korumak için gerekli güvenlik önlemlerini almıştır. Bu sağlayıcılar:</p>
        <ul>
          <li>Endüstri standardı güvenlik protokollerini kullanır</li>
          <li>KVKK ve GDPR gibi veri koruma yasalarına uyumludur</li>
          <li>Verilerinizi sadece belirtilen amaçlar için kullanır</li>
          <li>Verilerinizi üçüncü taraflarla paylaşmaz</li>
        </ul>
      `
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
                onClick={() => setSelectedSection(section)}
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

      {/* Modal */}
      {selectedSection && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1050,
            padding: '20px'
          }}
          onClick={() => setSelectedSection(null)}
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
              border: `3px solid ${selectedSection.color}`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Kapat Butonu */}
            <button
              onClick={() => setSelectedSection(null)}
              className="position-absolute top-0 end-0 m-3 border-0 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                background: selectedSection.bgColor,
                color: selectedSection.color,
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'rotate(90deg) scale(1.1)';
                e.target.style.background = selectedSection.color;
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'rotate(0deg) scale(1)';
                e.target.style.background = selectedSection.bgColor;
                e.target.style.color = selectedSection.color;
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
                background: selectedSection.bgColor,
                color: selectedSection.color,
                fontSize: '32px',
                boxShadow: `0 4px 16px ${selectedSection.color}30`
              }}
            >
              <i className={`bi ${selectedSection.icon}`}></i>
            </div>

            {/* Başlık */}
            <h2
              className="fw-bold mb-4"
              style={{
                color: darkColor,
                fontSize: '28px'
              }}
            >
              {selectedSection.title}
            </h2>

            {/* İçerik */}
            <div
              dangerouslySetInnerHTML={{ __html: selectedSection.details }}
              style={{
                color: '#475569',
                lineHeight: '1.8',
                fontSize: '16px'
              }}
            />

            {/* Kapat Butonu (Alt) */}
            <div className="mt-4 text-end">
              <button
                onClick={() => setSelectedSection(null)}
                className="btn fw-semibold"
                style={{
                  background: `linear-gradient(135deg, ${selectedSection.color} 0%, ${selectedSection.color}dd 100%)`,
                  color: 'white',
                  borderRadius: '8px',
                  padding: '10px 30px',
                  fontSize: '16px',
                  border: 'none'
                }}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPage;

