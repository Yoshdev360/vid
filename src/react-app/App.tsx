import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { AuthProvider, useAuth } from "@getmocha/users-service/react";
import HomePage from "@/react-app/pages/Home";
import ProfilePage from "@/react-app/pages/Profile";
import EnhancedProfilePage from "@/react-app/pages/EnhancedProfile";
import PlansPage from "@/react-app/pages/Plans";
import FilesPage from "@/react-app/pages/Files";
import WizardPage from "@/react-app/pages/Wizard";
import ConfigPage from "@/react-app/pages/Config";
import EnhancedConfigPage from "@/react-app/pages/EnhancedConfig";
import CheckoutPage from "@/react-app/pages/Checkout";
import SongsPage from "@/react-app/pages/Songs";
import MissionsPage from "@/react-app/pages/Missions";
import SupportPage from "@/react-app/pages/Support";
import AboutPage from "@/react-app/pages/About";
import PrivacyPage from "@/react-app/pages/Privacy";
import TermsPage from "@/react-app/pages/Terms";
import CookiesPage from "@/react-app/pages/Cookies";
import BlogPage from "@/react-app/pages/Blog";
import LoginPage from "@/react-app/pages/Login";
import RegisterPage from "@/react-app/pages/Register";
import ForgotPasswordPage from "@/react-app/pages/ForgotPassword";
import VerifyTokenPage from "@/react-app/pages/VerifyToken";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import NotFoundPage from "@/react-app/pages/NotFound";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isPending } = useAuth();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin mb-4">
          <Loader2 className="w-10 h-10 text-purple-500" />
        </div>
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/verify" element={<VerifyTokenPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      {/* Public Routes - accessible without login */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      
      {/* Protected Routes - require login */}
      <Route path="/profile" element={<EnhancedProfilePage />} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/files" element={<FilesPage />} />
      <Route path="/wizard" element={<WizardPage />} />
      <Route path="/config" element={<EnhancedConfigPage />} />
      <Route path="/songs" element={<SongsPage />} />
      <Route path="/missions" element={<MissionsPage />} />
      <Route path="/support" element={<SupportPage />} />
      
      {/* 404 Catch-all Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
