import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Archivo is a signage grotesque — it was drawn for highway boards and
// small-print forms, which is the right voice for operations software.
// Self-hosted through next/font: no render-blocking request to Google, no
// layout shift when the face arrives.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

// Mono is reserved for things that are literally data: stacks, counts, paths.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
