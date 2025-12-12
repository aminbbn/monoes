
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Database, Zap, Lock, ArrowRight, ArrowDown } from 'lucide-react';
import LightRays from './LightRays';
import { Monkey } from './Monkey';
import { PageView } from '../App';

const SatelliteCard: React.FC<{ item: any }> = ({ item }) => (
    <div 
        className="absolute z-30 pointer-events-auto"
        style={{ left: `${item.x}%`, top: `${item.y}%` }}
    >
        <motion.div
            className={`p-2 md:p-3 rounded-xl backdrop-blur-xl border ${item.bg} ${item.border} shadow-2xl flex items-center gap-3 cursor-default`}
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            whileHover={{ scale: 1.1, zIndex: 100 }}
            transition={{ 
                scale: { type: "spring", damping: 15, stiffness: 100, delay: item.delay + 0.5 },
                opacity: { duration: 0.5, delay: item.delay + 0.5 }
            }}
        >
            <div className={`p-1.5 md:p-2 rounded-lg ${item.bg} ${item.color}`}>
                {item.icon}
            </div>
            <div className="text-left hidden md:block">
                <div className={`text-xs font-bold ${item.color}`}>{item.label}</div>
                <div className="text-[10px] text-gray-400">Status: Active</div>
            </div>
            
            {/* Pulse Dot */}
            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} animate-ping`} />
            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`} />
        </motion.div>
    </div>
);

export const FeatureHero: React.FC<{ onNavigate: (page: PageView) => void }> = ({ onNavigate }) => {
  const dashboardItems = [
    { id: 1, icon: <Globe size={18} />, label: "Multi-Channel", x: 20, y: 25, delay: 0, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
    { id: 2, icon: <ShieldCheck size={18} />, label: "Privacy Core", x: 80, y: 25, delay: 1.5, color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30" },
    { id: 3, icon: <Database size={18} />, label: "Local DB", x: 20, y: 75, delay: 0.8, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
    { id: 4, icon: <Zap size={18} />, label: "Smart Sync", x: 80, y: 75, delay: 2.2, color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* 1. Light Rays Background */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60">
        <LightRays
          raysColor="#4f46e5"
          raysSpeed={0.15}
          lightSpread={0.6}
          rayLength={0.8}
          raysOrigin="top-center"
        />
      </div>

      {/* 2. Ambient Color Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-blue/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-purple/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Navigation Breadcrumb */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-mono font-medium text-gray-400 mb-8 hover:bg-white/10 transition-colors cursor-pointer z-50 relative pointer-events-auto"
           onClick={() => onNavigate('home')}
        >
          <span className="hover:text-white transition-colors">HOME</span> 
          <ArrowRight size={10} className="text-white/20" /> 
          <span className="text-primary-blue shadow-glow">FEATURES</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tight leading-[0.9]"
        >
          Every Feature <br/>
          <span className="relative inline-block">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink animate-gradient-x">
               To Scale Outreach
             </span>
             {/* Text Underline Decoration */}
             <svg className="absolute w-full h-3 -bottom-2 left-0 text-primary-blue opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="url(#gradient)" strokeWidth="3" fill="none" />
                 <defs>
                   <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="transparent" />
                     <stop offset="50%" stopColor="currentColor" />
                     <stop offset="100%" stopColor="transparent" />
                   </linearGradient>
                 </defs>
              </svg>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          A complete arsenal of automated tools. <br className="hidden md:block" />
          Zero cloud dependencies. 100% privacy.
        </motion.p>
        
        {/* 3D Dashboard Visual - ADVANCED ANIMATED LOOP */}
        <motion.div 
           initial={{ opacity: 0, rotateX: 20, y: 100 }}
           animate={{ opacity: 1, rotateX: 0, y: 0 }}
           transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
           className="relative max-w-5xl mx-auto perspective-[1000px] group"
        >
           {/* Main Glass Panel */}
           <div className="relative bg-navy-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-700 hover:rotate-x-1 h-[450px] md:h-[550px] w-full">
              
              {/* Glossy Reflection Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/0 to-transparent pointer-events-none z-[5]" />
              
              {/* Top Bar (Browser style) */}
              <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/5 flex items-center px-4 bg-white/5 z-20">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                 </div>
                 <div className="mx-auto text-[10px] font-mono text-gray-500 flex items-center gap-1 opacity-70">
                    <Lock size={8} /> monoes-secure-core.local
                 </div>
              </div>

              {/* Dashboard Content */}
              <div className="absolute inset-0 top-10 flex items-center justify-center">
                 
                 {/* 1. Radar Scanning Effect (Background) - Z-0 */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden z-0">
                    {/* Expanding Ripples */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full border border-primary-blue/30"
                        initial={{ width: 100, height: 100, opacity: 0 }}
                        animate={{ width: 800, height: 800, opacity: [0, 0.5, 0] }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          delay: i * 1.3,
                          ease: "linear"
                        }}
                      />
                    ))}
                    {/* Rotating Radar Sweep */}
                    <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-transparent via-primary-blue/10 to-transparent animate-[spin_8s_linear_infinite]" 
                         style={{ maskImage: 'linear-gradient(to bottom, transparent 50%, black 50%)' }} />
                 </div>

                 {/* 2. Connection Lines (SVG) with Pulse Effects - Z-10 */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <filter id="glow-strong">
                        <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    {dashboardItems.map((item) => (
                      <React.Fragment key={`line-${item.id}`}>
                        {/* Static Line Track */}
                        <line 
                          x1={item.x} 
                          y1={item.y} 
                          x2="50" 
                          y2="50" 
                          stroke="rgba(255,255,255,0.08)" 
                          strokeWidth="0.5" 
                          strokeDasharray="2 2"
                        />
                        {/* Energy Pulse traveling along line */}
                        <circle r="1" fill="#6366f1" filter="url(#glow-strong)">
                           <animateMotion 
                              dur={`${3}s`}
                              begin={`${item.delay}s`}
                              repeatCount="indefinite"
                              path={`M50,50 L${item.x},${item.y}`} 
                              keyPoints="0;1"
                              keyTimes="0;1"
                              calcMode="linear"
                           />
                           <animate 
                              attributeName="opacity" 
                              values="0;1;1;0" 
                              keyTimes="0;0.1;0.9;1" 
                              dur="3s" 
                              begin={`${item.delay}s`}
                              repeatCount="indefinite" 
                           />
                        </circle>
                      </React.Fragment>
                    ))}
                 </svg>

                 {/* 3. Central Core: Holographic Gyroscope - Z-20 */}
                 <div className="relative z-20 w-48 h-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary-blue/20 blur-[80px] rounded-full animate-pulse-slow" />
                    
                    {/* Breathing Core */}
                    <motion.div 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-30"
                    >
                        <Monkey variant="3d" size="2xl" className="drop-shadow-2xl scale-125 relative z-10" />
                    </motion.div>
                    
                    {/* Gyroscope Rings */}
                    <div className="absolute w-[140%] h-[140%] border border-primary-blue/30 rounded-full animate-[spin_8s_linear_infinite]" 
                         style={{ transformStyle: 'preserve-3d', animationDirection: 'reverse' }} />
                    <div className="absolute w-[180%] h-[180%] border border-dashed border-primary-purple/30 rounded-full animate-[spin_12s_linear_infinite]" />
                    <motion.div 
                        className="absolute w-[220%] h-[60%] border border-white/10 rounded-[100%] top-[20%]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                 </div>

                 {/* 4. Reactive Satellite Cards - Z-30 */}
                 <div className="absolute inset-0 z-30 pointer-events-none">
                    {dashboardItems.map((item) => (
                       <SatelliteCard key={item.id} item={item} />
                    ))}
                 </div>
                 
                 {/* 5. Atmospheric Particles */}
                 <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute w-1 h-1 bg-white/20 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0, 0.5, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                 </div>

              </div>

              {/* Moving Grid Background */}
              <div className="absolute inset-0 z-[-1] opacity-20">
                  <motion.div 
                     className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%]"
                     style={{ 
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                     }}
                     animate={{ x: [0, 40], y: [0, 40] }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
              </div>
           </div>

           {/* Glow Reflection on Floor */}
           <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-primary-blue/20 blur-[60px] rounded-[100%] pointer-events-none opacity-40" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500 text-xs tracking-widest uppercase opacity-50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <span className="mb-2">Explore</span>
            <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  );
};
