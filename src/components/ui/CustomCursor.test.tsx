import { render, fireEvent, cleanup } from '@testing-library/react';
import { expect, test, vi, afterEach, beforeEach, describe } from "vitest";

import CustomCursor from './CustomCursor';
import React from 'react';

const mockSet = vi.fn();

// Mock Framer Motion
vi.mock('framer-motion', async () => {
    const React = await import('react');
    return {
        motion: {
            div: React.forwardRef(({ animate, style, ...props }: any, ref: any) => (
                <div
                    ref={ref}
                    data-testid="custom-cursor"
                    data-scale={animate?.scale}
                    data-bg={animate?.backgroundColor}
                    {...props}
                />
            )),
        },
        useMotionValue: vi.fn((initial) => {
            return {
                current: initial,
                set: mockSet,
            };
        }),
        useSpring: vi.fn((val) => val),
    };
});

describe('CustomCursor', () => {
    beforeEach(() => {
        mockSet.mockClear();
    });

    afterEach(() => {
        cleanup();
    });

    test('renders correctly with default styles', () => {
        const { getByTestId } = render(<CustomCursor />);
        const cursor = getByTestId('custom-cursor');

        expect(cursor).not.toBeNull();
        expect(cursor.className).toContain('fixed');
        expect(cursor.className).toContain('top-0');
        expect(cursor.className).toContain('pointer-events-none');

        // Initial animation state
        expect(cursor.getAttribute('data-scale')).toBe('1');
        expect(cursor.getAttribute('data-bg')).toBe('rgba(255,255,255,0)');
    });

    test('updates motion values on mousemove', () => {
        render(<CustomCursor />);

        // Dispatch mousemove
        fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });

        // Expected offsets are - 16
        // Because both cursorX and cursorY use the same mockSet fn, we can just assert it was called
        // with both X and Y target values on a single mousemove event.
        expect(mockSet).toHaveBeenCalledWith(100 - 16);
        expect(mockSet).toHaveBeenCalledWith(200 - 16);
    });

    test('scales up and changes color when hovering over clickable elements', () => {
        const { getByTestId } = render(
            <div>
                <CustomCursor />
                <a href="#" data-testid="link">Link</a>
                <button data-testid="btn">Button</button>
                <div className="clickable" data-testid="clickable-div">Clickable</div>
                <div data-testid="non-clickable">Text</div>
            </div>
        );

        const cursor = getByTestId('custom-cursor');

        // Hover over a link
        fireEvent.mouseOver(getByTestId('link'));
        expect(cursor.getAttribute('data-scale')).toBe('2.5');
        expect(cursor.getAttribute('data-bg')).toBe('rgba(255,255,255,1)');

        // Hover over non-clickable
        fireEvent.mouseOver(getByTestId('non-clickable'));
        expect(cursor.getAttribute('data-scale')).toBe('1');
        expect(cursor.getAttribute('data-bg')).toBe('rgba(255,255,255,0)');

        // Hover over button
        fireEvent.mouseOver(getByTestId('btn'));
        expect(cursor.getAttribute('data-scale')).toBe('2.5');

        // Hover over element with .clickable class
        fireEvent.mouseOver(getByTestId('clickable-div'));
        expect(cursor.getAttribute('data-scale')).toBe('2.5');
    });

    test('cleans up event listeners on unmount', () => {
        const addSpy = vi.spyOn(window, 'addEventListener');
        const removeSpy = vi.spyOn(window, 'removeEventListener');

        const { unmount } = render(<CustomCursor />);

        expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(addSpy).toHaveBeenCalledWith('mouseover', expect.any(Function));

        unmount();

        expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(removeSpy).toHaveBeenCalledWith('mouseover', expect.any(Function));

        addSpy.mockRestore();
        removeSpy.mockRestore();
    });
});
