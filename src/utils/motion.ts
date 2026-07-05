import { useEffect, useRef } from 'react';

// Restrained motion only: IntersectionObserver reveal + CSS transitions.
// Honors prefers-reduced-motion. No scroll-jacking, no WebGL, no 3D — ever.

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Adds `is-revealed` to the element when it enters the viewport.
 * Pair with the `.reveal` class from globals.css.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Calls back with true while `el` is on screen — used by the mobile action
 * bar to get out of the way when the footer is visible.
 */
export function useOnScreen(targetId: string, onChange: (visible: boolean) => void) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) onChange(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId, onChange]);
}
