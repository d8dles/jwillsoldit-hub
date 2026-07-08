import { useEffect, useRef } from 'react';

const TEXAS_PATH =
  'M66 10 H116 V41 L133 43 L153 49 L176 54 L218 58 L222 78 L230 92 L226 112 L211 123 L194 131 L181 140 L170 153 L169 177 L162 198 L145 190 L132 169 L119 153 L106 139 L94 130 L82 128 L72 137 L61 132 L53 121 L44 112 L31 104 L10 98 H66 Z';

const TRAIL_COUNT = 7;

export function CursorTrail() {
  const marksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const marks = marksRef.current.filter(Boolean);
    if (!marks.length) return;

    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    const points = marks.map(() => ({ x: targetX, y: targetY }));
    let rafId = 0;
    let active = false;

    function frame() {
      points[0].x += (targetX - points[0].x) * 0.26;
      points[0].y += (targetY - points[0].y) * 0.26;

      for (let i = 1; i < points.length; i += 1) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.22;
        points[i].y += (points[i - 1].y - points[i].y) * 0.22;
      }

      marks.forEach((mark, index) => {
        const scale = 1 - index * 0.045;
        const opacity = active ? Math.max(0.1, 0.72 - index * 0.095) : 0;
        mark.style.opacity = String(opacity);
        mark.style.transform = `translate3d(${points[index].x}px, ${points[index].y}px, 0) translate(-50%, -50%) scale(${scale})`;
      });

      rafId = requestAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        rafId = requestAnimationFrame(frame);
      }
    }

    function onLeave() {
      active = false;
      marks.forEach((mark) => {
        mark.style.opacity = '0';
      });
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
    <>
      {Array.from({ length: TRAIL_COUNT }, (_, index) => (
        <div
          key={index}
          ref={(node) => {
            if (node) marksRef.current[index] = node;
          }}
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: index === 0 ? 26 : 23,
            height: index === 0 ? 24 : 22,
            pointerEvents: 'none',
            zIndex: 999,
            opacity: 0,
            transition: 'opacity 120ms ease',
          }}
        >
          <svg viewBox="0 0 240 215" width="100%" height="100%" focusable="false">
            <path
              d={TEXAS_PATH}
              fill="none"
              stroke={index === 0 ? 'rgba(224, 58, 31, 0.92)' : 'rgba(176, 92, 46, 0.62)'}
              strokeWidth={index === 0 ? 10 : 8}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      ))}
    </>
  );
}
