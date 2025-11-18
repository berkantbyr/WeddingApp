import React from 'react';

const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

const contactCards = [
  {
    icon: 'bi-envelope-fill',
    label: 'E-posta',
    value: 'support@salonbulucu.com',
    color: '#8b5cf6',
    border: 'rgba(139, 92, 246, 0.15)'
  },
  {
    icon: 'bi-telephone-fill',
    label: 'Telefon',
    value: '+90 (212) 555 00 00',
    color: '#f97316',
    border: 'rgba(249, 115, 22, 0.18)'
  },
  {
    icon: 'bi-geo-alt-fill',
    label: 'Ofis',
    value: 'Levent Mahallesi, İstanbul',
    color: '#14b8a6',
    border: 'rgba(20, 184, 166, 0.18)'
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
        background: 'linear-gradient(180deg, #f8f9ff 0%, #fdf8ff 100%)'
      }}
    >
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill fw-semibold mb-3"
              style={{
                background: 'rgba(99, 102, 241, 0.08)',
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
                color: '#64748b',
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
                    background: 'white',
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
                      <div className="fw-semibold" style={{ color: '#1f2937', fontSize: '15px' }}>
                        {card.label}
                      </div>
                      <div style={{ color: '#64748b' }}>{card.value}</div>
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
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(59, 130, 246, 0.08))',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                boxShadow: '0 15px 40px rgba(99, 102, 241, 0.15)'
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
                  <div className="fw-bold" style={{ color: '#1f2937', fontSize: '17px' }}>
                    Çalışma Saatleri
                  </div>
                  <small style={{ color: '#475569' }}>Mesajlarınıza aynı gün içinde dönüş yapıyoruz.</small>
                </div>
              </div>
              <div className="d-flex flex-column gap-3">
                {workingHours.map((item) => (
                  <div
                    key={item.day}
                    className="d-flex justify-content-between align-items-center rounded-3 px-3 py-2"
                    style={{ background: 'rgba(255,255,255,0.75)' }}
                  >
                    <span className="fw-semibold" style={{ color: '#334155' }}>
                      {item.day}
                    </span>
                    <span style={{ color: '#475569' }}>{item.time}</span>
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

