
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, ArrowUpRight, Calendar, Filter, Download } from 'lucide-react';

const DashboardMockup = () => {
    return (
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#0A0C10] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            {/* Window Controls */}
            <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 justify-between">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/30" />
                </div>
                <div className="text-[10px] text-gray-600 font-mono">analytics_dashboard.tsx</div>
                <div className="w-4" />
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-6 flex flex-col relative">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <div className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Total Conversions</div>
                        <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                            1,248
                            <span className="text-sm font-medium text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <TrendingUp size={12} /> +12.5%
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"><Calendar size={14} /></div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"><Filter size={14} /></div>
                        <div className="p-2 rounded-lg bg-primary-blue/10 border border-primary-blue/20 text-primary-blue cursor-pointer"><Download size={14} /></div>
                    </div>
                </div>

                {/* Main Chart */}
                <div className="flex-1 flex items-end gap-3 px-2 pb-2 relative">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                        <div className="w-full h-px bg-white" />
                        <div className="w-full h-px bg-white" />
                        <div className="w-full h-px bg-white" />
                        <div className="w-full h-px bg-white" />
                        <div className="w-full h-px bg-white" />
                    </div>

                    {[35, 50, 45, 70, 60, 85, 95, 75, 60, 80, 55, 65].map((height, i) => (
                        <div key={i} className="flex-1 h-full flex items-end group relative">
                            <motion.div 
                                initial={{ height: 0 }}
                                whileInView={{ height: `${height}%` }}
                                transition={{ duration: 1, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full bg-gradient-to-t from-primary-blue/20 to-primary-blue rounded-t-sm relative hover:from-primary-purple/20 hover:to-primary-purple transition-colors duration-300"
                            >
                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-navy-800 border border-white/10 px-2 py-1 rounded text-xs text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl">
                                    {height * 12} Leads
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Live Card */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute top-24 right-6 w-48 bg-navy-800/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl z-20"
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Live Activity</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px]">SJ</div>
                        <div className="text-xs text-gray-300">
                            <span className="font-bold text-white">Sarah J.</span> replied
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-[10px]">MK</div>
                        <div className="text-xs text-gray-300">
                            <span className="font-bold text-white">Mike K.</span> opened
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const AnalyticsFeature = () => {
    return (
        <section className="py-32 relative">
             <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-16 items-center">
                 
                 {/* Text Content */}
                 <motion.div 
                    className="lg:col-span-5 order-2 lg:order-1"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                 >
                     <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20">
                        <BarChart3 size={24} />
                     </div>
                     <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Metrics That Actually <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Drive Revenue</span>
                     </h2>
                     <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                         Stop guessing. Monoes provides granular insights into every campaign. 
                         Track open rates, reply sentiment, and best performing times to optimize your outreach loop.
                     </p>
                     
                     <div className="space-y-6">
                         {[
                             { title: 'Real-time Sentiment Analysis', desc: 'Know which replies are positive vs negative instantly.' },
                             { title: 'A/B Testing Engine', desc: 'Automatically rotate subject lines to find the winner.' },
                             { title: 'Exportable Reports', desc: 'Generate PDF summaries for your stakeholders in one click.' }
                         ].map((item, i) => (
                             <div key={i} className="flex gap-4">
                                 <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                                     <ArrowUpRight size={14} />
                                 </div>
                                 <div>
                                     <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                     <p className="text-sm text-gray-500">{item.desc}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </motion.div>

                 {/* Visual Mockup */}
                 <motion.div 
                    className="lg:col-span-7 order-1 lg:order-2"
                    initial={{ opacity: 0, x: 30, rotateY: -10 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                 >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                        <DashboardMockup />
                    </div>
                 </motion.div>

             </div>
        </section>
    )
}
