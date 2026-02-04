'use client';

import { motion } from 'framer-motion';

import { profile } from '@/data/profile';

const technologies = profile.techStack;

export default function TechStack() {
    return (
        <section className="py-20 overflow-hidden border-y border-white/5">
            <div className="relative">
                {/* First Row - Left to Right */}
                <div className="flex mb-6 overflow-hidden">
                    <motion.div
                        className="flex gap-6 whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...technologies, ...technologies, ...technologies].map((tech, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 transition-colors cursor-default"
                            >
                                <span className="text-xl">{tech.icon}</span>
                                <span className="font-medium text-white/70">{tech.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Second Row - Right to Left */}
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-6 whitespace-nowrap"
                        animate={{ x: [-1000, 0] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 35,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...technologies.slice().reverse(), ...technologies, ...technologies].map((tech, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 transition-colors cursor-default"
                            >
                                <span className="text-xl">{tech.icon}</span>
                                <span className="font-medium text-white/70">{tech.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Edge Fades */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
}
