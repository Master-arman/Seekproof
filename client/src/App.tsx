import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { AdminProtectedRoute } from './components/common/AdminProtectedRoute';
import { useAuth } from './hooks/useAuth';

// Lazy-loaded Public Pages
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FreeConsultationPage = lazy(() => import('./pages/FreeConsultationPage').then(m => ({ default: m.FreeConsultationPage })));
const BlogListPage = lazy(() => import('./pages/BlogListPage').then(m => ({ default: m.BlogListPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(m => ({ default: m.TermsOfServicePage })));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage').then(m => ({ default: m.DisclaimerPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Lazy-loaded Auth & Portal Pages
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));

// Lazy-loaded Admin Pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminLeadsPage = lazy(() => import('./pages/admin/AdminLeadsPage').then(m => ({ default: m.AdminLeadsPage })));
const AdminTestimonialsPage = lazy(() => import('./pages/admin/AdminTestimonialsPage').then(m => ({ default: m.AdminTestimonialsPage })));
const AdminServicesPage = lazy(() => import('./pages/admin/AdminServicesPage').then(m => ({ default: m.AdminServicesPage })));
const AdminServiceFormPage = lazy(() => import('./pages/admin/AdminServiceFormPage').then(m => ({ default: m.AdminServiceFormPage })));
const AdminBlogPage = lazy(() => import('./pages/admin/AdminBlogPage').then(m => ({ default: m.AdminBlogPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));

// Protected Route for Client Portal
function ProtectedClientRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070E18] flex flex-col items-center justify-center space-y-3 text-[#D4AF37] font-mono text-xs">
        <div className="h-6 w-6 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
        <div>Authenticating Secure Session...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Suspense Fallback Loader
function PageLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 bg-[#F8FAFC] text-slate-800">
      <div className="h-8 w-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
      <span className="text-xs font-mono tracking-wider text-slate-500 uppercase">
        Loading Intelligence Assets...
      </span>
    </div>
  );
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          {/* Public Routes with PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/free-consultation" element={<FreeConsultationPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Route>

          {/* Client Authentication Pages */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Client Case Tracking Portal (Protected) */}
          <Route
            path="/portal"
            element={
              <ProtectedClientRoute>
                <DashboardLayout />
              </ProtectedClientRoute>
            }
          >
            <Route index element={<DashboardPage />} />
          </Route>

          {/* Admin Login (Unprotected) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Portal (Protected by AdminProtectedRoute) */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="leads" element={<AdminLeadsPage />} />
            <Route path="testimonials" element={<AdminTestimonialsPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="services/new" element={<AdminServiceFormPage />} />
            <Route path="services/:id/edit" element={<AdminServiceFormPage />} />
            <Route path="blog" element={<AdminBlogPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* 404 Catch-All */}
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
