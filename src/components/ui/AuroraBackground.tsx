'use client';

import { motion } from 'framer-motion';
import { useMobile } from '@/hooks/useMobile';

export default function AuroraBackground() {
    const isMobile = useMobile(768, true);

    // Extract heavy Framer Motion scroll listeners to a child component
    // so they are never even registered/initialized on mobile devices.

    if (isMobile) {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-5%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.15)_0%,transparent_70%)]" />
                <div className="absolute top-[30%] right-[-20%] w-[90vw] h-[90vw] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,transparent_70%)]" />
                <div className="absolute bottom-[10%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.15)_0%,transparent_70%)]" />
            </div>
        );
    }

    return <DesktopAuroraBackground />;
}

function DesktopAuroraBackground() {
    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
            style={{ perspective: '1000px' }}
        >
            {/* Layer 1 - Slowest */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[120px] dark:mix-blend-screen mix-blend-multiply opacity-50 dark:opacity-100"
                style={{ transform: 'translateZ(-300px) scale(1.3)', willChange: 'transform' }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
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
                style={{ transform: 'translateZ(-200px) scale(1.2)', willChange: 'transform' }}
                animate={{
                    x: [0, -50, 0],
                    y: [0, -30, 0],
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
                style={{ transform: 'translateZ(-100px) scale(1.1)', willChange: 'transform' }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 80, 0],
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
