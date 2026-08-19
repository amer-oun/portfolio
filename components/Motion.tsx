"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Owns every scroll-driven effect on the page.
 *
 * Lenis and ScrollTrigger share one ticker — running them independently makes
 * scrubbed animations jitter against the smoothed scroll.
 *
 * Nothing here is responsible for making content visible: the markup renders
 * complete without it, and these effects only animate an already-painted state.
 */
export default function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const bar = document.getElementById("scroll-progress");
    const setProgress = (p: number) =>
      bar?.style.setProperty("--progress", String(p));

    if (reduced.matches) {
      const onScroll = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ── Smooth scroll ─────────────────────────────────────────────────── */
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ({ progress }: { progress: number }) => {
      setProgress(progress);
      ScrollTrigger.update();
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (e: MouseEvent) => {
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
    document.addEventListener("click", onAnchorClick);

    const ctx = gsap.context(() => {
      /* ── Headings split into letters ─────────────────────────────────── */
      const splits: { el: HTMLElement; html: string }[] = [];

      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        splits.push({ el, html: el.innerHTML });
        const chars = [...el.textContent!].map((ch) =>
          ch === " "
            ? '<span class="char"> </span>'
            : `<span class="char">${ch === "<" ? "&lt;" : ch}</span>`,
        );
        el.innerHTML = chars.join("");

        gsap.from(el.querySelectorAll(".char"), {
          yPercent: 115,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.018,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* ── Project rows: depth instead of a layout trick ───────────────── */
      gsap.utils.toArray<HTMLElement>(".proj").forEach((row) => {
        const media = row.querySelector<HTMLElement>(".proj-frame");
        const copy = row.querySelector<HTMLElement>(".proj-copy");

        // The card settles into place as it enters.
        gsap.from(row, {
          y: 64,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 84%", once: true },
        });

        // Media and copy drift at slightly different rates the whole way
        // through, so the stack has depth rather than sliding as one block.
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: 5 },
            {
              yPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }
        if (copy) {
          gsap.fromTo(
            copy,
            { yPercent: -2.5 },
            {
              yPercent: 2.5,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }
      });

      /* ── Magnetic buttons ────────────────────────────────────────────── */
      const cleanups: (() => void)[] = [];

      gsap.utils.toArray<HTMLElement>(".magnetic").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - (r.left + r.width / 2)) * 0.28,
            y: (e.clientY - (r.top + r.height / 2)) * 0.36,
            duration: 0.6,
            ease: "expo.out",
          });
        };
        const reset = () =>
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });

        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", reset);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", reset);
        });
      });

      return () => {
        cleanups.forEach((fn) => fn());
        splits.forEach(({ el, html }) => {
          el.innerHTML = html;
        });
      };
    });

    // Images settle late; recompute trigger positions once they have.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(tick);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return null;
}
