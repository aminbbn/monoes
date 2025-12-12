import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

// Asset URLs provided
const ASSETS = {
  '3d': 'https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWRzEfKqu0KVHt9v1lnkcWMSbC2EasfPypXwDh',
  'outline': 'https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWApLeYFULxND1ag3KwVT2Ad7U6lFctEvbZM4k',
  'filled': 'https://famjljl5gg.ufs.sh/f/aej4FOV7nKCW7prNorRPgN3mf4rIQL9pXBGJDSVaCM2E0oUs',
  'text-filled': 'https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWP7a5CJZXhV4d3AqmSM8rsKncyzD6NZbel0OE',
  'text-outline': 'https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWOtLCbyxTWS4HIZ2PlMtVGkv0pb8JzqFNsBAj'
};

export type MonkeyVariant = keyof typeof ASSETS;

interface MonkeyProps {
  variant?: MonkeyVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
  className?: string;
  animate?: boolean;
  mirror?: boolean;
}

export const Monkey: React.FC<MonkeyProps> = ({ 
  variant = 'filled', 
  size = 'md', 
  className = '',
  animate = true,
  mirror = false
}) => {
  
  // Size mapping
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
    'custom': ''
  };

  // Memoize random values so they don't change on re-renders, creating a glitch
  const randomDelay = useMemo(() => Math.random() * 2, []);
  const randomDuration = useMemo(() => 4 + Math.random() * 2, []);

  const variants: Variants = {
    idle: {
      y: [0, -6, 0],
      rotate: [0, 1.5, -1.5, 0],
      transition: {
        y: {
            duration: randomDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: randomDelay
        },
        rotate: {
            duration: randomDuration * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: randomDelay
        }
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: { type: "spring", stiffness: 300, damping: 12 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // Render logic
  const renderContent = () => {
    const style = mirror ? { transform: 'scaleX(-1)' } : undefined;

    // 3D version is a full color image, just render it
    if (variant === '3d') {
      return (
        <img 
          src={ASSETS['3d']} 
          alt="Monoes 3D Logo" 
          className="w-full h-full object-contain drop-shadow-2xl select-none pointer-events-none"
          style={style}
        />
      );
    }

    // SVG versions (filled/outline/text) should be colorable via CSS
    return (
      <div 
        className="w-full h-full bg-current"
        style={{
          maskImage: `url(${ASSETS[variant]})`,
          WebkitMaskImage: `url(${ASSETS[variant]})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          ...style
        }}
      />
    );
  };

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}
      variants={animate ? variants : undefined}
      animate={animate ? "idle" : undefined}
      whileHover={animate ? "hover" : undefined}
      whileTap={animate ? "tap" : undefined}
      style={{ willChange: animate ? 'transform' : 'auto' }}
    >
       {renderContent()}
    </motion.div>
  );
};