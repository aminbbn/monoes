
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Server, Zap, DollarSign, Database, AlertTriangle, Cloud, Globe, Lock } from 'lucide-react';

const ComparisonRow = ({ feature, monoes, cloud, icon, delay, isLast }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, duration: 0.5 }}
        className={`grid grid-cols-12 gap-4 items-center py-5 px-6 group hover:bg-white/[0.02] transition-colors relative z-10 ${!isLast ? 'border-b border-white/5' : ''}`}
    >
        {/* Feature Label */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-navy-800 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary-blue group-hover:border-primary-blue/30 transition-all duration-300">
                {icon}
            </div>
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{feature}</span>
        </div>

        {/* Monoes Value (Highlighted Column) */}
        <div className="col-span-6 md:col-span-4 pl-0 md:pl-8 relative z-10">
            <div className="flex items-center gap-2">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${monoes.negative ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {monoes.negative ? <X size={12} strokeWidth={3} /> : <Check size={12} strokeWidth={3} />}
                </div>
                <span className={`text-sm font-bold ${monoes.negative ? 'text-gray-400' : 'text-white'}`}>{monoes.text}</span>
            </div>
        </div>

        {/* Cloud Value */}
        <div className="col-span-6 md:col-span-4 pl-0 md:pl-8 relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
             <div className="flex items-center gap-2">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${cloud.negative ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-400'}`}>
                    {cloud.negative ? <X size={12} strokeWidth={3} /> : <Check size={12} strokeWidth={3} />}
                </div>
                <span className={`text-sm ${cloud.negative ? 'text-red-400' : 'text-gray-300'}`}>{cloud.text}</span>
            </div>
        </div>
    </motion.div>
);

export const ComparisonTable = () => {
    return (
        <section className="py-20 relative">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-bold text-white mb-4"
                    >
                        Why Go Local?
                    </motion.h2>
                    <p className="text-gray-400">Comparing Monoes against traditional cloud SaaS.</p>
                </div>

                {/* Table Container - Battle Card Style */}
                <div className="bg-[#050508] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative ring-1 ring-white/5">
                    
                    {/* Visual: The Monoes "Winner" Column Background */}
                    <div className="hidden md:block absolute top-0 bottom-0 left-[33.33%] w-[33.33%] bg-gradient-to-b from-emerald-500/5 to-transparent border-x border-white/5 pointer-events-none z-0" />
                    
                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-4 py-5 px-6 border-b border-white/10 bg-white/[0.02] relative z-10">
                        <div className="col-span-12 md:col-span-4 text-xs font-bold uppercase tracking-wider text-gray-500 pt-1">Feature</div>
                        <div className="col-span-6 md:col-span-4 md:pl-8">
                            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Monoes (Local)</span>
                            </div>
                        </div>
                        <div className="col-span-6 md:col-span-4 md:pl-8 pt-1">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cloud Tools</span>
                        </div>
                    </div>

                    {/* Comparison Rows */}
                    <ComparisonRow 
                        feature="Data Privacy" 
                        icon={<Lock size={16} />}
                        monoes={{ text: "100% On Device" }}
                        cloud={{ text: "Shared Database", negative: true }}
                        delay={0.1}
                    />
                    <ComparisonRow 
                        feature="Ban Risk" 
                        icon={<Shield size={16} />}
                        monoes={{ text: "Near Zero (Human Engine)" }}
                        cloud={{ text: "High (Datacenter IPs)", negative: true }}
                        delay={0.2}
                    />
                    <ComparisonRow 
                        feature="LinkedIn Limits" 
                        icon={<Zap size={16} />}
                        monoes={{ text: "100+ Actions / day" }}
                        cloud={{ text: "20-40 Actions / day", negative: true }}
                        delay={0.3}
                    />
                    <ComparisonRow 
                        feature="Pricing" 
                        icon={<DollarSign size={16} />}
                        monoes={{ text: "Flat Monthly License" }}
                        cloud={{ text: "Per User / Usage Fees", negative: true }}
                        delay={0.4}
                    />
                    <ComparisonRow 
                        feature="Data Ownership" 
                        icon={<Database size={16} />}
                        monoes={{ text: "You own the SQL file" }}
                        cloud={{ text: "Platform Locked", negative: true }}
                        isLast={true}
                        delay={0.5}
                    />
                </div>
            </div>
        </section>
    );
};
