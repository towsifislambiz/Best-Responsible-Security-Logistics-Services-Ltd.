import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { SiteDataProvider } from './context/SiteDataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LeadershipPage from './pages/LeadershipPage';
import ManagementTeamPage from './pages/ManagementTeamPage';
import OrganogramPage from './pages/OrganogramPage';
import LicensesPage from './pages/LicensesPage';
import TrainingPage from './pages/TrainingPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PricingPage from './pages/PricingPage';
import HireGuardPage from './pages/HireGuardPage';
import ClientsPage from './pages/ClientsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import SectorsPage from './pages/SectorsPage';
import GalleryPage from './pages/GalleryPage';
import CareerPage from './pages/CareerPage';
import ContactPage from './pages/ContactPage';
import Top10SecurityAgencyPage from './pages/Top10SecurityAgencyPage';

// Admin Suite
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminManagementTeam from './admin/AdminManagementTeam';
import AdminLicenses from './admin/AdminLicenses';
import AdminStaff from './admin/AdminStaff';
import AdminClients from './admin/AdminClients';
import AdminRequisitions from './admin/AdminRequisitions';
import AdminRecruitment from './admin/AdminRecruitment';
import AdminRates from './admin/AdminRates';
import AdminInquiries from './admin/AdminInquiries';
import AdminSettings from './admin/AdminSettings';
import AdminSecurity from './admin/AdminSecurity';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Layout wrapper with Navbar, Footer, WhatsApp
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 w-full max-w-full overflow-x-hidden">
      <Navbar />
      <div className="flex-1 w-full max-w-full">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SiteDataProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/management-team" element={<ManagementTeamPage />} />
              <Route path="/organogram" element={<OrganogramPage />} />
              <Route path="/licenses" element={<LicensesPage />} />
              <Route path="/training" element={<TrainingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/hire-guard" element={<HireGuardPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/sectors" element={<SectorsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/career" element={<CareerPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/top-10-security-agency-in-bangladesh" element={<Top10SecurityAgencyPage />} />
              <Route path="/top-10-security-agency-in-bd" element={<Top10SecurityAgencyPage />} />
            </Route>

            {/* Admin Portal Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="management-team" element={<AdminManagementTeam />} />
              <Route path="licenses" element={<AdminLicenses />} />
              <Route path="staff" element={<AdminStaff />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="requisitions" element={<AdminRequisitions />} />
              <Route path="recruitment" element={<AdminRecruitment />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="rates" element={<AdminRates />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="security" element={<AdminSecurity />} />
            </Route>

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Router>
      </SiteDataProvider>
    </LanguageProvider>
  );
}
