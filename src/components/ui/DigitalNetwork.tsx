'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMobile } from '@/hooks/useMobile';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseX: number;
    baseY: number;
}

export default function DigitalNetwork() {
    const isMobile = useMobile(768, true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Parallax effects
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const mouse = useRef({ x: 0, y: 0 });
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number | null>(null);

    const initParticles = useCallback((width: number, height: number) => {
        // Completely skip rendering particles on mobile to save GPU/CPU cycles
        if (width < 768) {
            particles.current = [];
            return;
        }

        const baseDensity = 15000;
        const particleCount = Math.min(Math.floor((width * height) / baseDensity), 100);

        particles.current = [];
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            particles.current.push({
                x,
                y,
                baseX: x,
                baseY: y,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
            });
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas.width, canvas.height);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const currentMouse = mouse.current;

            // Update and draw particles
            particles.current.forEach((p, i) => {
                // Movement
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse/Touch interaction (Push effect)
                const dx = currentMouse.x - p.x;
                const dy = currentMouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    p.x -= dx * force * 0.05;
                    p.y -= dy * force * 0.05;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.fill();

                // Connections (Limited proximity calculations for performance)
                for (let j = i + 1; j < particles.current.length; j++) {
                    const p2 = particles.current[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;

                    // Quick distance check before sqrt
                    if (Math.abs(dx) < 150 && Math.abs(dy) < 150) {
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 150) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 150)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [initParticles]);

    // Return early with static grid on mobile
    if (isMobile) {
        return (
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                 <div
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        color: 'var(--foreground)'
                    }}
                />
            </div>
        )
    }

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden md:block">
            {/* Architectural Grid */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    color: 'var(--foreground)'
                }}
            />

            {/* Aurora Gradients */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-600/10 rounded-full md:blur-[120px] animate-pulse"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full md:blur-[120px] animate-pulse"
            />
            <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-indigo-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-[10%] left-[10%] w-[50vw] h-[50vw] bg-fuchsia-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />

            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
}
