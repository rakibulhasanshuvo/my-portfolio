'use client';

import dynamic from 'next/dynamic';
import type { Application } from '@splinetool/runtime';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            {/* Cyber-Grid Loading Fallback */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    color: 'var(--foreground)'
                }}
            />
            <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin relative z-10" />
        </div>
    ),
});

interface SplineSceneProps {
    scene: string;
    className?: string;
    onLoad?: (spline: Application) => void;
}

export default function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
    return (
        <div className={className}>
            <Spline scene={scene} onLoad={onLoad} />
        </div>
    );
}
