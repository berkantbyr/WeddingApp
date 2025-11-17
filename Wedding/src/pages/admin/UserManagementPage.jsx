import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../services/adminService.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { getUserFriendlyRole } from '../../services/mockBackend.js';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        if (mounted) setUsers(data);
      } catch (err) {
        if (mounted) setError(err?.message || 'Kullanıcılar yüklenemedi');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadUsers();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner label="Kullanıcılar yükleniyor" />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <h1 className="h4 fw-bold">Kullanıcı listesi</h1>
        <p className="text-muted">Platforma kayıtlı müşterileri, salon sahiplerini ve yöneticileri buradan görüntüleyin.</p>
      </div>

      <div className="table-responsive shadow-sm">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Ad Soyad</th>
              <th scope="col">Kullanıcı adı</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.fullName)}`}
                      alt={user.fullName}
                      className="rounded-circle"
                      width="40"
                      height="40"
                    />
                    <div>
                      <span className="fw-semibold">{user.fullName}</span>
                      {user.company ? <div className="text-muted small">{user.company}</div> : null}
                    </div>
                  </div>
                </td>
                <td>{user.username}</td>
                <td>
                  <span className="badge bg-primary-subtle text-primary fw-semibold">
                    {getUserFriendlyRole(user.role)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;

