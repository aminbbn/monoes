import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, Variants } from 'framer-motion';
import { Monkey } from './Monkey';
import { Play, ArrowDown, Activity, Users, MessageCircle, CheckCircle2, Search, Mail, Shield, Zap, BarChart3, Calendar, Loader2, Send, TrendingUp, User } from 'lucide-react';
import LightRays from './LightRays';

const smoothEase: [number, number, number, number] = [0.23, 1, 0.32, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: smoothEase }
  },
};

const sideSlideVariants = (direction: 'left' | 'right'): Variants => ({
  hidden: { opacity: 0, x: direction === 'left' ? -60 : 60, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { duration: 1.4, ease: smoothEase, delay: 0.4 }
  },
});

// Improved Organic Floater with randomized phases
const OrganicFloater = ({ children, delay = 0, intensity = 1 }: { children?: React.ReactNode, delay?: number, intensity?: number }) => {
  const randomDurationY = useMemo(() => 5 + Math.random() * 2, []);
  const randomDurationRot = useMemo(() => 7 + Math.random() * 3, []);
  
  return (
    <motion.div
      animate={{
        y: [0, -20 * intensity, 0],
        rotateZ: [0, 2 * intensity, -2 * intensity, 0],
        x: [0, 5 * intensity, -5 * intensity, 0]
      }}
      transition={{
        y: {
          duration: randomDurationY,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        },
        rotateZ: {
          duration: randomDurationRot,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 1
        },
        x: {
            duration: randomDurationRot * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.5
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// --- Message Types & Data ---

type MessageType = 'scanning' | 'found' | 'chart' | 'email' | 'meeting' | 'success';

interface MonkeyMessage {
  type: MessageType;
  title: string;
  subtitle?: string;
  data?: any;
  icon?: React.ReactNode;
  color?: string;
}

const leftMessages: MonkeyMessage[] = [
  { 
    type: 'scanning', 
    title: 'Scanning...', 
    subtitle: 'Looking for VPs', 
    icon: <Loader2 size={12} className="animate-spin" />,
    color: 'border-blue-500/30 bg-blue-500/10'
  },
  { 
    type: 'found', 
    title: 'Lead Found! 🎯', 
    subtitle: 'Sarah J. (CMO)', 
    icon: <User size={12} />,
    color: 'border-green-500/30 bg-green-500/10'
  },
  { 
    type: 'chart', 
    title: 'Match Score', 
    subtitle: '98% Fit', 
    data: [30, 50, 45, 70, 90], 
    icon: <Activity size={12} />,
    color: 'border-purple-500/30 bg-purple-500/10'
  },
  {
    type: 'scanning',
    title: 'Parsing Data',
    subtitle: 'LinkedIn & Web',
    icon: <Search size={12} />,
    color: 'border-indigo-500/30 bg-indigo-500/10'
  }
];

const rightMessages: MonkeyMessage[] = [
  { 
    type: 'email', 
    title: 'Email Sent 📨', 
    subtitle: 'Sequence #1', 
    icon: <Send size={12} />,
    color: 'border-blue-500/30 bg-blue-500/10'
  },
  { 
    type: 'meeting', 
    title: 'Meeting Booked', 
    subtitle: 'Tue 2:00 PM', 
    icon: <Calendar size={12} />,
    color: 'border-orange-500/30 bg-orange-500/10'
  },
  { 
    type: 'chart', 
    title: 'Reply Rate', 
    subtitle: '+15% This Week', 
    data: [20, 35, 40, 60, 75], 
    icon: <TrendingUp size={12} />,
    color: 'border-green-500/30 bg-green-500/10'
  },
  { 
    type: 'success', 
    title: 'CRM Updated', 
    subtitle: 'HubSpot Synced', 
    icon: <CheckCircle2 size={12} />,
    color: 'border-teal-500/30 bg-teal-500/10'
  }
];

// --- Mini Visual Components ---

const MiniChart = ({ data }: { data: number[] }) => (
  <div className="flex items-end space-x-1 h-6 mt-2 w-full justify-between px-1">
    {data.map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="w-1.5 bg-current opacity-80 rounded-t-sm"
      />
    ))}
  </div>
);

const MiniProfile = () => (
  <div className="flex items-center space-x-2 mt-2 bg-white/5 p-1.5 rounded-lg">
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-[8px] font-bold text-white">
      SJ
    </div>
    <div className="flex flex-col space-y-1">
      <div className="h-1.5 w-12 bg-white/40 rounded-full" />
      <div className="h-1 w-8 bg-white/20 rounded-full" />
    </div>
  </div>
);

const MiniProgress = () => (
  <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
    <motion.div 
      className="h-full bg-current"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
    />
  </div>
);

// New Component: Monkey with Status Bubble
const HeroMonkey = ({ 
  side, 
  variant = "3d", 
  delay = 0 
}: { 
  side: 'left' | 'right', 
  variant?: "3d" | "filled" | "outline", 
  delay?: number 
}) => {
  const [currentMessage, setCurrentMessage] = useState<MonkeyMessage | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messages = side === 'left' ? leftMessages : rightMessages;

  useEffect(() => {
    const cleanup = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    cleanup();

    const scheduleNext = () => {
      const waitTime = Math.random() * 3000 + 3000;
      
      timerRef.current = setTimeout(() => {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        setCurrentMessage(msg);
        setIsVisible(true);
        
        timerRef.current = setTimeout(() => {
          setIsVisible(false);
          scheduleNext();
        }, 4000); // slightly longer display time
      }, waitTime);
    };

    timerRef.current = setTimeout(scheduleNext, 2500 + delay * 1000);

    return cleanup;
  }, [messages, delay]);

  return (
    <div className={`absolute -top-32 ${side === 'left' ? '-right-10' : '-left-10'} z-20`}>
      <OrganicFloater delay={delay} intensity={1.2}>
        <div className="relative">
           {/* Glow Effect behind Monkey */}
           <div className="absolute inset-0 bg-primary-blue/20 blur-3xl rounded-full scale-150 animate-pulse-slow" />
           
           <Monkey variant={variant} size="xl" className="scale-125 md:scale-150 drop-shadow-2xl" animate={false} mirror={side === 'left'} />
           
           {/* Status Bubble */}
           <AnimatePresence mode="wait">
             {isVisible && currentMessage && (
               <motion.div
                 key={currentMessage.title}
                 initial={{ opacity: 0, scale: 0.8, y: 15, x: side === 'left' ? -20 : 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                 exit={{ opacity: 0, scale: 0.8, y: -10 }}
                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
                 className={`absolute -top-24 ${side === 'left' ? '-left-32' : '-right-32'} w-32 
                   backdrop-blur-xl border ${currentMessage.color || 'border-white/20 bg-navy-800/80'} 
                   text-white p-3 rounded-2xl shadow-2xl z-50`}
               >
                 {/* Header */}
                 <div className="flex items-center space-x-2 mb-1">
                   <div className={`p-1 rounded-full ${currentMessage.type === 'scanning' ? '' : 'bg-white/10'}`}>
                     {currentMessage.icon}
                   </div>
                   <span className="text-xs font-bold leading-tight">{currentMessage.title}</span>
                 </div>
                 
                 {/* Subtext */}
                 {currentMessage.subtitle && (
                    <div className="text-[10px] text-white/70 pl-1">{currentMessage.subtitle}</div>
                 )}

                 {/* Visual Payload */}
                 <div className="text-primary-blue">
                    {currentMessage.type === 'chart' && <MiniChart data={currentMessage.data} />}
                    {currentMessage.type === 'found' && <MiniProfile />}
                    {currentMessage.type === 'scanning' && <MiniProgress />}
                 </div>

                 {/* Little triangle arrow */}
                 <div 
                    className={`absolute bottom-[-6px] ${side === 'left' ? 'right-6' : 'left-6'} 
                    w-3 h-3 border-r border-b ${currentMessage.color?.split(' ')[0] || 'border-white/20'} 
                    ${currentMessage.color?.split(' ')[1] || 'bg-navy-800/80'} 
                    transform rotate-45 backdrop-blur-xl`} 
                 />
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </OrganicFloater>
    </div>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for parallax with reduced damping for crisper movement
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXPct = (e.clientX - rect.left) / width - 0.5;
      const mouseYPct = (e.clientY - rect.top) / height - 0.5;
      mouseX.set(mouseXPct);
      mouseY.set(mouseYPct);
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex items-center justify-center pt-28 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-navy-900 perspective-1000"
      style={{ perspective: '1000px' }}
    >
      
      {/* Light Rays Background Effect - Optimized */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-70">
        <LightRays
          raysColor="#818cf8"
          raysSpeed={0.15}
          lightSpread={0.4}
          rayLength={0.7}
          raysOrigin="top-center"
          pulsating={true}
          mouseInfluence={0.2}
        />
      </div>

      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Ambient Orbs - Slowed down animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary-purple/10 rounded-full blur-[80px] md:blur-[100px] mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{ 
            opacity: { duration: 1.5 },
            default: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
        />
        <motion.div 
          className="absolute top-[20%] -right-[10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-primary-blue/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, -60, 40, 0],
            y: [0, 50, -40, 0],
          }}
          transition={{ 
            opacity: { duration: 1.5, delay: 0.2 },
            default: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
        />
      </div>

      <motion.div 
        className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full"
        initial="hidden"
        animate="visible"
      >
        
        {/* Left: Lead Generation Visual */}
        <motion.div 
          className="hidden lg:flex col-span-3 flex-col items-center lg:items-center justify-center perspective-element"
          style={{ rotateX, rotateY, z: 50 }}
          variants={sideSlideVariants('left')}
        >
          <div className="relative group">
            {/* Elevated Hero Monkey */}
            <HeroMonkey side="left" variant="3d" delay={0.2} />
            
            {/* Lead Stack Card Visual */}
            <div className="relative z-10 w-72 mt-8">
               <LeadStack />
            </div>

            {/* Connecting Line Start */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 100, opacity: 1 }}
              transition={{ delay: 1.8, duration: 1, ease: smoothEase }}
              className="absolute top-1/2 right-[-100px] h-[2px] bg-gradient-to-r from-primary-purple/50 to-transparent hidden xl:block"
            >
              <motion.div 
                className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
                animate={{ x: [0, 100], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Center: Main Copy */}
        <motion.div 
          className="col-span-1 lg:col-span-6 text-center relative z-20"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-primary-blue text-xs font-semibold mb-6 md:mb-8 backdrop-blur-md shadow-lg hover:bg-white/10 transition-colors cursor-default select-none">
              <Shield size={12} className="mr-1.5" />
              100% Local. 100% Private. 0% Cloud.
            </span>
          </motion.div>

          <motion.h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 tracking-tight"
            variants={itemVariants}
          >
            <span className="block whitespace-nowrap">Stop Chasing Leads.</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple via-primary-pink to-primary-blue bg-[length:200%_auto] animate-gradient-x text-glow pb-2 inline-block whitespace-nowrap">
              Let Our Monkeys Do It.
            </span>
          </motion.h1>

          <motion.p 
            className="text-base md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
            variants={itemVariants}
          >
            Your local AI sales team that handles outreach, follow-ups, and CRM—privately and powerfully on your own device.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4"
            variants={itemVariants}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-purple to-primary-blue rounded-full text-white font-bold text-lg relative group overflow-hidden shadow-2xl shadow-primary-purple/30 ring-1 ring-white/20"
            >
              <span className="relative z-10 flex items-center justify-center">
                Start Free Trial
              </span>
              <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-medium border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <Play size={18} className="mr-2 fill-current" />
              Book a Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right: CRM/Analytics Visual */}
        <motion.div 
          className="hidden lg:flex col-span-3 flex-col items-center lg:items-center justify-center perspective-element"
          style={{ rotateX, rotateY, z: 50 }}
          variants={sideSlideVariants('right')}
        >
           <div className="relative group w-full flex flex-col items-center">
            {/* Elevated Hero Monkey */}
            <HeroMonkey side="right" variant="3d" delay={1.2} />

            <div className="relative z-10 w-72 mt-8">
               <AnalyticsPanel />
            </div>
            
            {/* Connecting Line End */}
            <motion.div 
               initial={{ width: 0, opacity: 0 }}
               animate={{ width: 60, opacity: 1 }}
               transition={{ delay: 1.8, duration: 1, ease: smoothEase }}
               className="absolute top-1/2 left-[-60px] h-[2px] bg-gradient-to-r from-transparent to-primary-blue/50 hidden xl:block" 
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Notifications - Only on Medium+ screens to prevent mobile obstruction */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <LiveNotification text="New Lead: CMO at TechCorp" icon={<Search size={14} />} top="75%" left="10%" delay={2} />
        <LiveNotification text="Meeting Booked: Tomorrow 2pm" icon={<Users size={14} />} top="20%" left="85%" delay={5} />
        <LiveNotification text="Email Sequence Completed" icon={<Mail size={14} />} top="85%" left="75%" delay={8} />
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 md:bottom-8 left-1/2 flex flex-col items-center text-gray-500 text-xs tracking-widest uppercase"
        style={{ translateX: "-50%" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 2, duration: 1 },
          y: { duration: 2, repeat: Infinity, delay: 2 } 
        }}
      >
        <span className="mb-2">Scroll to explore</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
};

// --- Sub-Components ---

const LeadStack = () => {
  const [currentProfile, setCurrentProfile] = useState(0);
  
  const profiles = [
    { name: "Sarah J.", role: "CMO", company: "TechFlow", match: 98, status: "Active on LinkedIn", color: "bg-pink-500" },
    { name: "Mike R.", role: "VP Sales", company: "Growth.io", match: 94, status: "Recently Posted", color: "bg-blue-500" },
    { name: "Jessica T.", role: "Founder", company: "StartUp", match: 96, status: "Verified Email", color: "bg-purple-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % profiles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const profile = profiles[currentProfile];

  return (
    <div className="relative h-48 w-full">
       {/* Background cards pulsing */}
       <motion.div 
         className="absolute top-4 left-4 w-full h-full bg-navy-800 border border-white/5 rounded-xl opacity-40 z-0"
         animate={{ scale: [0.95, 1, 0.95], rotate: [0, -2, 0] }}
         transition={{ duration: 4, repeat: Infinity }}
       />
       <motion.div 
         className="absolute top-2 left-2 w-full h-full bg-navy-800 border border-white/5 rounded-xl opacity-70 z-0"
         animate={{ scale: [0.98, 1.02, 0.98], rotate: [0, 1, 0] }}
         transition={{ duration: 3, repeat: Infinity, delay: 1 }}
       />

       <AnimatePresence mode="wait">
        <motion.div 
          key={currentProfile}
          className="absolute inset-0 bg-navy-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl z-10 flex flex-col justify-between"
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
           {/* Header */}
           <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                 <div className={`w-10 h-10 rounded-full ${profile.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                    {profile.name.charAt(0)}
                 </div>
                 <div>
                    <div className="h-2.5 w-24 bg-white/20 rounded-full mb-1.5" />
                    <div className="h-2 w-16 bg-white/10 rounded-full" />
                 </div>
              </div>
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.2, type: "spring" }}
                className="text-green-400 bg-green-400/10 p-1 rounded-full"
              >
                <CheckCircle2 size={16} />
              </motion.div>
           </div>

           {/* Stats */}
           <div className="space-y-3 mt-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                 <div className="flex items-center space-x-2">
                    <Search size={14} className="text-primary-blue" />
                    <span>Match Score</span>
                 </div>
                 <span className="text-white font-mono font-bold">{profile.match}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-primary-blue" 
                   initial={{ width: 0 }}
                   animate={{ width: `${profile.match}%` }}
                   transition={{ duration: 1, delay: 0.2 }}
                 />
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                 <Activity size={14} className="text-primary-purple" />
                 <span>{profile.status}</span>
              </div>
           </div>

           {/* Scanning bar */}
           <motion.div 
             className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-blue to-transparent opacity-50"
             animate={{ top: ["0%", "100%", "0%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           />
        </motion.div>
       </AnimatePresence>
    </div>
  );
};

const AnalyticsPanel = () => {
    const [data, setData] = useState({ meetings: 12, replies: 48, growth: 24 });
    const bars = [40, 65, 45, 80, 55, 90, 75];

    useEffect(() => {
        const interval = setInterval(() => {
            if(Math.random() > 0.6) {
                setData(prev => ({
                    ...prev,
                    replies: prev.replies + 1,
                    growth: prev.growth + 0.1
                }));
            }
            if(Math.random() > 0.85) {
                setData(prev => ({
                    ...prev,
                    meetings: prev.meetings + 1
                }));
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div 
          className="bg-navy-800/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl w-full"
          initial={{ opacity: 0, y: 30, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 1.4, duration: 1, ease: smoothEase }}
        >
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <h3 className="text-white text-sm font-bold flex items-center">
              <Activity size={14} className="mr-2 text-primary-blue" />
              Performance
            </h3>
            <span className="text-xs text-green-400 font-mono font-bold">+{data.growth.toFixed(1)}%</span>
          </div>

          <div className="h-24 w-full flex items-end justify-between space-x-1 mb-4 relative overflow-hidden">
             {bars.map((h, i) => (
               <motion.div 
                 key={i}
                 className="w-full bg-gradient-to-t from-primary-blue/30 to-primary-blue rounded-t-sm backdrop-blur-sm"
                 initial={{ height: 0 }}
                 animate={{ 
                    height: [`${h}%`, `${h + (Math.random() * 20 - 10)}%`, `${h}%`],
                    opacity: [0.8, 1, 0.8]
                 }}
                 transition={{ 
                    height: { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 1.5, repeat: Infinity, ease: "linear" },
                    delay: i * 0.1 
                 }}
               />
             ))}
          </div>

          <div className="space-y-2">
            <MetricRow label="Meetings Booked" value={data.meetings} />
            <MetricRow label="Replies" value={data.replies} />
          </div>
        </motion.div>
    );
};

const MetricRow = ({ label, value }: { label: string, value: number }) => (
    <div className="flex items-center justify-between text-xs bg-white/5 p-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
       <span className="text-gray-300">{label}</span>
       <motion.span 
         key={value}
         initial={{ scale: 1.2, color: "#6366f1" }}
         animate={{ scale: 1, color: "#ffffff" }}
         className="font-bold"
       >
         {value}
       </motion.span>
    </div>
);

const LiveNotification = ({ text, icon, top, left, delay }: { text: string, icon: React.ReactNode, top: string, left: string, delay: number }) => (
  <motion.div
    className="absolute flex items-center space-x-2 bg-navy-800/90 backdrop-blur-md border border-white/10 px-4 py-3 rounded-lg shadow-xl z-0"
    style={{ top, left }}
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.9], y: 0 }}
    transition={{ 
      duration: 5, 
      delay: delay,
      repeat: Infinity,
      repeatDelay: 8
    }}
  >
    <div className="p-1.5 bg-primary-purple/20 rounded-full text-primary-purple">
      {icon}
    </div>
    <span className="text-xs font-medium text-gray-200 whitespace-nowrap">{text}</span>
  </motion.div>
);