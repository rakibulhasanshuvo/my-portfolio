import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LoadingScreen from './LoadingScreen';

// Mock framer-motion to avoid dealing with AnimatePresence exit animations in jsdom
vi.mock('framer-motion', async () => {
    const actual: any = await vi.importActual('framer-motion');
    return {
        ...actual,
        AnimatePresence: ({ children }: any) => {
            // Because children can be a conditional true/false, we just return it
            return children || null;
        },
        motion: {
            ...actual.motion,
            div: require('react').forwardRef((props: any, ref: any) => {
                const { initial, animate, exit, transition, ...rest } = props;
                return <div ref={ref} {...rest} />;
            }),
            p: require('react').forwardRef((props: any, ref: any) => {
                const { initial, animate, exit, transition, ...rest } = props;
                return <p ref={ref} {...rest} />;
            }),
        }
    };
});

describe('LoadingScreen', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('should render the loading screen initially with 0% progress', () => {
        render(<LoadingScreen />);

        expect(screen.getByText('0%')).toBeInTheDocument();
        expect(screen.getByText('Initializing Experience')).toBeInTheDocument();
        expect(screen.getByText(/Rakibul/)).toBeInTheDocument();
    });

    it('should update progress over time', async () => {
        render(<LoadingScreen />);

        // Initial state
        expect(screen.getByText('0%')).toBeInTheDocument();

        // Advance timer by 100ms (one interval)
        act(() => {
            vi.advanceTimersByTime(100);
        });

        // The progress is randomly incremented by Math.floor(Math.random() * 10) + 1
        // Since we can't predict the exact number, we expect it to NOT be 0% anymore
        expect(screen.queryByText('0%')).not.toBeInTheDocument();
        expect(screen.getByText('Initializing Experience')).toBeInTheDocument();
    });

    it('should reach 100% progress and display Ready to Vibe', () => {
        // We can mock Math.random to make the progress predictable
        const mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.9); // will add 10 each time

        render(<LoadingScreen />);

        // 10 intervals of 100ms should bring it to 100%
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText('Ready to Vibe')).toBeInTheDocument();

        mathRandomSpy.mockRestore();
    });

    it('should unmount after reaching 100% and waiting 500ms', async () => {
        const mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.9);

        const { container } = render(<LoadingScreen />);

        // Advance to 100%
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(screen.getByText('100%')).toBeInTheDocument();

        // Advance by the 500ms timeout that sets isLoading to false
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // Let's actually advance it a bit more in case React state batching or setTimeout delays it slightly.
        act(() => {
            vi.runAllTimers();
        });

        expect(screen.queryByText('100%')).not.toBeInTheDocument();

        mathRandomSpy.mockRestore();
    });
});
