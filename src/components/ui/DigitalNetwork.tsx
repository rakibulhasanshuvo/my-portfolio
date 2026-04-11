'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseX: number;
    baseY: number;
}

import { useMobile } from '@/hooks/useMobile';

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
    if (distSq < 22500) { // 150 * 150
        const dist = Math.sqrt(distSq);
        const force = (150 - dist) / 150;
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
        if (Math.abs(dx) < 150 && Math.abs(dy) < 150) {
            const distSq = dx * dx + dy * dy;
            if (distSq < 22500) { // 150 * 150
                const dist = Math.sqrt(distSq);
                connections++;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
};

export default function DigitalNetwork() {
    const { isMobile, canvasRef, containerRef } = useDigitalNetwork();

    if (isMobile) {
        return (
            <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden">
                <ArchitecturalGrid />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden">
            <ArchitecturalGrid />
            <AuroraGradients />

            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
}
