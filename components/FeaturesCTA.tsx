
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Apple, Monitor, ShieldCheck, HardDrive, ArrowRight } from 'lucide-react';

export const FeaturesCTA = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-navy-950">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-blue/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative bg-navy-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden p-8 md:p-16 text-center shadow-2xl group"
                >
                    {/* Glowing Top Border Highlight */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary-blue/50 to-transparent blur-[1px]" />
                    
                    {/* Content Layer */}
                    <div className="relative z-20 flex flex-col items-center">
                        
                        {/* Animated Icon Visual */}
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-20 h-20 bg-gradient-to-br from-primary-blue to-primary-purple rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] mb-8 cursor-pointer relative"
                        >
                            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <HardDrive size={36} strokeWidth={1.5} />
                        </motion.div>

                        <motion.h2 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight"
                        >
                            Ready to go <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Local?</span>
                        </motion.h2>

                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed"
                        >
                            Join thousands of sales teams reclaiming their privacy. 
                            Download the Monoes engine and start automating in minutes.
                        </motion.p>

                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col items-center w-full"
                        >
                            <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-navy-950 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] w-full md:w-auto min-w-[260px] overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    <Download size={20} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                                    Download for Mac
                                </span>
                                {/* Button Shine Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/5 to-transparent z-0" />
                            </button>
                            
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium font-mono uppercase tracking-wide">
                                <span className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-default">
                                    <Apple size={14} className="mb-0.5" /> macOS 12+
                                </span>
                                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                                <span className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-default">
                                    <Monitor size={14} /> Windows 10/11
                                </span>
                                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                                <span className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-default text-emerald-500/80">
                                    <ShieldCheck size={14} /> Verified Secure
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative Background Elements in Card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none mix-blend-screen" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-purple/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none mix-blend-screen" />
                </motion.div>
            </div>
        </section>
    )
}
