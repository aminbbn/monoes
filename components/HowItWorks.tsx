import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monkey } from './Monkey';
import { Zap, Settings, Infinity as InfinityIcon, Lock, Cpu } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Link Accounts',
    subtitle: 'SECURE HANDSHAKE',
    desc: 'Connect LinkedIn & Email via local-only API bridge.',
    meta: 'AES-256 ENCRYPTED',
    icon: <Zap size={20} />,
    variant: 'outline'
  },
  {
    id: 2,
    title: 'Configure Logic',
    subtitle: 'SET PARAMETERS',
    desc: 'Define ideal customer profile and outreach cadence.',
    meta: 'CUSTOM VARIABLES',
    icon: <Settings size={20} />,
    variant: 'filled'
  },
  {
    id: 3,
    title: 'Auto-Pilot',
    subtitle: 'SYSTEM ACTIVE',
    desc: 'AI agents execute tasks and sync CRM 24/7.',
    meta: 'CONTINUOUS LOOP',
    icon: <InfinityIcon size={20} />,
    variant: '3d'
  }
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Automated Loop Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-navy-950 relative overflow-hidden">
      {/* Schematic Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-primary-blue text-xs font-mono tracking-widest uppercase mb-4 bg-primary-blue/10 px-3 py-1 rounded-sm border border-primary-blue/20"
          >
            <Cpu size={12} />
            <span>Workflow Sequence v2.0</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Setup to Sales in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">Minutes</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
          >
            No complex configuration. We built a visual pipeline that handles the heavy lifting.
          </motion.p>
        </div>

        <div className="relative">
          {/* Desktop Connecting Pipe */}
          <div className="hidden md:block absolute top-[45%] left-0 w-full h-2 bg-navy-800 rounded-full overflow-hidden z-0">
             {/* Base line */}
             <div className="absolute inset-0 bg-white/5" />
             
             {/* Active Beam moving constantly */}
             <motion.div 
               className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary-blue to-transparent blur-sm"
               animate={{ x: ['-100%', '350%'] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
             
             {/* Sequential Fill based on active step */}
             <motion.div 
                className="absolute top-0 left-0 h-full bg-primary-purple/50"
                animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              
              return (
                <motion.div
                  key={step.id}
                  className={`relative rounded-2xl p-1 transition-all duration-500 group cursor-pointer ${
                    isActive ? 'scale-105 z-20' : 'scale-100 z-10'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Card Border/Glow Container */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-b from-primary-blue to-primary-purple shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`} />
                  
                  {/* Main Card Content */}
                  <div className={`relative h-full rounded-[14px] p-6 md:p-8 flex flex-col items-center text-center border overflow-hidden transition-all duration-500 ${
                      isActive 
                      ? 'bg-navy-900 border-transparent' 
                      : 'bg-navy-900/30 backdrop-blur-xl border-white/5 hover:border-white/20'
                  }`}>
                    
                    {/* Technical Corner Markers */}
                    <div className="absolute top-3 left-3 w-2 h-2 border-l border-t border-white/20" />
                    <div className="absolute top-3 right-3 w-2 h-2 border-r border-t border-white/20" />
                    <div className="absolute bottom-3 left-3 w-2 h-2 border-l border-b border-white/20" />
                    <div className="absolute bottom-3 right-3 w-2 h-2 border-r border-b border-white/20" />

                    {/* Content Wrapper to handle opacity for inactive state without affecting blur */}
                    <div className={`transition-opacity duration-500 w-full flex flex-col items-center h-full ${
                        isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'
                    }`}>

                        {/* Step Indicator Pill */}
                        <div className={`mb-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold font-mono border transition-colors duration-300 ${
                            isActive 
                            ? 'bg-primary-blue/10 text-primary-blue border-primary-blue/30' 
                            : 'bg-white/5 text-gray-500 border-white/5'
                        }`}>
                            <span>STEP 0{step.id}</span>
                            {isActive && (
                                <motion.span 
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-1.5 h-1.5 bg-primary-blue rounded-full"
                                />
                            )}
                        </div>

                        {/* Icon Container */}
                        <div className="relative mb-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                isActive ? 'bg-primary-blue text-white shadow-lg' : 'bg-navy-800 text-gray-500'
                            }`}>
                                {step.icon}
                            </div>
                            {/* Connecting Line to next step (Mobile only vertical line) */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden absolute -bottom-12 left-1/2 w-0.5 h-8 bg-white/10" />
                            )}
                        </div>

                        <h3 className={`text-xl font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-gray-300'}`}>
                            {step.title}
                        </h3>
                        
                        <div className="text-[10px] font-mono tracking-widest text-primary-purple mb-4 uppercase">
                            {step.subtitle}
                        </div>

                        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                            {step.desc}
                        </p>

                        {/* Bottom Status Bar */}
                        <div className="w-full mt-auto border-t border-white/5 pt-4 flex items-center justify-between text-xs font-mono text-gray-500">
                            <div className="flex items-center">
                                {step.id === 1 && <Lock size={10} className="mr-1" />}
                                {step.id === 2 && <Settings size={10} className="mr-1" />}
                                {step.id === 3 && <InfinityIcon size={10} className="mr-1" />}
                                <span>{step.meta}</span>
                            </div>
                            <div className={isActive ? 'text-green-400' : ''}>
                                {isActive ? 'ACTIVE' : 'STANDBY'}
                            </div>
                        </div>

                    </div>

                    {/* Monkey Overlay for Active State */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                                className={`absolute -top-4 -right-4 md:-right-6 md:-top-6 ${step.variant === '3d' ? '' : 'bg-navy-800 p-2 border border-white/10'} rounded-full shadow-xl z-20 text-white`}
                            >
                                <Monkey variant={step.variant as any} size={step.variant === '3d' ? 'lg' : 'md'} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
