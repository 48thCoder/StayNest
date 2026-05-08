import { motion } from 'framer-motion';
import { Search, CalendarCheck, Key } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const steps = [
  {
    icon: Search,
    number: '1',
    title: 'Search',
    description: 'Browse through our curated list of verified PGs. Filter by location, budget, amenities, and gender preference.'
  },
  {
    icon: CalendarCheck,
    number: '2',
    title: 'Visit',
    description: 'Schedule a visit to your shortlisted properties. Our team will arrange guided tours at your convenience.'
  },
  {
    icon: Key,
    number: '3',
    title: 'Move In',
    description: 'Complete the booking process digitally and move into your new home. We handle all the paperwork for you.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="how-it-works">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cta/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-800 mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-warm-gray-600 max-w-2xl mx-auto">Find and book your perfect PG in just 3 simple steps</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative isolate">
          <motion.div 
            className="hidden md:block absolute top-10 left-[20%] right-[20%] h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full -z-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ originX: 0 }}
          />

          {steps.map((step, index) => (
            <AnimatedSection 
              key={index} 
              animation="fadeUp" 
              delay={index * 0.2}
              className="relative text-center group z-10"
            >
              <div className="relative w-20 h-20 mx-auto mb-6">
                {/* White circle hides the connecting line behind the icon */}
                <div className="absolute -inset-2 bg-white rounded-full" />
                <motion.div 
                  className="relative w-full h-full bg-primary/10 rounded-2xl flex items-center justify-center z-10 cursor-default"
                  whileHover={{ 
                    scale: 1.15, 
                    backgroundColor: 'rgba(13, 148, 136, 0.2)',
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <step.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="absolute -top-2 -right-2 w-8 h-8 bg-cta text-white rounded-full flex items-center justify-center font-bold text-sm z-20 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 500, delay: index * 0.2 + 0.3 }}
                >
                  {step.number}
                </motion.div>
              </div>
              <h3 className="font-display text-xl font-semibold text-warm-gray-800 mb-3">{step.title}</h3>
              <p className="text-warm-gray-600">{step.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
