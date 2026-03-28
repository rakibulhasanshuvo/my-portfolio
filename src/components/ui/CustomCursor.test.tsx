import { render, fireEvent, screen } from '@testing-library/react';
import CustomCursor from './CustomCursor';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

let motionValues: any[] = [];

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, animate, ...props }: any) => (
      <div
        data-testid="cursor"
        data-animate={JSON.stringify(animate)}
        style={{ ...style }}
        {...props}
      >
        {children}
      </div>
    ),
  },
  useMotionValue: vi.fn((val) => {
    const mock = { get: () => val, set: vi.fn() };
    motionValues.push(mock);
    return mock;
  }),
  useSpring: vi.fn((val) => val),
}));

describe('CustomCursor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    motionValues = [];
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly initially', () => {
    render(<CustomCursor />);
    const cursor = screen.getByTestId('cursor');
    expect(cursor).toBeInTheDocument();

    // Expect animate scale to be 1 and background transparent (isHovered = false)
    const animateProp = JSON.parse(cursor.getAttribute('data-animate') || '{}');
    expect(animateProp.scale).toBe(1);
    expect(animateProp.backgroundColor).toBe('rgba(255,255,255,0)');
  });

  it('updates cursorX and cursorY motion values on mousemove', () => {
    render(<CustomCursor />);

    // motionValues should have 2 elements: X and Y.
    expect(motionValues.length).toBe(2);
    const cursorX = motionValues[0];
    const cursorY = motionValues[1];

    fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });

    expect(cursorX.set).toHaveBeenCalledWith(100 - 16); // 84
    expect(cursorY.set).toHaveBeenCalledWith(200 - 16); // 184
  });

  it('does not set isHovered when hovering over non-clickable elements', () => {
    const { container } = render(
      <div>
        <CustomCursor />
        <div data-testid="non-clickable">Text</div>
      </div>
    );

    const nonClickable = screen.getByTestId('non-clickable');
    fireEvent.mouseOver(nonClickable);

    const cursor = screen.getByTestId('cursor');
    const animateProp = JSON.parse(cursor.getAttribute('data-animate') || '{}');
    expect(animateProp.scale).toBe(1);
    expect(animateProp.backgroundColor).toBe('rgba(255,255,255,0)');
  });

  it('sets isHovered to true when hovering over an anchor tag', () => {
    render(
      <div>
        <CustomCursor />
        <a href="#" data-testid="link">Link</a>
      </div>
    );

    const link = screen.getByTestId('link');
    fireEvent.mouseOver(link);

    const cursor = screen.getByTestId('cursor');
    const animateProp = JSON.parse(cursor.getAttribute('data-animate') || '{}');
    expect(animateProp.scale).toBe(2.5);
    expect(animateProp.backgroundColor).toBe('rgba(255,255,255,1)');
  });

  it('sets isHovered to true when hovering over a button', () => {
    render(
      <div>
        <CustomCursor />
        <button data-testid="btn">Button</button>
      </div>
    );

    const button = screen.getByTestId('btn');
    fireEvent.mouseOver(button);

    const cursor = screen.getByTestId('cursor');
    const animateProp = JSON.parse(cursor.getAttribute('data-animate') || '{}');
    expect(animateProp.scale).toBe(2.5);
  });

  it('sets isHovered to true when hovering over an element with .clickable class', () => {
    render(
      <div>
        <CustomCursor />
        <div className="clickable" data-testid="clickable-div">Click me</div>
      </div>
    );

    const clickableDiv = screen.getByTestId('clickable-div');
    fireEvent.mouseOver(clickableDiv);

    const cursor = screen.getByTestId('cursor');
    const animateProp = JSON.parse(cursor.getAttribute('data-animate') || '{}');
    expect(animateProp.scale).toBe(2.5);
  });

  it('removes event listeners on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<CustomCursor />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('mouseover', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseover', expect.any(Function));
  });
});
