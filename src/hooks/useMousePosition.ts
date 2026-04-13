import { useMotionValue } from 'framer-motion';
import { MouseEvent as ReactMouseEvent } from 'react';

export function useMousePosition() {
    const clientX = useMotionValue(0);
    const clientY = useMotionValue(0);

    const handleMouseMove = (e: ReactMouseEvent | MouseEvent) => {
        clientX.set(e.clientX);
        clientY.set(e.clientY);
    };

    return { clientX, clientY, handleMouseMove };
}
