import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Monkey } from './Monkey';
import { Star, Quote } from 'lucide-react';

const stats = [
  { label: 'Local Privacy', value: 100, suffix: '%', emoji: '🛡️' },
  { label: 'Saved Weekly', value: 6, suffix: ' Hours', emoji: '⚡' },
  { label: 'Channels Supported', value: 10, suffix: '+', emoji: '🔌' },
  { label: 'More Meetings', value: 3, suffix: 'x', emoji: '📅' },
];

interface TestimonialData {
  name: string;
  role: string;
  company: string;
  text: string;
  variant: 'filled' | 'outline';
}

const testimonials: TestimonialData[] = [
  {
    name: "Sarah M.",
    role: "Agency Founder",
    company: "ScaleUp Inc.",
    text: "Monoes transformed our outreach. We're booking 3x more meetings without lifting a finger.",
    variant: "filled"
  },
  {
    name: "James D.",
    role: "Sales Director",
    company: "TechFlow",
    text: "Finally, a CRM that doesn't feel like homework. Everything just works automatically.",
    variant: "filled"
  },
  {
    name: "Elena R.",
    role: "Freelancer",
    company: "DesignSolo",
    text: "The privacy-first approach sold me. My data never leaves my computer.",
    variant: "filled"
  }
];

const Counter = ({ value, suffix, isDecimal }: { value: number, suffix: string, isDecimal?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = isDecimal 
          ? latest.toFixed(1) + suffix 
          : Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix, isDecimal]);

  return <span ref={ref} className="tabular-nums" />;
};

export const SocialProof: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-navy-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-purple/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary-pink font-bold tracking-wider text-xs uppercase mb-3 block">
            Community Trust
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
            Trusted by Growth-Minded Teams
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join the revolution of automated, private, and intelligent sales outreach.
          </p>
        </motion.div>

        {/* Stats Container */}
        <motion.div 
          className="relative bg-navy-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 mb-16 md:mb-24 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300 origin-center whitespace-nowrap">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-primary-blue text-xs font-bold uppercase tracking-widest mb-4">{stat.label}</div>
                <div className="text-xl md:text-2xl filter drop-shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                  {stat.emoji}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: TestimonialData, index: number }> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-navy-900 border border-white/5 rounded-3xl p-8 hover:bg-navy-800 transition-colors duration-300 overflow-visible">
        {/* Glow Hover Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_40px_rgba(99,102,241,0.1)] border border-primary-blue/30" />

        {/* Monkey Avatar Peeking */}
        <div className="absolute -top-6 left-8 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
          <div className="bg-navy-800 p-1.5 rounded-full border border-white/10 shadow-xl text-white">
             <Monkey variant={testimonial.variant} size="sm" />
          </div>
        </div>
        
        {/* Static Monkey Avatar (Visible when not hovering, slightly different style) */}
        <div className="absolute -top-5 left-8 z-10 transform group-hover:scale-0 transition-transform duration-200">
           <div className="w-10 h-10 bg-navy-800 rounded-full border border-white/10 flex items-center justify-center grayscale opacity-50 text-white">
              <Monkey variant="outline" size="sm" />
           </div>
        </div>

        {/* Large Quote Icon Background */}
        <div className="absolute top-6 right-6 text-white/5 group-hover:text-primary-purple/10 transition-colors duration-300">
          <Quote size={80} fill="currentColor" />
        </div>

        <div className="relative z-10 pt-4 h-full flex flex-col">
          <div className="flex space-x-1 text-yellow-500 mb-6">
            {[...Array(5)].map((_, k) => (
              <Star key={k} size={16} fill="currentColor" className="drop-shadow-sm" />
            ))}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 flex-grow">
            "{testimonial.text}"
          </p>

          <div className="border-t border-white/5 pt-6 flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-base">{testimonial.name}</div>
              <div className="text-primary-blue text-sm font-medium">{testimonial.role}</div>
            </div>
            <div className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">
                {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};