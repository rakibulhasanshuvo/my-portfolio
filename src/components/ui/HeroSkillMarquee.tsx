import { motion } from 'framer-motion';

interface HeroSkillMarqueeProps {
    skills: string[];
    shouldReduceMotion: boolean | null;
    isMobile: boolean;
}

export default function HeroSkillMarquee({ skills, shouldReduceMotion, isMobile }: HeroSkillMarqueeProps) {
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
                {skills.map((skill, index) => (
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
