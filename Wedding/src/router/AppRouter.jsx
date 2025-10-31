import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- Layout'larý (Sayfa Düzenlerini) Import Et ---
// Henüz bu dosyalarý oluþturmadýk ama importlarý hazýr olsun.
// import MainLayout from '../components/layout/MainLayout';
// import AdminLayout from '../components/layout/AdminLayout';
// import AuthLayout from '../components/layout/AuthLayout';

// --- Genel (Public) Sayfalarý Import Et ---
// Henüz bu dosyalarý da oluþturmadýk.
// import HomePage from '../pages/public/HomePage';
// import AboutPage from '../pages/public/AboutPage';
// import ContactPage from '../pages/public/ContactPage';
// import VenueSearchPage from '../pages/public/VenueSearchPage';
// import VenueDetailsPage from '../pages/public/VenueDetailsPage';

// --- Giriþ (Auth) Sayfalarýný Import Et ---
// import LoginPage from '../pages/auth/LoginPage';
// import RegisterPage from '../pages/auth/RegisterPage';

// --- Admin Sayfalarýný Import Et ---
// import AdminDashboard from '../pages/admin/AdminDashboard';
// import VenueApprovalPage from '../pages/admin/VenueApprovalPage';

// --- Salon Sahibi (Owner) Sayfalarýný Import Et ---
// import OwnerDashboard from '../pages/owner/OwnerDashboard';
// import MyVenuesPage from '../pages/owner/MyVenuesPage';

// --- Müþteri (Customer) Sayfalarýný Import Et ---
// import CustomerDashboard from '../pages/customer/CustomerDashboard';
// import MyReservationsPage from '../pages/customer/MyReservationsPage';

// --- Diðer Sayfalar ---
import NotFoundPage from '../pages/NotFoundPage'; // Bu dosya zaten var görünüyor

const AppRouter = () => {
    return (
        <Routes>
            {/* Þimdilik projenin hata vermemesi için
        sadece basit bir anasayfa rotasý ekleyelim.
        Bunu "HomePage" dosyasýný oluþturunca güncelleyeceðiz.
      */}
            <Route path="/" element={<div>Ana Sayfa</div>} />

            {/* --- GELECEKTEKÝ YAPI ---
          Aþaðýdaki kodlarý, ilgili sayfalarý oluþturdukça
          yukarýdaki importlarý açarak aktif edeceksin.
      */}

            {/* // 1. Genel (Public) Sayfalar (Navbar ve Footer içeren)
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hakkimizda" element={<AboutPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
        <Route path="/salon-ara" element={<VenueSearchPage />} />
        <Route path="/salon/:id" element={<VenueDetailsPage />} />
      </Route>

      // 2. Giriþ/Kayýt Sayfalarý (Sade bir layout ile)
      <Route element={<AuthLayout />}>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/kayit-ol" element={<RegisterPage />} />
      </Route>

      // 3. Admin Paneli (Admin'e özel layout ile)
      // Bu rotalarý "PrivateRoute" ile korumak gerekecek
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} /> 
        <Route path="onay-bekleyenler" element={<VenueApprovalPage />} />
      </Route>

      // 4. Salon Sahibi Paneli
      // Bu rotalarý "PrivateRoute" ile korumak gerekecek
      <Route path="/panel" element={<OwnerLayout />}> // Örn: /panel
        <Route index element={<OwnerDashboard />} />
        <Route path="salonlarim" element={<MyVenuesPage />} />
      </Route>

      // 5. Müþteri Paneli
      // Bu rotalarý "PrivateRoute" ile korumak gerekecek
      <Route path="/hesabim" element={<CustomerLayout />}> // Örn: /hesabim
        <Route index element={<CustomerDashboard />} />
        <Route path="rezervasyonlarim" element={<MyReservationsPage />} />
      </Route>
      */}

            {/* 6. Bulunamayan Sayfalar (404) */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;