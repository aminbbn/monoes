import React, { useState, useEffect } from 'react';
import { Monkey } from './Monkey';
import { Twitter, Linkedin, Github, Disc, Globe, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PageView } from '../App';

interface FooterProps {
  onNavigate?: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, page: PageView) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
    }
  };

  return (
    <motion.footer 
      className="bg-navy-950 pt-20 pb-10 border-t border-white/5 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      
      {/* Newsletter Section - Pre-footer */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-20">
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-primary-purple to-primary-blue rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Stay in the Monkey Loop</h3>
              <p className="text-white/80">Get AI sales tips delivered weekly.</p>
            </div>
            <div className="flex w-full md:w-auto bg-navy-900/30 p-2 rounded-full backdrop-blur-sm border border-white/20">
              <div className="pl-3 flex items-center text-white">
                <Monkey variant="filled" size="sm" />
              </div>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-transparent border-none focus:ring-0 text-white placeholder-white/60 px-4 w-full md:w-64 focus:outline-none"
              />
              <button className="bg-white text-primary-purple px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Join
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <motion.div className="col-span-2" variants={itemVariants}>
             {/* Fixed Footer Logo */}
             <div className="flex items-center mb-6 text-white gap-3 group">
                <div className="w-8 h-8 flex-shrink-0 group-hover:text-primary-blue transition-colors duration-300">
                    <Monkey variant="filled" size="custom" className="w-full h-full" />
                </div>
                <div className="font-display font-bold text-2xl tracking-tight leading-none group-hover:text-primary-blue transition-colors duration-300">
                   Monoes
                </div>
             </div>
             
             <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
               Your local AI sales team. Automate outreach, follow-ups, and CRM management without compromising privacy.
             </p>
             <div className="flex space-x-4">
               {[Twitter, Linkedin, Github, Disc].map((Icon, i) => (
                 <a key={i} href="#" className="text-gray-500 hover:text-white transition-colors hover:scale-110 transform duration-200">
                   <Icon size={20} />
                 </a>
               ))}
             </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-6">Product</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#features" onClick={(e) => handleLinkClick(e, 'features')} className="hover:text-primary-blue transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary-blue transition-colors">Pricing</a></li>
              <li><a href="#how-it-works" onClick={(e) => handleLinkClick(e, 'how-it-works')} className="hover:text-primary-blue transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Changelog</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary-blue transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Careers <span className="text-xs bg-primary-pink px-2 py-0.5 rounded-full text-white ml-1">Hiring</span></a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">GDPR</a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"
          variants={itemVariants}
        >
          <div className="mb-4 md:mb-0">
            © 2024 Monoes. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
             <div className="flex items-center cursor-pointer hover:text-white">
               <Globe size={14} className="mr-2" />
               <span>English (US)</span>
             </div>
             <span>Made with 🍌 by AI</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary-blue/20 hover:bg-primary-blue text-primary-blue hover:text-white p-3 rounded-full backdrop-blur-sm border border-primary-blue/30 transition-all duration-300 group z-50"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};
