const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchPGs = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.city && params.city !== 'all') query.set('city', params.city);
  if (params.gender && params.gender !== 'all') query.set('gender', params.gender);
  if (params.minPrice) query.set('minPrice', params.minPrice);
  if (params.maxPrice) query.set('maxPrice', params.maxPrice);
  if (params.search) query.set('search', params.search);

  const res = await fetch(`${BASE_URL}/pgs?${query.toString()}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch listings');
  return data.data;
};

export const fetchPGById = async (id) => {
  const res = await fetch(`${BASE_URL}/pgs/${id}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'PG not found');
  return data.data;
};
