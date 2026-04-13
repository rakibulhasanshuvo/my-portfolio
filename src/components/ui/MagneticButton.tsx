'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, MouseEvent, ReactNode, RefObject } from 'react';
import Link from 'next/link';

// Create the motion component once, outside the render cycle
const MotionLink = motion.create(Link);

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}

export default function MagneticButton({ children, className, onClick, href }: MagneticButtonProps) {
    // We need to type this generally as HTMLDivElement to cover both button and anchor use cases for the ref
    // strictly speaking, we're using it to get bounding client rect.
    const ref = useRef<HTMLElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = e;

        if (!ref.current) return;

        const { height, width, left, top } = ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX);
        y.set(middleY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const commonProps = {
        ref,
        className,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: { x: mouseX, y: mouseY },
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.95 },
        onClick
    };

    if (href) {
        // External link
        if (href.startsWith('http') || href.startsWith('mailto:')) {
            return (
                <motion.a
                    href={href}
                    target={href.startsWith('http') ? "_blank" : undefined}
                    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                    {...commonProps}
                    ref={ref as RefObject<HTMLAnchorElement>}
                >
                    {children}
                </motion.a>
            );
        }
        // Internal link
        return (
            <MotionLink href={href} {...commonProps} ref={ref as RefObject<HTMLAnchorElement>}>
                {children}
            </MotionLink>
        );
    }

    // Default button behavior
    // We explicitly cast the ref for the button case if needed, but HTMLElement covers it
    return (
        <motion.button
            {...commonProps}
            ref={ref as RefObject<HTMLButtonElement>}
        >
            {children}
        </motion.button>
    );
}
