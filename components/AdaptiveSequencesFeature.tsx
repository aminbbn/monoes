
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Check, Mail, Clock, MessageCircle, Repeat, Ban, CheckCircle2 } from 'lucide-react';

const SequenceCard = ({ icon, title, status, type = 'default', active = false }: any) => {
    let variants = {
        default: "bg-[#0A0C10] border-green-500/20",
        waiting: "bg-[#0A0C10] border-gray-800 border-dashed",
        reply: "bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        halted: "bg-red-500/5 border-red-500/20"
    };

    let iconVariants = {
        default: "bg-green-500/10 text-green-500",
        waiting: "bg-white/5 text-gray-500",
        reply: "bg-blue-500 text-white",
        halted: "bg-red-500/10 text-red-500"
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full p-4 rounded-xl border ${variants[type]} flex items-center gap-4 relative overflow-hidden z-10 transition-colors duration-500`}
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconVariants[type]} shadow-inner`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold ${type === 'halted' ? 'text-gray-400' : 'text-white'}`}>{title}</div>
                <div className={`text-xs ${type === 'reply' ? 'text-blue-200' : 'text-gray-500'}`}>{status}</div>
            </div>
            {type === 'default' && <CheckCircle2 size={18} className="text-green-500" />}
        </motion.div>
    );
};

const ConnectingLine = ({ active, halted }: { active: boolean, halted?: boolean }) => {
    return (
        <div className="h-10 w-[2px] bg-white/5 relative overflow-hidden my-1">
            <motion.div 
                className={`absolute top-0 left-0 w-full ${halted ? 'bg-red-500' : 'bg-primary-blue'}`}
                initial={{ height: 0 }}
                animate={{ height: active ? "100%" : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>
    );
};

export const AdaptiveSequencesFeature = () => {
  const [stage, setStage] = useState(0); // 0: Start, 1: Sent, 2: Waiting, 3: Reply, 4: Halted

  useEffect(() => {
    const sequence = async () => {
      while(true) {
        setStage(0); await new Promise(r => setTimeout(r, 1000));
        setStage(1); await new Promise(r => setTimeout(r, 800));
        setStage(2); await new Promise(r => setTimeout(r, 2000));
        setStage(3); await new Promise(r => setTimeout(r, 2000));
        setStage(4); await new Promise(r => setTimeout(r, 4000));
      }
    };
    sequence();
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-navy-950">
       <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

       <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mb-6 border border-pink-500/20 shadow-[0_0_40px_rgba(236,72,153,0.2)]">
               <GitBranch size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
               Smart Sequences <br/> That <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Actually Stop</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Nothing kills a deal faster than sending "Just bumping this!" to a lead who already replied. Monoes detects replies across all channels and halts sequences instantly.
            </p>
            <ul className="space-y-4">
              {['Auto-stop on reply', 'Multi-channel triggers', 'Sentiment analysis routing'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400"><Check size={14} /></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Animation Side */}
          <div className="order-1 lg:order-2 flex justify-center">
             <div className="w-full max-w-sm bg-[#050508] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col min-h-[480px]">
                {/* Header Strip */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 z-20" />
                
                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                   <div className="text-xs font-bold tracking-widest text-gray-400 uppercase">Active Sequence</div>
                   <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                   </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center w-full">
                   
                   {/* Step 1: Initial Email */}
                   <motion.div 
                      className="w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                   >
                       <SequenceCard 
                          icon={<Mail size={20} />}
                          title="Cold Outreach v1"
                          status="Sent 2 days ago"
                          type="default"
                       />
                   </motion.div>

                   <ConnectingLine active={stage >= 1} />

                   {/* Step 2: The Variable State */}
                   <div className="w-full h-20 relative">
                      <AnimatePresence mode="wait">
                         {stage < 3 ? (
                            <motion.div 
                               key="waiting"
                               initial={{ opacity: 0, scale: 0.9 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.9 }}
                               transition={{ duration: 0.3 }}
                               className="absolute inset-0"
                            >
                               <SequenceCard 
                                  icon={<Clock size={20} />}
                                  title="Waiting for response"
                                  status="Listening on all channels..."
                                  type="waiting"
                               />
                            </motion.div>
                         ) : (
                            <motion.div 
                               key="reply"
                               initial={{ opacity: 0, x: 50 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ type: "spring", stiffness: 200, damping: 20 }}
                               className="absolute inset-0"
                            >
                               <SequenceCard 
                                  icon={<MessageCircle size={20} />}
                                  title="Reply Detected"
                                  status='"Sounds interesting, tell me more."'
                                  type="reply"
                               />
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>

                   <ConnectingLine active={stage >= 4} halted={stage >= 4} />

                   {/* Step 3: Follow Up (Halted) */}
                   <div className="w-full relative h-20">
                       <motion.div 
                          className="absolute inset-0 z-0"
                          animate={{ opacity: stage >= 4 ? 0.3 : 1 }}
                       >
                           <SequenceCard 
                              icon={<Repeat size={20} />}
                              title="Follow Up 1"
                              status="Scheduled"
                              type="waiting"
                           />
                       </motion.div>

                       <AnimatePresence>
                          {stage >= 4 && (
                             <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    x: [0, -5, 5, -5, 5, 0] // Glitch shake effect
                                }}
                                transition={{ 
                                    opacity: { duration: 0.2 },
                                    scale: { type: "spring" },
                                    x: { duration: 0.4 }
                                }}
                                className="absolute inset-0 z-10 flex items-center justify-center"
                             >
                                <div className="bg-red-600 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-[0_0_30px_rgba(220,38,38,0.5)] border border-red-400">
                                   <Ban size={18} /> SEQUENCE HALTED
                                </div>
                             </motion.div>
                          )}
                       </AnimatePresence>
                   </div>

                </div>
             </div>
          </div>
       </div>
    </section>
  );
};
