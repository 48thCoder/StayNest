import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PGCard from '../components/PGCard';
import FiltersSidebar from '../components/FiltersSidebar';
import AnimatedSection from '../components/AnimatedSection';
import { fetchPGs } from '../utils/api';

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('recommended');
  const [filterState, setFilterState] = useState({
    city: '',
    locality: '',
    budgetMax: 30000,
    genders: [],
    roomTypes: [],
    amenities: []
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadData = useCallback(async (filters, urlParams) => {
    setLoading(true);
    setError(null);
    try {
      const apiParams = {};

      const urlLocation = urlParams.get('location');
      const urlGender = urlParams.get('gender');
      const urlBudget = urlParams.get('budget');

      if (filters.city) {
        apiParams.city = filters.city;
      }

      const searchLoc = filters.locality || urlLocation;
      if (searchLoc) {
        apiParams.search = searchLoc;
      }

      if (filters.genders.length === 1) {
        apiParams.gender = filters.genders[0];
      } else if (urlGender) {
        apiParams.gender = urlGender;
      }

      if (filters.budgetMax < 30000) {
        apiParams.maxPrice = filters.budgetMax;
      } else if (urlBudget) {
        if (urlBudget === '20000+') {
          apiParams.minPrice = 20000;
        } else {
          const [min, max] = urlBudget.split('-').map(Number);
          if (min) apiParams.minPrice = min;
          if (max) apiParams.maxPrice = max;
        }
      }

      const data = await fetchPGs(apiParams);
      setPGs(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch listings');
      setPGs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(filterState, searchParams);
  }, [searchParams, filterState, loadData]);

  const handleFilterChange = (newFilters) => {
    setFilterState(newFilters);
  };

  const filteredPGs = pgs.filter((pg) => {
    if (filterState.genders.length > 1) {
      if (!filterState.genders.includes(pg.gender)) return false;
    }
    if (filterState.roomTypes.length > 0) {
      const hasRoomType = pg.roomTypes?.some((t) => filterState.roomTypes.includes(t));
      if (!hasRoomType) return false;
    }
    if (filterState.amenities.length > 0) {
      const hasAllAmenities = filterState.amenities.every((a) => pg.amenities?.includes(a));
      if (!hasAllAmenities) return false;
    }
    return true;
  });

  const sortedPGs = [...filteredPGs].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
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
                  key={sortedPGs.length}
                  initial={{ scale: 1.5, color: '#0D9488' }}
                  animate={{ scale: 1, color: '#292524' }}
                  transition={{ duration: 0.3 }}
                >
                  {loading ? '...' : sortedPGs.length}
                </motion.span>{' '}
                properties found
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

            {error && (
              <motion.div
                className="text-center py-8 text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>Unable to load listings. Please make sure the backend is running.</p>
                <p className="text-sm mt-1 text-warm-gray-400">{error}</p>
              </motion.div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-warm-gray-100 animate-pulse">
                    <div className="h-48 bg-warm-gray-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-warm-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-warm-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-warm-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={sortBy + sortedPGs.length}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {sortedPGs.map((pg, index) => (
                    <PGCard key={pg._id || pg.id} pg={pg} index={index} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            <AnimatePresence>
              {!loading && !error && sortedPGs.length === 0 && (
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
