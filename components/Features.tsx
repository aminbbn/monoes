
import React from 'react';
import { motion } from 'framer-motion';
import { Monkey } from './Monkey';
import { Globe, Database, Users, ShieldCheck, Zap, Clock } from 'lucide-react';

const features = [
  {
    icon: <Globe size={24} />,
    title: "Multi-Channel Outreach",
    description: "Orchestrate campaigns across LinkedIn, Email, Telegram, and Twitter from one dashboard."
  },
  {
    icon: <Users size={24} />,
    title: "Human Behavior Engine",
    description: "Undetectable automation that mimics natural typing speeds, delays, and browsing patterns."
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "100% Local Privacy",
    description: "Your data never leaves your device. Military-grade encryption runs locally on your machine."
  },
  {
    icon: <Zap size={24} />,
    title: "Smart Sequences",
    description: "Adaptive workflows that automatically stop when a lead replies on any channel."
  },
  {
    icon: <Database size={24} />,
    title: "Auto-CRM Sync",
    description: "Two-way sync with HubSpot, Salesforce, and Pipedrive. Never manually log a deal again."
  },
  {
    icon: <Clock size={24} />,
    title: "Smart Scheduling",
    description: "Send messages when prospects are most active based on their timezone and behavior."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-navy-950 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Everything You Need to Scale
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful automation tools wrapped in a privacy-first local application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-navy-900 border border-white/5 p-8 rounded-2xl hover:bg-navy-800 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
