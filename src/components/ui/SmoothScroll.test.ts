import { expect, test, vi, afterEach } from "vitest";
import React from "react";

// Track the effect passed to useEffect
let effectCallback: (() => void | (() => void)) | undefined;

// Mock Global functions
const originalRAF = global.requestAnimationFrame;
global.requestAnimationFrame = (callback: FrameRequestCallback) => {
  return 1; // dummy handle
};

// Mock React before anything else
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useEffect: (effect: () => void | (() => void)) => {
      effectCallback = effect;
    },
  };
});

// Mock Lenis
export const destroySpy = vi.fn();
export const rafSpy = vi.fn();
export let capturedOptions: any = null;

vi.mock("lenis", () => {
  return {
    default: class MockLenis {
      constructor(options: any) {
        capturedOptions = options;
      }
      raf = rafSpy;
      destroy = destroySpy;
    }
  };
});

// Import the component AFTER mocking
import SmoothScroll from "./SmoothScroll";

afterEach(() => {
  effectCallback = undefined;
  capturedOptions = null;
  destroySpy.mockClear();
  rafSpy.mockClear();
});

test("SmoothScroll initializes Lenis with correct options and destroys it on unmount", () => {
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
    expect(typeof cleanup).toBe("function");

    // Execute cleanup
    if (typeof cleanup === "function") {
      cleanup();
      // Verify lenis.destroy() was called
      expect(destroySpy).toHaveBeenCalled();
    }
  }

  // Revert global change for this test
  global.requestAnimationFrame = originalRAF;
});
