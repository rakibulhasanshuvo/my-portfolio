'use client';

import { motion } from 'framer-motion';

import { firstRowTechnologies, secondRowTechnologies } from '@/lib/constants';
import { useOptimizedMotion } from '@/lib/motion';

const FIRST_ROW_ANIMATE = { x: [0, -1000] };
const FIRST_ROW_TRANSITION = {
    x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 30,
        ease: "linear" as const,
    },
};
const FIRST_ROW_STYLE = { x: 0 };

const SECOND_ROW_ANIMATE = { x: [-1000, 0] };
const SECOND_ROW_TRANSITION = {
    x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 35,
        ease: "linear" as const,
    },
};
const SECOND_ROW_STYLE = { x: -1000 };

export default function TechStack() {
    const { shouldReduceMotion } = useOptimizedMotion();

    return (
        <section className="py-20 overflow-hidden border-y border-foreground/5">
            <div className="relative">
                {/* First Row - Left to Right */}
                <div className="flex mb-6 overflow-hidden">
                    <motion.div
                        className="flex gap-6 whitespace-nowrap"
                        animate={shouldReduceMotion ? undefined : FIRST_ROW_ANIMATE}
                        transition={FIRST_ROW_TRANSITION}
                        style={shouldReduceMotion ? FIRST_ROW_STYLE : undefined}
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
                        animate={shouldReduceMotion ? undefined : SECOND_ROW_ANIMATE}
                        transition={SECOND_ROW_TRANSITION}
                        style={shouldReduceMotion ? SECOND_ROW_STYLE : undefined}
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
