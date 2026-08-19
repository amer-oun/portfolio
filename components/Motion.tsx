"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Owns every scroll-driven effect on the page.
 *
 * Lenis and ScrollTrigger must share one ticker — running them independently
 * makes pinned sections jitter against the smoothed scroll — so they are set up
 * together here rather than in separate components.
 *
 * Everything is skipped under prefers-reduced-motion, and nothing here is
 * responsible for making content visible: the markup renders complete without
 * it, and these effects only animate from an already-painted state.
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
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      /* ── Pinned horizontal project reel (desktop only) ───────────────── */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const section = document.querySelector<HTMLElement>("#work");
        const reel = document.querySelector<HTMLElement>(".reel");
        if (!section || !reel) return;

        reel.dataset.pinned = "true";

        const distance = () =>
          Math.max(0, reel.scrollWidth - window.innerWidth + 64);

        const tween = gsap.to(reel, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Each card lifts as it reaches the middle of the screen.
        const cards = gsap.utils.toArray<HTMLElement>(".reel-item");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.94, opacity: 0.55 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 82%",
                end: "center 52%",
                scrub: true,
              },
            },
          );
        });

        return () => {
          reel.dataset.pinned = "false";
          gsap.set(reel, { clearProps: "transform" });
          cards.forEach((c) => gsap.set(c, { clearProps: "transform,opacity" }));
        };
      });

      /* ── Magnetic buttons ────────────────────────────────────────────── */
      const magnets = gsap.utils.toArray<HTMLElement>(".magnetic");
      const cleanups: (() => void)[] = [];

      magnets.forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          gsap.to(el, {
            x: mx * 0.28,
            y: my * 0.36,
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
        mm.revert();
        splits.forEach(({ el, html }) => {
          el.innerHTML = html;
        });
      };
    });

    // Images settle late; recompute pin distances once they have.
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
