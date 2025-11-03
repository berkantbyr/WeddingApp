import React from 'react';

const LoadingSpinner = ({ label = 'Yükleniyor...' }) => {
  return (
    <div className="flex flex-col items-center gap-3 text-primary">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{label}</span>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default LoadingSpinner;

