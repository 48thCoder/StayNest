import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Star, MapPin, Wifi, Snowflake, Utensils, Shirt, Car, 
  CheckCircle, Phone, Mail, Bed, User, ChevronLeft, ChevronRight
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { pgData } from '../data/pgs';
import { formatPrice } from '../utils/helpers';

const amenityIcons = {
  wifi: { icon: Wifi, label: 'WiFi' },
  ac: { icon: Snowflake, label: 'AC' },
  food: { icon: Utensils, label: 'Meals' },
  laundry: { icon: Shirt, label: 'Laundry' },
  parking: { icon: Car, label: 'Parking' }
};

const PGDetailPage = () => {
  const { id } = useParams();
  const pg = pgData.find(p => p.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState(1);

  if (!pg) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <motion.h2 
            className="text-2xl font-bold text-warm-gray-800 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            PG Not Found
          </motion.h2>
          <Link to="/listings" className="text-primary hover:underline">Back to Listings</Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setImageDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % pg.images.length);
  };
  const prevImage = () => {
    setImageDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + pg.images.length) % pg.images.length);
  };

  const genderLabel = pg.gender === 'boys' ? 'Boys PG' : pg.gender === 'girls' ? 'Girls PG' : 'Co-ed PG';

  const imageVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0 })
  };

  return (
    <motion.div 
      className="bg-warm-gray-50 min-h-screen pt-20 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white border-b border-warm-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/listings" className="text-warm-gray-600 hover:text-primary flex items-center gap-2 transition-colors group">
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.div>
              Back to Listings
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-96 overflow-hidden">
                <AnimatePresence initial={false} custom={imageDirection} mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    src={pg.images[currentImageIndex]} 
                    alt={pg.name} 
                    className="w-full h-full object-cover absolute inset-0"
                    custom={imageDirection}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
                <motion.button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-6 h-6 text-warm-gray-700" />
                </motion.button>
                <motion.button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-6 h-6 text-warm-gray-700" />
                </motion.button>
              </div>
              <div className="p-4 flex gap-3 overflow-x-auto scrollbar-hide">
                {pg.images.map((img, idx) => (
                  <motion.button 
                    key={idx}
                    onClick={() => {
                      setImageDirection(idx > currentImageIndex ? 1 : -1);
                      setCurrentImageIndex(idx);
                    }}
                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt={`${pg.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <AnimatedSection animation="fadeUp">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-warm-gray-800 mb-2">{pg.name}</h1>
                    <div className="flex items-center gap-2 text-warm-gray-600">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{pg.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.div 
                      className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="font-bold text-primary">{pg.rating}</span>
                      <Star className="w-4 h-4 text-primary fill-current" />
                    </motion.div>
                    <span className="text-sm text-warm-gray-500">{pg.reviews} reviews</span>
                  </div>
                </div>
                
                <p className="text-warm-gray-600 mb-6">{pg.description}</p>
                
                <h3 className="font-display font-semibold text-lg text-warm-gray-800 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {pg.amenities.map((amenity, i) => {
                    const item = amenityIcons[amenity];
                    const Icon = item?.icon;
                    return Icon ? (
                      <motion.span 
                        key={amenity} 
                        className="flex items-center gap-2 bg-warm-gray-100 px-4 py-2 rounded-xl text-warm-gray-700"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#ccfbf1' }}
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        {item.label}
                      </motion.span>
                    ) : null;
                  })}
                </div>

                <h3 className="font-display font-semibold text-lg text-warm-gray-800 mb-3">House Rules</h3>
                <ul className="space-y-2">
                  {pg.rules.map((rule, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start gap-2 text-warm-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span>{rule}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-200">
                <h3 className="font-display font-semibold text-lg text-warm-gray-800 mb-4">Location</h3>
                <motion.div 
                  className="h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    </motion.div>
                    <p className="text-warm-gray-600">Map View</p>
                    <p className="text-sm text-warm-gray-400">{pg.location}</p>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>

          <div className="space-y-6">
            <AnimatedSection animation="fadeLeft" delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-200 sticky top-24">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary font-display">{formatPrice(pg.price)}</span>
                  <span className="text-warm-gray-500">/month</span>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-warm-gray-600">
                    <Bed className="w-4 h-4 text-primary" />
                    <span>{pg.roomTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')} Sharing</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-gray-600">
                    <User className="w-4 h-4 text-primary" />
                    <span>{genderLabel}</span>
                  </div>
                </div>
                <motion.button 
                  className="w-full bg-cta hover:bg-cta-dark text-white py-3 rounded-xl font-semibold transition-all duration-200 mb-3 shadow-lg shadow-cta/30 btn-shine"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Visit
                </motion.button>
                <motion.button 
                  className="w-full bg-warm-gray-100 hover:bg-warm-gray-200 text-warm-gray-700 py-3 rounded-xl font-semibold transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Owner
                </motion.button>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeLeft" delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-200">
                <h3 className="font-display font-semibold text-lg text-warm-gray-800 mb-4">Contact Owner</h3>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <User className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-warm-gray-800">{pg.owner.name}</p>
                    <p className="text-sm text-warm-gray-500">Property Owner</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <motion.a 
                    href={`tel:${pg.owner.phone}`} 
                    className="flex items-center gap-3 text-warm-gray-600 hover:text-primary transition-colors group"
                    whileHover={{ x: 4 }}
                  >
                    <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span>{pg.owner.phone}</span>
                  </motion.a>
                  <motion.a 
                    href={`mailto:${pg.owner.email}`} 
                    className="flex items-center gap-3 text-warm-gray-600 hover:text-primary transition-colors group"
                    whileHover={{ x: 4 }}
                  >
                    <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span>{pg.owner.email}</span>
                  </motion.a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PGDetailPage;
