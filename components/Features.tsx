import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Monkey } from './Monkey';
import { Globe, Database, MessageSquare, Calendar, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: 'omni',
    title: 'Multi-Channel Outreach',
    description: 'LinkedIn, Email, Instagram, X, Telegram, TikTok, Substack, Threads.',
    icon: <Globe size={24} />,
    stat: '10+ Platforms',
    monkeyAction: 'conduct'
  },
  {
    id: 'crm',
    title: 'Automatic CRM Sync',
    description: 'Everything logged in real time.',
    icon: <Database size={24} />,
    stat: 'Auto-Sync',
    monkeyAction: 'file'
  },
  {
    id: 'msg',
    title: 'Human Behavior Engine',
    description: 'Realistic typing, delay, and pacing.',
    icon: <MessageSquare size={24} />,
    stat: '98% Response',
    monkeyAction: 'type'
  },
  {
    id: 'follow',
    title: 'Adaptive Sequences',
    description: 'Follow-ups based on engagement.',
    icon: <Calendar size={24} />,
    stat: '3x Meetings',
    monkeyAction: 'time'
  },
  {
    id: 'privacy',
    title: 'Privacy by Design',
    description: 'No data ever leaves your device.',
    icon: <ShieldCheck size={24} />,
    stat: '100% Private',
    monkeyAction: 'guard'
  },
  {
    id: 'sync',
    title: 'Lead Enrichment',
    description: 'Pull data from LinkedIn, company size, intent.',
    icon: <RefreshCw size={24} />,
    stat: 'Instant',
    monkeyAction: 'connect'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-navy-900 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 opacity-50 z-0" />
      <div className="absolute left-0 top-1/3 w-64 md:w-96 h-64 md:h-96 bg-primary-blue/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute right-0 bottom-1/3 w-64 md:w-96 h-64 md:h-96 bg-primary-purple/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-primary-purple font-bold tracking-wider text-xs uppercase mb-3 block">
              Feature Stack
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold mb-6 text-white leading-tight">
              Everything You Need : <br/>
              <span className="text-gray-600">Built for Scale, Built for Trust.</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              We stripped away the bloat and kept the power. One platform to rule your entire outbound workflow.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center space-x-2 text-white font-medium bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            <span>View Full Roadmap</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      className="group relative rounded-3xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 bg-navy-900"
    >
      {/* 1. Base Border (Static) - Faint visibility always */}
      <div className="absolute inset-0 bg-white/5" />

      {/* 2. Spotlight Border (Dynamic) - Reveals active border color on hover */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.5), transparent 40%)`
        }}
      />

      {/* 3. Card Background (Inset to create the border width) */}
      <div className="absolute inset-[1px] bg-navy-900 rounded-[23px] z-10" />

      {/* 4. Inner Spotlight Glow (Dynamic) - Illuminates content from inside */}
      <div 
        className="absolute inset-[1px] z-20 rounded-[23px] transition-opacity duration-300 pointer-events-none"
        style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.1), transparent 40%)`
        }}
      />

      {/* 5. Content */}
      <div className="relative h-full p-7 flex flex-col z-30">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white group-hover:text-primary-blue group-hover:bg-primary-blue/10 transition-colors">
            {feature.icon}
          </div>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-white group-hover:border-primary-purple/30 transition-all">
            {feature.stat}
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
            {feature.description}
          </p>
        </div>

        {/* Bottom Interaction Area */}
        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
          <div className="text-xs font-semibold text-primary-purple opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center">
            Explore <ArrowRight size={12} className="ml-1" />
          </div>
          <div className="opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 origin-bottom-right text-white">
             <Monkey variant={feature.monkeyAction === 'guard' ? 'filled' : 'outline'} size="md" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};