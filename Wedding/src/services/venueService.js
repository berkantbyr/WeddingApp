import axios from 'axios';
import {
  VENUE_STATUS,
  storageKeys,
  delay,
  createId,
  ensureSeedData,
  readCollection,
  writeCollection,
  getPackagesForVenue
} from './mockBackend';

const API_URL = import.meta.env.VITE_API_URL || '';
const API_HOST = (() => {
  if (!API_URL) return '';
  const trimmed = API_URL.replace(/\/$/, '');
  return trimmed.endsWith('/api') ? trimmed.slice(0, -4) : trimmed;
})();

const buildAssetUrl = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  if (!API_HOST) return path;
  return path.startsWith('/') ? `${API_HOST}${path}` : `${API_HOST}/${path}`;
};

const fallbackCoverImage = '/images/ankara-salon.jpg';
const formatNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};
const normalizePackages = (packages = [], fallbackPrice, fallbackDesc) => {
  if (!Array.isArray(packages)) return [];
  return packages.map((pkg, index) => {
    const weekdayPrice =
      formatNumber(pkg?.fiyat_hafta_ici) ||
      formatNumber(pkg?.price) ||
      formatNumber(pkg?.fiyat) ||
      0;
    const weekendPrice =
      formatNumber(pkg?.fiyat_hafta_sonu) ||
      formatNumber(pkg?.weekendPrice) ||
      weekdayPrice;
    const basePrice = weekdayPrice || weekendPrice || fallbackPrice || 0;
    const name =
      pkg?.paket_turu ||
      pkg?.name ||
      pkg?.paketAdi ||
      pkg?.title ||
      `Paket ${index + 1}`;
    return {
      ...pkg,
      id: pkg?.id || pkg?.paket_id || `pkg-${index}`,
      paket_turu: pkg?.paket_turu || name,
      name,
      aciklama: pkg?.aciklama || pkg?.description || fallbackDesc || '',
      fiyat_hafta_ici: weekdayPrice || basePrice,
      fiyat_hafta_sonu: weekendPrice || basePrice,
      price: basePrice
    };
  });
};
const normalizeOptionalPackages = (options = []) => {
  if (!Array.isArray(options)) return [];
  return options.map((op, index) => ({
    ...op,
    id: op?.id || op?.opsiyonel_id || `opt-${index}`,
    ad: op?.ad || op?.name || `Opsiyonel ${index + 1}`,
    aciklama: op?.aciklama || op?.description || '',
    fiyat: formatNumber(op?.fiyat || op?.price)
  }));
};

const apiClient = API_URL
  ? axios.create({
      baseURL: API_URL,
      withCredentials: true
    })
  : null;

const getVenues = () => readCollection(storageKeys.venues);
const persistVenues = (venues) => writeCollection(storageKeys.venues, venues);
const getReservations = () => readCollection(storageKeys.reservations);
const persistReservations = (reservations) => writeCollection(storageKeys.reservations, reservations);

export const fetchVenues = async () => {
  if (apiClient) {
    try {
      const { data } = await apiClient.get('/api/salonlar');
      // Backend'den gelen veriyi frontend formatına çevir
      return data.map((salon) => {
        const cover = buildAssetUrl(salon.ana_foto || salon.ana_foto_url) || fallbackCoverImage;
        return {
          id: salon.id,
          name: salon.ad,
          city: salon.sehir,
          address: salon.adres,
          capacity: salon.kapasite,
          description: salon.aciklama,
          dugun_turu: salon.dugun_turu,
          fiyat: salon.fiyat,
          coverImage: cover,
          ownerId: salon.sahip_id,
          ownerName: salon.sahip_adi,
          sirket_adi: salon.sirket_adi,
          sirketAdi: salon.sirket_adi,
          createdAt: salon.olusturulma_zamani
        };
      });
    } catch (error) {
      console.error('API hatası:', error);
      return [];
    }
  }
  await delay(200);
  return getVenues();
};

export const fetchFeaturedVenues = async (limit = 3) => {
  const venues = await fetchVenues();
  return venues
    .filter((venue) => venue.status === VENUE_STATUS.APPROVED)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

export const fetchVenueById = async (venueId) => {
  if (apiClient) {
    try {
      const { data } = await apiClient.get(`/api/salonlar/${venueId}`);
      // Backend formatını frontend formatına çevir
      const gallery = (data.fotograflar || []).map((foto) => buildAssetUrl(foto.foto_url)).filter(Boolean);
      const coverImage = buildAssetUrl(data.ana_foto_url) || gallery[0] || fallbackCoverImage;
      const packages = normalizePackages(
        data.paketler || data.packages,
        formatNumber(data.fiyat),
        data.dugun_turu ? `${data.dugun_turu} organizasyonu` : ''
      );
      const optionalPackages = normalizeOptionalPackages(data.opsiyonelPaketler || data.opsiyonel_paketler);
      const finalPackages =
        packages.length > 0
          ? packages
          : [
              {
                id: 'default-package',
                paket_turu: 'Standart Paket',
                name: 'Standart Paket',
                aciklama: data.dugun_turu ? `${data.dugun_turu} organizasyonu` : 'Salon paket ücreti',
                fiyat_hafta_ici: formatNumber(data.fiyat),
                fiyat_hafta_sonu: formatNumber(data.fiyat),
                price: formatNumber(data.fiyat)
              }
            ];
      return {
        id: data.id,
        name: data.ad,
        city: data.sehir,
        address: data.adres,
        capacity: data.kapasite,
        description: data.aciklama,
        dugun_turu: data.dugun_turu,
        fiyat: data.fiyat,
        coverImage,
        ownerId: data.sahip_id,
        ownerName: data.sahip_adi,
        packages: finalPackages,
        opsiyonelPaketler: optionalPackages,
        gallery,
        rawPhotos: data.fotograflar || [],
        createdAt: data.olusturulma_zamani,
        availableDates: data.musait_tarihler || []
      };
    } catch (error) {
      console.error('Salon detay hatası:', error);
      return null;
    }
  }
  await delay(200);
  return getVenues().find((venue) => venue.id === venueId) ?? null;
};

export const searchVenues = async ({ city, capacity, eventDate, packageTier }) => {
  const venues = await fetchVenues();
  return venues.filter((venue) => {
    if (venue.status !== VENUE_STATUS.APPROVED) return false;
    const matchesCity = city ? venue.city.toLowerCase() === city.toLowerCase() : true;
    const matchesCapacity = capacity ? venue.capacity >= Number(capacity) : true;
    const matchesDate = eventDate ? venue.availableDates?.includes(eventDate) : true;
    const matchesPackage = packageTier
      ? venue.packages?.some((pkg) => pkg.name.toLowerCase() === packageTier.toLowerCase())
      : true;
    return matchesCity && matchesCapacity && matchesDate && matchesPackage;
  });
};

export const fetchOwnerVenues = async (ownerId) => {
  if (!ownerId) return [];
  if (apiClient) {
    try {
      const { data } = await apiClient.get('/api/salonlar/sahip', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Backend formatını frontend formatına çevir
      return data.map((salon) => {
        const cover = buildAssetUrl(salon.ana_foto_url || salon.ana_foto) || fallbackCoverImage;
        return {
          id: salon.id,
          name: salon.ad,
          city: salon.sehir,
          address: salon.adres,
          capacity: salon.kapasite,
          description: salon.aciklama,
          dugun_turu: salon.dugun_turu,
          fiyat: salon.fiyat,
          coverImage: cover,
          ownerId: salon.sahip_id,
          createdAt: salon.olusturulma_zamani,
          status: 'approved'
        };
      });
    } catch (error) {
      console.error('API hatası:', error);
      return [];
    }
  }
  const venues = await fetchVenues();
  return venues.filter((venue) => venue.ownerId === ownerId);
};

export const createVenue = async (ownerId, payload) => {
  if (apiClient) {
    // FormData kullanarak dosya yükleme
    const formData = new FormData();
    
    // Metin alanları
    formData.append('ad', payload.name);
    formData.append('adres', payload.address);
    formData.append('sehir', payload.city);
    formData.append('kapasite', payload.capacity || '');
    formData.append('aciklama', payload.description || '');
    formData.append('dugun_turu', payload.dugun_turu || 'NORMAL');
    formData.append('fiyat', payload.fiyat || 0);
    
    // Dosya varsa ekle
    if (payload.ana_foto_file) {
      formData.append('ana_foto', payload.ana_foto_file);
    } else if (payload.ana_foto_url) {
      formData.append('ana_foto_url', payload.ana_foto_url);
    }
    
    // Galeri dosyaları
    if (payload.gallery_files && payload.gallery_files.length > 0) {
      payload.gallery_files.forEach((file, index) => {
        formData.append(`gallery_${index}`, file);
      });
      formData.append('gallery_count', payload.gallery_files.length);
    }
    
    // Opsiyonel paketler
    if (payload.opsiyonelPaketler && payload.opsiyonelPaketler.length > 0) {
      formData.append('opsiyonelPaketler', JSON.stringify(payload.opsiyonelPaketler));
    }
    
    const { data } = await apiClient.post('/api/salonlar', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  await delay();
  ensureSeedData();
  const venues = getVenues();

  const newVenue = {
    id: createId('venue'),
    ownerId,
    status: VENUE_STATUS.PENDING,
    createdAt: new Date().toISOString(),
    ...payload,
    packages: payload.packages?.length ? payload.packages : [],
    availableDates: payload.availableDates?.length ? payload.availableDates : []
  };

  persistVenues([...venues, newVenue]);
  return newVenue;
};

export const deleteVenue = async (venueId) => {
  if (apiClient) {
    try {
      const { data } = await apiClient.delete(`/api/salonlar/${venueId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return data;
    } catch (error) {
      console.error('Salon silme hatası:', error);
      throw new Error(error.response?.data?.hata || 'Salon silinemedi');
    }
  }
  // Mock backend için
  await delay();
  const venues = getVenues();
  const filtered = venues.filter((v) => v.id !== venueId);
  persistVenues(filtered);
  return { mesaj: 'Salon silindi' };
};

export const updateVenue = async (venueId, updates) => {
  if (apiClient) {
    const { data } = await apiClient.patch(`/venues/${venueId}`, updates);
    return data;
  }

  await delay();
  const venues = getVenues();
  const index = venues.findIndex((venue) => venue.id === venueId);

  if (index === -1) {
    throw new Error('Salon bulunamadı');
  }

  const updated = { ...venues[index], ...updates };
  venues[index] = updated;
  persistVenues(venues);
  return updated;
};

export const removeVenue = async (venueId) => {
  if (apiClient) {
    await apiClient.delete(`/venues/${venueId}`);
    return true;
  }

  await delay(150);
  const venues = getVenues().filter((venue) => venue.id !== venueId);
  persistVenues(venues);
  return true;
};

const eventDateTaken = (reservations, venueId, eventDate, excludeReservationId) =>
  reservations.some(
    (reservation) =>
      reservation.venueId === venueId &&
      reservation.eventDate === eventDate &&
      reservation.status === 'confirmed' &&
      reservation.id !== excludeReservationId
  );

export const createReservation = async (customerId, payload) => {
  if (apiClient) {
    // Backend API'ye uygun format
    const backendPayload = {
      salon_id: payload.venueId,
      paket_id: payload.packageId || 1, // Geçici olarak 1, paket sistemi daha sonra eklenebilir
      etkinlik_tarihi: payload.eventDate,
      notlar: payload.notes || '',
      opsiyonelPaketler: payload.opsiyonelPaketler || [] // Seçilen opsiyonel paket ID'leri
    };
    
    const { data } = await apiClient.post('/api/rezervasyonlar', backendPayload, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return data;
  }

  await delay();
  const reservations = getReservations();

  if (eventDateTaken(reservations, payload.venueId, payload.eventDate)) {
    throw new Error('Bu tarih seçilen salon için zaten rezerve edilmiş');
  }

  const reservation = {
    id: createId('res'),
    customerId,
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...payload
  };

  persistReservations([...reservations, reservation]);
  return reservation;
};

export const fetchCustomerReservations = async (customerId) => {
  if (!customerId) return [];
  if (apiClient) {
    const { data } = await apiClient.get(`/customers/${customerId}/reservations`);
    return data;
  }

  await delay(200);
  const reservations = getReservations().filter((res) => res.customerId === customerId);
  const venues = getVenues();
  return reservations.map((reservation) => {
    const venue = venues.find((item) => item.id === reservation.venueId);
    return {
      ...reservation,
      venue,
      package: getPackagesForVenue(venue, reservation.packageId)
    };
  });
};

export const fetchOwnerReservations = async (ownerId) => {
  if (!ownerId) return [];

  if (apiClient) {
    try {
      const { data } = await apiClient.get('/api/rezervasyonlar/salon-sahibi', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Backend'den gelen veriyi frontend formatına çevir
      return data.map(res => ({
        id: res.id,
        venueId: res.salon_id,
        venue: {
          id: res.salon_id,
          name: res.salon_adi,
          city: res.salon_sehir
        },
        eventDate: res.etkinlik_tarihi,
        status: res.durum === 'BEKLEMEDE' ? 'pending' : res.durum === 'ONAYLANDI' ? 'confirmed' : 'declined',
        package: {
          name: res.paket_turu,
          price: res.fiyat_hafta_ici || res.fiyat_hafta_sonu
        },
        customer: {
          name: res.musteri_adi,
          phone: res.musteri_telefon,
          username: res.musteri_kullanici_adi
        },
        notes: res.notlar,
        createdAt: res.olusturulma_zamani
      }));
    } catch (error) {
      console.error('Rezervasyonlar yüklenemedi:', error);
      return [];
    }
  }

  await delay(200);
  const venues = getVenues().filter((venue) => venue.ownerId === ownerId);
  const reservations = getReservations().filter((res) =>
    venues.some((venue) => venue.id === res.venueId)
  );

  return reservations.map((reservation) => {
    const venue = venues.find((item) => item.id === reservation.venueId);
    return {
      ...reservation,
      venue,
      package: getPackagesForVenue(venue, reservation.packageId)
    };
  });
};

export const updateReservationStatus = async (reservationId, status) => {
  if (apiClient) {
    // Backend API'ye uygun format
    const karar = status === 'confirmed' ? 'ONAYLANDI' : 'REDDEDILDI';
    const { data } = await apiClient.post(
      `/api/rezervasyonlar/${reservationId}/karar`,
      { karar },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return data;
  }

  await delay(200);
  const reservations = getReservations();
  const index = reservations.findIndex((res) => res.id === reservationId);

  if (index === -1) {
    throw new Error('Rezervasyon bulunamadı');
  }

  const updated = { ...reservations[index], status };
  reservations[index] = updated;
  persistReservations(reservations);
  return updated;
};

export const fetchSuggestedDates = async (venueId) => {
  const venue = await fetchVenueById(venueId);
  return Array.isArray(venue?.availableDates) ? venue.availableDates : [];
};

