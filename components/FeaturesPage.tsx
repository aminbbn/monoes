
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monkey } from './Monkey';
import { 
  Globe, Database, MessageSquare, Calendar, ShieldCheck, Shield,
  ArrowRight, Check, Zap, Users, BarChart3, Lock, Search, 
  Linkedin, Mail, Send, Hash, Clock, CheckCircle2,
  Sliders, Activity, X, Share2, MousePointer2, ArrowDown,
  Layout, Settings, PieChart, Inbox, Twitter, Bell, MoreHorizontal, Paperclip, Mic,
  Cpu, Fingerprint, AlertTriangle, GitBranch, StopCircle, CornerDownRight,
  Instagram, Video, Heart, MessageCircle, Repeat, Share, Image as ImageIcon, Smile, Battery, Signal, Wifi,
  Terminal, Mouse, RefreshCw, Layers, Ban, Play, Pause, AlertCircle, Sparkles, User, RefreshCcw, Command, FileText, Rocket,
  MousePointer, ArrowLeft, BadgeCheck, Phone, Camera, PenSquare, MoreVertical, SendHorizontal, Flag
} from 'lucide-react';
import LightRays from './LightRays';
import { PageView } from '../App';

interface FeaturesPageProps {
  onNavigate: (page: PageView) => void;
}

// Helper Hook for Typing Simulation
const useTypingSimulation = (fullText: string, speed: number = 30) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    let i = 0;
    setIsTyping(true);
    setIsSent(false);
    setDisplayedText('');

    // Initial delay before typing starts
    const startDelay = setTimeout(() => {
        const typingInterval = setInterval(() => {
          if (i < fullText.length) {
            setDisplayedText(fullText.slice(0, i + 1));
            i++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            // Delay before "sending"
            setTimeout(() => setIsSent(true), 1000);
          }
        }, speed);

        return () => clearInterval(typingInterval);
    }, 800);

    return () => clearTimeout(startDelay);
  }, [fullText, speed]);

  return { displayedText, isTyping, isSent };
};

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-navy-950 relative overflow-hidden">
      {/* Global Background Grid for the whole page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      </div>

      <FeatureHero onNavigate={onNavigate} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 space-y-32 pb-20 mt-12 md:mt-24">
        <div id="outreach"><MultiPlatformFeature /></div>
        <div id="behavior"><HumanBehaviorFeature /></div>
        <div id="sequences"><AdaptiveSequencesFeature /></div>
        <div id="crm"><CRMSyncFeature /></div>
        <div id="workflow"><WorkflowBuilderFeature /></div>
        <div id="privacy"><PrivacyFeature /></div>
        <div id="analytics"><AnalyticsFeature /></div>
        <div id="integrations"><IntegrationShowcase /></div>
        <ComparisonTable />
        <FeaturesCTA />
      </div>
    </div>
  );
};

const SatelliteCard: React.FC<{ item: any }> = ({ item }) => (
    <div 
        className="absolute z-30 pointer-events-auto"
        style={{ left: `${item.x}%`, top: `${item.y}%` }}
    >
        <motion.div
            className={`p-2 md:p-3 rounded-xl backdrop-blur-xl border ${item.bg} ${item.border} shadow-2xl flex items-center gap-3 cursor-default`}
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            whileHover={{ scale: 1.1, zIndex: 100 }}
            transition={{ 
                scale: { type: "spring", damping: 15, stiffness: 100, delay: item.delay + 0.5 },
                opacity: { duration: 0.5, delay: item.delay + 0.5 }
            }}
        >
            <div className={`p-1.5 md:p-2 rounded-lg ${item.bg} ${item.color}`}>
                {item.icon}
            </div>
            <div className="text-left hidden md:block">
                <div className={`text-xs font-bold ${item.color}`}>{item.label}</div>
                <div className="text-[10px] text-gray-400">Status: Active</div>
            </div>
            
            {/* Pulse Dot */}
            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} animate-ping`} />
            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`} />
        </motion.div>
    </div>
);

const FeatureHero: React.FC<{ onNavigate: (page: PageView) => void }> = ({ onNavigate }) => {
  const dashboardItems = [
    { id: 1, icon: <Globe size={18} />, label: "Multi-Channel", x: 20, y: 25, delay: 0, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
    { id: 2, icon: <ShieldCheck size={18} />, label: "Privacy Core", x: 80, y: 25, delay: 1.5, color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30" },
    { id: 3, icon: <Database size={18} />, label: "Local DB", x: 20, y: 75, delay: 0.8, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
    { id: 4, icon: <Zap size={18} />, label: "Smart Sync", x: 80, y: 75, delay: 2.2, color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* 1. Light Rays Background */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60">
        <LightRays
          raysColor="#4f46e5"
          raysSpeed={0.15}
          lightSpread={0.6}
          rayLength={0.8}
          raysOrigin="top-center"
        />
      </div>

      {/* 2. Ambient Color Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-blue/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-purple/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Navigation Breadcrumb */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-mono font-medium text-gray-400 mb-8 hover:bg-white/10 transition-colors cursor-pointer z-50 relative pointer-events-auto"
           onClick={() => onNavigate('home')}
        >
          <span className="hover:text-white transition-colors">HOME</span> 
          <ArrowRight size={10} className="text-white/20" /> 
          <span className="text-primary-blue shadow-glow">FEATURES</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tight leading-[0.9]"
        >
          Every Feature <br/>
          <span className="relative inline-block">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink animate-gradient-x">
               To Scale Outreach
             </span>
             {/* Text Underline Decoration */}
             <svg className="absolute w-full h-3 -bottom-2 left-0 text-primary-blue opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="url(#gradient)" strokeWidth="3" fill="none" />
                 <defs>
                   <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="transparent" />
                     <stop offset="50%" stopColor="currentColor" />
                     <stop offset="100%" stopColor="transparent" />
                   </linearGradient>
                 </defs>
              </svg>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          A complete arsenal of automated tools. <br className="hidden md:block" />
          Zero cloud dependencies. 100% privacy.
        </motion.p>
        
        {/* 3D Dashboard Visual - ADVANCED ANIMATED LOOP */}
        <motion.div 
           initial={{ opacity: 0, rotateX: 20, y: 100 }}
           animate={{ opacity: 1, rotateX: 0, y: 0 }}
           transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
           className="relative max-w-5xl mx-auto perspective-[1000px] group"
        >
           {/* Main Glass Panel */}
           <div className="relative bg-navy-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-700 hover:rotate-x-1 h-[450px] md:h-[550px] w-full">
              
              {/* Glossy Reflection Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/0 to-transparent pointer-events-none z-[5]" />
              
              {/* Top Bar (Browser style) */}
              <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/5 flex items-center px-4 bg-white/5 z-20">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                 </div>
                 <div className="mx-auto text-[10px] font-mono text-gray-500 flex items-center gap-1 opacity-70">
                    <Lock size={8} /> monoes-secure-core.local
                 </div>
              </div>

              {/* Dashboard Content */}
              <div className="absolute inset-0 top-10 flex items-center justify-center">
                 
                 {/* 1. Radar Scanning Effect (Background) - Z-0 */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden z-0">
                    {/* Expanding Ripples */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full border border-primary-blue/30"
                        initial={{ width: 100, height: 100, opacity: 0 }}
                        animate={{ width: 800, height: 800, opacity: [0, 0.5, 0] }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          delay: i * 1.3,
                          ease: "linear"
                        }}
                      />
                    ))}
                    {/* Rotating Radar Sweep */}
                    <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-transparent via-primary-blue/10 to-transparent animate-[spin_8s_linear_infinite]" 
                         style={{ maskImage: 'linear-gradient(to bottom, transparent 50%, black 50%)' }} />
                 </div>

                 {/* 2. Connection Lines (SVG) with Pulse Effects - Z-10 */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <filter id="glow-strong">
                        <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    {dashboardItems.map((item) => (
                      <React.Fragment key={`line-${item.id}`}>
                        {/* Static Line Track */}
                        <line 
                          x1={item.x} 
                          y1={item.y} 
                          x2="50" 
                          y2="50" 
                          stroke="rgba(255,255,255,0.08)" 
                          strokeWidth="0.5" 
                          strokeDasharray="2 2"
                        />
                        {/* Energy Pulse traveling along line */}
                        <circle r="1" fill="#6366f1" filter="url(#glow-strong)">
                           <animateMotion 
                              dur={`${3}s`}
                              begin={`${item.delay}s`}
                              repeatCount="indefinite"
                              path={`M50,50 L${item.x},${item.y}`} 
                              keyPoints="0;1"
                              keyTimes="0;1"
                              calcMode="linear"
                           />
                           <animate 
                              attributeName="opacity" 
                              values="0;1;1;0" 
                              keyTimes="0;0.1;0.9;1" 
                              dur="3s" 
                              begin={`${item.delay}s`}
                              repeatCount="indefinite" 
                           />
                        </circle>
                      </React.Fragment>
                    ))}
                 </svg>

                 {/* 3. Central Core: Holographic Gyroscope - Z-20 */}
                 <div className="relative z-20 w-48 h-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary-blue/20 blur-[80px] rounded-full animate-pulse-slow" />
                    
                    {/* Breathing Core */}
                    <motion.div 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-30"
                    >
                        <Monkey variant="3d" size="2xl" className="drop-shadow-2xl scale-125 relative z-10" />
                    </motion.div>
                    
                    {/* Gyroscope Rings */}
                    <div className="absolute w-[140%] h-[140%] border border-primary-blue/30 rounded-full animate-[spin_8s_linear_infinite]" 
                         style={{ transformStyle: 'preserve-3d', animationDirection: 'reverse' }} />
                    <div className="absolute w-[180%] h-[180%] border border-dashed border-primary-purple/30 rounded-full animate-[spin_12s_linear_infinite]" />
                    <motion.div 
                        className="absolute w-[220%] h-[60%] border border-white/10 rounded-[100%] top-[20%]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                 </div>

                 {/* 4. Reactive Satellite Cards - Z-30 */}
                 <div className="absolute inset-0 z-30 pointer-events-none">
                    {dashboardItems.map((item) => (
                       <SatelliteCard key={item.id} item={item} />
                    ))}
                 </div>
                 
                 {/* 5. Atmospheric Particles */}
                 <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute w-1 h-1 bg-white/20 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0, 0.5, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                 </div>

              </div>

              {/* Moving Grid Background */}
              <div className="absolute inset-0 z-[-1] opacity-20">
                  <motion.div 
                     className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%]"
                     style={{ 
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                     }}
                     animate={{ x: [0, 40], y: [0, 40] }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
              </div>
           </div>

           {/* Glow Reflection on Floor */}
           <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-primary-blue/20 blur-[60px] rounded-[100%] pointer-events-none opacity-40" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500 text-xs tracking-widest uppercase opacity-50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <span className="mb-2">Explore</span>
            <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  );
};

const MultiPlatformFeature = () => {
  const [activeTab, setActiveTab] = useState('linkedin');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);

  const platforms = [
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: <Linkedin size={20} />, 
      color: 'bg-[#0077b5]',
    },
    { 
      id: 'email', 
      name: 'Email', 
      icon: <Mail size={20} />, 
      color: 'bg-[#EA4335]',
    },
    { 
      id: 'twitter', 
      name: 'X', 
      icon: <Twitter size={20} />, 
      color: 'bg-black',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram size={20} />,
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <Video size={20} />,
      color: 'bg-black',
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const duration = 8000; // 8 seconds per tab for full animation
    const intervalTime = 50; 
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += intervalTime;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        setActiveTab(current => {
          const idx = platforms.findIndex(p => p.id === current);
          const nextIdx = (idx + 1) % platforms.length;
          return platforms[nextIdx].id;
        });
        elapsed = 0;
        setProgress(0);
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isAutoPlay, platforms.length]);

  const handleTabClick = (id: string) => {
    setIsAutoPlay(false);
    setActiveTab(id);
    setProgress(0);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-center h-full">
        <div className="w-14 h-14 bg-primary-blue/20 rounded-2xl flex items-center justify-center text-primary-blue mb-6 border border-primary-blue/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <Globe size={28} />
        </div>
        <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight max-w-lg">
          Orchestrate Outreach Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">Every Platform</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
          Reach your prospects wherever they are. Monoes coordinates messages across LinkedIn, Telegram, Email, Twitter, TikTok, Threads, Substack, and more—all from one interface.
        </p>
        <div className="space-y-3">
           {platforms.map((p) => (
             <button key={p.id} onClick={() => handleTabClick(p.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group text-left relative overflow-hidden ${activeTab === p.id ? 'bg-navy-800 border-white/20 shadow-xl shadow-black/50' : 'bg-navy-900/50 border-white/5 hover:bg-navy-800 hover:border-white/10'}`}>
               {activeTab === p.id && (
                 <div className="absolute bottom-0 left-0 h-[2px] bg-navy-700 w-full z-0">
                    <motion.div className="h-full bg-gradient-to-r from-primary-blue to-primary-purple z-10" style={{ width: isAutoPlay ? `${progress}%` : '100%' }} />
                 </div>
               )}
               {activeTab === p.id && <div className={`absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 blur-xl opacity-40 rounded-full ${p.color}`} />}
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform relative z-10 ${p.color} ${activeTab === p.id ? 'scale-110 shadow-lg' : 'group-hover:scale-105'}`}>{p.icon}</div>
               <div className="flex-1 relative z-10">
                 <div className={`text-sm font-bold ${activeTab === p.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{p.name}</div>
                 <div className="text-xs text-gray-500 font-medium">{activeTab === p.id ? 'Action: Drafting & Sending' : 'View Integration'}</div>
               </div>
               {activeTab === p.id && (<div className="relative z-10"><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" /></div>)}
             </button>
           ))}
        </div>
      </motion.div>
      <motion.div className="relative w-full h-[700px] flex items-center justify-center" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-blue/10 via-primary-purple/5 to-transparent blur-[100px] rounded-full" />
        <div className="relative w-full h-full max-w-xl mx-auto">
           <AnimatePresence mode="wait">
             {activeTab === 'linkedin' && <LinkedInView key="linkedin" />}
             {activeTab === 'email' && <EmailView key="email" />}
             {activeTab === 'twitter' && <TwitterView key="twitter" />}
             {activeTab === 'instagram' && <InstagramView key="instagram" />}
             {activeTab === 'tiktok' && <TikTokView key="tiktok" />}
           </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// --- ANIMATED PLATFORM VIEWS ---

const LinkedInView = () => {
    const messageText = "Hi Sarah, impressive work scaling TechFlow's marketing team! 🚀 I noticed you're prioritizing data privacy. Monoes helps CMOs automate outreach while keeping all data 100% local.";
    const { displayedText, isTyping, isSent } = useTypingSimulation(messageText);
    
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-full bg-[#1b1f23] rounded-3xl border border-gray-700 overflow-hidden flex flex-col shadow-2xl relative font-sans">
            <div className="bg-[#1b1f23] border-b border-gray-700 p-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden border-2 border-gray-600"><img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="w-full h-full object-cover" /></div>
                    <div><div className="font-bold text-white text-base">Sarah Jenkins</div><div className="text-sm text-gray-400">CMO at TechFlow • 1st</div></div>
                </div>
                <MoreHorizontal className="text-gray-400" size={24} />
            </div>
            
            <div className="flex-1 bg-[#1b1f23] p-6 flex flex-col gap-6 overflow-y-auto">
                <div className="text-center text-xs font-semibold text-gray-500 uppercase tracking-widest my-2">Today</div>
                <div className="self-start max-w-[85%]">
                    <div className="bg-[#2d3238] text-gray-200 p-4 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl text-base shadow-sm leading-relaxed">Thanks for connecting! I'd love to hear more about your local-first approach.</div>
                    <div className="text-[11px] text-gray-500 mt-1.5 ml-1 font-medium">10:23 AM</div>
                </div>

                {/* Animated Sent Message */}
                <AnimatePresence>
                    {isSent && (
                        <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="self-end max-w-[90%] origin-bottom-right">
                            <div className="bg-[#0a66c2] text-white p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-base shadow-lg leading-relaxed">
                                {messageText}
                            </div>
                            <div className="text-[11px] text-gray-400 mt-1.5 text-right mr-1 font-medium">Just now • Read</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="p-4 border-t border-gray-700 bg-[#1b1f23]">
                <div className={`bg-[#2d3238] rounded-2xl px-4 py-3 border transition-colors flex flex-col gap-2 ${isSent ? 'border-transparent' : 'border-gray-600'}`}>
                    <div className="min-h-[60px] text-sm text-gray-200 whitespace-pre-wrap">
                        {isSent ? "" : displayedText}
                        {isTyping && <span className="inline-block w-0.5 h-4 bg-primary-blue ml-0.5 animate-pulse align-middle" />}
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-4 text-gray-400">
                             <ImageIcon size={20} />
                             <Paperclip size={20} />
                             <Smile size={20} />
                        </div>
                        <motion.button 
                            animate={isSent ? { scale: [1, 0.9, 1], backgroundColor: "#2d3238", color: "#6b7280" } : { backgroundColor: "#0a66c2", color: "#ffffff" }}
                            className="px-4 py-1.5 rounded-full font-bold text-sm transition-colors"
                        >
                            {isSent ? "Sent" : "Send"}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const EmailView = () => {
    const subject = "Local-first automation for TechFlow";
    const bodyText = "Monoes solves this by running entirely on your device—no cloud, no data leaks.";
    const { displayedText, isTyping, isSent } = useTypingSimulation(bodyText);

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-full bg-white text-gray-900 rounded-3xl border border-gray-200 overflow-hidden flex flex-col shadow-2xl relative font-sans">
            {/* Header / Toast Area */}
            <div className="bg-[#f2f6fc] px-6 py-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-10 relative">
                <div className="text-base font-semibold text-gray-700">New Message</div>
                <X size={20} className="text-gray-500 cursor-pointer hover:text-gray-800" />
                
                <AnimatePresence>
                    {isSent && (
                        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2">
                            <span>Message Sent</span>
                            <div className="h-px w-px bg-transparent">Undo</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
                <span className="text-gray-500 text-sm font-medium w-10">To:</span>
                <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-sm text-gray-700 font-medium">
                    <img src="https://i.pravatar.cc/150?img=5" alt="" className="w-5 h-5 rounded-full" />Sarah Jenkins
                </span>
            </div>
            
            <div className="px-6 py-3 border-b border-gray-100">
                 <div className="text-gray-900 font-bold text-lg">{subject}</div>
            </div>

            <div className="flex-1 p-8 text-base leading-7 text-gray-800 font-sans overflow-y-auto">
                <p className="mb-6">Hi Sarah,</p>
                <p className="mb-6">I saw your recent post about the challenges of AI compliance.</p>
                
                {/* Typing Area */}
                <div className="mb-6 min-h-[80px] text-blue-800 bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm inline-block w-full">
                     {isSent ? bodyText : displayedText}
                     {isTyping && <span className="inline-block w-0.5 h-4 bg-blue-800 ml-0.5 animate-pulse align-middle" />}
                </div>

                <p className="mb-10">Best,<br/><span className="font-semibold">Alex</span></p>
                <div className="flex items-center gap-4 text-gray-500 pt-6 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center font-bold text-lg shadow-md">M</div>
                    <div className="text-sm"><div className="font-bold text-gray-800">Monoes Team</div><div>Local AI Sales Automation</div></div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2">
                    <motion.button 
                        animate={isSent ? { scale: [1, 0.95, 1], opacity: 0.5 } : {}}
                        className="bg-[#0b57d0] text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md transition-all"
                    >
                        {isSent ? "Sent" : "Send"}
                    </motion.button>
                    <div className="text-gray-400 p-2"><Paperclip size={20} /></div>
                </div>
                <div className="flex gap-4 text-gray-400"><ImageIcon size={20} /><Lock size={20} /></div>
            </div>
        </motion.div>
    );
};

const TwitterView = () => {
    const replyText = "Just read your thread on AI safety! 🛡️ We built Monoes exactly for this—100% local sales automation. Would love to show you how we handle data locally.";
    const { displayedText, isTyping, isSent } = useTypingSimulation(replyText);

    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-full bg-black text-white rounded-3xl border border-gray-800 overflow-hidden flex flex-col shadow-2xl relative font-sans">
         {/* Header */}
         <div className="px-4 py-3 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-10">
            <ArrowLeft size={20} />
            <div className="font-bold text-lg">Post</div>
            <div className="w-20 flex justify-end">
                <motion.button 
                    animate={isSent ? { opacity: 0.5 } : {}}
                    className="bg-blue-500 text-white font-bold px-4 py-1.5 rounded-full text-sm"
                >
                   {isSent ? "Posted" : "Reply"}
                </motion.button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4">
            {/* Original Tweet */}
            <div className="flex gap-3 mb-1">
               <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden"><img src="https://i.pravatar.cc/150?img=5" className="w-full h-full object-cover" alt="Sarah" /></div>
               <div className="flex-1">
                  <div className="flex items-center gap-1.5"><span className="font-bold text-white">Sarah Jenkins</span><BadgeCheck size={14} className="text-blue-400 fill-blue-400 text-black" /><span className="text-gray-500">@sarahjenkins · 2h</span></div>
                  <p className="text-gray-200 text-base mt-1 leading-normal">The future of sales isn't just AI—it's <b>private</b> AI. If your tools are leaking customer data to the cloud, you're already behind. 🛡️ <span className="text-blue-400">#PrivacyFirst #SalesTech</span></p>
               </div>
            </div>
            
            <div className="w-0.5 bg-gray-800 h-10 ml-5 my-1"></div>

            {/* Monoes Draft */}
            <div className="flex gap-3">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shrink-0">M</div>
               <div className="flex-1">
                   {/* Ghost Typing Text */}
                   <div className="text-white text-xl leading-normal min-h-[60px]">
                       {isSent ? replyText : displayedText}
                       {isTyping && <span className="inline-block w-0.5 h-5 bg-blue-500 ml-0.5 animate-pulse align-middle" />}
                   </div>
                   
                   {/* Simulated Attachment */}
                   <AnimatePresence>
                     {isSent && (
                       <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 rounded-2xl overflow-hidden border border-gray-800 relative group cursor-pointer">
                          <div className="bg-gray-900 h-48 flex items-center justify-center relative">
                              <div className="absolute inset-0 bg-primary-blue/10 animate-pulse" />
                              <div className="text-center z-10">
                                  <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-2">
                                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                     <span className="text-xs font-bold text-green-400">Local Processing</span>
                                  </div>
                                  <div className="text-xs text-gray-400 font-mono">monoes_privacy_demo.mov</div>
                              </div>
                          </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
               </div>
            </div>
         </div>
         
         {/* Footer Tools */}
         <div className="p-3 border-t border-gray-800 flex items-center gap-6 text-primary-blue pl-16">
            <ImageIcon size={20} />
            <Smile size={20} />
            <Calendar size={20} />
            <div className="ml-auto text-gray-500 text-xs flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 ${isSent ? 'border-primary-blue' : 'border-gray-700'} flex items-center justify-center text-[10px]`}>
                    {isSent ? '' : '...'}
                </div>
            </div>
         </div>
      </motion.div>
    );
};

const InstagramView = () => {
    const dmText = "Hey Sarah! 👋 Loved your story about the AI summit. We're helping creators automate DMs without getting shadowbanned. Monoes keeps it all local.";
    const { displayedText, isTyping, isSent } = useTypingSimulation(dmText);

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-full bg-black text-white rounded-3xl border border-gray-800 overflow-hidden flex flex-col shadow-2xl relative font-sans">
           {/* Header */}
           <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-black z-10">
              <div className="flex items-center gap-4">
                 <ArrowLeft size={24} />
                 <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
                        <img src="https://i.pravatar.cc/150?img=5" className="w-full h-full object-cover" alt="Sarah" />
                     </div>
                     <div>
                        <div className="font-bold text-sm flex items-center gap-1">Sarah Jenkins <BadgeCheck size={12} className="text-blue-400 fill-blue-400 text-black" /></div>
                        <div className="text-xs text-gray-500">Active now</div>
                     </div>
                 </div>
              </div>
              <div className="flex gap-4 text-white">
                 <Phone size={24} />
                 <Video size={24} />
              </div>
           </div>
    
           {/* Chat Body */}
           <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
               <div className="text-center text-xs text-gray-500 my-4">Thu 4:20 PM</div>
               
               <div className="flex gap-3 items-end">
                   <div className="w-7 h-7 rounded-full bg-gray-700 overflow-hidden mb-1"><img src="https://i.pravatar.cc/150?img=5" className="w-full h-full object-cover" alt="Sarah" /></div>
                   <div className="flex flex-col gap-1 max-w-[75%]">
                       <div className="bg-[#262626] rounded-2xl rounded-bl-none px-4 py-2 border border-gray-800">
                          <div className="text-xs text-gray-400 mb-1 border-b border-white/5 pb-1">Replying to your story</div>
                          <p className="text-sm">This AI summit looks incredible! Are you speaking?</p>
                       </div>
                   </div>
               </div>
    
                {/* Monoes Bubble Animated */}
               <div className="flex flex-col gap-1 items-end mt-4">
                   <AnimatePresence>
                     {isSent && (
                       <motion.div initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl rounded-br-none px-4 py-3 text-white shadow-lg max-w-[75%]">
                          <p className="text-sm leading-relaxed">{dmText}</p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                   {isSent && <div className="text-[10px] text-gray-500 font-medium mr-1">Seen</div>}
               </div>
           </div>
    
           {/* Footer Input */}
           <div className="p-3 bg-black flex items-center gap-3">
              <div className="bg-[#262626] rounded-full p-2.5 text-white"><Camera size={20} /></div>
              <div className="flex-1 bg-[#262626] rounded-full px-4 py-2.5 flex items-center gap-2 border border-gray-800 overflow-hidden">
                 <div className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500 whitespace-nowrap overflow-hidden">
                    {isSent ? "" : displayedText}
                    {isTyping && <span className="inline-block w-0.5 h-4 bg-white ml-0.5 animate-pulse align-middle" />}
                    {!isTyping && !isSent && !displayedText && "Message..."}
                 </div>
                 {isSent ? (
                     <div className="text-gray-500 font-bold text-xs px-2">Sent</div>
                 ) : (
                     <div className="text-blue-500 font-bold text-xs cursor-pointer hover:text-blue-400">Send</div>
                 )}
              </div>
              <div className="flex gap-3 text-white">
                  <Mic size={24} />
                  <ImageIcon size={24} />
              </div>
           </div>
        </motion.div>
    );
};

const TikTokView = () => {
    const dmText = "Yo Sarah! Saw your viral clip on AI tools. 🔥 You should try Monoes for automating your partnership outreach. It's local & safe.";
    const { displayedText, isTyping, isSent } = useTypingSimulation(dmText);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.05 }} 
            transition={{ duration: 0.3 }} 
            className="w-full h-full bg-[#121212] text-white rounded-3xl border border-[#2f2f2f] overflow-hidden flex flex-col shadow-2xl relative font-sans"
        >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#2f2f2f] flex items-center justify-between bg-[#121212] z-10">
                <div className="flex items-center gap-4">
                   <ArrowLeft size={24} className="text-white" />
                   <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-[#2f2f2f]">
                                <img src="https://i.pravatar.cc/150?img=5" className="w-full h-full object-cover" alt="Sarah" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#121212] rounded-full"></div>
                        </div>
                        <div>
                            <div className="font-semibold text-sm flex items-center gap-1">
                                Sarah Jenkins 
                                <BadgeCheck size={14} className="text-[#20D5EC] fill-[#20D5EC] text-black" />
                            </div>
                            <div className="text-xs text-gray-400">@sarahjenkins • Active now</div>
                        </div>
                   </div>
                </div>
                <div className="flex gap-4 text-white">
                     <Flag size={20} className="transform rotate-12" />
                     <MoreHorizontal size={24} />
                </div>
            </div>
    
            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                <div className="text-center text-[10px] font-medium text-gray-500 uppercase tracking-widest mt-2">Today 9:41 AM</div>
                
                {/* Received: Video Share */}
                <div className="flex flex-col gap-1 items-start max-w-[75%]">
                     <div className="flex items-end gap-2">
                         <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden flex-shrink-0 mb-1">
                             <img src="https://i.pravatar.cc/150?img=5" className="w-full h-full object-cover" alt="Sarah" />
                         </div>
                         <div className="bg-[#252525] rounded-xl overflow-hidden border border-[#333] cursor-pointer hover:border-[#444] transition-colors group/video">
                             <div className="relative w-48 aspect-[9/16] bg-gray-800">
                                 {/* Video Placeholder Gradient */}
                                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                                 {/* Play Icon */}
                                 <div className="absolute inset-0 flex items-center justify-center">
                                     <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform">
                                         <Play size={20} className="text-white fill-white ml-1" />
                                     </div>
                                 </div>
                                 {/* Video Info Overlay */}
                                 <div className="absolute bottom-3 left-3 right-3">
                                     <div className="flex items-center gap-1.5 mb-1">
                                         <div className="w-4 h-4 rounded-full bg-white/20"></div>
                                         <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">sarahjenkins</span>
                                     </div>
                                     <p className="text-xs text-white/90 line-clamp-2 leading-tight">
                                         Top 5 AI Tools you need in 2024 #ai #tech 🤖
                                     </p>
                                 </div>
                                 {/* Stats */}
                                 <div className="absolute right-2 bottom-12 flex flex-col items-center gap-1">
                                     <div className="flex flex-col items-center">
                                         <Heart size={16} className="text-white drop-shadow-md" />
                                         <span className="text-[9px] font-bold text-white">12K</span>
                                     </div>
                                 </div>
                             </div>
                             <div className="p-3 border-t border-[#333]">
                                 <p className="text-sm text-gray-200">Thought you'd like this!</p>
                             </div>
                         </div>
                     </div>
                </div>
    
                {/* Sent: Text Message */}
                <div className="flex flex-col items-end gap-1">
                    <AnimatePresence>
                        {isSent && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, y: 20 }} 
                                animate={{ opacity: 1, scale: 1, y: 0 }} 
                                className="bg-[#FE2C55] text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-sm max-w-[80%]"
                            >
                                <p className="text-sm leading-[1.4]">{dmText}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {isSent && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-[10px] text-gray-500 font-medium mr-1">
                             <span>Sent</span>
                             <Check size={10} />
                        </motion.div>
                    )}
                </div>
            </div>
    
            {/* Footer */}
            <div className="p-3 border-t border-[#2f2f2f] bg-[#121212] flex items-center gap-3">
                <div className="flex-1 bg-[#252525] rounded-full px-4 py-2.5 flex items-center gap-3 border border-transparent focus-within:border-gray-600 transition-colors">
                   <div className="flex-1 bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500 whitespace-nowrap overflow-hidden flex items-center">
                       {isSent ? "" : displayedText}
                       {isTyping && <span className="inline-block w-0.5 h-4 bg-[#FE2C55] ml-0.5 animate-pulse" />}
                       {!isTyping && !isSent && !displayedText && <span className="text-gray-500">Send a message...</span>}
                   </div>
                   {/* Actions inside input */}
                   <div className="flex items-center gap-3 text-gray-400">
                       <Smile size={20} className="hover:text-white cursor-pointer transition-colors" />
                   </div>
                </div>
                
                {/* Send Button */}
                 <motion.div 
                    animate={isSent || displayedText ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSent || displayedText ? 'bg-[#FE2C55] text-white' : 'bg-[#252525] text-gray-500'}`}
                 >
                    <SendHorizontal size={18} className={isSent ? 'translate-x-0.5' : ''} />
                 </motion.div>
            </div>
        </motion.div>
    );
};

const TypewriterEffect = ({ text }: { text: string }) => <span>{text}</span>;

// --- HUMAN BEHAVIOR FEATURE (REDESIGNED V2) ---

const HumanBehaviorFeature = () => {
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

// --- REDESIGNED ADAPTIVE SEQUENCES (BRANCHING TREE LAYOUT) ---

const TreeNode = ({ icon, label, sub, status, active }: any) => {
    let colors = {
        bg: 'bg-navy-800',
        border: 'border-white/10',
        icon: 'text-gray-400',
        iconBg: 'bg-white/5',
        text: 'text-gray-300'
    };

    if (active) {
        if (status === 'success') {
            colors = { bg: 'bg-green-500/10', border: 'border-green-500/50', icon: 'text-green-400', iconBg: 'bg-green-500/20', text: 'text-white' };
        } else if (status === 'waiting') {
            colors = { bg: 'bg-yellow-500/10', border: 'border-yellow-500/50', icon: 'text-yellow-400', iconBg: 'bg-yellow-500/20', text: 'text-white' };
        } else if (status === 'halted') {
            colors = { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: 'text-red-400', iconBg: 'bg-red-500/20', text: 'text-gray-400' };
        } else {
            colors = { bg: 'bg-blue-500/10', border: 'border-blue-500/50', icon: 'text-blue-400', iconBg: 'bg-blue-500/20', text: 'text-white' };
        }
    }

    return (
        <motion.div 
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: active ? 1 : 0.95, opacity: active ? 1 : 0.6 }}
            className={`flex items-center gap-3 p-3 rounded-xl border ${colors.bg} ${colors.border} backdrop-blur-md transition-all duration-500 w-48 relative z-20 shadow-lg`}
        >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors.iconBg} ${colors.icon}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-xs font-bold ${colors.text} truncate`}>{label}</div>
                <div className="text-[10px] text-gray-500 truncate">{sub}</div>
            </div>
            {active && status === 'success' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />}
        </motion.div>
    );
};

const AdaptiveSequencesFeature = () => {
  const [stage, setStage] = useState(0); // 0: Idle, 1: Sent, 2: Wait, 3: Reply Detected (Branch), 4: Stop
  
  useEffect(() => {
     const loop = async () => {
         while(true) {
             setStage(0); await new Promise(r => setTimeout(r, 1000));
             setStage(1); await new Promise(r => setTimeout(r, 1500));
             setStage(2); await new Promise(r => setTimeout(r, 2000));
             setStage(3); await new Promise(r => setTimeout(r, 1500)); // Show Branch
             setStage(4); await new Promise(r => setTimeout(r, 4000)); // Show Stop & Halt Right side
         }
     };
     loop();
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-navy-950">
       <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />
       
       <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10 max-w-7xl mx-auto px-4">
          
          {/* Text Content */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
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
         </motion.div>

         {/* Visual: Branching Tree Diagram */}
         <div className="relative h-[600px] w-full">
            <div className="absolute inset-0 bg-navy-900/50 rounded-3xl border border-white/5 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/5 bg-navy-950/50 flex items-center px-4 justify-between">
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/30" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                        <div className="w-2 h-2 rounded-full bg-green-500/30" />
                    </div>
                    <div className="text-[10px] font-mono text-gray-600">FLOW_VISUALIZER_V1</div>
                </div>

                {/* Tree Layout */}
                <div className="absolute inset-0 pt-16 flex flex-col items-center">
                    
                    {/* Level 1: Trigger */}
                    <div className="relative z-20">
                        <TreeNode icon={<Zap size={16} />} label="New Lead" sub="Source: LinkedIn" active={true} />
                    </div>
                    
                    {/* Connection 1 */}
                    <div className="h-10 w-[2px] bg-white/5 relative z-10 overflow-hidden">
                        <motion.div 
                           className="absolute top-0 left-0 w-full bg-blue-500" 
                           initial={{ height: 0 }}
                           animate={{ height: stage >= 1 ? '100%' : 0 }}
                           transition={{ duration: 0.5 }}
                        />
                    </div>

                    {/* Level 2: Email */}
                    <div className="relative z-20">
                        <TreeNode icon={<Mail size={16} />} label="Intro Email" sub="Template: Cold v1" active={stage >= 1} />
                    </div>

                    {/* Connection 2 */}
                    <div className="h-10 w-[2px] bg-white/5 relative z-10 overflow-hidden">
                        <motion.div 
                           className="absolute top-0 left-0 w-full bg-blue-500" 
                           initial={{ height: 0 }}
                           animate={{ height: stage >= 2 ? '100%' : 0 }}
                           transition={{ duration: 0.5 }}
                        />
                    </div>

                    {/* Level 3: Wait */}
                    <div className="relative z-20">
                         <div className={`px-4 py-1.5 rounded-full border text-xs font-mono flex items-center gap-2 transition-all duration-300 ${stage >= 2 ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' : 'border-white/10 text-gray-600 bg-navy-950'}`}>
                             <Clock size={12} className={stage === 2 ? "animate-spin" : ""} />
                             Wait 2 Days
                         </div>
                    </div>

                    {/* BRANCHING SECTION */}
                    <div className="relative w-full h-40 mt-0">
                        {/* Center vertical line stub */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-white/5 overflow-hidden">
                            <motion.div 
                               className="absolute top-0 left-0 w-full bg-blue-500" 
                               initial={{ height: 0 }}
                               animate={{ height: stage >= 3 ? '100%' : 0 }}
                               transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Branch Lines SVG */}
                        <svg className="absolute top-8 left-0 w-full h-16 pointer-events-none z-0" preserveAspectRatio="none">
                            {/* Left Path (Success) */}
                            <path d="M 50% 0 Q 50% 15, 25% 15 L 25% 60" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                            <motion.path 
                                d="M 50% 0 Q 50% 15, 25% 15 L 25% 60" 
                                stroke="#22c55e" 
                                strokeWidth="2" 
                                fill="none" 
                                vectorEffect="non-scaling-stroke"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: stage >= 3 ? 1 : 0 }}
                                transition={{ duration: 0.8 }}
                            />

                            {/* Right Path (Failure/Continue) */}
                            <path d="M 50% 0 Q 50% 15, 75% 15 L 75% 60" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                            {/* Only animate if NOT halted */}
                            <motion.path 
                                d="M 50% 0 Q 50% 15, 75% 15 L 75% 60" 
                                stroke={stage === 4 ? "#ef4444" : "#3b82f6"} 
                                strokeWidth="2" 
                                fill="none" 
                                vectorEffect="non-scaling-stroke"
                                strokeDasharray={stage === 4 ? "4 4" : "0 0"}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: (stage >= 3 && stage < 4) ? 1 : 0 }} // Fades out or breaks when stage 4 hits
                                transition={{ duration: 0.5 }}
                            />
                        </svg>

                        {/* Nodes Container */}
                        <div className="absolute top-16 w-full flex justify-between px-4 sm:px-12 md:px-20">
                             {/* Left Node (Reply) */}
                             <div className="flex flex-col items-center w-1/2 relative">
                                <TreeNode 
                                   icon={<MessageCircle size={16} />} 
                                   label="Reply Detected" 
                                   sub='"Sounds great!"' 
                                   active={stage >= 3} 
                                   status="success" 
                                />
                                {stage >= 4 && (
                                   <motion.div 
                                      initial={{ opacity: 0, y: 10 }} 
                                      animate={{ opacity: 1, y: 0 }}
                                      className="mt-4 px-3 py-1.5 bg-green-500 text-white text-[10px] font-bold rounded-full shadow-lg flex items-center gap-1"
                                   >
                                      <StopCircle size={10} /> STOP SEQUENCE
                                   </motion.div>
                                )}
                             </div>

                             {/* Right Node (Follow Up) */}
                             <div className="flex flex-col items-center w-1/2 relative">
                                <div className="relative">
                                    <TreeNode 
                                       icon={<Repeat size={16} />} 
                                       label="Follow Up 1" 
                                       sub="Scheduled" 
                                       active={stage >= 3 && stage < 4} // Only active before stop
                                       status={stage >= 4 ? 'halted' : 'pending'}
                                    />
                                    {/* Halt Overlay */}
                                    {stage >= 4 && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute inset-0 bg-navy-950/80 backdrop-blur-[1px] rounded-xl flex items-center justify-center z-30 border border-red-500/30"
                                        >
                                            <div className="flex items-center gap-1 text-red-400 font-bold text-xs uppercase tracking-wider">
                                                <Ban size={14} /> Halted
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
         </div>
       </div>
    </section>
  );
};

const CRMSyncFeature = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold mb-6">
                    <RefreshCcw size={14} className="animate-spin-slow" /> 
                    <span>REAL-TIME 2-WAY SYNC</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                    Syncs with Your Stack. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Instantly.</span>
                </h2>
                <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                    Keep your pipeline pristine. Every reply, meeting booked, and lead status change is pushed to your CRM in milliseconds.
                </p>

                {/* Integration Grid Visual */}
                <div className="relative h-64 md:h-80 max-w-4xl mx-auto flex items-center justify-center">
                    {/* Center Hub */}
                    <div className="relative z-20 w-32 h-32 rounded-full bg-navy-900 border-4 border-white/5 flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.05)]">
                        <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
                        <Monkey variant="filled" size="lg" />
                    </div>

                    {/* Satellites */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                           key={i}
                           className="absolute w-16 h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-lg"
                           initial={{ opacity: 0, scale: 0 }}
                           whileInView={{ opacity: 1, scale: 1, x: Math.cos(i * 1.25) * 180, y: Math.sin(i * 1.25) * 100 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1, type: "spring" }}
                        >
                            {[<Database size={24} className="text-orange-500" />, <Layout size={24} className="text-blue-500" />, <MessageSquare size={24} className="text-green-500" />, <Mail size={24} className="text-red-500" />, <Calendar size={24} className="text-purple-500" />][i]}
                            
                            {/* Connection Beam */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                               <motion.div 
                                  className="w-32 h-[1px] bg-gradient-to-r from-white/20 to-transparent absolute left-1/2 top-1/2 -z-10 origin-left"
                                  style={{ transform: `rotate(${Math.atan2(-Math.sin(i * 1.25) * 100, -Math.cos(i * 1.25) * 180)}rad)` }}
                               />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WorkflowBuilderFeature = () => {
    return (
        <section className="bg-navy-900 border-y border-white/5 py-32">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                   <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20">
                       <Command size={32} />
                   </div>
                   <h2 className="text-4xl font-bold text-white mb-6">Visual Workflow Builder</h2>
                   <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                       Drag, drop, and automate. Create complex multi-step sequences with branching logic, A/B testing, and conditional delays.
                   </p>
                   <div className="space-y-4">
                       {['Drag-and-drop interface', 'Conditional logic branches', 'A/B testing built-in'].map((item, i) => (
                           <div key={i} className="flex items-center gap-3 text-gray-300">
                               <CheckCircle2 size={18} className="text-blue-500" />
                               <span>{item}</span>
                           </div>
                       ))}
                   </div>
                </div>

                {/* Mockup */}
                <div className="bg-navy-950 rounded-2xl border border-white/10 p-2 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                    <div className="bg-navy-900/50 rounded-xl p-6 h-[400px] relative">
                         {/* Fake nodes */}
                         <div className="absolute top-10 left-10 bg-navy-800 border border-blue-500/50 p-4 rounded-xl w-48 shadow-lg">
                             <div className="text-xs text-blue-400 font-bold mb-1">TRIGGER</div>
                             <div className="text-sm text-white">New Lead Added</div>
                         </div>
                         <div className="absolute top-10 right-10 bg-navy-800 border border-white/10 p-4 rounded-xl w-48 shadow-lg">
                             <div className="text-xs text-gray-400 font-bold mb-1">ACTION</div>
                             <div className="text-sm text-white">Enrich Data</div>
                         </div>
                         
                         {/* Connecting Bezier */}
                         <svg className="absolute inset-0 pointer-events-none">
                             <path d="M 180 50 C 250 50, 250 50, 320 50" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                         </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PrivacyFeature = () => {
    return (
        <section className="py-32">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center text-green-500 mb-8 mx-auto border border-green-500/20">
                    <ShieldCheck size={40} />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Military-Grade Local Privacy</h2>
                <p className="text-gray-400 text-xl mb-12">
                   Your data never leaves your device. We use a local-first architecture that processes everything on your machine. No cloud uploads, no data leaks.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: 'Local SQLite DB', desc: 'Encrypted at rest on your SSD', icon: <Database /> },
                        { title: 'No Cloud Relay', desc: 'Direct connection to platforms', icon: <Wifi /> },
                        { title: 'Zero Retention', desc: 'We never see your leads', icon: <FileText /> }
                    ].map((item, i) => (
                        <div key={i} className="bg-navy-900 border border-white/5 p-6 rounded-2xl hover:bg-navy-800 transition-colors text-left">
                            <div className="text-green-500 mb-4">{item.icon}</div>
                            <h3 className="font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AnalyticsFeature = () => {
    return (
        <section className="py-32 bg-navy-900/50">
             <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                 {/* Visual */}
                 <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
                     <div className="bg-navy-800 p-6 rounded-2xl border border-white/5 col-span-2">
                         <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Total Revenue</div>
                         <div className="text-3xl font-bold text-white mb-4">$142,392.00</div>
                         <div className="h-16 flex items-end gap-1">
                             {[40, 60, 45, 70, 85, 60, 75, 90, 65, 80].map((h, i) => (
                                 <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-primary-blue/20 rounded-t-sm hover:bg-primary-blue transition-colors" />
                             ))}
                         </div>
                     </div>
                     <div className="bg-navy-800 p-6 rounded-2xl border border-white/5">
                         <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Reply Rate</div>
                         <div className="text-2xl font-bold text-green-400">12.4%</div>
                     </div>
                     <div className="bg-navy-800 p-6 rounded-2xl border border-white/5">
                         <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Meetings</div>
                         <div className="text-2xl font-bold text-white">48</div>
                     </div>
                 </div>

                 <div className="order-1 lg:order-2">
                     <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6 border border-purple-500/20">
                         <BarChart3 size={32} />
                     </div>
                     <h2 className="text-4xl font-bold text-white mb-6">Deep Analytics</h2>
                     <p className="text-gray-400 text-lg mb-8">
                         Understand what's working. Track open rates, reply rates, and positive sentiment analysis across all your campaigns in one unified dashboard.
                     </p>
                 </div>
             </div>
        </section>
    );
};

const IntegrationShowcase = () => (
   <div className="py-20 border-t border-white/5">
      <div className="text-center text-gray-500 text-sm font-bold uppercase tracking-widest mb-8">Integrated with your favorite tools</div>
      <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
         <div className="flex items-center gap-2 text-white font-bold text-xl"><Linkedin size={24} /> LinkedIn</div>
         <div className="flex items-center gap-2 text-white font-bold text-xl"><Mail size={24} /> Gmail</div>
         <div className="flex items-center gap-2 text-white font-bold text-xl"><Twitter size={24} /> X (Twitter)</div>
         <div className="flex items-center gap-2 text-white font-bold text-xl"><MessageSquare size={24} /> WhatsApp</div>
         <div className="flex items-center gap-2 text-white font-bold text-xl"><Database size={24} /> HubSpot</div>
      </div>
   </div>
);

const ComparisonTable = () => (
   <section className="py-20 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-12">Why Monoes?</h2>
      <div className="overflow-x-auto">
         <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
               <tr className="border-b border-white/10">
                  <th className="p-4 text-gray-400 font-normal w-1/3">Feature</th>
                  <th className="p-4 text-white font-bold bg-white/5 rounded-t-xl w-1/3">Monoes (Local)</th>
                  <th className="p-4 text-gray-500 font-normal w-1/3">Cloud Tools</th>
               </tr>
            </thead>
            <tbody className="text-sm">
               <tr className="border-b border-white/5">
                  <td className="p-4 text-gray-300">Data Privacy</td>
                  <td className="p-4 text-green-400 font-bold bg-white/5">100% Local Device</td>
                  <td className="p-4 text-red-400">Shared Cloud Server</td>
               </tr>
               <tr className="border-b border-white/5">
                  <td className="p-4 text-gray-300">Ban Risk</td>
                  <td className="p-4 text-green-400 font-bold bg-white/5">Near Zero (Human Engine)</td>
                  <td className="p-4 text-red-400">High (API Detection)</td>
               </tr>
               <tr className="border-b border-white/5">
                  <td className="p-4 text-gray-300">Platform Support</td>
                  <td className="p-4 text-green-400 font-bold bg-white/5">Any Web Platform</td>
                  <td className="p-4 text-gray-500">API Only</td>
               </tr>
               <tr>
                  <td className="p-4 text-gray-300">Cost</td>
                  <td className="p-4 text-green-400 font-bold bg-white/5 rounded-b-xl">Flat License</td>
                  <td className="p-4 text-gray-500">Per User / Per Lead</td>
               </tr>
            </tbody>
         </table>
      </div>
   </section>
);

const FeaturesCTA = () => (
   <section className="text-center py-24 px-4 bg-gradient-to-b from-transparent to-primary-blue/10 rounded-3xl border border-white/5 mx-4 md:mx-auto max-w-5xl mb-24">
      <div className="inline-block p-4 rounded-full bg-primary-blue/20 mb-6">
          <Rocket size={32} className="text-primary-blue" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Scale?</h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">Join thousands of sales teams running on local power. No credit card required.</p>
      <button className="bg-primary-blue hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-colors shadow-lg shadow-blue-500/30 text-lg">
         Get Started for Free
      </button>
   </section>
);
