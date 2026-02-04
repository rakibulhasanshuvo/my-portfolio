'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring physics for the cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        // Attach listeners to clickable elements
        const attachListeners = () => {
            const clickables = document.querySelectorAll('a, button, .clickable');
            clickables.forEach((el) => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        window.addEventListener('mousemove', moveCursor);
        attachListeners();

        // Re-attach listeners when DOM might change (simple polling for demo)
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
                backgroundColor: isHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    );
}
