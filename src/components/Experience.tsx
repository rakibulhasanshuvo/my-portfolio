'use client';

import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { Briefcase } from 'lucide-react';

const experience = profile.experience;

export default function Experience() {
    return (
        <section className="py-32 px-6 bg-white/[0.02]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-purple-400 font-medium tracking-wider uppercase text-sm mb-4 block">Professional Journey</span>
                    <h2 className="text-4xl font-bold">Experience</h2>
                </motion.div>

                <div className="space-y-12">
                    {experience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative pl-12 border-l border-white/10"
                        >
                            {/* Icon */}
                            <div className="absolute left-[-20px] top-0 w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-purple-500 shadow-xl">
                                <Briefcase size={18} />
                            </div>

                            {/* Year */}
                            <div className="mb-2">
                                <span className="text-sm font-medium text-purple-400/80 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                                    {item.year}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/[0.07] transition-all group">
                                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                    {item.role}
                                </h3>
                                <p className="text-purple-300/60 font-medium mb-4">{item.company}</p>
                                <p className="text-white/50 leading-relaxed">
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
