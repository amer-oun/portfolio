"use client";

import { useEffect, useRef, useState } from "react";
import { profile, projects, skills, bootLines } from "@/lib/data";

type LineKind = "cmd" | "out" | "err" | "sys" | "link" | "muted" | "accent";
type Line = { kind: LineKind; content: string; href?: string };

const PROMPT = `${profile.handle}@portfolio:~$`;

const HELP_ROWS: [string, string][] = [
  ["help", "list all available commands"],
  ["about", "who I am and what I do"],
  ["projects", "list featured projects"],
  ["open <slug>", "open a project's live URL (fibreconnect | tt-kpi | costalina)"],
  ["skills", "tech I work with"],
  ["contact", "email, LinkedIn, location"],
  ["github", "open my GitHub profile"],
  ["linkedin", "open my LinkedIn profile"],
  ["whoami", "one-line intro"],
  ["date", "current date and time"],
  ["clear", "clear the terminal"],
  ["sudo", "elevated privileges (nice try)"],
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [booted, setBooted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot animation
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const l of bootLines) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 120));
        setLines((prev) => [...prev, { kind: "sys", content: l }]);
      }
      if (!cancelled) setBooted(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll to bottom on new lines
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on any click
  useEffect(() => {
    const focus = () => inputRef.current?.focus();
    window.addEventListener("click", focus);
    focus();
    return () => window.removeEventListener("click", focus);
  }, []);

  function append(...next: Line[]) {
    setLines((prev) => [...prev, ...next]);
  }

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    // Echo the command
    append({ kind: "cmd", content: `${PROMPT} ${trimmed}` });

    if (trimmed === "") return;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    switch (cmd.toLowerCase()) {
      case "help":
        return help();
      case "about":
        return about();
      case "whoami":
        return append({
          kind: "out",
          content: `${profile.handle} — ${profile.role} · ${profile.location}`,
        });
      case "projects":
        return list();
      case "open":
        return open(arg);
      case "skills":
        return showSkills();
      case "contact":
        return contact();
      case "github":
        openUrl(profile.github);
        return append({ kind: "muted", content: `Opening ${profile.github}` });
      case "linkedin":
        openUrl(profile.linkedin);
        return append({
          kind: "muted",
          content: `Opening ${profile.linkedin}`,
        });
      case "date":
        return append({
          kind: "out",
          content: new Date().toString(),
        });
      case "clear":
        setLines([]);
        return;
      case "sudo":
        return append({
          kind: "err",
          content: `${profile.handle} is not in the sudoers file. This incident will be reported. 😉`,
        });
      case "ls":
        return append(
          { kind: "out", content: "about  projects  skills  contact" },
        );
      case "cat":
        if (arg === "readme" || arg === "readme.md") return about();
        return append({
          kind: "err",
          content: `cat: ${args.join(" ")}: No such file (try 'help')`,
        });
      case "exit":
      case "logout":
        return append({
          kind: "muted",
          content:
            "There's no exit — this is a portfolio. But feel free to close the tab :)",
        });
      default:
        return append({
          kind: "err",
          content: `${cmd}: command not found. Try 'help'.`,
        });
    }
  }

  function help() {
    append({ kind: "muted", content: "Available commands:" }, { kind: "muted", content: "" });
    for (const [c, d] of HELP_ROWS) {
      const cmd = c.padEnd(16);
      append({ kind: "out", content: `  ${cmd}${d}` });
    }
    append(
      { kind: "muted", content: "" },
      { kind: "muted", content: "Tip: use ↑ / ↓ to browse command history." },
    );
  }

  function about() {
    append({ kind: "muted", content: "" });
    append({ kind: "accent", content: `${profile.name} — ${profile.role}` });
    append({
      kind: "muted",
      content: `${profile.location} · ${profile.school} · Class of ${profile.graduation}`,
    });
    append({ kind: "muted", content: "" });
    for (const l of profile.about) {
      append({ kind: "out", content: l });
    }
    append(
      { kind: "muted", content: "" },
      { kind: "accent", content: profile.status },
    );
  }

  function list() {
    append({ kind: "muted", content: "" });
    append({ kind: "muted", content: "Featured projects — type `open <slug>` to visit the live app:" });
    append({ kind: "muted", content: "" });
    for (const p of projects) {
      const badge =
        p.status === "live" ? "● live" : "○ in-dev";
      append({
        kind: "accent",
        content: `  ${p.slug.padEnd(20)}${badge}`,
      });
      append({
        kind: "out",
        content: `    ${p.pitch}`,
      });
      if (p.client) {
        append({ kind: "muted", content: `    client: ${p.client}` });
      }
      append({ kind: "muted", content: "" });
    }
  }

  function open(slug: string) {
    const key = slug.replace(/-dashboard$/, "").toLowerCase();
    const match = projects.find(
      (p) =>
        p.slug.toLowerCase() === slug.toLowerCase() ||
        p.slug.startsWith(key) ||
        key.startsWith(p.slug.split("-")[0]),
    );
    if (!match) {
      append({
        kind: "err",
        content: `open: unknown project '${slug}'. Try 'projects' to see the list.`,
      });
      return;
    }
    // Print the project detail
    append({ kind: "muted", content: "" });
    append({ kind: "accent", content: match.name });
    append({ kind: "muted", content: match.pitch });
    append({ kind: "muted", content: "" });
    append({ kind: "accent", content: "  problem:" });
    append({ kind: "out", content: `  ${match.problem}` });
    append({ kind: "muted", content: "" });
    append({ kind: "accent", content: "  solution:" });
    append({ kind: "out", content: `  ${match.solution}` });
    append({ kind: "muted", content: "" });
    append({
      kind: "muted",
      content: `  stack:  ${match.stack.join(" · ")}`,
    });
    append({
      kind: "muted",
      content: `  status: ${match.status === "live" ? "✅ live" : "🔨 in development"}`,
    });
    if (match.client) {
      append({ kind: "muted", content: `  client: ${match.client}` });
    }
    append({ kind: "muted", content: "" });
    if (match.liveUrl) {
      append({ kind: "link", content: `  ▶ ${match.liveUrl}`, href: match.liveUrl });
      openUrl(match.liveUrl);
    }
    append({ kind: "link", content: `  </> ${match.codeUrl}`, href: match.codeUrl });
    append({ kind: "muted", content: "" });
  }

  function showSkills() {
    append({ kind: "muted", content: "" });
    for (const [label, list] of Object.entries(skills)) {
      const nice = label.charAt(0).toUpperCase() + label.slice(1);
      append({
        kind: "out",
        content: `  ${nice.padEnd(12)}${list.join(" · ")}`,
      });
    }
    append({ kind: "muted", content: "" });
  }

  function contact() {
    append({ kind: "muted", content: "" });
    append({ kind: "out", content: `  email    ${profile.email}` });
    append({
      kind: "link",
      content: `  linkedin ${profile.linkedin}`,
      href: profile.linkedin,
    });
    append({
      kind: "link",
      content: `  github   ${profile.github}`,
      href: profile.github,
    });
    append({ kind: "out", content: `  location ${profile.location}` });
    append({ kind: "muted", content: "" });
    append({ kind: "accent", content: `  ${profile.status}` });
    append({ kind: "muted", content: "" });
  }

  function openUrl(url: string) {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const v = input;
      runCommand(v);
      if (v.trim().length > 0) {
        setHistory((h) => [...h, v]);
        setHistoryIdx(-1);
      }
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx =
        historyIdx === -1
          ? history.length - 1
          : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(history[nextIdx] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0 || historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx] ?? "");
      }
      return;
    }
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  }

  function classFor(kind: LineKind): string {
    switch (kind) {
      case "cmd":
        return "text-ink";
      case "out":
        return "text-ink";
      case "err":
        return "text-err";
      case "sys":
        return "text-muted";
      case "muted":
        return "text-muted";
      case "accent":
        return "text-accent";
      case "link":
        return "text-link underline underline-offset-2";
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Window chrome */}
      <div className="rounded-t-lg border border-border bg-surface px-4 py-2 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-muted select-none">
          {profile.handle}@portfolio — zsh — 100×32
        </span>
      </div>
      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="terminal-scroll rounded-b-lg border-x border-b border-border bg-bg p-4 sm:p-6 h-[75vh] overflow-y-auto font-mono text-sm sm:text-[15px] leading-relaxed"
      >
        {lines.map((l, i) => (
          <div key={i} className={`${classFor(l.kind)} whitespace-pre-wrap break-words`}>
            {l.href ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                {l.content}
              </a>
            ) : (
              l.content
            )}
          </div>
        ))}
        {booted && (
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-accent shrink-0">{PROMPT}</span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                aria-label="Terminal input"
                className="w-full bg-transparent text-ink caret-accent border-none focus:ring-0"
              />
            </div>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        Type <span className="text-accent">help</span> to get started. This is a portfolio, not a shell — no data is stored.
      </p>
    </div>
  );
}
