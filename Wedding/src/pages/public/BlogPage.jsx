import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Profesyonel renk paleti
const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

const BlogPage = () => {
  const navigate = useNavigate();
  
  const blogPosts = [
    {
      id: 1,
      title: 'Düğün Planlamasında İlk Adımlar',
      excerpt: 'Düğününüzü planlarken dikkat etmeniz gereken önemli noktalar ve salon seçimi hakkında ipuçları.',
      date: '15 Mart 2024',
      category: 'Planlama',
      icon: 'bi-calendar-check',
      color: primaryColor,
      bgColor: 'rgba(99, 102, 241, 0.1)'
    },
    {
      id: 2,
      title: 'Bütçenize Uygun Salon Nasıl Bulunur?',
      excerpt: 'Düğün bütçenizi aşmadan ideal salonu bulmanın yolları ve paket seçiminde dikkat edilmesi gerekenler.',
      date: '10 Mart 2024',
      category: 'Bütçe',
      icon: 'bi-wallet2',
      color: secondaryColor,
      bgColor: 'rgba(249, 115, 22, 0.1)'
    },
    {
      id: 3,
      title: 'Salon Sahipleriyle İletişim Rehberi',
      excerpt: 'Salon sahipleriyle etkili iletişim kurma yöntemleri ve rezervasyon sürecinde sorulması gereken sorular.',
      date: '5 Mart 2024',
      category: 'İletişim',
      icon: 'bi-chat-dots',
      color: accentColor,
      bgColor: 'rgba(20, 184, 166, 0.1)'
    },
    {
      id: 4,
      title: 'Mükemmel Düğün Menüsü İçin İpuçları',
      excerpt: 'Misafirlerinizi memnun edecek menü seçimi ve catering hizmetleri hakkında bilmeniz gerekenler.',
      date: '1 Mart 2024',
      category: 'Menü',
      icon: 'bi-egg-fried',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      id: 5,
      title: 'Düğün Fotoğrafçısı Seçimi Rehberi',
      excerpt: 'Hayalinizdeki düğün fotoğrafları için doğru fotoğrafçıyı seçme kriterleri ve önemli noktalar.',
      date: '25 Şubat 2024',
      category: 'Fotoğraf',
      icon: 'bi-camera',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      id: 6,
      title: 'Düğün Davetiyeleri ve Tasarım Fikirleri',
      excerpt: 'Unutulmaz davetiyeler için yaratıcı fikirler ve tasarım önerileri. Modern ve klasik stiller.',
      date: '20 Şubat 2024',
      category: 'Tasarım',
      icon: 'bi-palette',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)'
    }
  ];

  const usefulResources = [
    {
      title: 'Sıkça Sorulan Sorular',
      link: '/faq',
      icon: 'bi-question-circle',
      color: primaryColor
    },
    {
      title: 'Uzmanlarımızla İletişime Geçin',
      link: '/contact',
      icon: 'bi-envelope',
      color: secondaryColor
    },
    {
      title: 'Salonları Keşfedin',
      link: '/venues',
      icon: 'bi-building',
      color: accentColor
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
              <i className="bi bi-book-fill me-2"></i>Blog & İpuçları
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
              Düğün Planlamanız İçin Rehberler
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
              Düğün planlamanız için faydalı ipuçları, rehberler ve güncel içerikler. Hayalinizdeki günü planlamak için ihtiyacınız olan tüm bilgiler burada.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Yazıları */}
      <div className="container py-5 mb-5">
        <div className="row g-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4">
              <article
                className="h-100 rounded-4 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  border: `2px solid ${post.bgColor}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/blog/${post.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 12px 32px ${post.color}25`;
                  e.currentTarget.style.borderColor = post.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = post.bgColor;
                }}
              >
                <div className="p-4">
                  {/* Kategori ve Tarih */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span
                      className="px-3 py-1 rounded-pill fw-semibold"
                      style={{
                        background: post.bgColor,
                        color: post.color,
                        fontSize: '12px',
                        letterSpacing: '0.3px'
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                      <i className="bi bi-calendar3 me-1"></i>
                      {post.date}
                    </span>
                  </div>

                  {/* İkon */}
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: post.bgColor,
                      color: post.color,
                      fontSize: '22px'
                    }}
                  >
                    <i className={`bi ${post.icon}`}></i>
                  </div>

                  {/* Başlık */}
                  <h3 
                    className="fw-bold mb-3"
                    style={{ 
                      color: darkColor,
                      fontSize: '20px',
                      lineHeight: '1.3'
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Özet */}
                  <p 
                    className="mb-4"
                    style={{ 
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: '1.6'
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Devamını Oku Butonu */}
                  <button
                    className="btn border-0 fw-semibold"
                    style={{
                      background: `linear-gradient(135deg, ${post.color} 0%, ${post.color}dd 100%)`,
                      color: 'white',
                      borderRadius: '8px',
                      padding: '8px 20px',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      boxShadow: `0 2px 8px ${post.color}30`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/blog/${post.id}`);
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = `0 4px 16px ${post.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = `0 2px 8px ${post.color}30`;
                    }}
                  >
                    Devamını Oku <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Yararlı Kaynaklar Bölümü */}
        <div className="mt-5">
          <div
            className="rounded-4 p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.03) 100%)',
              border: '2px solid rgba(99, 102, 241, 0.1)'
            }}
          >
            <div className="text-center mb-4">
              <h3 
                className="fw-bold mb-2"
                style={{ 
                  color: darkColor,
                  fontSize: '28px'
                }}
              >
                <i className="bi bi-lightbulb-fill me-2" style={{ color: primaryColor }}></i>
                Yararlı Kaynaklar
              </h3>
              <p style={{ color: '#64748b', fontSize: '15px' }}>
                Daha fazla bilgi için bu kaynaklara göz atın
              </p>
            </div>
            <div className="row g-4">
              {usefulResources.map((resource, index) => (
                <div key={index} className="col-md-4">
                  <Link
                    to={resource.link}
                    className="text-decoration-none"
                  >
                    <div
                      className="rounded-4 p-4 h-100"
                      style={{
                        background: 'white',
                        border: `2px solid ${resource.color}20`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = `0 8px 24px ${resource.color}25`;
                        e.currentTarget.style.borderColor = resource.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = `${resource.color}20`;
                      }}
                    >
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: '45px',
                          height: '45px',
                          background: `${resource.color}15`,
                          color: resource.color,
                          fontSize: '20px'
                        }}
                      >
                        <i className={`bi ${resource.icon}`}></i>
                      </div>
                      <div
                        className="fw-semibold"
                        style={{ 
                          color: darkColor,
                          fontSize: '16px'
                        }}
                      >
                        {resource.title}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

