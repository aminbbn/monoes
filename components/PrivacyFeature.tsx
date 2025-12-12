
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Server, Fingerprint, Lock } from 'lucide-react';

export const PrivacyFeature = () => {
    return (
        <section className="py-24 bg-navy-950 relative overflow-hidden">
             <div className="max-w-7xl mx-auto px-4">
                <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl border border-white/10 p-12 md:p-24 relative overflow-hidden text-center">
                    
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                    
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="w-20 h-20 bg-primary-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-primary-blue/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                            <ShieldCheck size={40} className="text-primary-blue" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            Local Processing. <br/> Zero Data Leakage.
                        </h2>
                        <p className="text-gray-400 text-lg mb-10">
                            Unlike cloud-based tools, Monoes runs entirely on your machine. Your prospect data, messages, and strategies never leave your device.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="bg-navy-950/50 p-6 rounded-xl border border-white/10">
                                 <Server size={24} className="text-gray-400 mb-4 mx-auto" />
                                 <div className="font-bold text-white mb-2">No Cloud Storage</div>
                                 <p className="text-xs text-gray-500">We don't store your leads database.</p>
                             </div>
                             <div className="bg-navy-950/50 p-6 rounded-xl border border-white/10">
                                 <Fingerprint size={24} className="text-gray-400 mb-4 mx-auto" />
                                 <div className="font-bold text-white mb-2">Local Fingerprint</div>
                                 <p className="text-xs text-gray-500">Requests match your unique device ID.</p>
                             </div>
                             <div className="bg-navy-950/50 p-6 rounded-xl border border-white/10">
                                 <Lock size={24} className="text-gray-400 mb-4 mx-auto" />
                                 <div className="font-bold text-white mb-2">Encrypted Config</div>
                                 <p className="text-xs text-gray-500">Settings are AES-256 encrypted locally.</p>
                             </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    )
}
