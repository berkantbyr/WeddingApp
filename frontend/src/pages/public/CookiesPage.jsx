import React from 'react';

const CookiesPage = () => {
  return (
    <div className="container py-5">
      <h1 className="section-heading">Çerez politikası</h1>
      <p className="text-muted mb-4">
        Çerezler tercihlerinizi hatırlayarak, oturumunuzu açık tutarak ve hizmetlerimizi geliştirmek için analitik veriler
        toplayarak size daha iyi bir deneyim sunmamıza yardımcı olur.
      </p>
      <div className="d-flex flex-column gap-3 text-muted small">
        <div>
          <h5 className="fw-semibold">Zorunlu çerezler</h5>
          <p className="mb-0">Kimlik doğrulama ve güvenli gezinme için gereklidir.</p>
        </div>
        <div>
          <h5 className="fw-semibold">Analitik çerezler</h5>
          <p className="mb-0">Özelliklerin kullanımını anlamamızı ve performansı iyileştirmemizi sağlar.</p>
        </div>
        <div>
          <h5 className="fw-semibold">Tercihlerin yönetimi</h5>
          <p className="mb-0">Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bazı özellikler düzgün çalışmayabilir.</p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;

