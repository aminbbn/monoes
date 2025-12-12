
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Server, Fingerprint, Lock, ScanLine, FileKey, EyeOff } from 'lucide-react';

const PrivacyCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, duration: 0.5 }}
        className="group relative"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative h-full bg-navy-900/40 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 rounded-2xl p-6 transition-colors duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-navy-950 border border-white/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
                {icon}
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-emerald-200 transition-colors">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

export const PrivacyFeature = () => {
    return (
        <section className="py-32 bg-navy-950 relative overflow-hidden">
             {/* Dark aesthetic background */}
             <div className="absolute inset-0 bg-[#020408]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
             </div>

             <div className="max-w-6xl mx-auto px-4 relative z-10">
                
                {/* Visual Anchor: The Shield */}
                <div className="flex flex-col items-center mb-16">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-24 h-24 mb-8 flex items-center justify-center"
                    >
                        {/* Pulse rings */}
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl" />
                        
                        <div className="relative z-10 w-full h-full bg-navy-900 rounded-2xl border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            <ShieldCheck size={48} className="text-emerald-400" />
                        </div>

                        {/* Scanning Line */}
                        <motion.div 
                            className="absolute top-0 left-[-10%] w-[120%] h-1 bg-emerald-400/50 blur-[2px] z-20"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            Local Sovereignty. <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Zero Data Leakage.</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Unlike cloud-based tools, Monoes runs entirely on your hardware. 
                            Your prospect database, strategies, and credentials never leave your machine.
                        </p>
                    </motion.div>
                </div>
                
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                     {/* Connecting Lines (Desktop) */}
                     <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -z-10" />

                     <PrivacyCard 
                        icon={<Server size={24} />}
                        title="Local Database"
                        description="We don't host your data. It lives encrypted on your SSD."
                        delay={0.2}
                     />
                     <PrivacyCard 
                        icon={<Fingerprint size={24} />}
                        title="Device Fingerprint"
                        description="Requests match your unique hardware signature to prevent bans."
                        delay={0.3}
                     />
                     <PrivacyCard 
                        icon={<FileKey size={24} />}
                        title="Encrypted Config"
                        description="AES-256 encryption for all API keys and account credentials."
                        delay={0.4}
                     />
                </div>

                {/* Bottom Verification */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 flex justify-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                        <ScanLine size={14} />
                        <span>SYSTEM INTEGRITY: VERIFIED</span>
                    </div>
                </motion.div>

             </div>
        </section>
    )
}
