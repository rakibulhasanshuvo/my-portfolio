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

    // Lightweight static radial gradients for mobile.
    // Provides the "Cyber-Luxury" vibe with large color blobs without
    // the severe GPU penalty of animated mix-blend-mode and huge blur radiuses.
    if (isMobile) {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-5%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.15)_0%,transparent_70%)]" />
                <div className="absolute top-[30%] right-[-20%] w-[90vw] h-[90vw] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,transparent_70%)]" />
                <div className="absolute bottom-[10%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.15)_0%,transparent_70%)]" />
            </div>
        );
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Layer 1 - Slowest */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[120px] dark:mix-blend-screen mix-blend-multiply opacity-50 dark:opacity-100"
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
                className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full blur-[100px] dark:mix-blend-screen mix-blend-multiply opacity-50 dark:opacity-100"
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
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[140px] dark:mix-blend-screen mix-blend-multiply opacity-50 dark:opacity-100"
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
