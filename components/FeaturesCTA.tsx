
import React from 'react';

export const FeaturesCTA = () => {
    return (
        <section className="py-20">
            <div className="max-w-5xl mx-auto px-4">
                <div className="bg-gradient-to-r from-primary-blue to-primary-purple rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-6">Ready to upgrade your workflow?</h2>
                        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of sales pros who switched to local-first automation.
                            Faster, safer, and no monthly cloud fees.
                        </p>
                        <button className="bg-white text-primary-purple px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all">
                            Download for Mac & Windows
                        </button>
                    </div>
                    {/* Background decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>
            </div>
        </section>
    )
}
