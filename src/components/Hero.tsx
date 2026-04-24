'use client';

import { motion } from 'framer-motion';
import { useCallback, useState, useEffect } from 'react';
import type { Application } from '@splinetool/runtime';
import dynamic from 'next/dynamic';
import AuroraBackground from './ui/AuroraBackground';
import { profile } from '@/data/profile';
import { useMobile } from '@/hooks/useMobile';
import { duplicatedSkills } from '@/lib/constants';
import { useOptimizedMotion } from '@/lib/motion';

const SplineScene = dynamic(() => import('./ui/SplineScene'), {
    ssr: false,
});

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

export default function Hero() {
    const { shouldReduceMotion } = useOptimizedMotion();
    // Default to true during SSR to prevent heavy 3D loading before hydration on mobile.
    // This might cause a hydration mismatch if loaded on desktop, but the visual pop-in
    // is better than a 20s lockup on mobile.
    const isMobile = useMobile(1024, true);
    const [mountSpline, setMountSpline] = useState(false);

    // Defer mounting the heavy Spline component until the main thread is idle
    // This allows the initial UI and critical rendering path to complete instantly.
    useEffect(() => {
        let mounted = true;

        // Use requestIdleCallback if available to only mount when CPU is not busy
        if ('requestIdleCallback' in window) {
            const idleId = window.requestIdleCallback(() => {
                if (mounted) setMountSpline(true);
            }, { timeout: 3000 }); // Force mount after 3s if never idle

            return () => {
                mounted = false;
                window.cancelIdleCallback(idleId);
            };
        } else {
            // Fallback for Safari
            const timer = setTimeout(() => {
                if (mounted) setMountSpline(true);
            }, 1000);

            return () => {
                mounted = false;
                clearTimeout(timer);
            };
        }
    }, []);

    const handleSplineLoad = useCallback((spline: Application) => {
        // Find and hide all objects that appear to be text
        // Based on the scene URL, it has "Clarity. Focus. Impact." and subtext
        const objectsToHide = [
            'Clarity. Focus. Impact.',
            'A multidisciplinary creative designing the future with code and intuition.',
            'Text',
            'Text 2',
            'Text 3'
        ];

        objectsToHide.forEach(objName => {
            const obj = spline.findObjectByName(objName);
            if (obj) {
                obj.visible = false;
            }
        });
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden pt-32 animate-entry">

            <AuroraBackground />

            {/* 3D Spline Design - Hidden on mobile for performance */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
                {!isMobile && mountSpline && (
                    <SplineScene
                        scene="https://prod.spline.design/qF9apOu8tJv1sgOk/scene.splinecode"
                        onLoad={handleSplineLoad}
                        className="w-full h-full"
                    />
                )}
            </div>

            {/* Mobile Static Fallback */}
            <div className="absolute inset-0 z-0 pointer-events-none block lg:hidden bg-gradient-to-b from-purple-900/20 via-background to-background" />

            {/* Overline label */}
            <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="overline-label z-10"
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            >
                Digital Architect & Developer
            </motion.span>

            {/* Main Heading */}
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[120px] font-extrabold text-center leading-[0.9] tracking-tighter mb-8 z-10 relative text-foreground uppercase italic w-full break-words">
                <span className="absolute inset-0 blur-3xl bg-purple-500/20 rounded-full -z-10" />
                {PRECOMPUTED_WORDS.map((wordObj, wordIndex) => {
                    return (
                        <span key={wordIndex} className="inline-block whitespace-nowrap">
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
                                    className="inline-block max-md:!opacity-100 max-md:!translate-y-0 max-md:!rotate-x-0"
                                    style={shouldReduceMotion ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                                >
                                    {charObj.char}
                                </motion.span>
                            ))}
                            {wordIndex < PRECOMPUTED_WORDS.length - 1 && (
                                <span>&nbsp;</span>
                            )}
                        </span>
                    );
                })}
            </h1>

            {/* Subtext */}
            <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-lg md:text-2xl text-foreground/60 mb-16 text-center max-w-3xl px-6 z-10 font-medium leading-relaxed"
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            >
                {profile.hero.tagline}
            </motion.p>

            {/* Floating Skill Tags & Infinite Marquee */}
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

        </section>
    );
}
