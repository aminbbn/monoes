
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monkey } from './Monkey';
import { Download, Zap, Search, Sliders, Rocket, ChevronDown, Shield, WifiOff, HelpCircle, Check, Clock, PlayCircle, ArrowRight } from 'lucide-react';
import { PageView } from '../App';

interface HowItWorksPageProps {
  onNavigate: (page: PageView) => void;
}

const phases = [
  { id: 1, title: 'Download Local Processor', duration: '2 min', desc: 'Download the Monoes engine to your device. Run the installation wizard and grant local permissions.', icon: <Download size={24} />, color: 'bg-blue-500', role: 'IT Specialist' },
  { id: 2, title: 'Connect Accounts', duration: '3 min', desc: 'Securely authenticate your LinkedIn, Email, and other platforms via a local handshake.', icon: <Zap size={24} />, color: 'bg-yellow-500', role: 'Connector' },
  { id: 3, title: 'Import & Enrich', duration: '5 min', desc: 'Import leads from CSV or LinkedIn. Our automatic enrichment engine populates data instantly.', icon: <Search size={24} />, color: 'bg-purple-500', role: 'Data Analyst' },
  { id: 4, title: 'Set Adaptive Rules', duration: '3 min', desc: 'Configure daily message limits, working hours, and "Stop on Reply" logic.', icon: <Sliders size={24} />, color: 'bg-pink-500', role: 'Strategist' },
  { id: 5, title: 'Launch', duration: '2 min', desc: 'Review your campaign summary and press launch. Your AI sales team takes over.', icon: <Rocket size={24} />, color: 'bg-green-500', role: 'Pilot' }
];

const faqs = [
  { q: "Does this really run locally?", a: "Yes. All processing happens on your CPU. No data is sent to our servers.", icon: <Shield size={16} /> },
  { q: "Will I get banned?", a: "Our Human Behavior Engine simulates natural typing and delays to prevent detection.", icon: <Shield size={16} /> },
  { q: "Can I use TikTok and Threads?", a: "Yes, we support all major social platforms including TikTok and Threads." },
  { q: "What happens if I lose internet?", a: "The automation pauses safely and resumes when connection is restored.", icon: <WifiOff size={16} /> },
  { q: "Do I need technical skills?", a: "None required. If you can install an app, you can use Monoes." },
];

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-navy-950 pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex justify-center mb-8">
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-mono font-medium text-gray-400 hover:bg-white/10 transition-colors cursor-pointer"
               onClick={() => onNavigate('home')}
            >
              <span className="hover:text-white transition-colors">HOME</span> 
              <ArrowRight size={10} className="text-white/20" /> 
              <span className="text-primary-blue shadow-glow">HOW IT WORKS</span>
            </motion.div>
        </div>

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary-blue/10 border border-primary-blue/20 px-4 py-1.5 rounded-full text-sm font-bold text-primary-blue mb-6">
            <Clock size={14} /> FAST SETUP
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            From Setup to Sales in <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">15 Minutes</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            No complex setup. No technical expertise. Just download the Local Processor and start automating.
          </p>
        </div>

        {/* Hero Illustration */}
        <div className="relative h-64 w-full flex items-center justify-center mb-24">
            <div className="w-64 h-64 bg-navy-900 rounded-full border border-white/5 flex items-center justify-center relative shadow-[0_0_60px_rgba(99,102,241,0.1)]">
                <div className="absolute inset-0 border-4 border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="text-center">
                   <div className="text-4xl font-bold text-white mb-1">15:00</div>
                   <div className="text-xs text-gray-500 font-mono">ESTIMATED TIME</div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 animate-spin-slow" style={{ transformOrigin: "50% 140px", animationDuration: "8s" }}>
                   <Monkey variant="filled" size="sm" />
                </div>
            </div>
        </div>

        {/* Vertical Timeline Journey */}
        <div className="relative mb-32">
           <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-navy-800 -translate-x-1/2 md:translate-x-0" />
           
           <div className="space-y-16 md:space-y-28 relative">
              {phases.map((phase, index) => {
                 const isEven = index % 2 === 0;
                 return (
                    <motion.div 
                       key={phase.id}
                       initial={{ opacity: 0, y: 50 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                       <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 z-10 group">
                          <div className={`w-14 h-14 rounded-full ${phase.color} flex items-center justify-center text-white shadow-lg border-4 border-navy-950 transition-transform group-hover:scale-110 relative`}>
                             {phase.icon}
                             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-navy-800 px-2 py-0.5 rounded text-[10px] whitespace-nowrap border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                 {phase.role}
                             </div>
                          </div>
                       </div>

                       <div className={`pl-16 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                          <div className="bg-navy-900 border border-white/5 p-8 rounded-2xl shadow-xl hover:border-white/20 transition-colors group relative overflow-hidden">
                             <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${phase.color}`} />
                             <div className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${isEven ? 'justify-end' : 'justify-start'} ${phase.color.replace('bg-', 'text-')}`}>
                                <span>Phase 0{phase.id}</span>
                                <span className="w-1 h-1 bg-current rounded-full" />
                                <span>{phase.duration}</span>
                             </div>
                             <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-blue transition-colors">{phase.title}</h3>
                             <p className="text-gray-400 text-sm leading-relaxed mb-4">{phase.desc}</p>
                             <div className={`flex items-center gap-2 ${isEven ? 'justify-end' : 'justify-start'} opacity-50 group-hover:opacity-100 transition-opacity`}>
                                 <div className="text-[10px] text-gray-500 font-mono">Agent: {phase.role}</div>
                                 <Monkey variant="outline" size="xs" />
                             </div>
                          </div>
                       </div>
                       <div className="hidden md:block w-1/2" />
                    </motion.div>
                 );
              })}
           </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-24">
           <h3 className="text-3xl font-bold text-white mb-8 text-center">Common Setup Questions</h3>
           <div className="space-y-4">
              {faqs.map((faq, i) => (
                 <FAQItem key={i} faq={faq} />
              ))}
           </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-navy-900 border border-white/10 rounded-3xl p-12 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
           <div className="relative z-10">
               <div className="flex justify-center mb-6">
                  <div className="flex -space-x-4">
                     {[...Array(3)].map((_, i) => (
                        <div key={i} className="relative z-10 hover:z-20 transition-all hover:scale-110">
                            <div className="w-12 h-12 bg-navy-800 rounded-full border-2 border-navy-900 flex items-center justify-center">
                                <Monkey variant="filled" size="sm" />
                            </div>
                        </div>
                     ))}
                  </div>
               </div>
               <h2 className="text-3xl font-bold text-white mb-4">Start Your Privacy-First Outreach Today</h2>
               <p className="text-gray-400 mb-8">100% Data Privacy Guaranteed. No Credit Card Required.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <button className="px-8 py-4 bg-primary-blue text-white font-bold rounded-full shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 transition-transform flex items-center justify-center gap-2">
                      Start Free Trial <ChevronDown className="-rotate-90" size={16} />
                   </button>
                   <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                      <PlayCircle size={18} /> Watch Demo
                   </button>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
};

const FAQItem: React.FC<{ faq: any }> = ({ faq }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border border-white/10 rounded-xl bg-navy-900/50 overflow-hidden">
         <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
            <span className="font-bold text-white flex items-center gap-3">
               <span className="text-primary-blue bg-primary-blue/10 p-1 rounded-full">{faq.icon || <HelpCircle size={16} />}</span>
               {faq.q}
            </span>
            <ChevronDown className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 mx-5 mt-2">{faq.a}</div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};
