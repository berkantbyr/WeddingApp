import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container py-5 text-center">
      <div className="mx-auto" style={{ maxWidth: 520 }}>
        <h1 className="display-4 fw-bold text-primary mb-3">404</h1>
        <p className="lead text-muted mb-4">
          Aradığınız sayfa bulunamadı. Taşınmış veya artık erişilemiyor olabilir.
        </p>
        <Link to="/" className="btn btn-primary">
          Ana sayfaya dön
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

