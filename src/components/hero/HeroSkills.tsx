'use client';

import { motion } from 'framer-motion';
import { duplicatedSkills } from '@/lib/constants';
import { useOptimizedMotion } from '@/lib/motion';
import { useMobile } from '@/hooks/useMobile';

export default function HeroSkills() {
    const { shouldReduceMotion } = useOptimizedMotion();
    const isMobile = useMobile(1024, true);

    return (
        <div className="w-full max-w-4xl overflow-hidden relative z-10 mask-gradient py-10">
            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={shouldReduceMotion ? undefined : { x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 35
                }}
                style={shouldReduceMotion ? { x: 0 } : undefined}
            >
                {duplicatedSkills.map((skill, index) => (
                    <motion.div
                        key={`${skill}-${index}`}
                        animate={shouldReduceMotion || isMobile ? false : {
                            y: [0, -10, 0]
                        }}
                        transition={{
                            duration: 3 + (index % 3), // Deterministic duration based on index
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2 // Deterministic delay
                        }}
                        className="px-6 py-3 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md text-sm font-medium text-foreground/80 hover:bg-foreground/10 transition-colors cursor-default hover:border-foreground/20"
                        style={shouldReduceMotion || isMobile ? { y: 0 } : undefined}
                    >
                        {skill}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
