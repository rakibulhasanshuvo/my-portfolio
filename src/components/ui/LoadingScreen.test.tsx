import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import LoadingScreen from './LoadingScreen';

// We mock framer-motion because AnimatePresence can sometimes delay unmounting in JSDOM,
// and we only want to test the logical component states (isLoading = true vs false).
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: { children: React.ReactNode, className?: string }) => (
            <div className={className}>{children}</div>
        ),
        p: ({ children, className }: { children: React.ReactNode, className?: string }) => (
            <p className={className}>{children}</p>
        ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('LoadingScreen', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('renders initial state correctly', () => {
        render(<LoadingScreen />);
        expect(screen.getByText('0%')).toBeInTheDocument();
        expect(screen.getByText('Initializing Experience')).toBeInTheDocument();
        expect(screen.getByText('Rakibul')).toBeInTheDocument();

        act(() => {
            vi.clearAllTimers(); // avoid hanging state updates from setInterval
        });
    });

    it('progresses to 100% and changes status text', () => {
        render(<LoadingScreen />);

        // Advance timers to simulate progression
        act(() => {
            vi.advanceTimersByTime(3000); // 100ms * ~10-15 random increments up to 10 should easily reach 100
        });

        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText('Ready to Vibe')).toBeInTheDocument();

        act(() => {
            vi.clearAllTimers();
        });
    });

    it('hides after reaching 100% and waiting 500ms', () => {
        render(<LoadingScreen />);

        // Advance timers to reach 100%
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // Verify it reached 100%
        expect(screen.getByText('100%')).toBeInTheDocument();

        // Wait the additional 500ms timeout before hiding
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // After 500ms, setIsLoading(false) is called, which unmounts the children.
        expect(screen.queryByText('100%')).not.toBeInTheDocument();
    });
});
