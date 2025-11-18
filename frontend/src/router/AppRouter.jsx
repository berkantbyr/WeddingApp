import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layout/MainLayout.jsx';
import AuthLayout from '../layout/AuthLayout.jsx';
import AdminLayout from '../layout/AdminLayout.jsx';
import OwnerLayout from '../layout/OwnerLayout.jsx';
import CustomerLayout from '../layout/CustomerLayout.jsx';

import HomePage from '../pages/public/HomePage.jsx';
import AboutPage from '../pages/public/AboutPage.jsx';
import ContactPage from '../pages/public/ContactPage.jsx';
import VenueSearchPage from '../pages/public/VenueSearchPage.jsx';
import VenueDetailsPage from '../pages/public/VenueDetailsPage.jsx';
import PricingPage from '../pages/public/PricingPage.jsx';
import PrivacyPage from '../pages/public/PrivacyPage.jsx';
import TermsPage from '../pages/public/TermsPage.jsx';
import CookiesPage from '../pages/public/CookiesPage.jsx';
import BlogPage from '../pages/public/BlogPage.jsx';
import FAQPage from '../pages/public/FAQPage.jsx';

import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage.jsx';

import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import VenueApprovalPage from '../pages/admin/VenueApprovalPage.jsx';
import UserManagementPage from '../pages/admin/UserManagementPage.jsx';

import OwnerDashboard from '../pages/owner/OwnerDashboard.jsx';
import MyVenuesPage from '../pages/owner/MyVenuesPage.jsx';
import AddVenuePage from '../pages/owner/AddVenuePage.jsx';
import EditVenuePage from '../pages/owner/EditVenuePage.jsx';
import OwnerReservationsPage from '../pages/owner/OwnerReservationsPage.jsx';

import CustomerDashboard from '../pages/customer/CustomerDashboard.jsx';
import MyReservationsPage from '../pages/customer/MyReservationsPage.jsx';
import ProfilePage from '../pages/customer/ProfilePage.jsx';

import NotFoundPage from '../pages/NotFoundPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/venues" element={<VenueSearchPage />} />
        <Route path="/venues/:id" element={<VenueDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<PrivateRoute roles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="venues" element={<VenueApprovalPage />} />
          <Route path="users" element={<UserManagementPage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute roles={['owner']} />}>
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="venues" element={<MyVenuesPage />} />
          <Route path="venues/:id/edit" element={<EditVenuePage />} />
          <Route path="reservations" element={<OwnerReservationsPage />} />
          <Route path="add" element={<AddVenuePage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute roles={['customer']} />}>
        <Route path="/account" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="reservations" element={<MyReservationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;