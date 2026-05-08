import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { testimonials } from '../data/pgs';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 shadow-md border border-warm-gray-100 card-hover relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8 }}
    >
      <motion.div 
        className="absolute -top-3 -left-2 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, delay: index * 0.15 + 0.2 }}
      >
        <Quote className="w-5 h-5 text-primary" />
      </motion.div>
      
      <div className="flex items-center gap-4 mb-4">
        <motion.img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <div>
          <h4 className="font-display font-semibold text-warm-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-warm-gray-500">{testimonial.occupation}</p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + i * 0.05 + 0.3, type: 'spring', stiffness: 400 }}
          >
            <Star 
              className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          </motion.div>
        ))}
      </div>
      
      <p className="text-warm-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-warm-gray-100 relative overflow-hidden" id="testimonials">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fadeUp" className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-800 mb-4">
            What Our <span className="gradient-text">Residents</span> Say
          </h2>
          <p className="text-warm-gray-600 max-w-2xl mx-auto">
            Real experiences from students and professionals who found their home with us
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
