'use client';

import { useEffect, useRef } from 'react';

export default function DigitalNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000, active: false };
        let pulses: Pulse[] = [];

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            vx: number;
            vy: number;
            size: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.5;
            }

            update(w: number, h: number) {
                // Drift
                this.baseX += this.vx;
                this.baseY += this.vy;

                if (this.baseX < 0 || this.baseX > w) this.vx *= -1;
                if (this.baseY < 0 || this.baseY > h) this.vy *= -1;

                this.x = this.baseX;
                this.y = this.baseY;

                // Push effect
                if (mouse.active) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceRadius = 150;

                    if (distance < forceRadius) {
                        const force = (forceRadius - distance) / forceRadius;
                        const directionX = dx / distance;
                        const directionY = dy / distance;
                        this.x += directionX * force * 50;
                        this.y += directionY * force * 50;
                    }
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(147, 51, 234, 0.4)';
                ctx.fill();
            }
        }

        class Pulse {
            x: number;
            y: number;
            r: number;
            maxR: number;
            speed: number;
            opacity: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.r = 0;
                this.maxR = 200 + Math.random() * 300;
                this.speed = 1 + Math.random() * 2;
                this.opacity = 0.3;
            }

            update() {
                this.r += this.speed;
                this.opacity = 0.3 * (1 - this.r / this.maxR);
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(147, 51, 234, ${this.opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            isDead() {
                return this.r >= this.maxR;
            }
        }

        const resize = () => {
            // We use fixed sizing based on viewport to avoid massive canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Reasonable number of particles for performance
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 100);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw pulses
            if (Math.random() < 0.01 && pulses.length < 3) {
                pulses.push(new Pulse(canvas.width, canvas.height));
            }

            pulses = pulses.filter(p => {
                p.update();
                p.draw();
                return !p.isDead();
            });

            // Update and draw particles
            particles.forEach((p, i) => {
                p.update(canvas.width, canvas.height);
                p.draw();

                // Optimized connection logic (limited radius and connections)
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(147, 51, 234, ${0.15 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMove = (e: MouseEvent | TouchEvent) => {
            mouse.active = true;
            const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
            const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
            mouse.x = clientX;
            mouse.y = clientY;
        };

        const handleLeave = () => {
            mouse.active = false;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchstart', handleMove, { passive: true });
        window.addEventListener('touchmove', handleMove, { passive: true });
        window.addEventListener('mouseleave', handleLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchstart', handleMove);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('mouseleave', handleLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        >
            {/* Architectural Grid Background - Uses standard CSS pattern */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, currentColor 1px, transparent 1px),
                        linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
                }}
            />

            {/* Canvas Particle Layer - Fixed position to avoid massive canvas size */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 block h-screen w-screen"
            />

            {/* Subtle Gradient Overlay for depth and smoothing edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
    );
}
