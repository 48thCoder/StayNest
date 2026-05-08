import Hero from '../components/Hero';
import FeaturedListings from '../components/FeaturedListings';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedListings />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default HomePage;
