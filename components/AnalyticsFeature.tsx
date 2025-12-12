
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

export const AnalyticsFeature = () => {
    return (
        <section className="py-20">
             <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                 <motion.div className="bg-navy-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                     <div className="flex justify-between items-center mb-6">
                         <h3 className="text-white font-bold">Campaign Performance</h3>
                         <select className="bg-navy-950 border border-white/10 text-xs text-gray-400 rounded-lg px-2 py-1">
                             <option>Last 7 Days</option>
                         </select>
                     </div>
                     <div className="flex items-end gap-2 h-48 mb-6">
                         {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((h, i) => (
                             <motion.div 
                                key={i} 
                                className="flex-1 bg-primary-blue/20 hover:bg-primary-blue/40 transition-colors rounded-t-sm relative group" 
                                style={{ height: `${h}%` }}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05 }}
                             >
                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-navy-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                     {h}%
                                 </div>
                             </motion.div>
                         ))}
                     </div>
                     <div className="grid grid-cols-3 gap-4">
                         <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                             <div className="text-gray-500 text-xs mb-1">Sent</div>
                             <div className="text-white font-bold text-xl">1,240</div>
                         </div>
                         <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                             <div className="text-gray-500 text-xs mb-1">Open Rate</div>
                             <div className="text-white font-bold text-xl">68%</div>
                         </div>
                         <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                             <div className="text-gray-500 text-xs mb-1">Reply Rate</div>
                             <div className="text-green-400 font-bold text-xl">12.4%</div>
                         </div>
                     </div>
                 </motion.div>
                 
                 <div>
                     <h2 className="text-4xl font-display font-bold text-white mb-6">Data-Driven Outreach</h2>
                     <p className="text-gray-400 text-lg mb-8">
                         Track every metric that matters. Understand which templates perform best, optimal sending times, and A/B test your way to a packed calendar.
                     </p>
                     <ul className="space-y-4">
                         {['Real-time reply tracking', 'A/B testing for subject lines', 'Exportable PDF reports'].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300">
                                 <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><BarChart3 size={12} /></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </div>
             </div>
        </section>
    )
}
