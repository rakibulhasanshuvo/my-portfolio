'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface BlobProps {
    color: string;
    size: string;
    initialX: string;
    initialY: string;
    duration: number;
    delay?: number;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

const Blob = ({ color, size, initialX, initialY, duration, delay = 0, mouseX, mouseY }: BlobProps) => {
    const { scrollYProgress } = useScroll();
    const blobRef = useRef<HTMLDivElement>(null);

    // Parallax effect based on scroll
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -300 * (duration / 30)]);

    // Spring physics for smooth movement
    const pushX = useSpring(0, { stiffness: 30, damping: 15 });
    const pushY = useSpring(0, { stiffness: 30, damping: 15 });

    // Use state to store the initial center position to avoid layout thrashing
    const [center, setCenter] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateCenter = () => {
            if (blobRef.current) {
                const rect = blobRef.current.getBoundingClientRect();
                // We use the position relative to the viewport + scroll
                setCenter({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                });
            }
        };

        updateCenter();
        window.addEventListener('resize', updateCenter);
        window.addEventListener('scroll', updateCenter, { passive: true });
        return () => {
            window.removeEventListener('resize', updateCenter);
            window.removeEventListener('scroll', updateCenter);
        };
    }, []);

    useEffect(() => {
        const unsubscribeX = mouseX.on('change', (latestMouseX) => {
            if (center.x === 0) return;

            const latestMouseY = mouseY.get();
            const dx = latestMouseX - center.x;
            const dy = latestMouseY - center.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const radius = 400;
            if (distance < radius) {
                const force = (radius - distance) / radius;
                pushX.set(-(dx / distance) * force * 150);
                pushY.set(-(dy / distance) * force * 150);
            } else {
                pushX.set(0);
                pushY.set(0);
            }
        });

        return () => {
            unsubscribeX();
        };
    }, [center, mouseX, mouseY, pushX, pushY]);

    return (
        <motion.div
            ref={blobRef}
            className={`absolute rounded-full blur-[120px] mix-blend-screen opacity-40 dark:opacity-70 ${color}`}
            style={{
                width: size,
                height: size,
                left: initialX,
                top: initialY,
                x: pushX,
                y: useTransform([pushY, parallaxY], ([pY, paraY]) => (pY as number) + (paraY as number)),
            }}
        >
            {/* Inner rotating/floating part */}
            <motion.div
                className="w-full h-full rounded-full bg-inherit"
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -80, 80, 0],
                    scale: [1, 1.2, 0.8, 1],
                    rotate: [0, 90, 180, 0],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                }}
            />
        </motion.div>
    );
};

export default function InteractiveAurora() {
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if ('clientX' in e) {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            } else if (e.touches && e.touches.length > 0) {
                mouseX.set(e.touches[0].clientX);
                mouseY.set(e.touches[0].clientY);
            }
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchstart', handleMove, { passive: true });
        window.addEventListener('touchmove', handleMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchstart', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 h-full">
            {/* Content-wide distribution of aurora blobs */}

            {/* Top Area */}
            <Blob
                color="bg-purple-500"
                size="60vw"
                initialX="-10%"
                initialY="5%"
                duration={35}
                mouseX={mouseX}
                mouseY={mouseY}
            />
            <Blob
                color="bg-blue-500"
                size="50vw"
                initialX="60%"
                initialY="15%"
                duration={40}
                delay={2}
                mouseX={mouseX}
                mouseY={mouseY}
            />

            {/* Middle Area */}
            <Blob
                color="bg-indigo-500"
                size="70vw"
                initialX="20%"
                initialY="40%"
                duration={45}
                delay={5}
                mouseX={mouseX}
                mouseY={mouseY}
            />
            <Blob
                color="bg-fuchsia-500"
                size="55vw"
                initialX="-20%"
                initialY="55%"
                duration={38}
                delay={1}
                mouseX={mouseX}
                mouseY={mouseY}
            />

            {/* Lower Area */}
            <Blob
                color="bg-cyan-500"
                size="65vw"
                initialX="50%"
                initialY="75%"
                duration={42}
                delay={8}
                mouseX={mouseX}
                mouseY={mouseY}
            />
            <Blob
                color="bg-violet-500"
                size="50vw"
                initialX="0%"
                initialY="85%"
                duration={33}
                delay={3}
                mouseX={mouseX}
                mouseY={mouseY}
            />
        </div>
    );
}
