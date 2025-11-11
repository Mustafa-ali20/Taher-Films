import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGradientOrbsWithEllipse = ({ category, caption }) => {
  const orbs = [
    // Top Left
    {
      id: 1,
      sizeClasses: "w-12 h-6 md:w-40 md:h-40 lg:w-48 lg:h-48",
      color: "from-[#C1121F] to-[#72121B]",
      positionClasses: "top-8 left-8 md:top-12 md:left-12 lg:top-16 lg:left-16",
      initial: { x: 0, y: 0, opacity: 0.25 },
      animate: {
        x: [0, 40, -30, 35, -20, 0],
        y: [0, 50, -40, 45, -25, 0],
        opacity: [0.25, 0.4, 0.2, 0.35, 0.3, 0.25],
      },
      duration: 12,
      delay: 0,
    },
    // Top Right
    {
      id: 2,
      sizeClasses: "w-10 h-8 md:w-44 md:h-44 lg:w-52 lg:h-52",
      color: "from-[#ff1f5a] to-[#C1121F]",
      positionClasses: "top-8 right-8 md:top-12 md:right-12 lg:top-16 lg:right-16",
      initial: { x: 0, y: 0, opacity: 0.22 },
      animate: {
        x: [0, -45, 30, -40, 25, 0],
        y: [0, 55, -45, 50, -30, 0],
        opacity: [0.22, 0.38, 0.18, 0.36, 0.25, 0.22],
      },
      duration: 13,
      delay: 1,
    },
    // Bottom Left
    {
      id: 3,
      sizeClasses: "w-6 h-10 md:w-48 md:h-48 lg:w-56 lg:h-56",
      color: "from-[#AA1A21] to-[#ff1f5a]",
      positionClasses: "bottom-8 left-8 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16",
      initial: { x: 0, y: 0, opacity: 0.23 },
      animate: {
        x: [0, 38, -35, 33, -22, 0],
        y: [0, -48, 42, -50, 28, 0],
        opacity: [0.23, 0.39, 0.19, 0.37, 0.28, 0.23],
      },
      duration: 14,
      delay: 1.5,
    },
    // Bottom Right
    {
      id: 4,
      sizeClasses: "w-6 h-8 md:w-40 md:h-40 lg:w-50 lg:h-50",
      color: "from-[#72121B] to-[#AA1A21]",
      positionClasses: "bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16",
      initial: { x: 0, y: 0, opacity: 0.2 },
      animate: {
        x: [0, -42, 32, -38, 24, 0],
        y: [0, 46, -52, 42, -32, 0],
        opacity: [0.2, 0.36, 0.15, 0.34, 0.26, 0.2],
      },
      duration: 11,
      delay: 0.8,
    },
  ];

  return (
    <div className="empty-ellipse__wrapper">
      {/* Glassmorphic Ellipse Container */}
      <div className="empty-ellipse__container">
        {/* Animated Orbs - Inside the ellipse */}
        <div className="absolute inset-0">
          {orbs.map((orb) => (
            <motion.div
              key={orb.id}
              initial={orb.initial}
              animate={orb.animate}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: orb.delay,
              }}
              className={`absolute ${orb.sizeClasses} bg-gradient-to-br ${orb.color} rounded-full blur-3xl ${orb.positionClasses}`}
            />
          ))}
        </div>

        {/* Text Content - Above the orbs */}
        <div className="empty-ellipse__content">
          <span className="empty-ellipse__category">
            {category}
          </span>
          <span className="empty-ellipse__caption">
            "{caption}"
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedGradientOrbsWithEllipse;