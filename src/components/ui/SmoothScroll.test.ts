import { describe, it, expect, vi, afterEach } from 'vitest';

// Track the effect passed to useEffect
let effectCallback: (() => void | (() => void)) | undefined;

// Mock Global functions
const originalRAF = global.requestAnimationFrame;
global.requestAnimationFrame = vi.fn(() => {
  return 1; // dummy handle
});

// Mock React before anything else
vi.mock('react', async () => {
  const actualReact = await vi.importActual('react');
  return {
    ...actualReact,
    useEffect: (effect: () => void | (() => void)) => {
      effectCallback = effect;
    },
    useState: (initialState: any) => [initialState, vi.fn()],
  };
});

// Mock Lenis
const destroySpy = vi.fn();
const rafSpy = vi.fn();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let capturedOptions: any = null;

vi.mock('lenis', () => {
  class MockLenis {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(options: any) {
      capturedOptions = options;
    }
    raf = rafSpy;
    destroy = destroySpy;
  }
  return {
    default: MockLenis,
  };
});

// Mock useMobile
const useMobileSpy = vi.fn();
vi.mock('@/hooks/useMobile', () => ({
  useMobile: () => useMobileSpy(),
}));

// Import the component AFTER mocking
import SmoothScroll from './SmoothScroll';

describe('SmoothScroll', () => {
  afterEach(() => {
    effectCallback = undefined;
    capturedOptions = null;
    destroySpy.mockClear();
    rafSpy.mockClear();
    useMobileSpy.mockClear();
    global.requestAnimationFrame = originalRAF;
  });

  it('initializes Lenis with correct options and destroys it on unmount', () => {
    useMobileSpy.mockReturnValue(false);

    // Render the component (this triggers useEffect mock)
    SmoothScroll();

    expect(effectCallback).toBeDefined();

    if (effectCallback) {
      // Execute the effect
      const cleanup = effectCallback();

      // Verify Lenis was initialized with correct options
      expect(capturedOptions).toBeDefined();
      expect(capturedOptions.duration).toBe(1.2);
      expect(capturedOptions.orientation).toBe('vertical');
      expect(capturedOptions.gestureOrientation).toBe('vertical');
      expect(capturedOptions.smoothWheel).toBe(true);

      // Verify cleanup is a function
      expect(typeof cleanup).toBe('function');

      // Execute cleanup
      if (typeof cleanup === 'function') {
        cleanup();
        // Verify lenis.destroy() was called
        expect(destroySpy).toHaveBeenCalled();
      }
    }
  });

  it('does not initialize Lenis when isMobile is true', () => {
    useMobileSpy.mockReturnValue(true);

    // Mock requestAnimationFrame locally to count calls
    const mockRAF = vi.fn();
    global.requestAnimationFrame = mockRAF;

    // Render the component
    SmoothScroll();

    expect(effectCallback).toBeDefined();

    if (effectCallback) {
      // Execute the effect
      const cleanup = effectCallback();

      // Verify Lenis was NOT initialized
      expect(capturedOptions).toBeNull();

      // Verify requestAnimationFrame was NOT called
      expect(mockRAF).not.toHaveBeenCalled();

      // Verify cleanup is undefined (since it returns early)
      expect(cleanup).toBeUndefined();
    }
  });
});
