import { useState, useEffect, useCallback } from 'react';
import type { Application } from '@splinetool/runtime';

export function useDeferredSplineMount() {
    const [mountSpline, setMountSpline] = useState(false);

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

        // Debug: log all object names to console if we still see text
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            console.log(spline.getAllObjects().map((o: any) => o.name));
        }
    }, []);

    return { mountSpline, handleSplineLoad };
}
