import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amer Oun — Terminal Portfolio",
  description:
    "Amer Oun · Full-stack developer in Tunis · Next.js, Python, Flutter · Open to junior roles.",
  metadataBase: new URL("https://amer-oun.vercel.app"),
  openGraph: {
    title: "Amer Oun — Full-stack developer",
    description:
      "Terminal portfolio. Type `help` to explore. Building web, mobile and data products for real clients.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amer Oun — Full-stack developer",
    description: "Terminal portfolio. Type `help` to explore.",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
