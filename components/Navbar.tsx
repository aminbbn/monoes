import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monkey } from './Monkey';
import { ChevronDown, Menu, X, Book, FileText, HelpCircle, ArrowRight } from 'lucide-react';
import { NavItem } from '../types';
import { LiquidGlass } from './LiquidGlass';
import { PageView } from '../App';

const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Resources', href: '#resources', hasDropdown: true },
];

interface NavbarProps {
  currentPage?: PageView;
  onNavigate?: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Add hysteresis to prevent flickering
      if (window.scrollY > 50 && !isScrolled) {
        setIsScrolled(true);
      } else if (window.scrollY < 30 && isScrolled) {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.label === 'Features') {
      onNavigate?.('features');
      return;
    }
    
    if (item.label === 'How It Works') {
      onNavigate?.('how-it-works');
      return;
    }

    if (item.label === 'Home') {
      onNavigate?.('home');
      return;
    }

    if (currentPage !== 'home') {
      onNavigate?.('home');
      setTimeout(() => {
        const targetId = item.href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      if (item.href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetId = item.href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isItemActive = (label: string) => {
    if (label === 'Home' && currentPage === 'home') return true;
    if (label === 'Features' && currentPage === 'features') return true;
    if (label === 'How It Works' && currentPage === 'how-it-works') return true;
    return false;
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-6'}`}>
        <motion.nav
          layout
          initial={{ y: -100 }}
          animate={{ 
             y: 0,
             // Use a simpler constraint if possible, but auto works if we use layoutRoot on sticky header concepts
             width: isScrolled ? "auto" : "100%",
             paddingLeft: isScrolled ? 20 : 40,
             paddingRight: isScrolled ? 8 : 40,
          }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 1
          }}
          className={`
            pointer-events-auto relative flex items-center
            ${isScrolled 
              ? 'py-2 gap-3' 
              : 'max-w-[1920px] w-full py-3 justify-between'
            }
          `}
          style={{ 
             borderRadius: '9999px',
             minHeight: '50px'
          }}
        >
          {/* LIQUID GLASS BACKGROUND LAYER */}
          <motion.div 
             className="absolute inset-0 z-0 rounded-full overflow-hidden"
             initial={{ opacity: 0 }}
             animate={{ 
                opacity: isScrolled ? 1 : 0,
                scale: isScrolled ? 1 : 0.95,
             }}
             style={{
                boxShadow: isScrolled ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "none",
                // Combine transparent and blur for better performance
                backgroundColor: isScrolled ? "rgba(15, 17, 26, 0.6)" : "transparent",
                backdropFilter: isScrolled ? "blur(20px)" : "none",
                WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
             }}
             transition={{ duration: 0.4 }}
          >
             {/* Only render liquid glass when scrolled to save GPU */}
             <div className={`absolute inset-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
                <LiquidGlass opacity={0.4} blur={40} intensity={30} />
             </div>
          </motion.div>

          {/* Left: Logo */}
          <motion.div layout="position" className={`relative z-10 flex items-center ${!isScrolled ? 'flex-1 justify-start' : ''}`}>
            <a 
                href="#" 
                onClick={(e) => handleNavClick(e, navItems[0])}
                className="flex items-center group relative z-50"
            >
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
            {navItems.map((item) => {
              const active = isItemActive(item.label);
              return (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a 
                    href={item.href} 
                    onClick={(e) => !item.hasDropdown && handleNavClick(e, item)}
                    className={`
                      relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center group whitespace-nowrap cursor-pointer
                      ${active || activeDropdown === item.label
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'}
                    `}
                  >
                    {(active || activeDropdown === item.label) && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white/10 shadow-inner rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <span className="relative z-10 block">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDown 
                        size={14} 
                        className={`ml-1.5 transition-transform duration-300 relative z-10 ${
                          activeDropdown === item.label ? 'rotate-180 text-primary-blue' : 'text-gray-500 group-hover:text-white'
                        }`} 
                      />
                    )}
                  </a>
                  
                  {/* Dropdown */}
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
              );
            })}
          </motion.div>

          {/* Right: CTA & Mobile Toggle */}
          <motion.div layout="position" className={`relative z-10 flex items-center space-x-4 ${!isScrolled ? 'flex-1 justify-end' : ''}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary-blue/20 whitespace-nowrap overflow-hidden ring-1 ring-white/20"
            >
              <span>Launch App</span>
            </motion.button>
            
            <button 
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </motion.div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
             className="fixed inset-0 z-[90] lg:hidden pt-24 px-4 overflow-hidden"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
          >
             <LiquidGlass className="absolute inset-0" opacity={0.98} blur={60} intensity={30} />
             
             <div className="relative z-10 space-y-4">
               {navItems.map((item) => (
                 <div key={item.label} className="border-b border-white/5 pb-2">
                    <a 
                      href={item.href} 
                      onClick={(e) => handleNavClick(e, item)}
                      className={`block text-xl font-medium py-2 ${isItemActive(item.label) ? 'text-primary-blue' : 'text-gray-200'}`}
                    >
                      {item.label}
                    </a>
                 </div>
               ))}
               <button className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-xl font-bold text-lg shadow-xl">
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