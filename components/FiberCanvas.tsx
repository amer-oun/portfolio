"use client";

import { useEffect, useRef, useState } from "react";

type Strand = {
  /** Cubic bezier control points, in normalised 0..1 space. */
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  p3: [number, number];
  width: number;
  alpha: number;
};

type Pulse = {
  strand: number;
  t: number;
  speed: number;
  size: number;
  life: number;
};

const STRANDS = 13;
const PULSES = 22;

function cubic(
  a: number,
  b: number,
  c: number,
  d: number,
  t: number,
): number {
  const mt = 1 - t;
  return mt * mt * mt * a + 3 * mt * mt * t * b + 3 * mt * t * t * c + t * t * t * d;
}

function makeStrands(): Strand[] {
  const out: Strand[] = [];
  for (let i = 0; i < STRANDS; i++) {
    const y = (i + 0.5) / STRANDS;
    const drift = (Math.random() - 0.5) * 0.34;
    out.push({
      p0: [-0.05, y + (Math.random() - 0.5) * 0.06],
      p1: [0.3, y + drift],
      p2: [0.7, y - drift],
      p3: [1.05, y + (Math.random() - 0.5) * 0.06],
      width: 0.6 + Math.random() * 0.9,
      alpha: 0.1 + Math.random() * 0.16,
    });
  }
  return out;
}

/**
 * Light travelling down fibre strands.
 *
 * The subject of the site is fibre-optic field work, so the hero background is
 * literally that: pulses of light running along bent glass. Strands bow away
 * from the pointer.
 *
 * It renders nothing when the visitor asks for reduced motion, and stops its
 * loop whenever the hero is scrolled out of view.
 */
export default function FiberCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    setActive(true);

    const strands = makeStrands();
    const pulses: Pulse[] = Array.from({ length: PULSES }, () => ({
      strand: Math.floor(Math.random() * STRANDS),
      t: Math.random(),
      speed: 0.0012 + Math.random() * 0.0028,
      size: 26 + Math.random() * 46,
      life: 1,
    }));

    // Pre-rendered glow sprite: far cheaper than a gradient per pulse per frame.
    const sprite = document.createElement("canvas");
    const S = 128;
    sprite.width = sprite.height = S;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const g = sctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
      g.addColorStop(0, "rgba(150, 190, 255, 0.95)");
      g.addColorStop(0.22, "rgba(70, 130, 246, 0.55)");
      g.addColorStop(1, "rgba(59, 130, 246, 0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, S, S);
    }

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Pointer, in normalised space. Starts off-canvas so nothing bends at load.
    const pointer = { x: -1, y: -1, tx: -1, ty: -1 };
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / Math.max(1, rect.width);
      pointer.ty = (e.clientY - rect.top) / Math.max(1, rect.height);
    };
    const onLeave = () => {
      pointer.tx = -1;
      pointer.ty = -1;
    };

    let running = false;
    let frame = 0;

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, w, h);

      // Ease the pointer so the bend trails the cursor instead of snapping.
      if (pointer.tx < 0) {
        pointer.x += (-1 - pointer.x) * 0.06;
        pointer.y += (-1 - pointer.y) * 0.06;
      } else {
        pointer.x += (pointer.tx - pointer.x) * 0.09;
        pointer.y += (pointer.ty - pointer.y) * 0.09;
      }

      const bend = (nx: number, ny: number): [number, number] => {
        if (pointer.x < 0) return [nx, ny];
        const dx = nx - pointer.x;
        const dy = (ny - pointer.y) * 0.6;
        const d2 = dx * dx + dy * dy;
        const r = 0.075;
        if (d2 > r) return [nx, ny];
        const push = (1 - d2 / r) * 0.09;
        const d = Math.sqrt(d2) || 0.0001;
        return [nx + (dx / d) * push, ny + (dy / d) * push];
      };

      // Strands
      ctx.globalCompositeOperation = "source-over";
      for (const s of strands) {
        const [c1x, c1y] = bend(s.p1[0], s.p1[1]);
        const [c2x, c2y] = bend(s.p2[0], s.p2[1]);
        ctx.beginPath();
        ctx.moveTo(s.p0[0] * w, s.p0[1] * h);
        ctx.bezierCurveTo(
          c1x * w,
          c1y * h,
          c2x * w,
          c2y * h,
          s.p3[0] * w,
          s.p3[1] * h,
        );
        ctx.strokeStyle = `rgba(120, 160, 220, ${s.alpha})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }

      // Pulses
      ctx.globalCompositeOperation = "lighter";
      for (const p of pulses) {
        const s = strands[p.strand];
        if (!s) continue;
        const [c1x, c1y] = bend(s.p1[0], s.p1[1]);
        const [c2x, c2y] = bend(s.p2[0], s.p2[1]);

        const x = cubic(s.p0[0], c1x, c2x, s.p3[0], p.t) * w;
        const y = cubic(s.p0[1], c1y, c2y, s.p3[1], p.t) * h;

        // Fade in and out at the ends so pulses do not pop.
        const edge = Math.min(p.t, 1 - p.t);
        const fade = Math.min(1, edge / 0.12);
        const size = p.size * (0.75 + fade * 0.35);

        ctx.globalAlpha = 0.5 * fade;
        ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);

        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.strand = Math.floor(Math.random() * STRANDS);
          p.speed = 0.0012 + Math.random() * 0.0028;
          p.size = 26 + Math.random() * 46;
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (running) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    // Only burn frames while the hero is actually on screen.
    const io = new IntersectionObserver(
      (entries) => (entries[0]?.isIntersecting ? start() : stop()),
      { threshold: 0.02 },
    );
    io.observe(canvas);

    const onVisibility = () =>
      document.hidden ? stop() : io.takeRecords().length || start();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.parentElement?.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      canvas.parentElement?.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      {/* Shown until the canvas takes over, and permanently under reduced motion. */}
      {!active && <div aria-hidden className="fiber-fallback" />}
      <canvas ref={ref} aria-hidden className="fiber-canvas" />
    </>
  );
}
