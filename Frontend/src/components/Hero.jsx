import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, IndianRupee } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import FloatingShapes from './FloatingShapes';

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (gender) params.set('gender', gender);
    if (budget) params.set('budget', budget);
    navigate(`/listings?${params.toString()}`);
  };

  const titleWords = ['Find', 'Your', 'Home', 'Away', 'From', 'Home'];

  return (
    <section className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Mobile portrait image */}
        <img 
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80" 
          alt="Modern PG accommodation" 
          className="w-full h-full object-cover md:hidden"
        />
        {/* Desktop landscape image */}
        <img 
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Modern PG accommodation" 
          className="w-full h-full object-cover object-center hidden md:block"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <FloatingShapes />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h1 
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              variants={{
                hidden: { opacity: 0, y: 40, rotateX: -40 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
                }
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Discover comfortable, affordable PG accommodations in prime locations across India's top cities
        </motion.p>

        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <input 
                type="text" 
                placeholder="Enter location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-warm-gray-50 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </motion.div>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full pl-12 pr-2 py-3 bg-warm-gray-50 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
              >
                <option value="">Gender Preference</option>
                <option value="boys">Boys PG</option>
                <option value="girls">Girls PG</option>
                <option value="coed">Co-ed PG</option>
              </select>
            </motion.div>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-warm-gray-50 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
              >
                <option value="">Budget Range</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-15000">₹10,000 - ₹15,000</option>
                <option value="15000-20000">₹15,000 - ₹20,000</option>
                <option value="20000+">₹20,000+</option>
              </select>
            </motion.div>
            <motion.button 
              onClick={handleSearch}
              className="bg-cta hover:bg-cta-dark text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cta/30 btn-shine"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Search className="w-5 h-5" />
              Search PGs
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {[
            { end: 500, suffix: '+', label: 'Verified PGs' },
            { end: 10000, suffix: '+', label: 'Happy Residents' },
            { end: 15, suffix: '+', label: 'Cities Covered' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white font-display">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-white/80 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
