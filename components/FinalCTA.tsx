import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Monkey } from './Monkey';
import { Check, ArrowRight, Zap } from 'lucide-react';

const MagneticButton = ({ children }: { children?: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const center = { x: left + width / 2, y: top + height / 2 };
    x.set((clientX - center.x) * 0.3);
    y.set((clientY - center.y) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const FloatingMonkey = ({ variant, size, delay, x, y, rotate, isCenter }: any) => {
  return (
    <motion.div
      className="absolute top-0 left-1/2"
      initial={{ x: 0, y: 100, opacity: 0, scale: 0.5, rotate: 0 }}
      whileInView={{ 
        x, 
        y, 
        opacity: 1, 
        scale: 1, 
        rotate 
      }}
      transition={{ 
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay 
      }}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() }}
        className="relative text-white"
      >
        <Monkey variant={variant} size={size} />
        {isCenter && (
          <motion.div 
             className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl"
             animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
          >
            🎉
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const LiveTicker = () => {
  const [count, setCount] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-xs font-mono text-gray-300">
      <span className="text-white font-bold">{count} teams</span> joined in the last hour
    </span>
  );
};

const ConfettiCanvas = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const colors = ['#6366f1', '#ec4899', '#3b82f6', '#ffffff'];
    const particles: any[] = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: width / 2,
        y: height / 2 + 100,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 1) * 20 - 5,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        friction: 0.96,
        gravity: 0.4
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      let activeParticles = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.rotation += p.rotationSpeed;

        if (p.y < height && p.size > 0.1) {
          activeParticles = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (activeParticles) {
        requestAnimationFrame(animate);
      }
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    requestAnimationFrame(animate);

    return () => window.removeEventListener('resize', handleResize);
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

export const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  return (
    <section ref={containerRef} className="py-24 md:py-48 relative overflow-hidden bg-navy-950 flex flex-col items-center justify-center min-h-[600px] md:min-h-[800px]">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-navy-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-primary-blue/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      {/* Confetti Canvas */}
      <ConfettiCanvas active={isInView} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        
        {/* Live Activity Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-12 backdrop-blur-md"
        >
           <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
           <LiveTicker />
        </motion.div>

        {/* Floating Monkey Celebration */}
        <div className="relative h-40 mb-8 perspective-1000">
          <FloatingMonkey variant="3d" size="lg" delay={0} x={-120} y={20} rotate={-10} />
          <FloatingMonkey variant="filled" size="xl" delay={0.2} x={0} y={-20} rotate={0} isCenter />
          <FloatingMonkey variant="outline" size="lg" delay={0.4} x={120} y={20} rotate={10} />
        </div>

        <motion.h2 
          className="text-4xl md:text-7xl font-display font-bold mb-8 text-white tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          Ready to Let the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple via-primary-pink to-primary-blue animate-gradient-x">
            Monkeys Work?
          </span>
        </motion.h2>

        <motion.p 
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Join 10,000+ sales professionals who automated their workflow <br className="hidden md:block"/>
          while keeping full control of their data.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <MagneticButton>
            <button className="w-full sm:w-auto relative px-10 py-5 bg-gradient-to-r from-primary-purple to-primary-blue rounded-full text-white font-bold text-xl shadow-[0_0_40px_rgba(99,102,241,0.4)] group overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                Launch App <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </button>
          </MagneticButton>

          <button className="w-full sm:w-auto px-10 py-5 rounded-full text-white font-bold text-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center">
            Schedule Demo
          </button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 md:gap-12 text-sm font-medium text-gray-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {['No credit card required', '14-day free trial', 'Cancel anytime', 'Setup in 5 minutes'].map((item, i) => (
            <div key={i} className="flex items-center group cursor-default">
              <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mr-2 group-hover:bg-green-500/20 transition-colors">
                 <Check size={12} className="text-green-500" />
              </div>
              <span className="group-hover:text-gray-300 transition-colors">{item}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
