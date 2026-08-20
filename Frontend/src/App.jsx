import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PGDetailPage from './pages/PGDetailPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/pg/:id" element={<PGDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
