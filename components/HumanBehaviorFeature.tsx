
import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, ShieldCheck, MousePointer } from 'lucide-react';

const CursorLayer = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-20">
            <motion.div
                className="absolute top-0 left-0"
                animate={{
                    // Coords tailored to hit the text area and button visually
                    x: [20, 120, 140, 40, 40, 20], 
                    y: [20, 60, 140, 140, 20, 20], 
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 0.7, 0.9, 1]
                }}
            >
                <MousePointer size={20} className="text-white fill-black drop-shadow-xl transform -rotate-12" />
                
                {/* Click Ripple attached to cursor */}
                <motion.div
                    className="absolute -top-3 -left-3 w-10 h-10 rounded-full border-2 border-white/50 opacity-0"
                    animate={{
                        scale: [0.5, 1.5],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 3.6, // Sync with button position time (0.6 * 6s = 3.6s)
                        repeat: Infinity,
                        repeatDelay: 5.4
                    }}
                />
            </motion.div>
        </div>
    );
};

const HumanScoreCard = () => {
    return (
        <div className="bg-navy-900 border border-white/10 rounded-3xl p-1 shadow-2xl relative overflow-hidden h-[450px] flex flex-col group">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none z-10 rounded-3xl" />
            
            <div className="bg-navy-950/80 backdrop-blur-xl h-full w-full rounded-[20px] border border-white/5 flex flex-col overflow-hidden relative z-0">
                {/* Header UI */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="text-[10px] font-mono text-gray-500">USER_BEHAVIOR_V2.LOG</div>
                </div>

                {/* Main Simulation Area */}
                <div className="flex-1 p-6 relative">
                    {/* Fake Email Interface */}
                    <div className="space-y-4 max-w-sm relative z-0">
                        <div className="flex gap-3 items-center opacity-60">
                            <div className="w-8 h-8 rounded-full bg-white/10" />
                            <div className="space-y-1.5">
                                <div className="h-2 w-24 bg-white/20 rounded-full" />
                                <div className="h-2 w-16 bg-white/10 rounded-full" />
                            </div>
                        </div>
                        <div className="h-24 w-full bg-white/5 rounded-xl border border-white/5 p-3 space-y-2">
                             {/* Simulated Typing Text */}
                             <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "80%" }}
                                transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
                                className="h-2 bg-white/20 rounded-full" 
                             />
                             <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "60%" }}
                                transition={{ duration: 2, delay: 3, ease: "linear", repeat: Infinity, repeatDelay: 3 }}
                                className="h-2 bg-white/20 rounded-full" 
                             />
                        </div>
                        {/* Target Button */}
                        <div className="w-24 h-8 bg-primary-blue/20 border border-primary-blue/50 rounded-lg flex items-center justify-center text-[10px] font-bold text-primary-blue relative overflow-hidden group/btn">
                            SEND
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    {/* Cursor & Click Animation Layer */}
                    <CursorLayer />
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-2 border-t border-white/5 bg-navy-900/50">
                    {/* Typing Graph */}
                    <div className="p-4 border-r border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Keystroke Entropy</span>
                            <span className="text-[10px] text-green-400 font-mono">NORMAL</span>
                        </div>
                        <div className="flex items-end gap-0.5 h-10">
                            {[...Array(20)].map((_, i) => (
                                <motion.div 
                                    key={i}
                                    className="flex-1 bg-purple-500 rounded-t-[1px] opacity-60"
                                    animate={{ 
                                        height: [
                                            `${20 + Math.random() * 60}%`, 
                                            `${20 + Math.random() * 60}%`
                                        ],
                                        opacity: [0.4, 0.8, 0.4]
                                    }}
                                    transition={{ 
                                        duration: 0.2,
                                        repeat: Infinity, 
                                        repeatType: "reverse", 
                                        delay: i * 0.05,
                                        ease: "linear"
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Pass Score with BLURRED Radar */}
                    <div className="p-4 flex items-center gap-4 relative overflow-hidden">
                        <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                             {/* The Green Thing - Blurred */}
                             <div className="absolute inset-0 rounded-full border border-green-500/20" />
                             {/* Radar Sweep with Blur */}
                             <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(34,197,94,0.3))] animate-[spin_2s_linear_infinite] blur-[2px]" /> 
                             <div className="relative z-10 bg-navy-900 rounded-full p-2 border border-green-500/30">
                                 <ShieldCheck size={16} className="text-green-400" />
                             </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white leading-none">98/100</div>
                            <div className="text-[10px] text-green-400 font-bold uppercase mt-1">Humanity Score</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const HumanBehaviorFeature = () => {
   return (
     <section className="py-32 relative overflow-hidden bg-navy-950/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center relative z-10">
           {/* Visual Dashboard */}
           <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="relative"
           >
              <HumanScoreCard />
           </motion.div>
           
           {/* Content */}
           <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                  <Fingerprint size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                  Pass as Human. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Every Time.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Our biometric engine mimics human motor skills. We introduce randomized micro-delays, non-linear mouse paths, and natural typing rhythms to ensure your accounts are never flagged.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                  {[
                      { label: "Typing Variance", val: "94%", color: "text-green-400" },
                      { label: "Mouse Jitter", val: "Active", color: "text-blue-400" },
                      { label: "Session Pauses", val: "Random", color: "text-yellow-400" },
                      { label: "Ban Risk", val: "<0.01%", color: "text-purple-400" },
                  ].map((stat, i) => (
                      <div key={i} className="bg-navy-900 border border-white/5 p-4 rounded-xl">
                          <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                          <div className={`text-xl font-bold ${stat.color}`}>{stat.val}</div>
                      </div>
                  ))}
              </div>
           </motion.div>
        </div>
     </section>
   );
};
