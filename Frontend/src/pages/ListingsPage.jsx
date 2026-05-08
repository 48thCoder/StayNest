import { useState, useEffect, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PGCard from '../components/PGCard';
import FiltersSidebar from '../components/FiltersSidebar';
import AnimatedSection from '../components/AnimatedSection';
import { pgData } from '../data/pgs';

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredPGs, setFilteredPGs] = useState(pgData);
  const [sortBy, setSortBy] = useState('recommended');

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const location = searchParams.get('location')?.toLowerCase() || '';
    const gender = searchParams.get('gender') || '';
    const budget = searchParams.get('budget') || '';

    let filtered = pgData;

    if (location) {
      filtered = filtered.filter(pg => 
        pg.location.toLowerCase().includes(location) || 
        pg.name.toLowerCase().includes(location)
      );
    }

    if (gender) {
      filtered = filtered.filter(pg => pg.gender === gender);
    }

    if (budget) {
      if (budget === '20000+') {
        filtered = filtered.filter(pg => pg.price >= 20000);
      } else {
        const [min, max] = budget.split('-').map(Number);
        filtered = filtered.filter(pg => pg.price >= min && pg.price <= max);
      }
    }

    setFilteredPGs(filtered);
  }, [searchParams]);

  const handleFilterChange = (filters) => {
    let filtered = pgData;

    if (filters.city) {
      filtered = filtered.filter(pg => pg.city === filters.city);
    }

    if (filters.locality) {
      filtered = filtered.filter(pg => 
        pg.location.toLowerCase().includes(filters.locality.toLowerCase())
      );
    }

    if (filters.budgetMax < 30000) {
      filtered = filtered.filter(pg => pg.price <= filters.budgetMax);
    }

    if (filters.genders.length > 0) {
      filtered = filtered.filter(pg => filters.genders.includes(pg.gender));
    }

    if (filters.roomTypes.length > 0) {
      filtered = filtered.filter(pg => 
        pg.roomTypes.some(t => filters.roomTypes.includes(t))
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(pg => 
        filters.amenities.every(a => pg.amenities.includes(a))
      );
    }

    setFilteredPGs(filtered);
  };

  const sortedPGs = [...filteredPGs].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  return (
    <motion.div 
      className="bg-warm-gray-50 min-h-screen pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white border-b border-warm-gray-200 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            className="font-display text-3xl font-bold text-warm-gray-800 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            PG <span className="gradient-text">Accommodations</span>
          </motion.h1>
          <motion.p 
            className="text-warm-gray-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find your perfect stay from our verified properties
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AnimatedSection animation="fadeLeft" className="lg:w-72 flex-shrink-0">
            <FiltersSidebar onFilterChange={handleFilterChange} />
          </AnimatedSection>

          <div className="flex-1">
            <motion.div 
              className="flex justify-between items-center mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-warm-gray-600">
                <motion.span 
                  className="font-semibold text-warm-gray-800"
                  key={filteredPGs.length}
                  initial={{ scale: 1.5, color: '#0D9488' }}
                  animate={{ scale: 1, color: '#292524' }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredPGs.length}
                </motion.span> properties found
              </p>
              <motion.select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 bg-white border border-warm-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </motion.select>
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={sortBy + filteredPGs.length}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {sortedPGs.map((pg, index) => (
                  <PGCard key={pg.id} pg={pg} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {sortedPGs.length === 0 && (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="text-warm-gray-500 text-lg">No properties found matching your criteria.</p>
                  <p className="text-warm-gray-400 mt-2">Try adjusting your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingsPage;
