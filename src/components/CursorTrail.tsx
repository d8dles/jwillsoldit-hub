import { useEffect, useRef } from 'react';

export function CursorTrail() {
  const markerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    const markerEl = marker;

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
      x += (targetX - x) * 0.24;
      y += (targetY - y) * 0.24;
      markerEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        markerEl.style.opacity = '1';
        rafId = requestAnimationFrame(frame);
      }
    }

    function onLeave() {
      markerEl.style.opacity = '0';
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
        width: 22,
        height: 22,
        pointerEvents: 'none',
        zIndex: 999,
        opacity: 0,
        transition: 'opacity 160ms ease',
        filter: 'drop-shadow(0 7px 8px rgba(13, 13, 13, 0.16)) drop-shadow(0 0 8px rgba(224, 58, 31, 0.16))',
      }}
    >
      <svg viewBox="0 0 200 195" width="22" height="22" focusable="false">
        <defs>
          <linearGradient id="txCursor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(250, 247, 242, 0.95)" />
            <stop offset="0.55" stopColor="rgba(224, 58, 31, 0.72)" />
            <stop offset="1" stopColor="rgba(176, 92, 46, 0.82)" />
          </linearGradient>
        </defs>
        <path
          d="M53,2 L99,2 L99,35 L111,37 L146,46 L188,52 L188,78 L193,97 L190,117 L169,131 L153,139 L141,153 L142,180 L138,183 L113,173 L107,155 L89,128 L78,116 L65,114 L56,126 L44,124 L32,119 L26,102 L6,88 L2,82 L53,78 Z"
          fill="url(#txCursor)"
          stroke="rgba(176, 92, 46, 0.86)"
          strokeWidth="7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
