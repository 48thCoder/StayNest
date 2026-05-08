import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Wifi, Snowflake, Utensils, Shirt, Car } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

const iconMap = {
  wifi: Wifi,
  ac: Snowflake,
  food: Utensils,
  laundry: Shirt,
  parking: Car
};

const PGCard = ({ pg, index = 0 }) => {
  const genderLabel = pg.gender === 'boys' ? 'Boys PG' : pg.gender === 'girls' ? 'Girls PG' : 'Co-ed PG';

  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-warm-gray-100"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className="relative h-48 overflow-hidden image-reveal">
        <img src={pg.image} alt={pg.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <motion.span 
            className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-warm-gray-700 capitalize"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {genderLabel}
          </motion.span>
        </div>
        <div className="absolute top-3 right-3">
          <motion.span 
            className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {pg.rating} <Star className="w-3 h-3 fill-current" />
          </motion.span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-warm-gray-800 mb-1">{pg.name}</h3>
        <div className="flex items-center gap-1 text-warm-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{pg.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {pg.amenities.slice(0, 4).map((amenity, i) => {
            const Icon = iconMap[amenity];
            return Icon ? (
              <motion.span 
                key={amenity} 
                className="flex items-center gap-1 text-xs text-warm-gray-600 bg-warm-gray-100 px-2 py-1 rounded-lg"
                whileHover={{ scale: 1.15, backgroundColor: '#ccfbf1' }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Icon className="w-3 h-3 text-primary" />
              </motion.span>
            ) : null;
          })}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-warm-gray-100">
          <div>
            <span className="text-2xl font-bold text-primary font-display">{formatPrice(pg.price)}</span>
            <span className="text-warm-gray-500 text-sm">/month</span>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={`/pg/${pg.id}`}
              className="bg-warm-gray-100 hover:bg-primary hover:text-white text-warm-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 inline-block"
            >
              View Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PGCard;
