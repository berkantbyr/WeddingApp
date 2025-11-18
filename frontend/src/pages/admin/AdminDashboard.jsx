import React, { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../../services/adminService.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const metrics = [
  { key: 'venueCount', label: 'Toplam salon', icon: 'bi-buildings' },
  { key: 'approvedVenueCount', label: 'Onaylanan', icon: 'bi-check-circle' },
  { key: 'pendingVenueCount', label: 'Onay bekleyen', icon: 'bi-hourglass-split' },
  { key: 'reservationCount', label: 'Rezervasyon', icon: 'bi-calendar-check' },
  { key: 'userCount', label: 'Kullanıcı', icon: 'bi-people' }
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        if (mounted) setStats(data);
      } catch (err) {
        if (mounted) setError(err?.message || 'İstatistikler yüklenemedi');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadStats();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner label="Yönetici özet ekranı yükleniyor" />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h1 className="h3 fw-bold mb-2">Yönetim paneli özeti</h1>
        <p className="text-muted mb-0">Platform performansını ve onay bekleyen salonları buradan takip edin.</p>
      </div>

      <div className="row g-4">
        {metrics.map((metric) => (
          <div className="col-md-4 col-xl-3" key={metric.key}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-primary/10 text-primary d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>
                    <i className={`bi ${metric.icon}`} />
                  </div>
                  <span className="text-muted small">{metric.label}</span>
                </div>
                <h3 className="fw-bold mb-0">{stats?.[metric.key] ?? 0}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

