import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue } from 'framer-motion';
import { Monkey } from './Monkey';
import { Check, ArrowRight } from 'lucide-react';

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

const LiveTicker = () => {
  const [count, setCount] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      key={count} // Retrigger animation on change
      className="flex items-center space-x-2"
    >
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </div>
      <span className="text-xs font-mono text-gray-300">
        <span className="text-white font-bold">{count} teams</span> joined recently
      </span>
    </motion.div>
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

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: width / 2,
        y: height / 2 + 100,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 1) * 15 - 5,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        friction: 0.96,
        gravity: 0.2
      });
    }

    let animationFrameId: number;

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
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-60" />;
};

export const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  return (
    <section ref={containerRef} className="py-24 md:py-48 relative overflow-hidden bg-navy-950 flex flex-col items-center justify-center min-h-[700px]">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-navy-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-primary-blue/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      {/* Confetti Canvas */}
      <ConfettiCanvas active={isInView} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        
        {/* Visual Composition: Ticker + Monkey Cluster */}
        <div className="relative mb-12 flex flex-col items-center">
            
            {/* 1. Ticker (Floating Top) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mb-6 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md shadow-xl z-20"
            >
               <LiveTicker />
            </motion.div>

            {/* 2. Monkey Cluster */}
            <div className="relative w-full h-32 flex items-center justify-center">
                
                {/* Center Glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-purple/20 blur-[50px] rounded-full" />

                {/* Back Left (Supporting) */}
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={isInView ? { opacity: 0.6, x: -50, scale: 0.85 } : {}}
                  transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                  className="absolute z-0 blur-[1px] grayscale opacity-50"
                >
                    <Monkey variant="outline" size="lg" animate={false} />
                </motion.div>

                {/* Back Right (Supporting) */}
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={isInView ? { opacity: 0.6, x: 50, scale: 0.85 } : {}}
                  transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                  className="absolute z-0 blur-[1px] opacity-50"
                >
                    <Monkey variant="filled" size="lg" animate={false} />
                </motion.div>

                {/* Front Center (Hero) */}
                <motion.div
                   initial={{ opacity: 0, scale: 0.5, y: 20 }}
                   animate={isInView ? { opacity: 1, scale: 1.3, y: 0 } : {}}
                   transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
                   className="relative z-10 drop-shadow-2xl"
                >
                   {/* Add a floating animation to the main monkey */}
                   <motion.div
                     animate={{ y: [0, -8, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <Monkey variant="3d" size="xl" />
                   </motion.div>
                </motion.div>

            </div>
        </div>

        <motion.h2 
          className="text-4xl md:text-7xl font-display font-bold mb-8 text-white tracking-tight"
          initial={{ opacity: 0, scale: 0.95 }}
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
          Join the revolution of automated, private sales outreach. <br className="hidden md:block"/>
          Automate your workflow while keeping full control of your data.
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
                Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </button>
          </MagneticButton>

          <button className="w-full sm:w-auto px-10 py-5 rounded-full text-white font-bold text-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center">
            Book a Demo
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