import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FallingGallery = () => {
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the intro animation
    const seen = sessionStorage.getItem('hasSeenIntro');
    if (seen === 'true') {
      setHasSeenIntro(true);
    } else {
      // Mark as seen once component mounts
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
  }, []);

  // Animation configuration constants
  const INITIAL_FALL_HEIGHT = -800;
  const springConfig = {
    type: 'spring',
    stiffness: 50,
    damping: 10,
  };

  // Square placeholder configurations with staggered delays
  const squares = [
    { id: 1, delay: 0.2 },
    { id: 2, delay: 0.5 },
    { id: 3, delay: 0.8 },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-2 md:pb-6 pointer-events-none">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        {squares.map((square) => {
          const initialPosition = hasSeenIntro 
            ? { y: 0, opacity: 1 } 
            : { y: INITIAL_FALL_HEIGHT, opacity: 0 };
          
          const transitionConfig = hasSeenIntro
            ? { duration: 0 }
            : { ...springConfig, delay: square.delay };

          return (
            <motion.div
              key={square.id}
              className="w-12 h-12 md:w-20 md:h-20 border-2 border-black bg-gray-50 rounded-md shadow-sm"
              initial={initialPosition}
              animate={{ y: 0, opacity: 1 }}
              transition={transitionConfig}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FallingGallery;
