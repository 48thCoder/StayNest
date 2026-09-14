import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PGCard from './PGCard';
import AnimatedSection from './AnimatedSection';
import { fetchPGs } from '../utils/api';

const FeaturedListings = () => {
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPGs()
      .then(data => setPGs(data.slice(0, 3)))
      .catch(() => setPGs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-warm-gray-50 relative overflow-hidden" id="featured">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeUp" className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-800 mb-4">
            Featured <span className="gradient-text">PG Accommodations</span>
          </h2>
          <p className="text-warm-gray-600 max-w-2xl mx-auto">
            Handpicked properties with excellent amenities, prime locations, and verified reviews
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-warm-gray-100 animate-pulse">
                  <div className="h-48 bg-warm-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-warm-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-warm-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-warm-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))
            : pgs.map((pg, index) => (
                <PGCard key={pg._id} pg={pg} index={index} />
              ))}
        </div>

        <AnimatedSection animation="scale" delay={0.3} className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-primary/25 btn-shine"
            >
              View All Listings
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedListings;
