import React from 'react';

const primaryColor = '#c75b7a';
const secondaryColor = '#e08997';
const accentColor = '#f7b7c3';
const darkColor = '#2f1b25';

const contactCards = [
  {
    icon: 'bi-envelope-fill',
    label: 'E-posta',
    value: 'support@salonbulucu.com',
    color: '#c75b7a',
    border: 'rgba(199, 91, 122, 0.2)'
  },
  {
    icon: 'bi-telephone-fill',
    label: 'Telefon',
    value: '+90 (212) 555 00 00',
    color: '#e08997',
    border: 'rgba(224, 137, 151, 0.25)'
  },
  {
    icon: 'bi-geo-alt-fill',
    label: 'Ofis',
    value: 'Levent Mahallesi, İstanbul',
    color: '#b15b85',
    border: 'rgba(177, 91, 133, 0.2)'
  }
];

const workingHours = [
  { day: 'Pazartesi - Cuma', time: '09:00 - 18:00' },
  { day: 'Cumartesi', time: '10:00 - 16:00' },
  { day: 'Pazar', time: 'Kapalı' }
];

const ContactPage = () => {
  return (
    <div
      className="d-flex flex-column"
      style={{
        minHeight: '100%',
        background: 'linear-gradient(180deg, #fff6f8 0%, #ffeef3 100%)'
      }}
    >
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill fw-semibold mb-3"
              style={{
                background: 'rgba(199, 91, 122, 0.12)',
                color: primaryColor,
                fontSize: '13px',
                letterSpacing: '0.4px'
              }}
            >
              <i className="bi bi-chat-dots"></i>
              Bize Ulaşın
            </div>
            <p
              className="mb-0"
              style={{
                color: '#7a5360',
                maxWidth: '560px',
                margin: '0 auto',
                fontSize: '16px'
              }}
            >
              Ekibimize en hızlı şekilde ulaşmanıza yardımcı olacak tüm kanalları aşağıda bulabilirsiniz.
            </p>
          </div>

          <div className="row g-4 mb-4 justify-content-center">
            {contactCards.map((card) => (
              <div key={card.label} className="col-md-6 col-lg-4">
                <div
                  className="h-100 rounded-4 p-4"
                  style={{
                    background: '#fffdfd',
                    border: `1px solid ${card.border}`,
                    boxShadow: `0 12px 30px ${card.border}`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: 50,
                        height: 50,
                        background: `${card.color}12`,
                        color: card.color,
                        fontSize: '20px'
                      }}
                    >
                      <i className={`bi ${card.icon}`}></i>
                    </div>
                    <div>
                      <div className="fw-semibold" style={{ color: darkColor, fontSize: '15px' }}>
                        {card.label}
                      </div>
                      <div style={{ color: '#7a5360' }}>{card.value}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-8 col-xl-6 mx-auto">
            <div
              className="rounded-4 p-4 p-md-5"
              style={{
                background: 'linear-gradient(135deg, rgba(199, 91, 122, 0.12), rgba(247, 183, 195, 0.12))',
                border: '1px solid rgba(199, 91, 122, 0.25)',
                boxShadow: '0 15px 40px rgba(199, 91, 122, 0.15)'
              }}
            >
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: 56,
                    height: 56,
                    background: 'white',
                    color: primaryColor,
                    fontSize: '22px',
                    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)'
                  }}
                >
                  <i className="bi bi-clock-history"></i>
                </div>
                <div>
                  <div className="fw-bold" style={{ color: darkColor, fontSize: '17px' }}>
                    Çalışma Saatleri
                  </div>
                  <small style={{ color: '#7a5360' }}>Mesajlarınıza aynı gün içinde dönüş yapıyoruz.</small>
                </div>
              </div>
              <div className="d-flex flex-column gap-3">
                {workingHours.map((item) => (
                  <div
                    key={item.day}
                    className="d-flex justify-content-between align-items-center rounded-3 px-3 py-2"
                    style={{ background: 'rgba(255,255,255,0.75)' }}
                  >
                    <span className="fw-semibold" style={{ color: darkColor }}>
                      {item.day}
                    </span>
                    <span style={{ color: '#7a5360' }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

