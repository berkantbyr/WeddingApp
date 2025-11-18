import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

const PrivateRoute = ({ roles = [] }) => {
  const location = useLocation();
  const { isAuthenticated, loading, user, hasRole } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner label="Yetkili içerik yükleniyor" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ redirectTo: location.pathname }} />;
  }

  if (roles.length && !hasRole(roles)) {
    const fallbackPath = user?.role === 'owner' ? '/owner' : user?.role === 'admin' ? '/admin' : '/';
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

