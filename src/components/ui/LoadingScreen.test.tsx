import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LoadingScreen from './LoadingScreen';

// Mock framer-motion to bypass async animation delays
vi.mock('framer-motion', () => {
    return {
        motion: {
            div: ({ children, className, ...props }: any) => {
                // Remove framer-motion specific props to avoid React warnings on DOM elements
                const { initial, animate, exit, transition, ...rest } = props;
                return (
                    <div className={className} data-testid="motion-div" {...rest}>
                        {children}
                    </div>
                );
            },
            p: ({ children, className, ...props }: any) => {
                const { initial, animate, exit, transition, ...rest } = props;
                return (
                    <p className={className} data-testid="motion-p" {...rest}>
                        {children}
                    </p>
                );
            },
        },
        AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

describe('LoadingScreen', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders initial state correctly', () => {
        render(<LoadingScreen />);

        expect(screen.getByText('0%')).toBeInTheDocument();
        expect(screen.getByText('Rakibul')).toBeInTheDocument();
        expect(screen.getByText('Initializing Experience')).toBeInTheDocument();
    });

    it('increments progress and updates text when complete', () => {
        render(<LoadingScreen />);

        // The exact progress is random (Math.random() * 10) + 1.
        // The minimum increment is 1, so in 100 intervals (10000ms) it's guaranteed to reach 100.
        act(() => {
            vi.advanceTimersByTime(10000);
        });

        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText('Ready to Vibe')).toBeInTheDocument();
    });

    it('unmounts after reaching 100% and waiting 500ms', () => {
        const { container } = render(<LoadingScreen />);

        // Advance until progress is 100
        act(() => {
            vi.advanceTimersByTime(10000);
        });

        expect(screen.getByText('100%')).toBeInTheDocument();

        // Advance 499ms - should still be in document
        act(() => {
            vi.advanceTimersByTime(499);
        });
        expect(screen.getByText('100%')).toBeInTheDocument();

        // Advance remaining 1ms - should unmount
        act(() => {
            vi.advanceTimersByTime(1);
        });

        expect(screen.queryByText('100%')).not.toBeInTheDocument();
        expect(container).toBeEmptyDOMElement();
    });

    it('cleans up interval on unmount', () => {
        const spy = vi.spyOn(global, 'clearInterval');
        const { unmount } = render(<LoadingScreen />);

        // Unmount before reaching 100%
        unmount();

        expect(spy).toHaveBeenCalled();
    });
});
