
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Play, Linkedin, Mail, Clock, GitBranch, XCircle, MoreHorizontal, Ban, MousePointer, Search, Layers } from 'lucide-react';

export const WorkflowBuilderFeature = () => {
    return (
        <section className="py-24 bg-navy-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-6">
                        <Settings size={12} />
                        <span>NO CODE REQUIRED</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Visual Workflow Builder
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Design complex, multi-step outreach campaigns with a simple drag-and-drop canvas. 
                        Visualize every touchpoint before you launch.
                    </p>
                </div>

                <div className="relative w-full h-[650px] bg-[#0B0D13] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex">
                    {/* Sidebar / Palette */}
                    <div className="w-64 border-r border-white/5 bg-[#0F1119] hidden md:flex flex-col p-4 z-20">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Tools</div>
                        <div className="space-y-2">
                            {['LinkedIn Visit', 'Send Email', 'Wait Delay', 'Condition', 'End Sequence'].map((tool, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 cursor-grab active:cursor-grabbing transition-all group">
                                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${i === 0 ? 'bg-blue-500/20 text-blue-400' : i === 1 ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700/50 text-gray-400'}`}>
                                        {i === 0 ? <Linkedin size={16} /> : i === 1 ? <Mail size={16} /> : i === 2 ? <Clock size={16} /> : i === 3 ? <GitBranch size={16} /> : <XCircle size={16} />}
                                    </div>
                                    <span className="text-sm text-gray-300 font-medium group-hover:text-white">{tool}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-auto p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <div className="text-xs text-blue-300 font-bold mb-1">Pro Tip</div>
                            <p className="text-[10px] text-blue-200/70 leading-relaxed">
                                Use "Condition" blocks to split paths based on whether a lead accepted your connection request.
                            </p>
                        </div>
                    </div>

                    {/* Canvas Area */}
                    <div className="flex-1 relative bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] cursor-grab active:cursor-grabbing overflow-hidden">
                        
                        {/* Drag Area Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D13] via-transparent to-[#0B0D13]/50 pointer-events-none" />

                        {/* Flow Chart Container - Centered */}
                        <div className="absolute inset-0 flex items-center justify-center transform scale-90 md:scale-100 origin-center">
                            <div className="relative flex flex-col items-center">
                                
                                {/* Start Node */}
                                <div className="z-10 mb-8">
                                    <div className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2">
                                        <Play size={14} fill="black" />
                                        Start Campaign
                                    </div>
                                </div>

                                {/* Vertical Line 1 */}
                                <div className="h-12 w-[2px] bg-gray-800 relative overflow-hidden -mt-4 mb-4">
                                    <motion.div 
                                        className="absolute top-0 left-0 w-full bg-blue-500" 
                                        initial={{ height: 0 }} 
                                        whileInView={{ height: '100%' }} 
                                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }} 
                                    />
                                </div>

                                {/* Step 1: Visit Profile */}
                                <div className="z-10 w-72 bg-[#1A1D26] border border-white/10 rounded-xl p-4 shadow-xl hover:border-blue-500/50 transition-colors group relative">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shrink-0">
                                            <Linkedin size={20} />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm mb-0.5">Visit Profile</div>
                                            <div className="text-xs text-gray-500">Delay: 2-5 min random</div>
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="p-1 hover:bg-white/10 rounded text-gray-400"><MoreHorizontal size={14} /></div>
                                        </div>
                                    </div>
                                    {/* Connection Point Bottom */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full border-2 border-[#1A1D26]" />
                                </div>

                                {/* Vertical Line 2 */}
                                <div className="h-12 w-[2px] bg-gray-800 -mt-1 mb-0 relative" />

                                {/* Condition Logic Diamond */}
                                <div className="z-10 w-10 h-10 bg-[#1A1D26] border-2 border-gray-600 rotate-45 flex items-center justify-center shadow-lg mb-0 relative">
                                    <div className="-rotate-45 text-gray-400"><GitBranch size={16} /></div>
                                </div>

                                {/* Branching Lines Container */}
                                <div className="relative w-[400px] h-[60px] -mt-5">
                                    <svg className="w-full h-full overflow-visible pointer-events-none">
                                        {/* Left Path */}
                                        <path d="M 200 20 C 200 40, 100 20, 100 60" stroke="#4b5563" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                        <motion.path 
                                            d="M 200 20 C 200 40, 100 20, 100 60" 
                                            stroke="#3b82f6" 
                                            strokeWidth="2" 
                                            fill="none" 
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                        />
                                        
                                        {/* Right Path */}
                                        <path d="M 200 20 C 200 40, 300 20, 300 60" stroke="#4b5563" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>

                                {/* Branches Container */}
                                <div className="flex justify-between w-[500px] px-8 -mt-2">
                                    {/* Left Branch (Success) */}
                                    <div className="w-60 flex flex-col items-center">
                                        <div className="mb-2 px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase tracking-wider border border-green-500/20">
                                            Connected
                                        </div>
                                        <div className="w-full bg-[#1A1D26] border border-white/10 rounded-xl p-4 shadow-xl hover:border-purple-500/50 transition-colors group">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shrink-0">
                                                    <Mail size={20} />
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold text-sm mb-0.5">Send Email</div>
                                                    <div className="text-xs text-gray-500">Template: Intro_v1</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Branch (Else) */}
                                    <div className="w-60 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
                                        <div className="mb-2 px-2 py-0.5 bg-gray-700/30 text-gray-400 text-[10px] font-bold rounded uppercase tracking-wider border border-gray-700/50">
                                            No Action
                                        </div>
                                        <div className="w-full bg-[#1A1D26] border border-white/10 rounded-xl p-4 shadow-xl">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-white shadow-lg shrink-0">
                                                    <Ban size={20} />
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold text-sm mb-0.5">Skip Lead</div>
                                                    <div className="text-xs text-gray-500">Log reason: No connect</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Floating Action Bar */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                            <div className="flex items-center gap-2 bg-[#1A1D26]/90 backdrop-blur-md border border-white/10 p-1.5 rounded-xl shadow-2xl">
                                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors tooltip-trigger relative">
                                    <MousePointer size={18} />
                                </button>
                                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                    <Search size={18} />
                                </button>
                                <div className="w-px h-6 bg-white/10 mx-1" />
                                <button className="bg-primary-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                                    <Play size={14} fill="currentColor" /> Publish
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
