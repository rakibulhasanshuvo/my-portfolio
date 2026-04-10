'use client';

import { useCallback, useState, useEffect } from 'react';
import type { Application } from '@splinetool/runtime';
import dynamic from 'next/dynamic';
import { useMobile } from '@/hooks/useMobile';

const SplineScene = dynamic(() => import('@/components/ui/SplineScene'), {
    ssr: false,
});

export default function HeroSpline() {
    // Default to true during SSR to prevent heavy 3D loading before hydration on mobile.
    // This might cause a hydration mismatch if loaded on desktop, but the visual pop-in
    // is better than a 20s lockup on mobile.
    const isMobile = useMobile(1024, true);
    const [mountSpline, setMountSpline] = useState(false);

    // Defer mounting the heavy Spline component until the main thread is idle
    // This allows the initial UI and critical rendering path to complete instantly.
    useEffect(() => {
        let mounted = true;

        // Use requestIdleCallback if available to only mount when CPU is not busy
        if ('requestIdleCallback' in window) {
            const idleId = window.requestIdleCallback(() => {
                if (mounted) setMountSpline(true);
            }, { timeout: 3000 }); // Force mount after 3s if never idle

            return () => {
                mounted = false;
                window.cancelIdleCallback(idleId);
            };
        } else {
            // Fallback for Safari
            const timer = setTimeout(() => {
                if (mounted) setMountSpline(true);
            }, 1000);

            return () => {
                mounted = false;
                clearTimeout(timer);
            };
        }
    }, []);

    const handleSplineLoad = useCallback((spline: Application) => {
        // Find and hide all objects that appear to be text
        // Based on the scene URL, it has "Clarity. Focus. Impact." and subtext
        const objectsToHide = [
            'Clarity. Focus. Impact.',
            'A multidisciplinary creative designing the future with code and intuition.',
            'Text',
            'Text 2',
            'Text 3'
        ];

        objectsToHide.forEach(objName => {
            const obj = spline.findObjectByName(objName);
            if (obj) {
                obj.visible = false;
            }
        });

        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            console.log(spline.getAllObjects().map((o: any) => ({ name: o.name, type: o.type })));
        }
    }, []);

    return (
        <>
            {/* 3D Spline Design - Hidden on mobile for performance */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
                {!isMobile && mountSpline && (
                    <SplineScene
                        scene="https://prod.spline.design/qF9apOu8tJv1sgOk/scene.splinecode"
                        onLoad={handleSplineLoad}
                        className="w-full h-full"
                    />
                )}
            </div>

            {/* Mobile Static Fallback */}
            <div className="absolute inset-0 z-0 pointer-events-none block lg:hidden bg-gradient-to-b from-purple-900/20 via-background to-background" />
        </>
    );
}
