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

        act(() => {
            // Because we use requestAnimationFrame, we need to advance the fake timer
            // but also simulate the RAF callbacks. Vitest fakeTimers mock RAF too.
            // Let's advance slightly more to ensure it resolves.
            vi.advanceTimersByTime(3600);
        });

        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText('Ready to Vibe')).toBeInTheDocument();
    });

    it('unmounts after reaching 100% and waiting 500ms', () => {
        const { container } = render(<LoadingScreen />);

        act(() => {
            vi.advanceTimersByTime(3600);
        });

        expect(screen.getByText('100%')).toBeInTheDocument();

        // Let's just verify it unmounts after 500ms instead of strictly 499ms
        act(() => {
            vi.advanceTimersByTime(501);
        });

        expect(screen.queryByText('100%')).not.toBeInTheDocument();
        expect(container).toBeEmptyDOMElement();
    });

    it('cleans up animation frame on unmount', () => {
        const spy = vi.spyOn(global, 'cancelAnimationFrame');
        const { unmount } = render(<LoadingScreen />);

        unmount();

        expect(spy).toHaveBeenCalled();
    });
});
