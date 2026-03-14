'use client';

import { motion } from 'framer-motion';
import { profile } from '@/data/profile';

const workflow = profile.workflow;

export default function Workflow() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="overline-label">The Methodology</span>
                    <h2 className="text-5xl md:text-7xl font-bold uppercase italic tracking-tighter">How I Craft</h2>
                </motion.div>

                <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent hidden md:block" />

                    <div className="space-y-12 md:space-y-24">
                        {workflow.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Content */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="bg-foreground/5 border border-foreground/5 rounded-3xl p-8 backdrop-blur-md hover:border-purple-500/30 transition-colors group">
                                        <span className="text-5xl font-black text-foreground/5 mb-4 block group-hover:text-purple-500/20 transition-colors">0{index + 1}</span>
                                        <h3 className="text-3xl font-bold mb-4 text-foreground group-hover:text-purple-400 transition-colors uppercase italic tracking-tight">{step.title}</h3>
                                        <p className="text-foreground/60 leading-relaxed max-w-md mx-auto md:mx-0">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="relative z-10 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-background border-4 border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                                    </div>
                                </div>

                                {/* Spacer */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 blur-[120px] -z-10 rounded-full" />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -z-10 rounded-full" />
        </section>
    );
}
