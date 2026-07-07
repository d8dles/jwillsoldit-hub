import { useEffect, useRef } from 'react';

// Subtle copper ember cursor trail — editorial trace, not a game effect.
// Desktop fine-pointer only. Honors prefers-reduced-motion. rAF + fixed
// particle pool, pointer-events: none, zero layout reads in the hot path.

const POOL_SIZE = 56;
const LIFE_MS = 560;
const SPAWN_SPACING = 13; // px between spawned particles along the pointer path

interface Particle {
  x: number;
  y: number;
  born: number;
  drift: number;
  alive: boolean;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const pool: Particle[] = Array.from({ length: POOL_SIZE }, () => ({
      x: 0,
      y: 0,
      born: 0,
      drift: 0,
      alive: false,
    }));
    let poolIndex = 0;
    let aliveCount = 0;
    let rafId = 0;
    let running = false;
    let lastX: number | null = null;
    let lastY: number | null = null;

    function spawn(x: number, y: number, now: number) {
      const p = pool[poolIndex];
      poolIndex = (poolIndex + 1) % POOL_SIZE;
      if (!p.alive) aliveCount++;
      p.x = x;
      p.y = y;
      p.born = now;
      p.drift = (Math.random() - 0.5) * 0.5;
      p.alive = true;
    }

    function frame() {
      const now = performance.now();
      ctx!.clearRect(0, 0, width, height);

      for (const p of pool) {
        if (!p.alive) continue;
        const t = (now - p.born) / LIFE_MS;
        if (t >= 1) {
          p.alive = false;
          aliveCount--;
          continue;
        }
        const fade = 1 - t;
        // ember: warm orange cooling toward copper as it dies
        const r = Math.round(232 - 40 * t);
        const g = Math.round(93 - 15 * t);
        const b = Math.round(42 + 4 * t);
        ctx!.beginPath();
        ctx!.arc(
          p.x + p.drift * t * 26,
          p.y - t * 9, // gentle upward drift
          0.5 + 2.1 * fade,
          0,
          Math.PI * 2
        );
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${(0.38 * fade * fade).toFixed(3)})`;
        ctx!.fill();
      }

      if (aliveCount > 0) {
        rafId = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }

    function ensureRunning() {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(frame);
      }
    }

    function onMove(e: MouseEvent) {
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;
      if (lastX === null || lastY === null) {
        spawn(x, y, now);
      } else {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(Math.floor(dist / SPAWN_SPACING), 6);
        for (let i = 1; i <= steps; i++) {
          spawn(lastX + (dx * i) / (steps + 1), lastY + (dy * i) / (steps + 1), now);
        }
        if (dist >= SPAWN_SPACING) spawn(x, y, now);
      }
      lastX = x;
      lastY = y;
      ensureRunning();
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        running = false;
      } else if (aliveCount > 0) {
        ensureRunning();
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999,
      }}
    />
  );
}
