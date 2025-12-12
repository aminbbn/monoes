
import React from 'react';
import { motion } from 'framer-motion';
import { Database, MessageSquare, Zap, Cpu, Mail, Globe, Cloud, Bot, Code, Workflow, Slack, Trello, Figma, Github } from 'lucide-react';

const row1 = [
    { name: 'HubSpot', icon: <Database size={18} />, color: 'text-orange-500', bg: 'group-hover:bg-orange-500/10' },
    { name: 'Salesforce', icon: <Cloud size={18} />, color: 'text-blue-400', bg: 'group-hover:bg-blue-400/10' },
    { name: 'Pipedrive', icon: <Workflow size={18} />, color: 'text-green-500', bg: 'group-hover:bg-green-500/10' },
    { name: 'Slack', icon: <MessageSquare size={18} />, color: 'text-purple-400', bg: 'group-hover:bg-purple-400/10' },
    { name: 'Zapier', icon: <Zap size={18} />, color: 'text-orange-400', bg: 'group-hover:bg-orange-400/10' },
    { name: 'OpenAI', icon: <Bot size={18} />, color: 'text-teal-400', bg: 'group-hover:bg-teal-400/10' },
];

const row2 = [
    { name: 'Gmail', icon: <Mail size={18} />, color: 'text-red-400', bg: 'group-hover:bg-red-400/10' },
    { name: 'Outlook', icon: <Mail size={18} />, color: 'text-blue-500', bg: 'group-hover:bg-blue-500/10' },
    { name: 'Notion', icon: <Code size={18} />, color: 'text-white', bg: 'group-hover:bg-white/10' },
    { name: 'Airtable', icon: <Database size={18} />, color: 'text-yellow-400', bg: 'group-hover:bg-yellow-400/10' },
    { name: 'GitHub', icon: <Code size={18} />, color: 'text-white', bg: 'group-hover:bg-white/10' },
    { name: 'Figma', icon: <Cpu size={18} />, color: 'text-purple-400', bg: 'group-hover:bg-purple-400/10' },
];

const IntegrationCard = ({ item }: { item: typeof row1[0] }) => (
    <div className={`flex items-center gap-3 px-5 py-3 bg-navy-900/40 backdrop-blur-sm border border-white/5 rounded-xl hover:border-white/20 transition-all duration-300 min-w-[150px] group cursor-default ${item.bg}`}>
        <div className={`p-1.5 rounded-lg bg-white/5 group-hover:scale-110 transition-transform duration-300 ${item.color}`}>
            {item.icon}
        </div>
        <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-colors">{item.name}</span>
    </div>
);

export const IntegrationShowcase = () => {
    return (
        <section className="py-20 border-y border-white/5 bg-[#030305] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-blue/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                            Seamlessly Connected
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base">
                            Monoes integrates natively with 50+ tools in your stack.
                        </p>
                    </motion.div>
                </div>

                {/* Dual Marquee Container */}
                <div className="relative w-full overflow-hidden mask-gradient-x space-y-4">
                    {/* Gradient Masks for edges */}
                    <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#030305] to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#030305] to-transparent z-20 pointer-events-none" />

                    {/* Row 1: Left */}
                    <div className="flex w-full overflow-hidden">
                        <motion.div 
                            className="flex gap-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            {[...row1, ...row1, ...row1, ...row1].map((item, i) => (
                                <IntegrationCard key={`r1-${i}`} item={item} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Row 2: Right (Slower) */}
                    <div className="flex w-full overflow-hidden">
                        <motion.div 
                            className="flex gap-4"
                            initial={{ x: "-50%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        >
                            {[...row2, ...row2, ...row2, ...row2].map((item, i) => (
                                <IntegrationCard key={`r2-${i}`} item={item} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
