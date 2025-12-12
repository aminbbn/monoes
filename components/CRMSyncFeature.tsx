
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Check, CheckCircle2 } from 'lucide-react';
import { Monkey } from './Monkey';

export const CRMSyncFeature = () => {
  return (
    <section className="py-20 bg-navy-950/30">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                   <RefreshCw size={28} />
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                    Bidirectional <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">CRM Sync</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Stop manually copying data. Monoes syncs every conversation, lead status, and activity log to your CRM in real-time. Works with HubSpot, Salesforce, Pipedrive, and more.
                </p>
                <div className="flex gap-4">
                    <div className="flex -space-x-3">
                        {['HS', 'SF', 'PD', 'Zo'].map((crm, i) => (
                             <div key={i} className="w-10 h-10 rounded-full bg-navy-800 border-2 border-navy-950 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                {crm}
                             </div>
                        ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-medium">
                        + 20 more integrations
                    </div>
                </div>
            </motion.div>
            <div className="relative">
                <div className="bg-navy-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]" />
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">SF</div>
                             <div>
                                 <div className="text-white font-bold">Salesforce</div>
                                 <div className="text-xs text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Connected</div>
                             </div>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">SYNC_STATUS: ACTIVE</div>
                    </div>
                    <div className="space-y-3">
                        {[
                            { action: "Contact Created", subject: "Sarah Jenkins", time: "Just now" },
                            { action: "Activity Logged", subject: "Email Sent: Intro", time: "2m ago" },
                            { action: "Deal Stage", subject: "Moved to 'Negotiation'", time: "1h ago" },
                        ].map((log, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-navy-950/50 border border-white/5 p-3 rounded-lg flex justify-between items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500"><Check size={14} /></div>
                                    <div>
                                        <div className="text-sm text-white font-medium">{log.action}</div>
                                        <div className="text-xs text-gray-500">{log.subject}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600">{log.time}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
