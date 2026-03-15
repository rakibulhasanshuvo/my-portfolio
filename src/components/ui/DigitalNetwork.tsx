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
            dx: number = 0;
            dy: number = 0;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.size = Math.random() * 3 + 2;
            }

            update(w: number, h: number, scrollOffset: number) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = w;
                if (this.x > w) this.x = 0;
                if (this.y < 0) this.y = h;
                if (this.y > h) this.y = 0;

                const visualY = (this.y - scrollOffset) % h;
                const finalVisualY = visualY < 0 ? visualY + h : visualY;

                if (mouse.active) {
                    const diffX = this.x - mouse.x;
                    const diffY = finalVisualY - mouse.y;
                    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
                    const forceRadius = 300;

                    if (distance < forceRadius) {
                        const force = (forceRadius - distance) / forceRadius;
                        this.dx += (diffX / distance) * force * 15;
                        this.dy += (diffY / distance) * force * 15;
                    }
                }

                this.dx *= 0.85;
                this.dy *= 0.85;
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
                this.maxR = 400 + Math.random() * 400;
                this.speed = 4 + Math.random() * 4;
                this.opacity = 1.0;
            }

            update() {
                this.r += this.speed;
                this.opacity = 1.0 * (1 - this.r / this.maxR);
            }

            draw(w: number, h: number, scrollOffset: number) {
                if (!ctx) return;
                const visualY = (this.y - scrollOffset) % h;
                const finalVisualY = visualY < 0 ? visualY + h : visualY;

                ctx.beginPath();
                ctx.arc(this.x, finalVisualY, this.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(192, 132, 252, ${this.opacity})`;
                ctx.lineWidth = 4;
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
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 4000), 200);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scrollOffset = window.scrollY * 0.3;
            const w = canvas.width;
            const h = canvas.height;

            if (Math.random() < 0.015 && pulses.length < 6) {
                pulses.push(new Pulse(w, h));
            }
            pulses = pulses.filter(p => {
                p.update();
                p.draw(w, h, scrollOffset);
                return !p.isDead();
            });

            particles.forEach(p => p.update(w, h, scrollOffset));

            particles.forEach((p, i) => {
                const pos1 = p.getVisualPos(w, h, scrollOffset);

                ctx.beginPath();
                ctx.arc(pos1.x, pos1.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(232, 121, 249, 1)'; // Neon pink/purple
                ctx.fill();

                ctx.shadowBlur = 25;
                ctx.shadowColor = 'rgba(232, 121, 249, 0.8)';

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const pos2 = p2.getVisualPos(w, h, scrollOffset);

                    const dx = pos1.x - pos2.x;
                    const dy = pos1.y - pos2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 280) {
                        ctx.beginPath();
                        ctx.moveTo(pos1.x, pos1.y);
                        ctx.lineTo(pos2.x, pos2.y);
                        ctx.strokeStyle = `rgba(232, 121, 249, ${0.7 * (1 - dist / 280)})`;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                }
                ctx.shadowBlur = 0;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMove = (e: MouseEvent | TouchEvent) => {
            mouse.active = true;
            const clientX = 'clientX' in e ? (e as any).clientX : (e as TouchEvent).touches[0].clientX;
            const clientY = 'clientY' in e ? (e as any).clientY : (e as TouchEvent).touches[0].clientY;
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
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                {/* Aurora Gradients - Extreme visibility */}
                <div className="absolute inset-0 overflow-hidden opacity-100">
                    <div className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-purple-600/50 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
                    <div className="absolute top-[10%] -right-[10%] w-[90%] h-[90%] bg-blue-600/50 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
                    <div className="absolute bottom-[0%] left-[10%] w-[80%] h-[80%] bg-indigo-600/40 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '10s', animationDelay: '5s' }} />
                    <div className="absolute top-[30%] left-[20%] w-[90%] h-[90%] bg-fuchsia-600/40 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '15s', animationDelay: '8s' }} />
                </div>

                {/* Architectural Grid - High Contrast */}
                <div
                    className="absolute inset-0 opacity-[0.5] dark:opacity-[0.6]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(232, 121, 249, 0.6) 2.5px, transparent 2.5px),
                            linear-gradient(to bottom, rgba(232, 121, 249, 0.6) 2.5px, transparent 2.5px)
                        `,
                        backgroundSize: '150px 150px',
                    }}
                />

                {/* Canvas Layer */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 block w-full h-full opacity-100"
                />

                {/* Smooth entry/exit overlays */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
        </div>
    );
}
