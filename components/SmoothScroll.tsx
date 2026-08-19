"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling + a top progress bar.
 *
 * Lenis is what makes the page feel weighted rather than steppy. It is skipped
 * entirely when the visitor asks for reduced motion, and anchor clicks are
 * routed through it so in-page links keep working.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const bar = document.getElementById("scroll-progress");
    const setProgress = (p: number) => {
      bar?.style.setProperty("--progress", String(p));
    };

    if (reduced.matches) {
      const onScroll = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out-quart
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ({ progress }: { progress: number }) => {
      setProgress(progress);
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Same-page anchors must go through Lenis or they jump.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
