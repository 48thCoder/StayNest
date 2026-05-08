import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Menu, X } from 'lucide-react';
import logo from '../assets/Logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  const isActive = (path) => {
  if (path === '/' && location.hash) return false;
  return location.pathname === path;
};

const isHashActive = (hash) => location.hash === '#' + hash;

  const navLinks = [
    { home: true, label: 'Home' },
    { page: '/listings', label: 'Listings' },
    { hash: 'how-it-works', label: 'How It Works' },
    { hash: 'testimonials', label: 'Reviews' },
  ];

  const handleHomeLink = () => {
    setMobileMenuOpen(false);
    window.location.href = '/';
  };

  const handlePageLink = (path) => {
    setMobileMenuOpen(false);
    if (location.hash) {
      window.location.hash = '';
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHashLink = (hash) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.location.hash = hash;
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    } else {
      navigate('/');
      setTimeout(() => {
        window.location.hash = hash;
      }, 100);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-warm-gray-200 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
<button onClick={handleHomeLink} className="flex items-center gap-1 group cursor-pointer">
            <motion.div
              className="relative w-16 h-16"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={logo}
                alt="StayNest Logo"
                className="absolute inset-0 w-full h-full object-contain rounded-xl z-10"
              />
              <motion.div
                className="absolute inset-0 rounded-xl bg-primary/20 blur-md"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.1, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <div className="flex flex-col items-start">
              <span className="font-display font-bold text-2xl text-warm-gray-800 leading-none">
                Stay<span className="text-primary">Nest</span>
              </span>
              <span className="text-[10px] text-warm-gray-400 font-medium tracking-[0.2em] uppercase mt-0.5">
                Premium Living
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.home ? (
                <button 
                  key="home"
                  onClick={handleHomeLink}
                  className={`font-medium transition-colors link-underline ${isActive('/') ? 'text-primary' : 'text-warm-gray-600 hover:text-primary'} cursor-pointer`}
                >
                  {link.label}
                </button>
              ) : link.page ? (
                <button 
                  key={link.page}
                  onClick={() => handlePageLink(link.page)}
                  className={`font-medium transition-colors link-underline cursor-pointer ${isActive(link.page) ? 'text-primary' : 'text-warm-gray-600 hover:text-primary'}`}
                >
                  {link.label}
                </button>
              ) : (
                <button 
                  key={link.hash}
                  onClick={() => handleHashLink(link.hash)}
                  className={`font-medium transition-colors link-underline cursor-pointer ${isHashActive(link.hash) ? 'text-primary' : 'text-warm-gray-600 hover:text-primary'}`}
                >
                  {link.label}
                </button>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button 
              className="text-warm-gray-600 hover:text-primary font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log In
            </motion.button>
            <motion.button 
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary/25 btn-shine"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>

          <motion.button 
            className="md:hidden p-2 rounded-lg hover:bg-warm-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-warm-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-warm-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-t border-warm-gray-200 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.home ? 'home' : link.page || link.hash}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.home ? (
                    <button 
                      onClick={handleHomeLink}
                      className={`block w-full text-left px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-warm-gray-600 hover:bg-warm-gray-100 hover:text-primary'}`}
                    >
                      {link.label}
                    </button>
                  ) : link.page ? (
                    <button 
                      onClick={() => handlePageLink(link.page)}
                      className={`block w-full text-left px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${isActive(link.page) ? 'bg-primary/10 text-primary' : 'text-warm-gray-600 hover:bg-warm-gray-100 hover:text-primary'}`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleHashLink(link.hash)}
                      className={`block w-full text-left px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${isHashActive(link.hash) ? 'bg-primary/10 text-primary' : 'text-warm-gray-600 hover:bg-warm-gray-100 hover:text-primary'}`}
                    >
                      {link.label}
                    </button>
                  )}
                </motion.div>
              ))}
              <motion.div 
                className="pt-2 border-t border-warm-gray-200 space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button className="block w-full text-left px-3 py-2 text-warm-gray-600 font-medium hover:bg-warm-gray-100 rounded-lg transition-colors">Log In</button>
                <button className="block w-full text-center px-3 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">Sign Up</button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
