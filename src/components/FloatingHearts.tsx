import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const heartArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setHearts(heartArray);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="heart"
          style={{ left: `${heart.x}%` }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ 
            y: '-100vh', 
            opacity: [0, 0.6, 0.8, 0.4, 0],
            x: [0, 30, -20, 10, 0],
            rotate: [0, 10, -10, 5, 0]
          }}
          transition={{
            duration: 8,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;