import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amer Oun — Full-stack developer · Tunis",
  description:
    "Amer Oun · Full-stack developer in Tunis · Next.js, Python, Flutter · Open to junior roles. Building web, mobile and data products for real clients.",
  metadataBase: new URL("https://amer-oun.vercel.app"),
  openGraph: {
    title: "Amer Oun — Full-stack developer",
    description:
      "Building web, mobile and data products for real clients. Open to junior roles.",
    type: "website",
    locale: "en_US",
    siteName: "Amer Oun",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amer Oun — Full-stack developer",
    description: "Building web, mobile and data products for real clients.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
