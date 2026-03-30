'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMobile } from '@/hooks/useMobile';

export default function AuroraBackground() {
    const isMobile = useMobile(768, true);
    const { scrollYProgress } = useScroll();

    // Create parallax effect - different speeds for different layers
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200], { clamp: false });
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100], { clamp: false });
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -300], { clamp: false });

    // Fallback static gradient for mobile to save GPU cycles
    if (isMobile) {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-gradient-to-tr from-purple-900/30 via-indigo-900/20 to-background" />
        );
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 hidden md:block">
            {/* Layer 1 - Slowest */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full md:blur-[120px] dark:mix-blend-screen mix-blend-multiply opacity-50 dark:opacity-100"
                style={{ y: y1, willChange: 'transform' }}
                animate={{
                    x: [0, 100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Layer 2 - Medium */}
            <motion.div
                className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full md:blur-[100px] dark:mix-blend-screen mix-blend-multiply opacity-50 dark:opacity-100"
                style={{ y: y2, willChange: 'transform' }}
                animate={{
                    x: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* Layer 3 - Fastest parallax */}
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full md:blur-[140px] dark:mix-blend-screen mix-blend-multiply opacity-50 dark:opacity-100"
                style={{ y: y3, willChange: 'transform' }}
                animate={{
                    x: [0, 50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
            />
        </div>
    );
}
