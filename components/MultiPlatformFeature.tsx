import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Linkedin, Mail, Twitter, Instagram, Video, ArrowLeft, MoreHorizontal, Image as ImageIcon, Smile, Paperclip, XCircle, BadgeCheck, Phone, Camera, Flag, Play, Heart, SendHorizontal, Calendar, Check, Lock } from 'lucide-react';

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

export const MultiPlatformFeature = () => {
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
                <div className="text-gray-500 cursor-pointer hover:text-gray-800"><XCircle size={20} /></div>
                
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
