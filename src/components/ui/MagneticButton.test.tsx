import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

// Mock Next.js Link
vi.mock('next/link', () => {
    return {
        default: React.forwardRef(({ children, href, whileHover, whileTap, style, ...props }: any, ref) => {
            return (
                <a href={href} {...props} ref={ref as any} data-testid="next-link">
                    {children}
                </a>
            );
        }),
    };
});

// Mock framer-motion
vi.mock('framer-motion', async () => {
    // Create mock motion values that we can spy on
    const mockMotionValue = (initial: number) => {
        let current = initial;
        return {
            get: () => current,
            set: vi.fn((val: number) => { current = val; }),
            onChange: vi.fn(),
            onRenderRequest: vi.fn()
        };
    };

    return {
        useMotionValue: vi.fn((initial: number) => mockMotionValue(initial)),
        useSpring: vi.fn((val: any) => val), // just pass through the motion value
        motion: {
            button: React.forwardRef(({ children, whileHover, whileTap, style, ...props }: any, ref) => (
                <button ref={ref as any} {...props} data-testid="motion-button">
                    {children}
                </button>
            )),
            a: React.forwardRef(({ children, whileHover, whileTap, style, ...props }: any, ref) => (
                <a ref={ref as any} {...props} data-testid="motion-a">
                    {children}
                </a>
            )),
            create: (Component: any) => React.forwardRef((props: any, ref) => (
                <Component ref={ref} {...props} />
            ))
        }
    };
});

// Import component after mocks
import MagneticButton from './MagneticButton';

describe('MagneticButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Mock getBoundingClientRect for the ref elements
        Element.prototype.getBoundingClientRect = vi.fn(() => ({
            width: 100,
            height: 50,
            top: 20,
            left: 30,
            bottom: 70,
            right: 130,
            x: 30,
            y: 20,
            toJSON: () => {}
        }));
    });

    it('renders as a default button when no href is provided', () => {
        render(<MagneticButton>Click Me</MagneticButton>);
        const button = screen.getByTestId('motion-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Click Me');
    });

    it('renders as an external anchor when an external href is provided', () => {
        render(<MagneticButton href="https://example.com">External Link</MagneticButton>);
        const link = screen.getByTestId('motion-a');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://example.com');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders as an external anchor when a mailto href is provided', () => {
        render(<MagneticButton href="mailto:test@example.com">Email Link</MagneticButton>);
        const link = screen.getByTestId('motion-a');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'mailto:test@example.com');
        // target and rel should be undefined for mailto: according to component logic
        expect(link).not.toHaveAttribute('target', '_blank');
        expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders as a Next.js Link when an internal href is provided', () => {
        render(<MagneticButton href="/about">Internal Link</MagneticButton>);
        const link = screen.getByTestId('next-link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/about');
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<MagneticButton onClick={handleClick}>Click Me</MagneticButton>);
        const button = screen.getByTestId('motion-button');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calculates correct coordinates on mouse move', async () => {
        const { useMotionValue } = await import('framer-motion');

        // Reset the mock to track calls properly
        const mockX = { set: vi.fn(), get: () => 0 };
        const mockY = { set: vi.fn(), get: () => 0 };

        (useMotionValue as any)
            .mockReturnValueOnce(mockX)
            .mockReturnValueOnce(mockY);

        render(<MagneticButton>Move Me</MagneticButton>);
        const button = screen.getByTestId('motion-button');

        // Trigger mouse move with clientX and clientY
        // Bounding box: left=30, top=20, width=100, height=50
        // Center: x = 30 + 100/2 = 80, y = 20 + 50/2 = 45
        fireEvent.mouseMove(button, { clientX: 100, clientY: 60 });

        // Middle calculation:
        // middleX = clientX - center_x = 100 - 80 = 20
        // middleY = clientY - center_y = 60 - 45 = 15

        expect(mockX.set).toHaveBeenCalledWith(20);
        expect(mockY.set).toHaveBeenCalledWith(15);
    });

    it('resets coordinates to 0 on mouse leave', async () => {
        const { useMotionValue } = await import('framer-motion');

        const mockX = { set: vi.fn(), get: () => 0 };
        const mockY = { set: vi.fn(), get: () => 0 };

        (useMotionValue as any)
            .mockReturnValueOnce(mockX)
            .mockReturnValueOnce(mockY);

        render(<MagneticButton>Leave Me</MagneticButton>);
        const button = screen.getByTestId('motion-button');

        // Trigger mouse leave
        fireEvent.mouseLeave(button);

        expect(mockX.set).toHaveBeenCalledWith(0);
        expect(mockY.set).toHaveBeenCalledWith(0);
    });
});
