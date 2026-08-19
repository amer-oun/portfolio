"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "rise" | "rise-lg" | "scale" | "wipe";

type Props = {
  children: ReactNode;
  /** Milliseconds to hold this item back, for staggering a list. */
  delay?: number;
  variant?: Variant;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Scroll reveal that degrades to plain visible content.
 *
 * The hidden state is only applied after hydration (`armed`), so server output,
 * crawlers, and any browser where the effect never runs render the section
 * fully visible. Gating visibility on a CSS transition is how pages ship blank.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "rise",
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Never hide anything we might not be able to un-hide.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    setArmed(true);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const state = !armed ? undefined : shown ? "shown" : "pending";

  return (
    <Tag
      ref={ref as never}
      data-reveal={state}
      data-variant={variant}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={className}
    >
      {children}
    </Tag>
  );
}
