import React, { useState } from 'react';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';

// Profesyonel renk paleti
const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  // İletişim bilgileri
  const contactInfo = [
    {
      icon: 'bi-envelope-fill',
      label: 'E-posta',
      value: 'support@salonbulucu.com',
      color: primaryColor,
      bgColor: 'rgba(99, 102, 241, 0.1)'
    },
    {
      icon: 'bi-telephone-fill',
      label: 'Telefon',
      value: '+90 (212) 555 00 00',
      color: secondaryColor,
      bgColor: 'rgba(249, 115, 22, 0.1)'
    },
    {
      icon: 'bi-geo-alt-fill',
      label: 'Ofis',
      value: 'Levent Mahallesi, İstanbul',
      color: accentColor,
      bgColor: 'rgba(20, 184, 166, 0.1)'
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
              <i className="bi bi-chat-dots-fill me-2"></i>Bizimle İletişime Geçin
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
              Planlama Yolculuğunuza Rehberlik Edelim
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
              İster mükemmel atmosferi arayan bir çift olun ister platformumuza katılan bir salon sahibi, yanınızdayız.
              Bize yazın, ekibimiz en geç bir iş günü içinde size dönüş yapsın.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="container py-5 mb-5">
        <div className="row g-5 align-items-start">
          {/* Sol Bölüm - İletişim Bilgileri */}
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="rounded-4 p-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                    border: `2px solid ${info.bgColor}`,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${info.color}25`;
                    e.currentTarget.style.borderColor = info.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = info.bgColor;
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: '50px',
                        height: '50px',
                        background: info.bgColor,
                        color: info.color,
                        fontSize: '22px',
                        flexShrink: 0
                      }}
                    >
                      <i className={`bi ${info.icon}`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <div
                        className="fw-semibold mb-1"
                        style={{ 
                          color: darkColor,
                          fontSize: '14px',
                          letterSpacing: '0.3px'
                        }}
                      >
                        {info.label}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '15px' }}>
                        {info.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ek Bilgi Kartı */}
            <div
              className="rounded-4 p-4 mt-4"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                border: '2px solid rgba(99, 102, 241, 0.15)'
              }}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: `linear-gradient(135deg, ${primaryColor} 0%, #8b5cf6 100%)`,
                    color: 'white',
                    fontSize: '18px',
                    flexShrink: 0
                  }}
                >
                  <i className="bi bi-clock-fill"></i>
                </div>
                <div>
                  <div className="fw-semibold mb-2" style={{ color: darkColor, fontSize: '15px' }}>
                    Çalışma Saatleri
                  </div>
                  <div style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                    Pazartesi - Cuma: 09:00 - 18:00<br />
                    Cumartesi: 10:00 - 16:00<br />
                    Pazar: Kapalı
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Bölüm - İletişim Formu */}
          <div className="col-lg-7">
            <div
              className="rounded-4 p-4 p-md-5"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                border: '2px solid rgba(99, 102, 241, 0.15)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)'
              }}
            >
              {submitted ? (
                <div
                  className="rounded-4 p-4 text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(45, 212, 191, 0.05) 100%)',
                    border: '2px solid rgba(20, 184, 166, 0.2)'
                  }}
                >
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: `linear-gradient(135deg, ${accentColor} 0%, #2dd4bf 100%)`,
                      color: 'white',
                      fontSize: '28px'
                    }}
                  >
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <h4 className="fw-bold mb-2" style={{ color: darkColor }}>
                    Mesajınız Gönderildi!
                  </h4>
                  <p className="mb-0" style={{ color: '#64748b' }}>
                    Teşekkürler! Ekibimiz kısa süre içinde sizinle iletişime geçecek.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 
                    className="fw-bold mb-4"
                    style={{ 
                      color: darkColor,
                      fontSize: '24px'
                    }}
                  >
                    <i className="bi bi-send-fill me-2" style={{ color: primaryColor }}></i>
                    Mesaj Gönderin
                  </h3>
                  <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="form-label fw-semibold mb-2"
                        style={{ color: darkColor, fontSize: '14px' }}
                      >
                        Ad Soyad
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                          border: '2px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 3px ${primaryColor}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="email" 
                        className="form-label fw-semibold mb-2"
                        style={{ color: darkColor, fontSize: '14px' }}
                      >
                        E-posta
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                          border: '2px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 3px ${primaryColor}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="message" 
                        className="form-label fw-semibold mb-2"
                        style={{ color: darkColor, fontSize: '14px' }}
                      >
                        Size Nasıl Yardımcı Olabiliriz?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                          border: '2px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          resize: 'vertical'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 3px ${primaryColor}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn fw-semibold border-0"
                      style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '14px 28px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.3)';
                      }}
                    >
                      <i className="bi bi-send me-2"></i>
                      Mesajı Gönder
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

