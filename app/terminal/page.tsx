import Terminal from "@/components/Terminal";
import Link from "next/link";

export const metadata = {
  title: "Terminal — Amer Oun",
  description: "Interactive terminal portfolio. Type `help` to explore.",
};

export default function TerminalPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <main className="min-h-screen p-4 sm:p-6 md:p-10">
        <div className="mx-auto mb-4 max-w-4xl">
          <Link
            href="/"
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            ← back to portfolio
          </Link>
        </div>
        <Terminal />
      </main>
    </div>
  );
}
