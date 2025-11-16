import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Profesyonel renk paleti
const primaryColor = '#6366f1';
const secondaryColor = '#f97316';
const accentColor = '#14b8a6';
const darkColor = '#1e293b';

// Blog yazıları veritabanı (gerçek uygulamada backend'den gelecek)
const blogPosts = {
  1: {
    id: 1,
    title: 'Düğün Planlamasında İlk Adımlar',
    content: `
      <h2>Düğün Planlamasına Başlarken</h2>
      <p>Düğün planlaması heyecan verici bir süreçtir, ancak aynı zamanda dikkatli planlama gerektirir. İşte düğününüzü planlarken dikkat etmeniz gereken önemli noktalar:</p>
      
      <h3>1. Bütçe Belirleme</h3>
      <p>İlk adım olarak, düğününüz için gerçekçi bir bütçe belirlemelisiniz. Bütçeniz, tüm kararlarınızı yönlendirecek en önemli faktördür. Salon seçimi, menü, dekorasyon ve diğer tüm hizmetler bütçenize göre şekillenecektir.</p>
      
      <h3>2. Tarih ve Lokasyon Seçimi</h3>
      <p>Düğün tarihinizi belirlerken mevsim, hava durumu ve özel günleri göz önünde bulundurmalısınız. Salon seçiminde ise misafir sayınız, ulaşım kolaylığı ve salonun atmosferi önemli faktörlerdir.</p>
      
      <h3>3. Salon Seçimi İpuçları</h3>
      <ul>
        <li>Salonun kapasitesini misafir sayınıza göre değerlendirin</li>
        <li>Park yeri ve ulaşım imkanlarını kontrol edin</li>
        <li>Salonun dekorasyon ve atmosferini inceleyin</li>
        <li>Paket içeriklerini detaylıca karşılaştırın</li>
        <li>Rezervasyon öncesi salonu mutlaka ziyaret edin</li>
      </ul>
      
      <h3>4. Zaman Çizelgesi Oluşturma</h3>
      <p>Düğün planlamanız için bir zaman çizelgesi oluşturun. Genellikle 6-12 ay önceden planlamaya başlamak idealdir. Bu süre içinde salon rezervasyonu, davetiye gönderimi, dekorasyon planlaması gibi tüm detayları organize edebilirsiniz.</p>
      
      <p>Düğün planlamanızda başarılar dileriz! SalonBulucu platformumuzda size uygun salonları keşfedebilir ve rezervasyon talebi oluşturabilirsiniz.</p>
    `,
    date: '15 Mart 2024',
    category: 'Planlama',
    icon: 'bi-calendar-check',
    color: primaryColor,
    bgColor: 'rgba(99, 102, 241, 0.1)'
  },
  2: {
    id: 2,
    title: 'Bütçenize Uygun Salon Nasıl Bulunur?',
    content: `
      <h2>Bütçe Dostu Salon Seçimi</h2>
      <p>Düğün bütçenizi aşmadan ideal salonu bulmak mümkün! İşte bütçenize uygun salon bulmanın yolları:</p>
      
      <h3>1. Bütçe Analizi</h3>
      <p>Öncelikle düğününüz için toplam bütçenizi belirleyin ve salon için ayırabileceğiniz miktarı netleştirin. Salon maliyeti genellikle toplam bütçenin %40-50'sini oluşturur.</p>
      
      <h3>2. Paket Karşılaştırması</h3>
      <p>Farklı salonların paketlerini karşılaştırın. Bazı salonlar tüm hizmetleri içeren paketler sunarken, bazıları a la carte hizmetler sunar. İhtiyacınıza göre en uygun paketi seçin.</p>
      
      <h3>3. Gizli Maliyetler</h3>
      <p>Salon seçerken gizli maliyetlere dikkat edin. Ekstra hizmetler, dekorasyon, ses sistemi gibi ek maliyetler bütçenizi aşabilir. Tüm maliyetleri önceden öğrenin.</p>
      
      <h3>4. Sezon Farkları</h3>
      <p>Düğün sezonu (yaz ayları, hafta sonları) fiyatlar daha yüksek olabilir. Eğer esnekliğiniz varsa, düşük sezon tarihlerini tercih ederek bütçenizden tasarruf edebilirsiniz.</p>
      
      <h3>5. Müzakere İpuçları</h3>
      <ul>
        <li>Paket içeriğini özelleştirme konusunda salon sahipleriyle konuşun</li>
        <li>Erken rezervasyon indirimlerini sorun</li>
        <li>Hafta içi tarihler için özel fiyat teklifleri isteyin</li>
        <li>Toplu rezervasyon veya uzun süreli anlaşmalar için indirim talep edin</li>
      </ul>
    `,
    date: '10 Mart 2024',
    category: 'Bütçe',
    icon: 'bi-wallet2',
    color: secondaryColor,
    bgColor: 'rgba(249, 115, 22, 0.1)'
  },
  3: {
    id: 3,
    title: 'Salon Sahipleriyle İletişim Rehberi',
    content: `
      <h2>Etkili İletişim Stratejileri</h2>
      <p>Salon sahipleriyle etkili iletişim kurmak, düğün planlamanızın başarısı için kritik öneme sahiptir. İşte iletişim rehberiniz:</p>
      
      <h3>1. İlk İletişim</h3>
      <p>Salon sahipleriyle ilk iletişime geçerken profesyonel ve nazik olun. Rezervasyon talebinizde net bilgiler verin: tarih, misafir sayısı, özel istekler gibi.</p>
      
      <h3>2. Sorulması Gereken Sorular</h3>
      <ul>
        <li>Salonun kapasitesi nedir?</li>
        <li>Paket içeriği neleri kapsıyor?</li>
        <li>Ekstra hizmetler ve maliyetleri nelerdir?</li>
        <li>İptal ve değişiklik politikası nedir?</li>
        <li>Ödeme planı nasıldır?</li>
        <li>Park yeri ve ulaşım imkanları nelerdir?</li>
      </ul>
      
      <h3>3. Rezervasyon Süreci</h3>
      <p>Rezervasyon sürecinde tüm detayları yazılı olarak alın. Sözlü anlaşmalar yerine yazılı sözleşmeler tercih edin. Tüm maliyetleri ve hizmetleri netleştirin.</p>
      
      <h3>4. İletişim Kanalları</h3>
      <p>SalonBulucu platformu üzerinden salon sahipleriyle doğrudan iletişime geçebilirsiniz. Rezervasyon talebiniz salon sahibine iletilecek ve size en kısa sürede yanıt verilecektir.</p>
    `,
    date: '5 Mart 2024',
    category: 'İletişim',
    icon: 'bi-chat-dots',
    color: accentColor,
    bgColor: 'rgba(20, 184, 166, 0.1)'
  },
  4: {
    id: 4,
    title: 'Mükemmel Düğün Menüsü İçin İpuçları',
    content: `
      <h2>Menü Seçimi Rehberi</h2>
      <p>Misafirlerinizi memnun edecek bir menü seçmek, düğününüzün başarısı için önemlidir. İşte menü seçimi için ipuçları:</p>
      
      <h3>1. Misafir Profili</h3>
      <p>Misafirlerinizin yaş grupları, kültürel tercihleri ve diyet kısıtlamalarını göz önünde bulundurun. Vejetaryen, vegan veya alerji durumları için alternatif menüler hazırlatın.</p>
      
      <h3>2. Menü Çeşitliliği</h3>
      <p>Menünüzde çeşitli seçenekler sunun. Et, tavuk, balık ve vejetaryen seçenekler dengeli bir menü oluşturur. Ayrıca meze, salata ve tatlı çeşitliliği de önemlidir.</p>
      
      <h3>3. Catering Hizmetleri</h3>
      <p>Salonun kendi catering hizmeti varsa, menüyü onlarla birlikte planlayın. Dışarıdan catering hizmeti alacaksanız, salonun bu konudaki politikasını öğrenin.</p>
      
      <h3>4. Tadım Ziyareti</h3>
      <p>Mümkünse menü seçiminden önce tadım yapın. Böylece yemek kalitesini ve sunumunu değerlendirebilirsiniz.</p>
    `,
    date: '1 Mart 2024',
    category: 'Menü',
    icon: 'bi-egg-fried',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)'
  },
  5: {
    id: 5,
    title: 'Düğün Fotoğrafçısı Seçimi Rehberi',
    content: `
      <h2>Doğru Fotoğrafçıyı Bulmak</h2>
      <p>Hayalinizdeki düğün fotoğrafları için doğru fotoğrafçıyı seçmek çok önemlidir. İşte seçim kriterleri:</p>
      
      <h3>1. Portföy İncelemesi</h3>
      <p>Fotoğrafçının önceki çalışmalarını inceleyin. Stil, kalite ve yaklaşımını değerlendirin. Sizin tarzınıza uygun bir fotoğrafçı seçin.</p>
      
      <h3>2. Tecrübe ve Referanslar</h3>
      <p>Fotoğrafçının düğün fotoğrafçılığı konusundaki tecrübesini öğrenin. Önceki müşterilerinden referans isteyin ve yorumlarını okuyun.</p>
      
      <h3>3. Paket İçeriği</h3>
      <p>Fotoğrafçının sunduğu paket içeriğini detaylıca inceleyin. Çekim süresi, fotoğraf sayısı, albüm, video gibi hizmetleri karşılaştırın.</p>
      
      <h3>4. Ön Görüşme</h3>
      <p>Fotoğrafçıyla mutlaka ön görüşme yapın. Kişilik uyumu, iletişim ve beklentilerinizi netleştirin.</p>
    `,
    date: '25 Şubat 2024',
    category: 'Fotoğraf',
    icon: 'bi-camera',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)'
  },
  6: {
    id: 6,
    title: 'Düğün Davetiyeleri ve Tasarım Fikirleri',
    content: `
      <h2>Yaratıcı Davetiye Tasarımları</h2>
      <p>Unutulmaz davetiyeler için yaratıcı fikirler ve tasarım önerileri:</p>
      
      <h3>1. Modern Tasarımlar</h3>
      <p>Minimalist, temiz çizgiler ve modern tipografi kullanarak çağdaş bir görünüm elde edebilirsiniz. Pastel renkler veya canlı renkler tercih edebilirsiniz.</p>
      
      <h3>2. Klasik Stil</h3>
      <p>Geleneksel ve zarif bir görünüm için klasik tasarımlar tercih edin. Altın yaldız, zarif yazı tipleri ve lüks kağıt seçenekleri kullanabilirsiniz.</p>
      
      <h3>3. Kişiselleştirme</h3>
      <p>Davetiyelerinizi kişiselleştirin. Çiftinizin hikayesini, renklerini veya temanızı yansıtan tasarımlar seçin.</p>
      
      <h3>4. Dijital Seçenekler</h3>
      <p>Çevre dostu ve ekonomik bir seçenek olarak dijital davetiyeler de tercih edebilirsiniz. Online davetiye platformları kullanarak interaktif davetiyeler oluşturabilirsiniz.</p>
    `,
    date: '20 Şubat 2024',
    category: 'Tasarım',
    icon: 'bi-palette',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.1)'
  }
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts[parseInt(id)];

  if (!post) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Blog yazısı bulunamadı.
        </div>
        <Link to="/blog" className="btn btn-primary">
          Blog Sayfasına Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column">
      {/* Hero Bölümü */}
      <section 
        className="position-relative py-5"
        style={{
          background: `linear-gradient(135deg, ${post.bgColor} 0%, rgba(255, 255, 255, 0.5) 100%)`,
          marginTop: '-20px',
          marginBottom: '40px',
          paddingTop: '60px',
          paddingBottom: '60px'
        }}
      >
        <div className="container">
          <button
            onClick={() => navigate('/blog')}
            className="btn btn-link text-decoration-none mb-4"
            style={{ color: post.color }}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Blog'a Dön
          </button>
          
          <div className="mb-3">
            <span
              className="px-3 py-1 rounded-pill fw-semibold"
              style={{
                background: post.bgColor,
                color: post.color,
                fontSize: '14px'
              }}
            >
              {post.category}
            </span>
          </div>
          
          <h1 
            className="fw-bold mb-3"
            style={{ 
              fontSize: 'clamp(28px, 5vw, 42px)',
              color: darkColor,
              lineHeight: '1.2'
            }}
          >
            {post.title}
          </h1>
          
          <div className="d-flex align-items-center gap-3 text-muted">
            <span>
              <i className="bi bi-calendar3 me-1"></i>
              {post.date}
            </span>
            <span>
              <i className={`bi ${post.icon} me-1`} style={{ color: post.color }}></i>
              {post.category}
            </span>
          </div>
        </div>
      </section>

      {/* İçerik Bölümü */}
      <div className="container py-5 mb-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <article
              className="rounded-4 p-5"
              style={{
                background: 'white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: `2px solid ${post.bgColor}`
              }}
            >
              <style>{`
                .blog-content h2 {
                  background: linear-gradient(135deg, ${post.color} 0%, ${post.color}dd 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  font-size: 28px;
                  font-weight: bold;
                  margin-top: 30px;
                  margin-bottom: 20px;
                  padding-bottom: 10px;
                  border-bottom: 3px solid ${post.bgColor};
                }
                .blog-content h3 {
                  color: ${post.color};
                  font-size: 22px;
                  font-weight: bold;
                  margin-top: 25px;
                  margin-bottom: 15px;
                  display: flex;
                  align-items: center;
                  gap: 10px;
                }
                .blog-content h3:before {
                  content: "●";
                  color: ${post.color};
                  font-size: 16px;
                }
                .blog-content p {
                  color: #475569;
                  line-height: 1.8;
                  font-size: 16px;
                  margin-bottom: 20px;
                }
                .blog-content ul {
                  list-style: none;
                  padding-left: 0;
                  margin: 20px 0;
                }
                .blog-content ul li {
                  color: #475569;
                  line-height: 1.8;
                  font-size: 16px;
                  margin-bottom: 12px;
                  padding-left: 30px;
                  position: relative;
                  padding: 12px 15px 12px 40px;
                  background: ${post.bgColor};
                  border-radius: 8px;
                  margin-bottom: 10px;
                  border-left: 4px solid ${post.color};
                  transition: all 0.3s ease;
                }
                .blog-content ul li:hover {
                  transform: translateX(5px);
                  box-shadow: 0 4px 12px ${post.color}20;
                }
                .blog-content ul li:before {
                  content: "✓";
                  position: absolute;
                  left: 15px;
                  color: ${post.color};
                  font-weight: bold;
                  font-size: 18px;
                }
                .blog-content strong {
                  color: ${post.color};
                  font-weight: 600;
                }
                .blog-content p:first-of-type {
                  font-size: 18px;
                  color: #64748b;
                  font-style: italic;
                  padding: 15px;
                  background: linear-gradient(135deg, ${post.bgColor} 0%, rgba(255,255,255,0.5) 100%);
                  border-radius: 10px;
                  border-left: 4px solid ${post.color};
                }
              `}</style>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Geri Dön Butonu */}
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/blog')}
                className="btn fw-semibold"
                style={{
                  background: `linear-gradient(135deg, ${post.color} 0%, ${post.color}dd 100%)`,
                  color: 'white',
                  borderRadius: '8px',
                  padding: '10px 30px',
                  fontSize: '16px'
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Tüm Yazılara Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;

