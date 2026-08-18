import Terminal from "@/components/Terminal";
import Link from "next/link";

export const metadata = {
  title: "Terminal — Amer Oun",
  description: "Interactive terminal portfolio. Type `help` to explore.",
};

export default function TerminalPage() {
  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10">
      <div className="mx-auto max-w-4xl mb-4">
        <Link
          href="/"
          className="text-muted hover:text-accent transition text-sm font-mono"
        >
          ← back to portfolio
        </Link>
      </div>
      <Terminal />
    </main>
  );
}
