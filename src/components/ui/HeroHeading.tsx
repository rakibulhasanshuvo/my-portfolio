import { motion } from 'framer-motion';

interface HeroHeadingProps {
    words: string[];
    shouldReduceMotion: boolean | null;
    isMobile: boolean;
}

export default function HeroHeading({ words, shouldReduceMotion, isMobile }: HeroHeadingProps) {
    return (
        <h1 className="text-6xl md:text-[120px] font-extrabold text-center leading-[0.9] tracking-tighter mb-8 z-10 relative text-foreground uppercase italic">
            <span className="absolute inset-0 blur-3xl bg-purple-500/20 rounded-full -z-10" />
            {words.map((word, wordIndex) => {
                // Calculate global character index for consistent staggered animation
                const prevWordsLength = words.slice(0, wordIndex).join("").length + wordIndex;

                return (
                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, charIndex) => (
                            <motion.span
                                key={charIndex}
                                initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 100, rotateX: -90 })}
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
                        {wordIndex < words.length - 1 && (
                            <span className="inline-block">&nbsp;</span>
                        )}
                    </span>
                );
            })}
        </h1>
    );
}
