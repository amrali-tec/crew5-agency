import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Components & Pages
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingSideDock from './components/layout/FloatingSideDock';
import AiChatbot from './components/layout/AiChatbot';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CeoMessagePage from './pages/CeoMessagePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DynamicPage from './pages/DynamicPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import ProjectEstimatorPage from './pages/ProjectEstimatorPage';
import DigitalAuditPage from './pages/DigitalAuditPage';
import ClientTrackerPage from './pages/ClientTrackerPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import GlobalComponentsRenderer from './components/layout/GlobalComponentsRenderer';
import CookieConsent from './components/layout/CookieConsent';

// Admin Components & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminPagesManager from './pages/admin/AdminPagesManager';
import AdminComponentsPage from './pages/admin/AdminComponentsPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminClientProjectsPage from './pages/admin/AdminClientProjectsPage';
import AdminBlogsPage from './pages/admin/AdminBlogsPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';
import AdminTeamPage from './pages/admin/AdminTeamPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSectionsPage from './pages/admin/AdminSectionsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center text-brand-green font-bold">
        <div className="animate-spin w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

// Scroll to top helper
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function MainApp() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-brand-green selection:text-dark-950">
      <ScrollToTop />
      
      {!isAdminRoute && (
        <header className="fixed top-0 left-0 right-0 z-50">
          <GlobalComponentsRenderer position="top_bar" />
          <Navbar />
        </header>
      )}

      <main className="flex-grow">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ceo-message" element={<CeoMessagePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/p/:slug" element={<DynamicPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/estimator" element={<ProjectEstimatorPage />} />
          <Route path="/audit" element={<DigitalAuditPage />} />
          <Route path="/track" element={<ClientTrackerPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />

          {/* Admin Auth Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="client-projects" element={<AdminClientProjectsPage />} />
            <Route path="pages" element={<AdminPagesManager />} />
            <Route path="components" element={<AdminComponentsPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="blogs" element={<AdminBlogsPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
            <Route path="testimonials" element={<AdminTestimonialsPage />} />
            <Route path="team" element={<AdminTeamPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="sections" element={<AdminSectionsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && <GlobalComponentsRenderer position="floating" />}
      {!isAdminRoute && <FloatingSideDock />}
      {!isAdminRoute && <AiChatbot />}
      {!isAdminRoute && <CookieConsent />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <DataProvider>
            <MainApp />
          </DataProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
