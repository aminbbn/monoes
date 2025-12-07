
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monkey } from './Monkey';
import { ChevronDown, Menu, X, Book, FileText, HelpCircle, ArrowRight } from 'lucide-react';
import { NavItem } from '../types';
import { LiquidGlass } from './LiquidGlass';

const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Resources', href: '#resources', hasDropdown: true },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Increased threshold to 50px so it doesn't flicker immediately
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none ${isScrolled ? 'pt-4' : 'pt-6'}`}>
        <motion.nav
          layout
          initial={{ y: -100 }}
          animate={{ 
             y: 0,
             width: isScrolled ? "auto" : "100%",
             gap: isScrolled ? 12 : 0,
          }}
          // Replaced spring with a smooth ease-in-out transition for less bounce/jank
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          className={`
            pointer-events-auto relative flex items-center
            ${isScrolled 
              ? 'py-2 pl-5 pr-2' 
              : 'max-w-[1920px] w-full py-3 justify-between px-6 md:px-10'
            }
          `}
          style={{ 
             borderRadius: '9999px',
             minHeight: '50px'
          }}
        >
          {/* LIQUID GLASS BACKGROUND LAYER */}
          <motion.div 
             layout
             className="absolute inset-0 z-0 rounded-full overflow-hidden"
             initial={{ opacity: 0 }}
             animate={{ 
                opacity: isScrolled ? 1 : 0,
             }}
             style={{
                boxShadow: isScrolled ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "none",
                backdropFilter: isScrolled ? "blur(24px) saturate(180%)" : "none",
                WebkitBackdropFilter: isScrolled ? "blur(24px) saturate(180%)" : "none",
                backgroundColor: isScrolled ? "rgba(15, 17, 26, 0.3)" : "transparent"
             }}
             // Match the parent transition for sync
             transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
             {/* Strong frosted glass effect */}
             <LiquidGlass opacity={0.5} blur={60} intensity={40} />
          </motion.div>

          {/* Left: Logo */}
          <motion.div layout="position" className={`relative z-10 flex items-center ${!isScrolled ? 'flex-1 justify-start' : ''}`}>
            <a href="#" className="flex items-center group relative z-50">
               {/* Text Logo Only - Resized to be proportionate and legible */}
               <div className={`relative transition-all duration-500 ease-out ${isScrolled ? 'h-7 w-28' : 'h-9 w-36 md:h-12 md:w-48'} text-white group-hover:text-primary-blue`}>
                  <div className="absolute inset-0 bg-primary-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Monkey variant="text-filled" size="custom" className="w-full h-full relative z-10" animate={false} />
               </div>
            </a>
          </motion.div>

          {/* Center: Desktop Menu */}
          <motion.div 
            layout="position"
            className={`
              hidden lg:flex items-center rounded-full transition-all duration-500 relative z-10
              ${!isScrolled ? 'p-1.5' : ''}
            `}
          >
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={item.href} 
                  className={`
                    relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center group whitespace-nowrap
                    ${activeDropdown === item.label 
                      ? 'text-white bg-white/10 shadow-inner' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <motion.span layout="position" className="relative z-10 block">
                    {item.label}
                  </motion.span>
                  {item.hasDropdown && (
                    <ChevronDown 
                      size={14} 
                      className={`ml-1.5 transition-transform duration-300 relative z-10 ${
                        activeDropdown === item.label ? 'rotate-180 text-primary-blue' : 'text-gray-500 group-hover:text-white'
                      }`} 
                    />
                  )}
                </a>
                
                {/* Dropdown Logic */}
                <AnimatePresence>
                  {activeDropdown === item.label && item.hasDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 p-2"
                    >
                       <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />
                       <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                          {/* Dropdown Liquid Glass Background - High Blur */}
                          <LiquidGlass className="absolute inset-0" opacity={0.85} blur={50} intensity={25} />
                          
                          <div className="relative z-10 bg-navy-900/50 p-2 text-left border border-white/10 rounded-2xl">
                              <div className="space-y-1">
                                 <DropdownItem title="Documentation" desc="Start building" icon={<Book size={18} />} />
                                 <DropdownItem title="Blog & Stories" desc="Latest updates" icon={<FileText size={18} />} />
                                 <DropdownItem title="Help Center" desc="Get support 24/7" icon={<HelpCircle size={18} />} />
                              </div>
                              <div className="mt-2 pt-2 border-t border-white/5 px-3 pb-1">
                                <a href="#" className="flex items-center justify-between text-xs font-medium text-gray-400 hover:text-primary-blue transition-colors group/link">
                                    <span>View all resources</span>
                                    <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                                </a>
                              </div>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* Right: CTA & Mobile Toggle */}
          <motion.div layout="position" className={`relative z-10 flex items-center space-x-4 ${!isScrolled ? 'flex-1 justify-end' : ''}`}>
            <motion.button
              layout="position"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-2.5 bg-white text-navy-950 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shadow-lg shadow-white/5 whitespace-nowrap overflow-hidden"
            >
              <motion.span layout="position" className="block">Launch App</motion.span>
            </motion.button>
            
            {/* Mobile/Tablet Menu Button - Visible until lg breakpoint */}
            <button 
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </motion.div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
             className="fixed inset-0 z-40 lg:hidden pt-24 px-4 overflow-hidden"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
          >
             {/* Mobile Menu Background - Strong Glass Effect */}
             <LiquidGlass className="absolute inset-0" opacity={0.95} blur={60} intensity={30} />
             
             <div className="relative z-10 space-y-4">
               {navItems.map((item) => (
                 <div key={item.label} className="border-b border-white/5 pb-2">
                    <a href={item.href} className="block text-xl font-medium text-gray-200 py-2">{item.label}</a>
                    {item.hasDropdown && (
                        <div className="pl-4 space-y-2 mt-2">
                            <a href="#" className="block text-sm text-gray-400">Documentation</a>
                            <a href="#" className="block text-sm text-gray-400">Blog</a>
                        </div>
                    )}
                 </div>
               ))}
               <button className="w-full mt-8 px-6 py-4 bg-white text-navy-950 rounded-xl font-bold text-lg shadow-xl">
                 Launch App
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DropdownItem = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
    <a href="#" className="flex items-start space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
        <div className="flex-shrink-0 w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-primary-blue/20 group-hover:scale-110 transition-all duration-300 border border-white/5">
            {icon}
        </div>
        <div>
            <div className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                {title}
            </div>
            <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors mt-0.5">
                {desc}
            </div>
        </div>
    </a>
);
