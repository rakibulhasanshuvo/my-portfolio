'use client';



import { ArchitecturalGrid } from "./DigitalNetwork/ArchitecturalGrid";
import { AuroraGradients } from "./DigitalNetwork/AuroraGradients";
import { useDigitalNetwork } from '@/components/ui/DigitalNetwork/useDigitalNetwork';

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
