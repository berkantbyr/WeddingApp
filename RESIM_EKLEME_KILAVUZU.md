# 📸 Resim Ekleme Kılavuzu

Arayüzde resim göstermek için iki yöntem kullanabilirsiniz:

## Yöntem 1: Public Klasörüne Ekleme (Önerilen - Basit)

### Adımlar:
1. Resim dosyalarınızı `Wedding/public/images/` klasörüne kopyalayın
2. Klasör yoksa oluşturun: `Wedding/public/images/`
3. Resimleri kodda şu şekilde kullanın:

```jsx
<img src="/images/salon-resmi.jpg" alt="Salon" />
```

### Örnek:
- Dosya: `Wedding/public/images/hero-banner.jpg`
- Kullanım: `src="/images/hero-banner.jpg"`

### Avantajları:
- ✅ Çok basit
- ✅ Doğrudan URL ile erişim
- ✅ Build'den sonra da çalışır

---

## Yöntem 2: Assets Klasörüne Ekleme

### Adımlar:
1. Resim dosyalarınızı `Wedding/src/assets/images/` klasörüne kopyalayın
2. Klasör yoksa oluşturun: `Wedding/src/assets/images/`
3. Resimleri import ederek kullanın:

```jsx
import salonResmi from '../../assets/images/salon-resmi.jpg';

<img src={salonResmi} alt="Salon" />
```

### Örnek:
- Dosya: `Wedding/src/assets/images/hero-banner.jpg`
- Kullanım: `import heroBanner from '../../assets/images/hero-banner.jpg'`

### Avantajları:
- ✅ Build sırasında optimize edilir
- ✅ Vite tarafından işlenir

---

## 📁 Klasör Yapısı Önerisi

```
Wedding/
├── public/
│   └── images/          ← Buraya genel resimler (hero, banner vb.)
│       ├── hero.jpg
│       ├── salon1.jpg
│       └── salon2.jpg
│
└── src/
    └── assets/
        └── images/      ← Buraya component özel resimler
            ├── logo.png
            └── icons/
```

---

## 🎯 Hangi Yöntemi Seçmeliyim?

### Public Klasörü Kullanın Eğer:
- Büyük resimler (hero banner, salon fotoğrafları)
- Çok sayıda resim
- Dinamik olarak kullanılacak resimler

### Assets Klasörü Kullanın Eğer:
- Küçük resimler (ikonlar, logo)
- Component'e özel resimler
- Optimize edilmesi gereken resimler

---

## 📝 Örnek Kullanım

### Public Klasörü ile:
```jsx
// Hero bölümünde
<div style={{
  backgroundImage: 'url(/images/hero-banner.jpg)',
  backgroundSize: 'cover'
}}>
  {/* İçerik */}
</div>

// Normal img tag ile
<img src="/images/salon-resmi.jpg" alt="Salon" className="img-fluid" />
```

### Assets Klasörü ile:
```jsx
import React from 'react';
import salonResmi from '../../assets/images/salon-resmi.jpg';

const MyComponent = () => {
  return (
    <img src={salonResmi} alt="Salon" className="img-fluid" />
  );
};
```

---

## 💡 İpuçları

1. **Resim İsimleri**: Türkçe karakter kullanmayın, boşluk yerine tire (-) kullanın
   - ✅ `salon-resmi.jpg`
   - ❌ `salon resmi.jpg`
   - ❌ `salon-resmi.jpg`

2. **Resim Formatları**: JPG (fotoğraflar), PNG (şeffaflık gereken), SVG (ikonlar)

3. **Resim Boyutları**: Web için optimize edin (maksimum 1920px genişlik)

4. **Alt Text**: Her resme mutlaka `alt` attribute ekleyin (erişilebilirlik için)

---

## 🚀 Hızlı Başlangıç

1. Resimlerinizi hazırlayın
2. `Wedding/public/images/` klasörünü oluşturun
3. Resimleri bu klasöre kopyalayın
4. Kodda `src="/images/resim-adi.jpg"` şeklinde kullanın

Başka bir sorunuz varsa söyleyin!

