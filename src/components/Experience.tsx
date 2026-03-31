'use client';

import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { Briefcase } from 'lucide-react';
import { useOptimizedMotion } from '@/lib/motion';

const experience = profile.experience;

export default function Experience() {
    const { isMobile, shouldReduceMotion, transition } = useOptimizedMotion();

    return (
        <section className="py-32 px-6 bg-white/[0.02]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                    layout={!isMobile}
                    transition={{ ...transition, duration: isMobile ? transition.duration : 0.6 }}

                    viewport={{ once: true }}
                    className="text-center mb-20"
                    style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                >
                    <span className="overline-label">Professional Journey</span>
                    <h2 className="text-5xl md:text-7xl font-bold uppercase italic tracking-tighter">Experience</h2>
                </motion.div>

                <div className="space-y-12">
                    {experience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, x: -20 })}
                            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}

                            layout={!isMobile}
                            transition={{ ...transition, duration: isMobile ? transition.duration : 0.5, delay: index * 0.1 }}

                            viewport={{ once: true }}
                            className="relative pl-12 border-l border-foreground/10"
                            style={shouldReduceMotion ? { opacity: 1, x: 0 } : undefined}
                        >
                            {/* Icon */}
                            <div className="absolute left-[-20px] top-0 w-10 h-10 rounded-full bg-background border border-foreground/10 flex items-center justify-center text-purple-500 shadow-xl">
                                <Briefcase size={18} />
                            </div>

                            {/* Year */}
                            <div className="mb-2">
                                <span className="text-sm font-medium text-purple-400/80 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                                    {item.year}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="bg-foreground/5 border border-foreground/5 rounded-2xl p-8 hover:bg-foreground/[0.07] transition-all group">
                                <h3 className="text-2xl font-bold text-foreground group-hover:text-purple-400 transition-colors uppercase italic tracking-tight">
                                    {item.role}
                                </h3>
                                <p className="text-purple-300/60 font-medium mb-4">{item.company}</p>
                                <p className="text-foreground/50 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
