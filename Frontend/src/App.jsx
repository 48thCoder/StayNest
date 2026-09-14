import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PGDetailPage from './pages/PGDetailPage';
import LegalPage from './pages/LegalPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/pg/:id" element={<PGDetailPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<LegalPage initialTab="terms" />} />
                <Route path="/privacy" element={<LegalPage initialTab="privacy" />} />
                <Route path="/cookies" element={<LegalPage initialTab="cookies" />} />
                <Route path="/cookie-policy" element={<LegalPage initialTab="cookies" />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/terms-and-privacy" element={<LegalPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <SpeedInsights />
          <Analytics />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
