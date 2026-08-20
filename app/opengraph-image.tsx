import { ImageResponse } from "next/og";

// The card LinkedIn, X and Discord unfurl. Generated rather than shipped as a
// binary so it stays in step with the palette instead of drifting from it.
// Satori has no oklch, so the tokens are inlined here as their sRGB values.
export const alt = "Amer Oun — Full-stack developer · Tunis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121418",
          padding: "72px 80px",
        }}
      >
        {/* Status dot + wordmark: the site's one live element, kept live here. */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: "#3082f6",
              marginRight: 16,
            }}
          />
          <div style={{ fontSize: 26, color: "#8c9097", letterSpacing: 1 }}>
            amer-oun.vercel.app
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#e7e8eb",
              lineHeight: 1.05,
            }}
          >
            Amer Oun
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#5ca6ff",
              marginTop: 20,
            }}
          >
            Full-stack developer · Tunis
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#8c9097",
              marginTop: 22,
            }}
          >
            Next.js · Python · Flutter — building web, mobile and data
            products for real clients.
          </div>
        </div>

        {/* The rule reads as the fibre strands behind the hero, flattened. */}
        <div style={{ display: "flex", height: 6, width: "100%" }}>
          <div style={{ flex: 3, background: "#3082f6" }} />
          <div style={{ flex: 7, background: "#31343a" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
