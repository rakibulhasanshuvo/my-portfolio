'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent, ReactNode } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 300, damping: 30 });

    // Glare gradient - moved to top level
    const glareBackground = useTransform(
        [x, y],
        ([latestX, latestY]) =>
            `radial-gradient(circle at ${Number(latestX) * 100}% ${Number(latestY) * 100}%, rgba(255,255,255,0.1), transparent 50%)`
    );

    const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width;
        const yPos = (e.clientY - rect.top) / rect.height;
        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative ${className}`}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            {children}
            {/* Glare effect */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: glareBackground }}
            />
        </motion.div>
    );
}
