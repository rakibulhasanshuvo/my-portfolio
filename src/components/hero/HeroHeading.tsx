'use client';

import { motion } from 'framer-motion';
import { useOptimizedMotion } from '@/lib/motion';

const WORDS = "Rakibul Hasan Shuvo".split(" ");

export default function HeroHeading() {
    const { shouldReduceMotion } = useOptimizedMotion();

    return (
        <h1 className="text-[12vw] sm:text-[10vw] md:text-[120px] font-extrabold text-center leading-[0.9] tracking-tighter mb-8 z-10 relative text-foreground uppercase italic w-full break-words">
            <span className="absolute inset-0 blur-3xl bg-purple-500/20 rounded-full -z-10" />
            {WORDS.map((word, wordIndex) => {
                // Calculate global character index for consistent staggered animation
                const prevWordsLength = WORDS.slice(0, wordIndex).join("").length + wordIndex;

                return (
                    <span key={wordIndex} className="inline-block">
                        {word.split("").map((char, charIndex) => (
                            <motion.span
                                key={charIndex}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 100, rotateX: -90 }}
                                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: (prevWordsLength + charIndex) * 0.03,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="inline-block"
                                style={shouldReduceMotion ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                            >
                                {char}
                            </motion.span>
                        ))}
                        {wordIndex < WORDS.length - 1 && (
                            <span className="inline-block">&nbsp;</span>
                        )}
                    </span>
                );
            })}
        </h1>
    );
}
