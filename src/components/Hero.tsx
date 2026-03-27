'use client';

import { motion } from 'framer-motion';
import { useCallback } from 'react';
import type { Application } from '@splinetool/runtime';
import AuroraBackground from './ui/AuroraBackground';
import SplineScene from './ui/SplineScene';
import { profile } from '@/data/profile';

const skills = profile.hero.skills;
const duplicatedSkills = [...skills, ...skills, ...skills];

export default function Hero() {
    const words = "Rakibul Hasan Shuvo".split(" ");

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

        // Debug: log all object names to console if we still see text
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            console.log(spline.getAllObjects().map((o: any) => o.name));
        }
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden pt-32">

            <AuroraBackground />

            {/* 3D Spline Design - Hidden on mobile for performance */}
            <SplineScene
                scene="https://prod.spline.design/qF9apOu8tJv1sgOk/scene.splinecode"
                onLoad={handleSplineLoad}
                className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
            />

            {/* Overline label */}
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="overline-label z-10"
            >
                Digital Architect & Developer
            </motion.span>

            {/* Main Heading */}
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
                                    initial={{ opacity: 0, y: 100, rotateX: -90 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{
                                        duration: 1,
                                        delay: (prevWordsLength + charIndex) * 0.03,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="inline-block"
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

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-lg md:text-2xl text-foreground/60 mb-16 text-center max-w-3xl px-6 z-10 font-medium leading-relaxed"
            >
                {profile.hero.tagline}
            </motion.p>

            {/* Floating Skill Tags & Infinite Marquee */}
            <div className="w-full max-w-4xl overflow-hidden relative z-10 mask-gradient py-10">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 35
                    }}
                >
                    {duplicatedSkills.map((skill, index) => (
                        <motion.div
                            key={index}
                            animate={{
                                y: [0, -10, 0]
                            }}
                            transition={{
                                duration: 3 + (index % 3), // Deterministic duration based on index
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.2 // Deterministic delay
                            }}
                            className="px-6 py-3 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md text-sm font-medium text-foreground/80 hover:bg-foreground/10 transition-colors cursor-default hover:border-foreground/20"
                        >
                            {skill}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
