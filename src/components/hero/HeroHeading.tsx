'use client';

import { motion } from 'framer-motion';
import { useOptimizedMotion } from '@/lib/motion';

const RAW_WORDS = "Rakibul Hasan Shuvo".split(" ");
const PRECOMPUTED_WORDS = RAW_WORDS.map((word, wordIndex) => {
    const prevWordsLength = RAW_WORDS.slice(0, wordIndex).join("").length + wordIndex;
    return {
        word,
        chars: word.split("").map((char, charIndex) => ({
            char,
            delay: (prevWordsLength + charIndex) * 0.03
        }))
    };
});

export default function HeroHeading() {
    const { shouldReduceMotion } = useOptimizedMotion();

    return (
        <h1 className="text-[12vw] sm:text-[10vw] md:text-[120px] font-extrabold text-center leading-[0.9] tracking-tighter mb-8 z-10 relative text-foreground uppercase italic w-full break-words">
            <span className="absolute inset-0 blur-3xl bg-purple-500/20 rounded-full -z-10" />
            {PRECOMPUTED_WORDS.map((wordObj, wordIndex) => {
                return (
                    <span key={wordIndex} className="inline-block">
                        {wordObj.chars.map((charObj, charIndex) => (
                            <motion.span
                                key={charIndex}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 100, rotateX: -90 }}
                                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: charObj.delay,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="inline-block"
                                style={shouldReduceMotion ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                            >
                                {charObj.char}
                            </motion.span>
                        ))}
                        {wordIndex < PRECOMPUTED_WORDS.length - 1 && (
                            <span className="inline-block">&nbsp;</span>
                        )}
                    </span>
                );
            })}
        </h1>
    );
}
