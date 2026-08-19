import Link from "next/link";
import { profile, skills, projects } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      {/* Sticky nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-bg/70 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm tracking-tight hover:text-accent transition"
          >
            <span className="text-accent">$</span> amer-oun
          </Link>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-muted">
            <a href="#work" className="hover:text-ink transition">Work</a>
            <a href="#about" className="hover:text-ink transition">About</a>
            <a href="#skills" className="hover:text-ink transition">Skills</a>
            <a href="#contact" className="hover:text-ink transition">Contact</a>
            <Link
              href="/terminal"
              className="font-mono text-xs px-3 py-1.5 rounded border border-border/80 hover:border-accent hover:text-accent transition"
              title="Interactive terminal (for the curious)"
            >
              ⌨ terminal
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[600px] orb pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-32 sm:pt-40 sm:pb-44">
          <p className="font-mono text-xs text-accent mb-6 tracking-wider reveal">
            <span className="inline-block w-2 h-2 rounded-full bg-accent live-dot mr-2 align-middle" />
            AVAILABLE FOR JUNIOR ROLES · TUNIS
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8 reveal" style={{textWrap: "balance" as any}}>
            {profile.name}.
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted font-medium max-w-3xl leading-snug reveal" style={{animationDelay: "0.1s", textWrap: "balance" as any}}>
            {profile.tagline}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4 reveal" style={{animationDelay: "0.2s"}}>
            <a
              href="#contact"
              className="px-6 py-3 bg-accent text-black font-semibold rounded-md hover:bg-accent/90 transition"
            >
              Get in touch →
            </a>
            <a
              href="#work"
              className="px-6 py-3 border border-border hover:border-ink text-ink rounded-md transition"
            >
              See my work
            </a>
            <Link
              href="/terminal"
              className="px-4 py-3 text-muted hover:text-accent transition text-sm font-mono"
            >
              or run the terminal ⌨
            </Link>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="font-mono text-xs text-accent tracking-wider mb-3">
                01 — SELECTED WORK
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Three projects, three real clients.
              </h2>
            </div>
          </div>

          <div className="space-y-32">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-border/60 bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="font-mono text-xs text-accent tracking-wider mb-3">
            02 — ABOUT
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12" style={{textWrap: "balance" as any}}>
            I ship things that run in production.
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 text-lg text-muted leading-relaxed max-w-2xl">
              {profile.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="space-y-6">
              {profile.facts.map((f) => (
                <div key={f.label} className="border-l-2 border-accent pl-4">
                  <p className="font-mono text-xs text-muted uppercase tracking-wider mb-1">
                    {f.label}
                  </p>
                  <p className="text-ink font-medium">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="font-mono text-xs text-accent tracking-wider mb-3">
            03 — TECH
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12" style={{textWrap: "balance" as any}}>
            Tools I've actually shipped with.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="p-6 rounded-lg bg-surface border border-border/60 hover:border-accent/50 transition"
              >
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="text-sm px-3 py-1 rounded-md bg-bg border border-border/40 text-ink"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border/60 bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="font-mono text-xs text-accent tracking-wider mb-3">
            04 — CONTACT
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 max-w-3xl" style={{textWrap: "balance" as any}}>
            Have a role, project, or good idea?
          </h2>
          <p className="text-xl text-muted mb-12 max-w-2xl">
            I read every message. The fastest way to reach me is by email or LinkedIn.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            <a
              href={`mailto:${profile.email}`}
              className="group p-6 rounded-lg bg-bg border border-border hover:border-accent transition"
            >
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
                Email
              </p>
              <p className="text-lg text-ink group-hover:text-accent transition break-all">
                {profile.email}
              </p>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-lg bg-bg border border-border hover:border-accent transition"
            >
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
                LinkedIn
              </p>
              <p className="text-lg text-ink group-hover:text-accent transition">
                /in/amer-oun-b33212312 →
              </p>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-lg bg-bg border border-border hover:border-accent transition"
            >
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
                GitHub
              </p>
              <p className="text-lg text-ink group-hover:text-accent transition">
                @amer-oun →
              </p>
            </a>
            <div className="p-6 rounded-lg bg-bg border border-border">
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
                Based in
              </p>
              <p className="text-lg text-ink">{profile.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted font-mono">
            <span className="text-accent">$</span> whoami → {profile.handle} · © 2026
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/terminal"
              className="text-muted hover:text-accent transition font-mono"
            >
              ⌨ terminal
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="text-center pb-6">
          <p className="text-xs text-muted font-mono">
            Handcrafted in Tunis with Next.js. No excuses.
          </p>
        </div>
      </footer>
    </main>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <article className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div
        className={`relative group ${reversed ? "lg:order-2" : ""}`}
      >
        <div className="absolute -inset-1 bg-gradient-to-tr from-accent/30 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
        <a
          href={project.liveUrl ?? project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block overflow-hidden rounded-xl border border-border bg-surface"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-auto group-hover:scale-[1.02] transition duration-700"
          />
        </a>
      </div>
      <div className={reversed ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-muted">
            0{index + 1}
          </span>
          <span className="h-px w-8 bg-border" />
          {project.status === "live" ? (
            <span className="inline-flex items-center gap-2 text-xs font-mono text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent live-dot" />
              LIVE
            </span>
          ) : project.status === "complete" ? (
            <span className="inline-flex items-center gap-2 text-xs font-mono text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              V1 COMPLETE
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs font-mono text-warn">
              <span className="w-1.5 h-1.5 rounded-full bg-warn" />
              IN DEVELOPMENT
            </span>
          )}
          {project.client && (
            <span className="text-xs font-mono text-muted">
              · client: <span className="text-ink">{project.client}</span>
            </span>
          )}
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          {project.name}
        </h3>
        <p className="text-lg text-muted mb-6 italic">{project.pitch}</p>
        <div className="space-y-4 text-muted leading-relaxed mb-6">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-wider mb-1">
              The problem
            </p>
            <p>{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-wider mb-1">
              The solution
            </p>
            <p>{project.solution}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-border/60 text-muted"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4 font-medium"
            >
              Live demo →
            </a>
          )}
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink hover:text-accent transition font-medium"
          >
            View code →
          </a>
        </div>
      </div>
    </article>
  );
}
