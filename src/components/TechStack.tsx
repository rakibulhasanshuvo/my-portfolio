'use client';

import { motion } from 'framer-motion';

import { profile } from '@/data/profile';

const technologies = profile.techStack;
const firstRowTechnologies = [...technologies, ...technologies, ...technologies];
const secondRowTechnologies = [...technologies.slice().reverse(), ...technologies, ...technologies];


export default function TechStack() {
    return (
        <section className="py-20 overflow-hidden border-y border-foreground/5">
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
                        {firstRowTechnologies.map((tech, i) => (
                            <div
                                key={`${tech.name}-${i}`}
                                className="flex items-center gap-3 px-6 py-3 bg-foreground/5 border border-foreground/5 rounded-full hover:bg-foreground/10 transition-colors cursor-default"
                            >
                                <span className="text-xl">{tech.icon}</span>
                                <span className="font-medium text-foreground/70">{tech.name}</span>
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
                        {secondRowTechnologies.map((tech, i) => (
                            <div
                                key={`${tech.name}-${i}`}
                                className="flex items-center gap-3 px-6 py-3 bg-foreground/5 border border-foreground/5 rounded-full hover:bg-foreground/10 transition-colors cursor-default"
                            >
                                <span className="text-xl">{tech.icon}</span>
                                <span className="font-medium text-foreground/70">{tech.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Edge Fades */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
}
