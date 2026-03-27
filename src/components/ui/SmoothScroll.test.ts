import { expect, test, mock, spyOn, afterEach } from "bun:test";
import React from "react";

// Track the effect passed to useEffect
let effectCallback: (() => void | (() => void)) | undefined;

// Mock Global functions
const originalRAF = global.requestAnimationFrame;
global.requestAnimationFrame = (callback: FrameRequestCallback) => {
  return 1; // dummy handle
};

// Mock React before anything else
mock.module("react", () => {
  return {
    ...React,
    useEffect: (effect: () => void | (() => void)) => {
      effectCallback = effect;
    },
  };
});

// Mock Lenis
const destroySpy = spyOn({ destroy: () => {} }, "destroy");
const rafSpy = spyOn({ raf: () => {} }, "raf");

let capturedOptions: any = null;

class MockLenis {
  constructor(options: any) {
    capturedOptions = options;
  }
  raf = rafSpy;
  destroy = destroySpy;
}

mock.module("lenis", () => {
  return {
    default: MockLenis,
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
