
import React from 'react';

export const IntegrationShowcase = () => {
    return (
        <section className="py-24 border-y border-white/5 bg-navy-950/50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm font-bold text-primary-purple tracking-widest uppercase mb-8">Works with your stack</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder Logos */}
                    {['HubSpot', 'Salesforce', 'Pipedrive', 'Slack', 'Zapier', 'OpenAI'].map((name, i) => (
                        <div key={i} className="text-2xl font-bold text-white/40 hover:text-white transition-colors cursor-default">{name}</div>
                    ))}
                </div>
            </div>
        </section>
    )
}
