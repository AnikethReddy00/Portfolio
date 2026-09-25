'use client';

import { useEffect, useRef } from 'react';

/**
 * High-performance pointer tracker hook.
 * Uses mutable ref to avoid ANY React re-renders during mouse movement.
 */
export function usePointerTracker() {
  const pointer = useRef({
    x: 0, // normalized -1 (left) to +1 (right)
    y: 0, // normalized -1 (bottom) to +1 (top)
    isOutside: false,
    reducedMotion: false,
  });

  useEffect(() => {
    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    pointer.current.reducedMotion = motionQuery.matches;

    const handleMotionChange = (e) => {
      pointer.current.reducedMotion = e.matches;
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    }

    const handlePointerMove = (e) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;

      // Normalize to [-1, 1]
      const nx = (clientX / w) * 2 - 1;
      const ny = -((clientY / h) * 2 - 1); // Invert Y so up is positive

      pointer.current.x = Math.max(-1, Math.min(1, nx));
      pointer.current.y = Math.max(-1, Math.min(1, ny));
      pointer.current.isOutside = false;
    };

    const handlePointerLeave = () => {
      pointer.current.isOutside = true;
    };

    const handleWindowBlur = () => {
      pointer.current.isOutside = true;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    window.addEventListener('blur', handleWindowBlur, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handleWindowBlur);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      }
    };
  }, []);

  return pointer;
}
