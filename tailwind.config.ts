import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Every token resolves through a CSS variable so the /terminal route
        // can swap the whole palette with one class instead of a second theme.
        bg: "var(--paper)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        border: "var(--border)",
        ink: "var(--ink)",
        inksoft: "var(--ink-soft)",
        muted: "var(--muted)",
        accent: "var(--brand)",
        accentdeep: "var(--brand-deep)",
        accentsoft: "var(--brand-soft)",
        warn: "var(--warn)",
        err: "var(--err)",
        link: "var(--link)",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      zIndex: {
        sticky: "100",
        overlay: "200",
      },
    },
  },
  plugins: [],
};

export default config;
