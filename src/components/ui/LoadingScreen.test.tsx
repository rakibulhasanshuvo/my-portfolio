import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoadingScreen from './LoadingScreen';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => {
    return {
        motion: {
            div: vi.fn(({ children, ...props }) => <div {...props}>{children}</div>),
            p: vi.fn(({ children, ...props }) => <p {...props}>{children}</p>),
        },
        AnimatePresence: vi.fn(({ children }) => <>{children}</>),
    };
});

describe('LoadingScreen', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    it('renders the LoadingScreen and increments progress', () => {
        render(<LoadingScreen />);

        // Wait for first interval
        act(() => {
            vi.advanceTimersByTime(100);
        });

        // The counter should increase, verify some loading text is present
        expect(screen.getByText(/Rakibul/)).toBeInTheDocument();
        expect(screen.getByText('Initializing Experience')).toBeInTheDocument();

        // Advance a lot of time to finish
        act(() => {
            vi.advanceTimersByTime(20000);
        });

        // The progress text should say Ready to Vibe when it finishes before unmounting
        expect(screen.queryByText('Ready to Vibe')).toBeInTheDocument();
        expect(screen.getByText('100%')).toBeInTheDocument();

        // Advance time to pass the 500ms timeout that sets isLoading to false
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // The component should return false when it unmounts
        expect(screen.queryByText(/Rakibul/)).not.toBeInTheDocument();
    });
});
