import { useState, useEffect } from 'react';

export function useMobile(breakpoint = 768, defaultState = false) {
  const [isMobile, setIsMobile] = useState<boolean>(defaultState);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // Check initial
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
      setHasHydrated(true);
    };

    checkIsMobile();

    // Listen for resize
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  // Return defaultState on server to avoid hydration mismatch while still providing better defaults
  if (!hasHydrated) return defaultState;

  return isMobile;
}
