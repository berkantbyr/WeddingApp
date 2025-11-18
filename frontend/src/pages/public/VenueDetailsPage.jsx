import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Input from '../../components/common/Input.jsx';
import { fetchVenueById, createReservation, fetchSuggestedDates } from '../../services/venueService.js';
import { API_HOST } from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext.jsx';

const API_BASE_URL =
  API_HOST ||
  (typeof window !== 'undefined' ? window.location.origin.replace(/\/$/, '') : 'http://localhost:3000');
const fallbackImages = [
  '/images/ankara-salon.jpg',
  '/images/antalya-salon.jpg',
  '/images/rize-salon.jpg',
  '/images/99d6f7a3526a21f42765c9fab7782396.jpg'
];
const normalizeImageUrl = (url) => {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('//')) return `${window.location.protocol}${url}`;
  const normalized = url.startsWith('/') ? url : `/${url}`;
  return `${API_BASE_URL}${normalized}`.replace(/([^:]\/)\/+/g, '$1');
};

const VenueDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationError, setReservationError] = useState(null);
  const [reservationSuccess, setReservationSuccess] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [reservationData, setReservationData] = useState({
    eventDate: '',
    packageId: '',
    guestCount: '',
    secilenOpsiyoneller: [] // Seçilen opsiyonel paketlerin ID'leri
  });
  const formatCurrency = (value) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Number(value) || 0);
  const getPackagePrice = (pkg) => Number(pkg?.fiyat_hafta_ici ?? pkg?.price ?? pkg?.fiyat ?? 0);
  const selectedPackage = useMemo(
    () => venue?.packages?.find((pkg) => pkg.id === reservationData.packageId) || null,
    [venue?.packages, reservationData.packageId]
  );
  const selectedOptionalPackages = useMemo(() => {
    if (!venue?.opsiyonelPaketler) return [];
    return venue.opsiyonelPaketler.filter((op) => reservationData.secilenOpsiyoneller.includes(op.id));
  }, [venue?.opsiyonelPaketler, reservationData.secilenOpsiyoneller]);
  const optionalTotal = selectedOptionalPackages.reduce((sum, op) => sum + Number(op.fiyat || 0), 0);
  const totalPrice = (selectedPackage ? getPackagePrice(selectedPackage) : 0) + optionalTotal;
  const minReservationDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const statusLabels = useMemo(
    () => ({
      pending: 'Onay bekliyor',
      approved: 'Onaylandı',
      rejected: 'Reddedildi'
    }),
    []
  );

  useEffect(() => {
    let mounted = true;
    const loadVenue = async () => {
      try {
        const data = await fetchVenueById(id);
        if (mounted) {
          setVenue(data);
          setReservationData((prev) => ({
            ...prev,
            packageId: data?.packages?.[0]?.id ?? '',
            eventDate: data?.availableDates?.[0] ?? ''
          }));
        }
        if (data?.id) {
          const dates = await fetchSuggestedDates(data.id);
          if (mounted) {
            const normalizedDates = Array.isArray(dates) ? dates : [];
            setAvailableDates(normalizedDates);
            if (normalizedDates.length > 0) {
              setReservationData((prev) => ({
                ...prev,
                eventDate: prev.eventDate || normalizedDates[0]
              }));
            }
          }
        }
      } catch (err) {
        if (mounted) setError(err?.message || 'Salon bilgileri yüklenemedi');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadVenue();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleReservationChange = (event) => {
    const { name, value } = event.target;
    setReservationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservation = async (event) => {
    event.preventDefault();
    setReservationError(null);
    setReservationSuccess(null);
    if (!isAuthenticated) {
      setReservationError('Rezervasyon talebi oluşturmak için lütfen giriş yapın.');
      return;
    }
    try {
      const reservation = await createReservation(user.id, {
        venueId: venue.id,
        packageId: reservationData.packageId,
        eventDate: reservationData.eventDate,
        guestCount: Number(reservationData.guestCount),
        opsiyonelPaketler: reservationData.secilenOpsiyoneller || []
      });
      setReservationSuccess('Rezervasyon talebiniz iletildi. Salon sahibi yanıt verdiğinde bilgilendirileceksiniz.');
      setReservationData((prev) => ({ ...prev, guestCount: '', secilenOpsiyoneller: [] }));
      return reservation;
    } catch (err) {
      setReservationError(err?.message || 'Rezervasyon talebi oluşturulamadı');
    }
  };

  const mainPhoto = useMemo(() => {
    const candidate = venue?.coverImage || venue?.ana_foto_url || venue?.ana_foto || venue?.gallery?.[0];
    return normalizeImageUrl(candidate) || fallbackImages[0];
  }, [venue]);
  const galleryImages = useMemo(() => {
    if (!venue?.gallery?.length) return [];
    return venue.gallery
      .map((url) => normalizeImageUrl(url))
      .filter(Boolean);
  }, [venue?.gallery]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <LoadingSpinner label="Salon yükleniyor" />
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error || 'Salon bulunamadı'}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-7">
          <div className="mb-4">
            <span className="badge-soft mb-2">{venue.city}</span>
            <h1 className="display-6 fw-bold text-dark">{venue.name}</h1>
            <p className="text-muted">{venue.address}</p>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12">
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
                <img
                  src={mainPhoto}
                  alt={venue.name}
                  className="object-fit-cover w-100 h-100"
                  onError={(e) => {
                    const index = Number(e.target.dataset.fallbackIndex || 0);
                    if (index >= fallbackImages.length) return;
                    e.target.dataset.fallbackIndex = index + 1;
                    e.target.src = fallbackImages[index];
                  }}
                />
              </div>
            </div>
            {galleryImages.map((image) => (
              <div className="col-md-4" key={image}>
                <div className="ratio ratio-4x3 rounded-4 overflow-hidden">
                  <img
                    src={image}
                    alt="Gallery"
                    className="object-fit-cover w-100 h-100"
                    onError={(e) => {
                      const index = Number(e.target.dataset.fallbackIndex || 0);
                      if (index >= fallbackImages.length) return;
                      e.target.dataset.fallbackIndex = index + 1;
                      e.target.src = fallbackImages[index];
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <section className="mb-4">
            <h2 className="h4 fw-semibold mb-3">Salon hakkında</h2>
            <p className="text-muted">{venue.description}</p>
          </section>
          <section className="row g-3">
            <div className="col-md-4">
              <div className="p-3 bg-white border rounded-3 shadow-sm h-100">
                <span className="text-muted small">Kapasite</span>
                <h5 className="fw-semibold">{venue.capacity} kişi</h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-white border rounded-3 shadow-sm h-100">
                <span className="text-muted small">Lokasyon</span>
                <h5 className="fw-semibold">{venue.district}</h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-white border rounded-3 shadow-sm h-100">
                <span className="text-muted small">Durum</span>
                <h5 className="fw-semibold text-success text-capitalize">{statusLabels[venue.status] ?? venue.status}</h5>
              </div>
            </div>
          </section>
        </div>
        <div className="col-lg-5">
          {/* Opsiyonel Paketler (Sadece gösterim için) */}
          {venue.opsiyonelPaketler && venue.opsiyonelPaketler.length > 0 && (
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-3">Opsiyonel Hizmetler</h3>
                <div className="d-flex flex-column gap-2">
                  {venue.opsiyonelPaketler.map((op) => (
                    <div key={op.id} className="border rounded-3 p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-semibold mb-1">{op.ad}</h6>
                          {op.aciklama && <small className="text-muted">{op.aciklama}</small>}
                        </div>
                        <span className="fw-bold text-primary">
                          +{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(op.fiyat)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

              <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h3 className="h5 fw-semibold mb-3">Paketler</h3>
              <div className="d-flex flex-column gap-3">
                    {venue.packages?.map((pkg) => {
                      const active = reservationData.packageId === pkg.id;
                      return (
                        <button
                          type="button"
                          key={pkg.id}
                          className={`border rounded-3 p-3 text-start w-100 bg-white ${
                            active ? 'border-primary shadow-sm' : ''
                          }`}
                          onClick={() =>
                            setReservationData((prev) => ({
                              ...prev,
                              packageId: pkg.id
                            }))
                          }
                        >
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex align-items-center gap-2">
                              <h6 className="fw-semibold mb-0">{pkg.paket_turu || pkg.name}</h6>
                              {active && <span className="badge bg-primary-subtle text-primary">Seçildi</span>}
                            </div>
                            <span className="fw-bold text-primary">{formatCurrency(getPackagePrice(pkg))}</span>
                          </div>
                          {pkg.aciklama && <p className="text-muted small mb-0">{pkg.aciklama}</p>}
                        </button>
                      );
                    })}
              </div>
                  {selectedPackage && (
                    <div className="mt-3 p-3 bg-light rounded-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Seçilen paket</span>
                        <strong>{selectedPackage.paket_turu || selectedPackage.name}</strong>
                      </div>
                      <div className="d-flex justify-content-between small mb-1">
                        <span>Paket ücreti</span>
                        <strong>{formatCurrency(getPackagePrice(selectedPackage))}</strong>
                      </div>
                      {selectedOptionalPackages.length > 0 && (
                        <>
                          <div className="d-flex justify-content-between small">
                            <span>Opsiyoneller</span>
                            <strong>{formatCurrency(optionalTotal)}</strong>
                          </div>
                          <small className="text-muted d-block">
                            {selectedOptionalPackages.map((op) => op.ad).join(', ')}
                          </small>
                        </>
                      )}
                      <hr />
                      <div className="d-flex justify-content-between">
                        <strong>Toplam</strong>
                        <strong className="text-primary">{formatCurrency(totalPrice)}</strong>
                      </div>
                    </div>
                  )}
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="h5 fw-semibold mb-3">Rezervasyon talebi oluştur</h3>
              {reservationError ? <div className="alert alert-danger">{reservationError}</div> : null}
              {reservationSuccess ? <div className="alert alert-success">{reservationSuccess}</div> : null}
              <form onSubmit={handleReservation} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label fw-semibold text-muted" htmlFor="packageId">
                    Paket
                  </label>
                  <select
                    id="packageId"
                    name="packageId"
                    className="form-select"
                    value={reservationData.packageId}
                    onChange={handleReservationChange}
                    required
                  >
                    {venue.packages?.map((pkg) => (
                      <option value={pkg.id} key={pkg.id}>
                        {pkg.paket_turu || pkg.name} - {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(pkg.fiyat_hafta_ici || pkg.price || 0)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label fw-semibold text-muted" htmlFor="eventDate">
                    Tercih edilen tarih
                  </label>
                  {availableDates.length > 0 ? (
                    <select
                      id="eventDate"
                      name="eventDate"
                      className="form-select"
                      value={reservationData.eventDate}
                      onChange={handleReservationChange}
                      required
                    >
                      <option value="">Tarih seçin</option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={reservationData.eventDate}
                      onChange={handleReservationChange}
                      min={minReservationDate}
                      required
                      helperText="Müsait tarih listesi bulunamadı, lütfen tarihi manuel girin."
                    />
                  )}
                </div>

                {/* Opsiyonel Paketler */}
                {venue.opsiyonelPaketler && venue.opsiyonelPaketler.length > 0 && (
                  <div>
                    <label className="form-label fw-semibold text-muted">
                      Opsiyonel Hizmetler (İsteğe Bağlı)
                    </label>
                    <div className="d-flex flex-column gap-2">
                      {venue.opsiyonelPaketler.map((op) => (
                        <div key={op.id} className="form-check border rounded p-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`opsiyonel-${op.id}`}
                            checked={reservationData.secilenOpsiyoneller.includes(op.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setReservationData(prev => ({
                                  ...prev,
                                  secilenOpsiyoneller: [...prev.secilenOpsiyoneller, op.id]
                                }));
                              } else {
                                setReservationData(prev => ({
                                  ...prev,
                                  secilenOpsiyoneller: prev.secilenOpsiyoneller.filter(id => id !== op.id)
                                }));
                              }
                            }}
                          />
                          <label className="form-check-label w-100" htmlFor={`opsiyonel-${op.id}`}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>{op.ad}</strong>
                                {op.aciklama && <small className="d-block text-muted">{op.aciklama}</small>}
                              </div>
                              <span className="fw-bold text-primary">
                                +{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(op.fiyat)}
                              </span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                    {reservationData.secilenOpsiyoneller.length > 0 && (
                      <div className="mt-2 p-2 bg-light rounded">
                        <small className="text-muted d-block">
                          Seçilen opsiyoneller: {reservationData.secilenOpsiyoneller.length} adet
                        </small>
                        <small className="text-muted d-block">
                          Opsiyonel toplamı: <strong>{formatCurrency(optionalTotal)}</strong>
                        </small>
                      </div>
                    )}
                  </div>
                )}

                <Input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  label="Tahmini misafir sayısı"
                  placeholder="örn. 250"
                  value={reservationData.guestCount}
                  onChange={handleReservationChange}
                  required
                  min={50}
                />

                <Button type="submit" disabled={!isAuthenticated}>
                  Talebimi gönder
                </Button>
              </form>
              {!isAuthenticated ? (
                <p className="text-muted small mt-3">
                  Rezervasyon talebi oluşturmak için müşteri olarak giriş yapmalısınız.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage;

