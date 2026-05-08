export const formatPrice = (price) => {
  return '₹' + price.toLocaleString('en-IN');
};

export const generateStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push('full');
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }
  return stars;
};
