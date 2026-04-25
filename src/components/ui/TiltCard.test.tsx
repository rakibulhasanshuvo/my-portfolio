import { forwardRef, type HTMLAttributes } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TiltCard from './TiltCard';

const mocks = vi.hoisted(() => {
    return {
        // We track the mocks by index, so re-renders won't break it
        motionValueSets: [vi.fn(), vi.fn()],
    };
});

vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    let callIndex = 0;

    return {
        ...actual,
        useMotionValue: vi.fn((initialValue) => {
            // Re-use stable mocks across renders (0 for x, 1 for y)
            const index = callIndex % 2;
            const setFn = mocks.motionValueSets[index];
            callIndex++;
            return {
                get: () => initialValue,
                set: setFn,
            };
        }),
        useSpring: vi.fn((val) => val),
        useTransform: vi.fn((val) => val),
        motion: {
            div: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, onMouseMove, onMouseLeave, className, style, ...props }, ref) => (
                <div
                    ref={ref}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    className={className}
                    style={style}
                    data-testid="motion-div"
                    {...props}
                >
                    {children}
                </div>
            )),
        },
    };
});

describe('TiltCard Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Mock getBoundingClientRect
        HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
            width: 200,
            height: 100,
            top: 50,
            left: 50,
            bottom: 150,
            right: 250,
            x: 50,
            y: 50,
            toJSON: () => {}
        }));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders children correctly', () => {
        render(<TiltCard><div data-testid="child">Content</div></TiltCard>);
        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('updates motion values correctly on mouse move', () => {
        render(
            <TiltCard>
                <div>Card</div>
            </TiltCard>
        );

        // First useMotionValue is for x, second is for y
        const mockXSet = mocks.motionValueSets[0];
        const mockYSet = mocks.motionValueSets[1];

        const motionDiv = screen.getAllByTestId('motion-div')[0];

        // Ensure we are dispatching on the element that handles onMouseMove
        fireEvent.mouseMove(motionDiv, {
            clientX: 150, // xPos = (150 - 50) / 200 = 0.5
            clientY: 100, // yPos = (100 - 50) / 100 = 0.5
        });

        // The exact values sent to x.set and y.set
        expect(mockXSet).toHaveBeenCalledWith(0.5);
        expect(mockYSet).toHaveBeenCalledWith(0.5);

        // Another move event to test different values
        fireEvent.mouseMove(motionDiv, {
            clientX: 200, // xPos = (200 - 50) / 200 = 0.75
            clientY: 75,  // yPos = (75 - 50) / 100 = 0.25
        });

        expect(mockXSet).toHaveBeenCalledWith(0.75);
        expect(mockYSet).toHaveBeenCalledWith(0.25);
    });

    it('resets motion values on mouse leave', () => {
        render(
            <TiltCard>
                <div>Card</div>
            </TiltCard>
        );

        const mockXSet = mocks.motionValueSets[0];
        const mockYSet = mocks.motionValueSets[1];

        const motionDiv = screen.getAllByTestId('motion-div')[0];

        fireEvent.mouseLeave(motionDiv);

        expect(mockXSet).toHaveBeenCalledWith(0.5);
        expect(mockYSet).toHaveBeenCalledWith(0.5);
    });

    it('handles mouse events even when className is not provided', () => {
        render(<TiltCard><div>Content</div></TiltCard>);

        const mockXSet = mocks.motionValueSets[0];
        const mockYSet = mocks.motionValueSets[1];

        const motionDiv = screen.getAllByTestId('motion-div')[0];

        fireEvent.mouseMove(motionDiv, {
            clientX: 50, // xPos = (50 - 50) / 200 = 0
            clientY: 150, // yPos = (150 - 50) / 100 = 1
        });
        expect(mockXSet).toHaveBeenCalledWith(0);
        expect(mockYSet).toHaveBeenCalledWith(1);
    });
});
