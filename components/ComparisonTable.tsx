
import React from 'react';

export const ComparisonTable = () => {
    return (
        <section className="py-24">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Why Go Local?</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-4 px-6 text-gray-500 font-medium">Feature</th>
                                <th className="py-4 px-6 text-white font-bold bg-white/5 rounded-t-xl">Monoes (Local)</th>
                                <th className="py-4 px-6 text-gray-500 font-medium">Cloud Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { feature: "Data Storage", monoes: "Your Hard Drive", cloud: "Public Cloud DB" },
                                { feature: "IP Address", monoes: "Your Local IP", cloud: "Data Center Proxy" },
                                { feature: "Ban Risk", monoes: "Extremely Low", cloud: "High" },
                                { feature: "LinkedIn Limits", monoes: "100+ / day", cloud: "20-40 / day" },
                                { feature: "Cost", monoes: "Flat License", cloud: "Recurring High Fees" },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-white/5">
                                    <td className="py-4 px-6 text-gray-400">{row.feature}</td>
                                    <td className="py-4 px-6 text-green-400 font-bold bg-white/5">{row.monoes}</td>
                                    <td className="py-4 px-6 text-gray-500">{row.cloud}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
