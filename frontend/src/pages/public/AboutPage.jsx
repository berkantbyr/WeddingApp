import React from 'react';

const dark = '#1e293b';
const muted = '#475569';

const storyParagraphs = [
  'SalonBulucu, düğününü planlayan çiftlerle salon yöneticilerini aynı masa etrafında buluşturmak için tasarlanmış bağımsız bir platformdur. 2021’de, sektördeki bilgi kirliliğini azaltmak ve salon arayışını dakikalara indirmek amacıyla yola çıktık.',
  'Bugün ülke genelindeki pek çok salon, paket detaylarını ve uygunluk durumlarını doğrudan platformda güncelliyor. Çiftler ise kredili veya nakit seçeneklerini, kampanya şartlarını ve yorumları tek ekranda kıyaslayarak karar veriyor.'
];

const principles = [
  'Tüm salon profillerini doğruluyor, eksik bilgi gördüğümüzde hızla güncelliyoruz.',
  'Çiftlerin kararını etkileyen fiyat, kapasite, hizmet kapsamı gibi alanlarda şeffaflık sağlıyoruz.',
  'Salon yöneticilerine talep yönetimi ve raporlama konusunda destek vererek işlerini kolaylaştırıyoruz.'
];

const missionText =
  'Çiftlerle salonları güvenli bir zeminde buluşturmak, planlama sürecini sürprizlerden arındırmak ve her iki tarafın da aynı veriler üzerinden konuşmasını sağlamak. Veriye dayalı önerilerle doğru salonu, doğru çifte buluşturmaya odaklanıyoruz.';

const visionText =
  'Türkiye’de düğün ve etkinlik mekanı seçiminin ilk adresi olmak. Tüm salonların gerçek zamanlı müsaitlik ve paket verilerini erişilebilir kılarak sektörü uçtan uca dijitalleştirmek, doğru kararları dakikalar içinde almak.';

const AboutPage = () => {
  return (
    <div className="d-flex flex-column" style={{ backgroundColor: '#f8fafc' }}>
      <section className="py-5">
        <div className="container">
          <div className="rounded-4 p-4 p-md-5 mb-4" style={{ backgroundColor: '#ffffff', boxShadow: '0 6px 24px rgba(15, 23, 42, 0.05)' }}>
            <h2 className="fw-bold mb-3" style={{ color: dark, fontSize: '24px' }}>
              Hikayemiz
            </h2>
            <div className="d-flex flex-column gap-3" style={{ color: muted, lineHeight: '1.8' }}>
              {storyParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-4 p-4 p-md-5 mb-4" style={{ backgroundColor: '#ffffff', boxShadow: '0 6px 24px rgba(15, 23, 42, 0.05)' }}>
            <h2 className="fw-bold mb-3" style={{ color: dark, fontSize: '24px' }}>
              Çalışma Prensiplerimiz
            </h2>
            <ul className="mb-0" style={{ color: muted, lineHeight: '1.9', paddingLeft: '18px' }}>
              {principles.map((item, index) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="h-100 rounded-4 p-4 p-md-5" style={{ backgroundColor: '#ffffff', boxShadow: '0 6px 24px rgba(15, 23, 42, 0.05)' }}>
                <h3 className="fw-bold mb-3" style={{ color: dark }}>
                  Misyonumuz
                </h3>
                <p className="mb-0" style={{ color: muted, lineHeight: '1.8' }}>
                  {missionText}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="h-100 rounded-4 p-4 p-md-5" style={{ backgroundColor: '#ffffff', boxShadow: '0 6px 24px rgba(15, 23, 42, 0.05)' }}>
                <h3 className="fw-bold mb-3" style={{ color: dark }}>
                  Vizyonumuz
                </h3>
                <p className="mb-0" style={{ color: muted, lineHeight: '1.8' }}>
                  {visionText}
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

