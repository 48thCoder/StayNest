import { useState } from 'react';
import { cities } from '../data/pgs';

const FiltersSidebar = ({ onFilterChange }) => {
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [budgetMax, setBudgetMax] = useState(30000);
  const [genders, setGenders] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const handleGenderChange = (value) => {
    setGenders(prev => 
      prev.includes(value) ? prev.filter(g => g !== value) : [...prev, value]
    );
  };

  const handleRoomTypeChange = (value) => {
    setRoomTypes(prev => 
      prev.includes(value) ? prev.filter(r => r !== value) : [...prev, value]
    );
  };

  const handleAmenityChange = (value) => {
    setAmenities(prev => 
      prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    onFilterChange({ city, locality, budgetMax, genders, roomTypes, amenities });
  };

  const resetFilters = () => {
    setCity('');
    setLocality('');
    setBudgetMax(30000);
    setGenders([]);
    setRoomTypes([]);
    setAmenities([]);
    onFilterChange({ city: '', locality: '', budgetMax: 30000, genders: [], roomTypes: [], amenities: [] });
  };

  return (
    <aside className="lg:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-warm-gray-200 p-6 sticky top-24">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-semibold text-lg text-warm-gray-800">Filters</h3>
          <button onClick={resetFilters} className="text-sm text-primary hover:text-primary-dark font-medium">Reset All</button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-warm-gray-700 mb-2">City</label>
          <select 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 bg-warm-gray-50 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            <option value="">All Cities</option>
            {cities.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-warm-gray-700 mb-2">Locality</label>
          <input 
            type="text" 
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder="Enter locality" 
            className="w-full p-3 bg-warm-gray-50 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-warm-gray-700 mb-3">Gender Preference</label>
          <div className="space-y-2">
            {['boys', 'girls', 'coed'].map(gender => (
              <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={genders.includes(gender)}
                  onChange={() => handleGenderChange(gender)}
                  className="w-5 h-5 rounded border-warm-gray-300 text-primary focus:ring-primary transition-all cursor-pointer"
                />
                <span className="text-warm-gray-600 group-hover:text-warm-gray-800 transition-colors capitalize">
                  {gender === 'coed' ? 'Co-ed PG' : `${gender} PG`}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-warm-gray-700 mb-3">Budget Range</label>
          <input 
            type="range" 
            min="5000" 
            max="30000" 
            step="1000" 
            value={budgetMax}
            onChange={(e) => setBudgetMax(parseInt(e.target.value))}
            className="w-full h-2 bg-warm-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between mt-2 text-sm text-warm-gray-600">
            <span>₹5,000</span>
            <span className="font-medium text-primary">
              {budgetMax === 30000 ? 'Up to ₹30,000' : `Up to ₹${budgetMax.toLocaleString('en-IN')}`}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-warm-gray-700 mb-3">Room Type</label>
          <div className="space-y-2">
            {['single', 'double', 'triple'].map(type => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={roomTypes.includes(type)}
                  onChange={() => handleRoomTypeChange(type)}
                  className="w-5 h-5 rounded border-warm-gray-300 text-primary focus:ring-primary transition-all cursor-pointer"
                />
                <span className="text-warm-gray-600 group-hover:text-warm-gray-800 transition-colors capitalize">
                  {type} Sharing
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-gray-700 mb-3">Amenities</label>
          <div className="space-y-2">
            {[
              { value: 'wifi', label: 'WiFi' },
              { value: 'ac', label: 'Air Conditioning' },
              { value: 'food', label: 'Meals Included' },
              { value: 'laundry', label: 'Laundry' },
              { value: 'parking', label: 'Parking' }
            ].map(amenity => (
              <label key={amenity.value} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={amenities.includes(amenity.value)}
                  onChange={() => handleAmenityChange(amenity.value)}
                  className="w-5 h-5 rounded border-warm-gray-300 text-primary focus:ring-primary transition-all cursor-pointer"
                />
                <span className="text-warm-gray-600 group-hover:text-warm-gray-800 transition-colors">{amenity.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          onClick={applyFilters}
          className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all duration-200"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
