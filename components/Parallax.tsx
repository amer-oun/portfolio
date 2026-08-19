"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Drifts its child a few pixels against the scroll while the element is on
 * screen. Transform-only, driven by rAF, and observed so the maths stops when
 * the row is nowhere near the viewport.
 */
export default function Parallax({
  children,
  amount = 26,
  className = "",
}: {
  children: ReactNode;
  /** Peak offset in pixels, applied symmetrically around centre. */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 when the element sits below the fold, +1 when it has passed above.
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      el.style.setProperty("--shift", `${(clamped * amount).toFixed(2)}px`);
    };

    const schedule = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) schedule();
      },
      { rootMargin: "120px 0px" },
    );

    io.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [amount]);

  return (
    <div ref={ref} className={`parallax ${className}`}>
      {children}
    </div>
  );
}
