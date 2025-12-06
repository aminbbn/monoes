import React from 'react';
import { motion } from 'framer-motion';
import { Monkey } from './Monkey';
import { XCircle, Layers, ClipboardX, Clock, AlertTriangle } from 'lucide-react';

const problems = [
  {
    icon: <Layers size={28} />,
    title: 'Tool Overload',
    description: 'Switching between 10+ platforms just to send one message destroys focus.',
    delay: 0.1
  },
  {
    icon: <XCircle size={28} />,
    title: 'Bot Detection',
    description: 'Generic automated messages getting flagged, banned, or sent to spam.',
    delay: 0.2
  },
  {
    icon: <ClipboardX size={28} />,
    title: 'Data Hell',
    description: 'Hours wasted copy-pasting data between spreadsheets and CRMs.',
    delay: 0.3
  },
  {
    icon: <Clock size={28} />,
    title: 'Lost Deals',
    description: 'Leads going cold because you simply forgot to follow up in time.',
    delay: 0.4
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-navy-950 relative overflow-hidden">
      {/* Background Ambience - 'Chaos' Red Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-orange-500/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />
      
      {/* Chaos Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center space-x-2 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full text-red-400 text-sm font-semibold mb-6 uppercase tracking-wider"
          >
            <AlertTriangle size={14} />
            <span>The Old Way</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 text-white tracking-tight"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Modern Outreach is <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Broken</span>
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-500 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </motion.h2>

          <motion.p 
            className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Sales teams are drowning in tabs, getting blocked by spam filters, and wasting 
            valuable human hours on robot work.
          </motion.p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.6 }}
              className="group relative bg-navy-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-navy-800/80 transition-all duration-500 overflow-hidden"
            >
              {/* Danger Gradient Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Animated Border on Hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-red-500/30 rounded-3xl transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <div className="w-14 h-14 bg-navy-950 rounded-2xl border border-white/10 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:border-red-500/30 group-hover:shadow-[0_0_20px_rgba(248,113,113,0.2)] transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-6 text-white group-hover:text-red-400">
                     <Monkey variant="outline" size="md" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
