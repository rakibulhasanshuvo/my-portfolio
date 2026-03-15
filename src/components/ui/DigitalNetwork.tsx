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
            vx: number;
            vy: number;
            size: number;
            // Displacement for push effect
            dx: number = 0;
            dy: number = 0;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.5;
            }

            update(w: number, h: number, scrollOffset: number) {
                // Autonomous drift
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges
                if (this.x < 0) this.x = w;
                if (this.x > w) this.x = 0;
                if (this.y < 0) this.y = h;
                if (this.y > h) this.y = 0;

                // Calculate visual position (parallax)
                const visualY = (this.y - scrollOffset) % h;
                const finalVisualY = visualY < 0 ? visualY + h : visualY;

                // Push effect based on visual position
                if (mouse.active) {
                    const diffX = this.x - mouse.x;
                    const diffY = finalVisualY - mouse.y;
                    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
                    const forceRadius = 150;

                    if (distance < forceRadius) {
                        const force = (forceRadius - distance) / forceRadius;
                        this.dx += (diffX / distance) * force * 5;
                        this.dy += (diffY / distance) * force * 5;
                    }
                }

                // Friction for push displacement
                this.dx *= 0.9;
                this.dy *= 0.9;
            }

            getVisualPos(w: number, h: number, scrollOffset: number) {
                const visualY = (this.y - scrollOffset) % h;
                const finalVisualY = visualY < 0 ? visualY + h : visualY;
                return {
                    x: this.x + this.dx,
                    y: finalVisualY + this.dy
                };
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

            draw(w: number, h: number, scrollOffset: number) {
                if (!ctx) return;
                const visualY = (this.y - scrollOffset) % h;
                const finalVisualY = visualY < 0 ? visualY + h : visualY;

                ctx.beginPath();
                ctx.arc(this.x, finalVisualY, this.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(147, 51, 234, ${this.opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            isDead() {
                return this.r >= this.maxR;
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scrollOffset = window.scrollY * 0.15;
            const w = canvas.width;
            const h = canvas.height;

            // Pulses
            if (Math.random() < 0.005 && pulses.length < 2) {
                pulses.push(new Pulse(w, h));
            }
            pulses = pulses.filter(p => {
                p.update();
                p.draw(w, h, scrollOffset);
                return !p.isDead();
            });

            // Particles update
            particles.forEach(p => p.update(w, h, scrollOffset));

            // Particles draw & connect
            particles.forEach((p, i) => {
                const pos1 = p.getVisualPos(w, h, scrollOffset);

                ctx.beginPath();
                ctx.arc(pos1.x, pos1.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(147, 51, 234, 0.4)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const pos2 = p2.getVisualPos(w, h, scrollOffset);

                    const dx = pos1.x - pos2.x;
                    const dy = pos1.y - pos2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(pos1.x, pos1.y);
                        ctx.lineTo(pos2.x, pos2.y);
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
            className="absolute inset-0 pointer-events-none -z-[1] overflow-hidden isolate"
        >
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                {/* Architectural Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Canvas Layer */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 block w-full h-full opacity-60 dark:opacity-80"
                />

                {/* Smooth entry/exit overlays */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent" />
            </div>
        </div>
    );
}
