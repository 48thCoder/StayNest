import { motion } from 'framer-motion';

const FloatingShapes = () => {
  const shapes = [
    { size: 80, x: '10%', y: '20%', delay: 0, duration: 6, color: 'bg-primary/10' },
    { size: 120, x: '85%', y: '15%', delay: 1, duration: 8, color: 'bg-cta/10' },
    { size: 60, x: '75%', y: '60%', delay: 2, duration: 7, color: 'bg-primary-light/10' },
    { size: 100, x: '20%', y: '70%', delay: 0.5, duration: 9, color: 'bg-cta/10' },
    { size: 40, x: '50%', y: '40%', delay: 1.5, duration: 5, color: 'bg-primary/10' },
    { size: 90, x: '60%', y: '80%', delay: 2.5, duration: 8, color: 'bg-primary-dark/10' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${shape.color} blur-xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
