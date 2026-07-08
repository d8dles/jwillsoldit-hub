import { useEffect, useRef } from 'react';

export function CursorTrail() {
  const markerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let rafId = 0;
    let active = false;

    function frame() {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      marker!.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        marker.style.opacity = '1';
        rafId = requestAnimationFrame(frame);
      }
    }

    function onLeave() {
      marker.style.opacity = '0';
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={markerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        pointerEvents: 'none',
        zIndex: 999,
        opacity: 0,
        transition: 'opacity 160ms ease',
        filter: 'drop-shadow(0 0 10px rgba(224, 58, 31, 0.22))',
      }}
    >
      <svg viewBox="0 0 200 195" width="24" height="24" focusable="false">
        <path
          d="M53,2 L99,2 L99,35 L111,37 L146,46 L188,52 L188,78 L193,97 L190,117 L169,131 L153,139 L141,153 L142,180 L138,183 L113,173 L107,155 L89,128 L78,116 L65,114 L56,126 L44,124 L32,119 L26,102 L6,88 L2,82 L53,78 Z"
          fill="rgba(224, 58, 31, 0.72)"
          stroke="rgba(176, 92, 46, 0.92)"
          strokeWidth="8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
