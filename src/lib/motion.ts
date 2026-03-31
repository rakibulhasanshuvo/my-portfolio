import { useReducedMotion } from 'framer-motion';
import { useMobile } from '@/hooks/useMobile';
import { useState, useEffect } from 'react';

export const useOptimizedMotion = () => {
  const isMobile = useMobile(768);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const transition = isMobile
    ? { type: "tween" as const, duration: 0.3, ease: "easeOut" as const }
    : { type: "spring" as const, stiffness: 300, damping: 20 };

  return {
    isMobile: mounted ? isMobile : false,
    shouldReduceMotion: mounted ? shouldReduceMotion : false,
    transition,
    mounted
  };
};
