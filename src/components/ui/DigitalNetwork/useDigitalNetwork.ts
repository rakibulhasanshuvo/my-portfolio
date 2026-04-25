import { useEffect, useRef, useCallback } from 'react';
import { useMobile } from '@/hooks/useMobile';

const CONNECTION_DISTANCE = 150;
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseX: number;
    baseY: number;
}

const updateParticle = (p: Particle, canvasWidth: number, canvasHeight: number) => {
    // Movement
    p.x += p.vx;
    p.y += p.vy;

    // Bounce
    if (p.x < 0 || p.x > canvasWidth) p.vx *= -1;
    if (p.y < 0 || p.y > canvasHeight) p.vy *= -1;
};

const applyMouseInteraction = (p: Particle, currentMouse: { x: number; y: number }) => {
    // Mouse/Touch interaction (Push effect)
    const dx = currentMouse.x - p.x;
    const dy = currentMouse.y - p.y;
    const distSq = dx * dx + dy * dy;
    if (distSq < CONNECTION_DISTANCE_SQ) {
        const dist = Math.sqrt(distSq);
        const force = (CONNECTION_DISTANCE - dist) / CONNECTION_DISTANCE;
        p.x -= dx * force * 0.05;
        p.y -= dy * force * 0.05;
    }
};

const drawParticle = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();
};

const drawConnections = (
    ctx: CanvasRenderingContext2D,
    p: Particle,
    currentIndex: number,
    allParticles: Particle[],
    canvasWidth: number
) => {
    // Disable connection lines entirely on mobile to save CPU
    if (canvasWidth < 768) return;

    let connections = 0;
    for (let j = currentIndex + 1; j < allParticles.length; j++) {
        // Max 5 connections per particle to avoid dense web rendering overhead
        if (connections >= 5) break;

        const p2 = allParticles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;

        // Strict distance threshold (150px) check before expensive math
        if (Math.abs(dx) < CONNECTION_DISTANCE && Math.abs(dy) < CONNECTION_DISTANCE) {
            const distSq = dx * dx + dy * dy;
            if (distSq < CONNECTION_DISTANCE_SQ) {
                const dist = Math.sqrt(distSq);
                connections++;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / CONNECTION_DISTANCE)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
};

export function useDigitalNetwork() {
    const isMobile = useMobile(768, true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouse = useRef({ x: 0, y: 0 });
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number | null>(null);

    const initParticles = useCallback((width: number, height: number) => {
        const isMobileCanvas = width < 768;
        // On mobile, severely limit particle count to preserve the Matrix aesthetic without CPU strain
        const baseDensity = isMobileCanvas ? 40000 : 15000;
        const maxParticles = isMobileCanvas ? 15 : 75; // Reduced from 100 to save CPU
        const particleCount = Math.min(Math.floor((width * height) / baseDensity), maxParticles);

        particles.current = [];
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            particles.current.push({
                x,
                y,
                baseX: x,
                baseY: y,
                vx: (Math.random() - 0.5) * (isMobileCanvas ? 0.2 : 0.5), // Slower on mobile
                vy: (Math.random() - 0.5) * (isMobileCanvas ? 0.2 : 0.5),
                size: Math.random() * 2 + 1,
            });
        }
    }, []);

    useEffect(() => {
        if (isMobile) return;

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
                updateParticle(p, canvas.width, canvas.height);
                applyMouseInteraction(p, currentMouse);
                drawParticle(ctx, p);
                drawConnections(ctx, p, i, particles.current, canvas.width);
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
    }, [initParticles, isMobile]);

    return { isMobile, canvasRef, containerRef };
}
