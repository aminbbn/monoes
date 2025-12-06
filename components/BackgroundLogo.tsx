
import React from 'react';
import { motion } from 'framer-motion';
import { Monkey } from './Monkey';

export const BackgroundLogo: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden">
      {/* Blurred Glow Layer */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ 
           opacity: [0.02, 0.05, 0.02],
           scale: [1, 1.1, 1],
         }}
         transition={{
           duration: 8,
           repeat: Infinity,
           ease: "easeInOut",
           delay: 0.5
         }}
         className="absolute w-[140vw] h-[140vw] md:w-[90vw] md:h-[90vw] text-primary-purple/20 blur-[100px] transform rotate-12"
      >
         <Monkey variant="filled" size="custom" className="w-full h-full" animate={false} />
      </motion.div>

      {/* Crisp Outline Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.03, 0.06, 0.03],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-[140vw] h-[140vw] md:w-[90vw] md:h-[90vw] text-white/5 transform rotate-12 drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]"
      >
         <Monkey variant="outline" size="custom" className="w-full h-full" animate={false} />
      </motion.div>
    </div>
  );
};
