'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { Application } from '@splinetool/runtime';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />,
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
