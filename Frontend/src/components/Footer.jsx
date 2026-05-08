import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Send, Apple } from 'lucide-react';
import logo from '../assets/Logo.png';
import AnimatedSection from './AnimatedSection';

const socialLinks = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Linkedin, label: 'LinkedIn' },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <AnimatedSection animation="fadeUp" delay={0} className="col-span-2 md:col-span-1">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <motion.div 
                  className="w-16 h-16"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={logo}
                    alt="StayNest Logo"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </motion.div>
                <div className="flex flex-col items-start">
                  <span className="font-display font-bold text-2xl leading-none">
                    Stay<span className="text-primary-light">Nest</span>
                  </span>
                  <span className="text-[10px] text-warm-gray-400 font-medium tracking-[0.2em] uppercase mt-0.5">
                    Premium Living
                  </span>
                </div>
              </div>
              <p className="text-warm-gray-400 mb-6">
                Your trusted partner in finding the perfect PG accommodation across India's top cities.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a 
                    key={social.label}
                    href="#" 
                    className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-warm-gray-400 hover:text-primary-light transition-colors">Home</Link></li>
                <li><Link to="/listings" className="text-warm-gray-400 hover:text-primary-light transition-colors">Browse PGs</Link></li>
                <li><a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">About Us</a></li>
                <li><a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Contact</a></li>
                <li><a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Blog</a></li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Top Cities</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Bangalore</a></li>
                <li><a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Delhi</a></li>
                <li><a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Mumbai</a></li>
                <li><a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Pune</a></li>
                <li><a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Hyderabad</a></li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.3} className="col-span-2 md:col-span-1">
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Stay Updated</h4>
              <p className="text-warm-gray-400 mb-4">Subscribe for the latest listings and exclusive offers.</p>
              <form className="flex gap-2 mb-6">
                <input 
                  type="email" 
                  placeholder="Enter email" required
                  className="flex-1 px-4 py-3 bg-warm-gray-800 border border-warm-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-warm-gray-500 transition-all"
                />
                <motion.button
                  className="px-2 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-7 h-7" />
                </motion.button>
              </form>
              <h4 className="font-display font-semibold text-lg mb-3">Download App</h4>
              <div className="flex gap-3">
                <motion.a 
                  href="#" 
                  className="flex items-center gap-2 bg-warm-gray-800 px-2 py-2 rounded-lg hover:bg-warm-gray-700 transition-colors"
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-warm-gray-400">Download on</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="flex items-center gap-2 bg-warm-gray-800 px-4 py-2 rounded-lg hover:bg-warm-gray-700 transition-colors"
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-warm-gray-400">Get it on</div>
                    <div className="text-sm font-semibold">Play Store</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <motion.div 
          className="border-t border-warm-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-warm-gray-400 text-sm">© 2026 StayNest. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Privacy Policy</a>
            <a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Terms of Service</a>
            <a href="#" className="text-warm-gray-400 hover:text-primary-light transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
