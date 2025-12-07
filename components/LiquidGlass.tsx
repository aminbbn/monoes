
import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface LiquidGlassProps {
  className?: string;
  intensity?: number; // The strength of the liquid distortion
  blur?: number;      // Backdrop blur amount in px
  opacity?: number;   // Background opacity
  style?: React.CSSProperties;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({ 
    className = "", 
    intensity = 30,
    blur = 16,
    opacity = 0.6,
    style = {}
}) => {
  // Generate unique IDs for the filter to allow multiple instances
  const id = useId();
  // Ensure ID is safe for CSS selectors by removing colons
  const filterId = `liquid-filter-${id.replace(/:/g, '')}`;

  return (
    <div 
        className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
        style={{ ...style, isolation: 'isolate' }}
    >
      {/* SVG Filter Definition (Hidden but active) */}
      <svg className="absolute w-0 h-0 pointer-events-none" style={{ position: 'absolute', top: -9999, left: -9999 }}>
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.002" 
                numOctaves="4" 
                result="noise" 
                seed="5"
            >
              <animate 
                attributeName="baseFrequency" 
                dur="20s" 
                values="0.002;0.005;0.002" 
                repeatCount="indefinite" 
              />
            </feTurbulence>
            <feDisplacementMap 
                in="SourceGraphic" 
                in2="noise" 
                scale={intensity} 
                xChannelSelector="R" 
                yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      {/* Base Glass Layer with Backdrop Blur & Saturation */}
      <div 
        className="absolute inset-0 z-0"
        style={{
            // Added saturate(180%) for that rich, premium glass look
            backdropFilter: `blur(${blur}px) saturate(180%)`,
            WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
            backgroundColor: `rgba(15, 23, 42, ${opacity})`, // Deep navy base
        }}
      />
      
      {/* Liquid Reflection Layer - The core visual effect */}
      <motion.div 
        className="absolute inset-0 z-10 opacity-50 mix-blend-overlay pointer-events-none"
        animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "mirror",
            ease: "linear"
        }}
        style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.3) 100%)',
            filter: `url(#${filterId})`,
            backgroundSize: '200% 200%'
        }}
      />
      
      {/* Subtle Noise Texture for "Frost" grain */}
      <div 
        className="absolute inset-0 z-20 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Specular Highlight / Border */}
      <div className="absolute inset-0 z-30 border border-white/10 rounded-[inherit] pointer-events-none mix-blend-plus-lighter" />
    </div>
  );
};
