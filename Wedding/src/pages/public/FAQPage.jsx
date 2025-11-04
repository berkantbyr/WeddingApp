import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Profesyonel renk paleti
const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'SalonBulucu nasıl çalışır?',
      answer: 'SalonBulucu, düğün salonlarını keşfetmenize ve rezervasyon yapmanıza olanak sağlar. Salonları arayabilir, paketleri karşılaştırabilir ve salon sahipleriyle iletişime geçebilirsiniz. Platformumuz, salon sahipleri ve çiftleri bir araya getiren modern bir çözümdür.',
      icon: 'bi-play-circle',
      color: primaryColor,
      bgColor: 'rgba(99, 102, 241, 0.1)'
    },
    {
      question: 'Rezervasyon nasıl yapılır?',
      answer: 'Beğendiğiniz salonun detay sayfasına gidin, uygun paketi seçin ve rezervasyon talebi oluşturun. Salon sahibi talebinizi onayladıktan sonra rezervasyonunuz tamamlanır. Tüm süreç dijital ortamda gerçekleşir ve kolayca takip edebilirsiniz.',
      icon: 'bi-calendar-check',
      color: secondaryColor,
      bgColor: 'rgba(249, 115, 22, 0.1)'
    },
    {
      question: 'Ücretsiz mi kullanabilirim?',
      answer: 'Evet, SalonBulucu platformunu kullanmak tamamen ücretsizdir. Müşteriler için herhangi bir ücret alınmaz. Salon sahipleri için ise ücretsiz ve premium paket seçenekleri mevcuttur. Tüm temel özellikler ücretsiz olarak kullanılabilir.',
      icon: 'bi-gift',
      color: accentColor,
      bgColor: 'rgba(20, 184, 166, 0.1)'
    },
    {
      question: 'Salon sahipleri salonlarını nasıl ekler?',
      answer: 'Salon sahipleri kayıt olduktan sonra "Salon Sahibi Paneli" üzerinden salon bilgilerini, paketleri ve fotoğraflarını ekleyebilir. Salonlar admin onayından sonra platformda görünür hale gelir. Onay süreci genellikle 48 saat içinde tamamlanır.',
      icon: 'bi-building',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      question: 'Rezervasyonumu iptal edebilir miyim?',
      answer: 'Evet, rezervasyonlarınızı "Rezervasyonlarım" sayfasından görüntüleyip iptal edebilirsiniz. İptal koşulları salon sahibinin belirlediği politikalara göre değişiklik gösterebilir. İptal işlemi için salon sahibiyle iletişime geçmeniz gerekebilir.',
      icon: 'bi-x-circle',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      question: 'Ödeme nasıl yapılır?',
      answer: 'Şu anda ödeme işlemleri salon sahipleriyle doğrudan yapılmaktadır. Platform üzerinden rezervasyon talebi oluşturduktan sonra salon sahibiyle iletişime geçerek ödeme detaylarını konuşabilirsiniz. Güvenli ödeme yöntemleri hakkında daha fazla bilgi için salon sahibiyle iletişime geçin.',
      icon: 'bi-credit-card',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)'
    },
    {
      question: 'Salonları nasıl filtreleyebilirim?',
      answer: 'Salon arama sayfasında şehir, kapasite, tarih ve paket türüne göre filtreleme yapabilirsiniz. Filtreler sayesinde ihtiyacınıza en uygun salonları hızlıca bulabilirsiniz. Tüm filtreler anlık olarak sonuçları günceller.',
      icon: 'bi-funnel',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    {
      question: 'Destek ekibinize nasıl ulaşabilirim?',
      answer: 'Destek ekibimize ulaşmak için İletişim sayfasından mesaj gönderebilir veya support@salonbulucu.com adresine e-posta gönderebilirsiniz. Ayrıca +90 (212) 555 00 00 numaralı telefondan da bize ulaşabilirsiniz. Çalışma saatlerimiz içinde en geç 24 saat içinde yanıt veririz.',
      icon: 'bi-headset',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
              <i className="bi bi-question-circle-fill me-2"></i>Sıkça Sorulan Sorular
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
              Merak Ettiklerinizin Cevapları
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
              SalonBulucu hakkında merak ettiklerinizin cevapları. Sorularınızın yanıtını bulamazsanız, bizimle iletişime geçmekten çekinmeyin.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ İçeriği */}
      <div className="container py-5 mb-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="d-flex flex-column gap-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-4 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                    border: `2px solid ${openIndex === index ? faq.color : faq.bgColor}`,
                    boxShadow: openIndex === index 
                      ? `0 8px 24px ${faq.color}25` 
                      : '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (openIndex !== index) {
                      e.currentTarget.style.borderColor = faq.color;
                      e.currentTarget.style.boxShadow = `0 6px 20px ${faq.color}20`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (openIndex !== index) {
                      e.currentTarget.style.borderColor = faq.bgColor;
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  <button
                    className="btn w-100 text-start p-4 fw-semibold d-flex justify-content-between align-items-center border-0"
                    onClick={() => toggleFAQ(index)}
                    type="button"
                    style={{
                      background: 'transparent',
                      color: darkColor,
                      fontSize: '17px'
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: '45px',
                          height: '45px',
                          background: faq.bgColor,
                          color: faq.color,
                          fontSize: '20px',
                          flexShrink: 0
                        }}
                      >
                        <i className={`bi ${faq.icon}`}></i>
                      </div>
                      <span>{faq.question}</span>
                    </div>
                    <i 
                      className={`bi ${openIndex === index ? 'bi-chevron-up' : 'bi-chevron-down'}`}
                      style={{ 
                        color: faq.color,
                        fontSize: '20px',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </button>
                  {openIndex === index && (
                    <div 
                      className="px-4 pb-4"
                      style={{
                        paddingLeft: '76px',
                        animation: 'fadeIn 0.3s ease'
                      }}
                    >
                      <p 
                        style={{ 
                          color: '#64748b',
                          fontSize: '15px',
                          lineHeight: '1.7',
                          margin: 0
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* İletişim CTA Bölümü */}
            <div className="mt-5">
              <div
                className="rounded-4 p-5 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  border: '2px solid rgba(99, 102, 241, 0.15)'
                }}
              >
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '70px',
                    height: '70px',
                    background: `linear-gradient(135deg, ${primaryColor} 0%, #8b5cf6 100%)`,
                    color: 'white',
                    fontSize: '32px',
                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  <i className="bi bi-chat-dots-fill"></i>
                </div>
                <h4 
                  className="fw-bold mb-2"
                  style={{ color: darkColor, fontSize: '24px' }}
                >
                  Sorunuz mu var?
                </h4>
                <p 
                  className="mb-4"
                  style={{ color: '#64748b', fontSize: '16px' }}
                >
                  Yanıtını bulamadığınız sorular için bizimle iletişime geçin.
                </p>
                <Link
                  to="/contact"
                  className="btn fw-semibold border-0 text-decoration-none"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '12px 32px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
                    display: 'inline-block'
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
                  <i className="bi bi-envelope me-2"></i>
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FAQPage;

