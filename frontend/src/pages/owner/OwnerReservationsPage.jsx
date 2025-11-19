import React, { useCallback, useEffect, useState } from 'react';
import { fetchOwnerReservations, updateReservationStatus } from '../../services/venueService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const formatCurrency = (value) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Number(value) || 0);

const extractPaymentLine = (notes) => {
  if (!notes) return null;
  const lines = notes.split('\n');
  return lines.find((line) => line.trim().startsWith('[ÖDEME]'))?.replace('[ÖDEME]', '').trim() ?? null;
};

const OwnerReservationsPage = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decisionLoading, setDecisionLoading] = useState(null);
  const [paymentFeedback, setPaymentFeedback] = useState(null);

  const loadReservations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOwnerReservations(user?.id);
      setReservations(data);
    } catch (err) {
      setError(err?.message || 'Rezervasyonlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const simulatePaymentCapture = useCallback(async (reservation) => {
    const total = reservation?.totalPrice ?? reservation?.package?.price ?? 0;
    setPaymentFeedback({
      type: 'info',
      message: `${reservation?.customer?.name || 'Müşteri'} kartından ${formatCurrency(total)} tahsil ediliyor...`
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPaymentFeedback({
      type: 'success',
      message: 'Ödeme başarıyla tahsil edildi (senaryo).'
    });
    setTimeout(() => setPaymentFeedback(null), 4500);
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    loadReservations();
  }, [user?.id, loadReservations]);

  const handleStatus = useCallback(
    async (reservation, status) => {
      setDecisionLoading(reservation.id);
      try {
        if (status === 'confirmed') {
          await simulatePaymentCapture(reservation);
        }
        await updateReservationStatus(reservation.id, status);
        await loadReservations();
      } catch (err) {
        setPaymentFeedback({
          type: 'danger',
          message: err?.message || 'İşlem tamamlanamadı'
        });
      } finally {
        setDecisionLoading(null);
      }
    },
    [loadReservations, simulatePaymentCapture]
  );

  if (loading) {
    return <LoadingSpinner label="Rezervasyonlar yükleniyor" />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {paymentFeedback ? (
        <div
          className={`alert alert-${
            paymentFeedback.type === 'success'
              ? 'success'
              : paymentFeedback.type === 'danger'
              ? 'danger'
              : 'info'
          }`}
        >
          {paymentFeedback.message}
        </div>
      ) : null}
      {!reservations.length ? (
        <div className="alert alert-info">Şu anda rezervasyon talebi bulunmuyor.</div>
      ) : (
        reservations.map((reservation) => {
          const paymentLine = extractPaymentLine(reservation.notes);
          const generalNotes = (reservation.notes || '')
            .split('\n')
            .filter((line) => !line.trim().startsWith('[ÖDEME]'))
            .filter((line) => line.trim().length)
            .join('\n');
          return (
        <div key={reservation.id} className="card border-0 shadow-sm">
          <div className="card-body d-flex flex-column flex-lg-row gap-4">
            <div className="flex-grow-1">
              <h5 className="fw-semibold mb-1">{reservation.venue?.name || 'Salon bilgisi yok'}</h5>
              <p className="text-muted small mb-1">Etkinlik tarihi: {new Date(reservation.eventDate).toLocaleDateString('tr-TR')}</p>
              {reservation.customer && (
                <p className="text-muted small mb-1">Müşteri: {reservation.customer.name}</p>
              )}
              {reservation.customer?.phone && (
                <p className="text-muted small mb-1">Telefon: {reservation.customer.phone}</p>
              )}
              {reservation.package && (
                <p className="text-muted small mb-0">Paket: {reservation.package.name}</p>
              )}
              {reservation.totalPrice ? (
                <p className="text-muted small mb-0">Tahsilat: {formatCurrency(reservation.totalPrice)}</p>
              ) : null}
              {generalNotes && (
                <p className="text-muted small mt-2 mb-0">Notlar: {generalNotes}</p>
              )}
              {paymentLine && (
                <p className="text-muted small mt-1 mb-0">{paymentLine}</p>
              )}
            </div>
            <div className="d-flex flex-column gap-2 align-items-lg-end">
              <span className={`badge bg-${reservation.status === 'pending' ? 'warning' : reservation.status === 'confirmed' ? 'success' : 'secondary'} text-uppercase fw-semibold`}>
                {reservation.status === 'pending'
                  ? 'Onay bekliyor'
                  : reservation.status === 'confirmed'
                  ? 'Onaylandı'
                  : 'Reddedildi'}
              </span>
              {reservation.status === 'pending' ? (
                <div className="d-flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleStatus(reservation, 'confirmed')}
                    disabled={decisionLoading === reservation.id}
                  >
                    Onayla
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={() => handleStatus(reservation, 'declined')}
                    disabled={decisionLoading === reservation.id}
                  >
                    Reddet
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        );
        })
      )}
    </div>
  );
};

export default OwnerReservationsPage;

