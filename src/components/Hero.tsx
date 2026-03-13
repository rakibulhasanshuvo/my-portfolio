'use client';

import { motion } from 'framer-motion';
import { useCallback } from 'react';
import AuroraBackground from './ui/AuroraBackground';
import SplineScene from './ui/SplineScene';

const skills = [
    "Vibe Coder", "Graphic Design", "React", "Motion", "UX/UI", "Next.js", "TypeScript", "Cyber Security"
];

export default function Hero() {
    const name = "Rakibul Hasan Shuvo".split("");

    const handleSplineLoad = useCallback((spline: any) => {
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
        // console.log(spline.getAllObjects().map((o: any) => o.name));
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

            {/* Main Heading */}
            <h1 className="text-5xl md:text-8xl font-bold text-center tracking-tight mb-6 z-10 relative">
                <span className="absolute inset-0 blur-2xl bg-purple-500/10 rounded-full -z-10" />
                {name.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.05,
                            ease: [0.2, 0.65, 0.3, 0.9]
                        }}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </h1>

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-lg md:text-xl text-white/60 mb-12 text-center max-w-2xl px-6 glow-text z-10"
            >
                A multidisciplinary creative designing the future with code and intuition.
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
                    {[...skills, ...skills, ...skills].map((skill, index) => (
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
                            className="px-6 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-sm font-medium text-white/80 hover:bg-white/10 transition-colors cursor-default hover:border-white/20"
                        >
                            {skill}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
