import Link from "next/link";
import Reveal from "@/components/Reveal";
import { profile, projects, skills, type Project } from "@/lib/data";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <Hero />
        <Work />
        <Approach />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ── Navigation ───────────────────────────────────────────────────────── */

function SiteNav() {
  return (
    <header className="sticky top-0 z-sticky border-b border-border bg-bg/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a
          href="#top"
          className="font-semibold tracking-tight text-ink text-[0.95rem]"
        >
          Amer&nbsp;Oun
        </a>

        <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="link-line pb-0.5 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accentdeep"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <p
          className="rise mb-7 flex items-center gap-2.5 font-mono text-[0.8rem] text-muted"
          style={{ ["--rise-delay" as string]: "0ms" }}
        >
          <span
            aria-hidden
            className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          {profile.status}
        </p>

        <h1
          className="rise max-w-[19ch] text-[clamp(2.6rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink"
          style={{ ["--rise-delay" as string]: "90ms", textWrap: "balance" }}
        >
          I build the systems a business runs on.
        </h1>

        <div
          className="rule-draw mt-9 h-[3px] w-24 bg-accent"
          style={{ ["--rise-delay" as string]: "260ms" }}
        />

        <p
          className="rise mt-9 max-w-prose text-lg leading-relaxed text-inksoft sm:text-xl"
          style={{ ["--rise-delay" as string]: "200ms", textWrap: "pretty" }}
        >
          Dispatch for a fibre-optic crew, sales forecasting for a telecom
          operator, coastline monitoring for a hotel group. Three final-year
          projects for real clients in {profile.location} — two of them running
          in production today.
        </p>

        <div
          className="rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          style={{ ["--rise-delay" as string]: "300ms" }}
        >
          <a
            href="#work"
            className="rounded-md bg-accent px-6 py-3 font-medium text-[oklch(0.16_0.02_50)] transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
          >
            See the work
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-medium text-ink"
          >
            GitHub
          </a>
          <Link href="/terminal" className="link-line font-medium text-muted">
            or run the terminal
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Work ─────────────────────────────────────────────────────────────── */

function Work() {
  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mb-16 flex items-end justify-between gap-6 sm:mb-20">
          <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.025em] text-ink">
            Selected work
          </h2>
          <span className="hidden shrink-0 pb-2 font-mono text-sm text-muted sm:block">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </Reveal>

        <div className="flex flex-col gap-20 sm:gap-28">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal
      as="article"
      className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
    >
      {/* Media */}
      <div className={flipped ? "lg:order-2" : undefined}>
        <ProjectMedia project={project} />
      </div>

      {/* Copy */}
      <div className={flipped ? "lg:order-1" : undefined}>
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
            {project.name}
          </h3>
          <StatusTag status={project.status} />
          {project.client && (
            <span className="font-mono text-xs text-muted">
              client:&nbsp;
              <span className="text-inksoft">{project.client}</span>
            </span>
          )}
        </div>

        <p className="mb-5 text-lg text-inksoft" style={{ textWrap: "pretty" }}>
          {project.pitch}
        </p>

        <p
          className="mb-7 max-w-prose leading-relaxed text-muted"
          style={{ textWrap: "pretty" }}
        >
          {project.solution}
        </p>

        <ul className="mb-8 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-xs text-inksoft"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line font-medium text-accentdeep"
            >
              Visit the live app
            </a>
          )}
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-medium text-ink"
          >
            Read the code
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const frame =
    "overflow-hidden rounded-xl border border-border bg-surface shadow-[0_1px_2px_oklch(0.19_0.015_55/0.06)]";

  if (project.demoVideo) {
    return (
      <div className={frame}>
        <video
          src={project.demoVideo}
          poster={project.heroImage}
          controls
          playsInline
          preload="metadata"
          aria-label={`${project.name} — screen recording of a full report`}
          className="block h-auto w-full"
        />
      </div>
    );
  }

  return (
    <a
      href={project.liveUrl ?? project.codeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`lift block ${frame}`}
      aria-label={`${project.name} — open the live app`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.heroImage}
        alt={`${project.name} — ${project.pitch}`}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </a>
  );
}

function StatusTag({ status }: { status: Project["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-xs text-accentdeep">
        <span
          aria-hidden
          className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent"
        />
        live
      </span>
    );
  }
  if (status === "complete") {
    return (
      <span className="font-mono text-xs text-muted">v1 complete</span>
    );
  }
  return <span className="font-mono text-xs text-warn">in development</span>;
}

/* ── Approach ─────────────────────────────────────────────────────────── */

function Approach() {
  return (
    <section id="approach" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
          <Reveal>
            <h2 className="mb-10 text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.025em] text-ink">
              How I work
            </h2>
            <div className="flex max-w-prose flex-col gap-6 text-lg leading-relaxed text-inksoft">
              {profile.about.map((para) => (
                <p key={para.slice(0, 24)} style={{ textWrap: "pretty" }}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="divide-y divide-border border-y border-border">
              {profile.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 py-4"
                >
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-inksoft">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Stack ────────────────────────────────────────────────────────────── */

function Stack() {
  const groups = Object.entries(skills);

  return (
    <section id="stack" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mb-14">
          <h2 className="mb-4 text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.025em] text-ink">
            Tools I&apos;ve actually shipped with
          </h2>
          <p className="max-w-prose text-muted">
            Everything here appears in one of the three projects above, not on a
            course syllabus.
          </p>
        </Reveal>

        <div className="border-t border-border">
          {groups.map(([group, items], i) => (
            <Reveal key={group} delay={i * 70}>
              <div className="grid gap-3 border-b border-border py-6 sm:grid-cols-[13rem_1fr] sm:gap-8 sm:py-7">
                <h3 className="font-mono text-sm text-muted">{group}</h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-inksoft">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────────────── */

function Contact() {
  return (
    <section id="contact" className="bg-ink text-bg">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2
            className="max-w-[16ch] text-[clamp(2.2rem,6.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
            style={{ textWrap: "balance" }}
          >
            Looking for a junior who has already shipped.
          </h2>

          <div className="mt-8 h-[3px] w-24 bg-accent" />

          <p className="mt-8 max-w-prose text-lg leading-relaxed opacity-80">
            I&apos;m finishing my degree at {profile.school} and I&apos;m open to
            junior roles, remote or in {profile.location}. The fastest way to
            reach me is email — I answer the same day.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md bg-accent px-7 py-3.5 text-lg font-medium text-[oklch(0.16_0.02_50)] transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line font-medium"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line font-medium"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm opacity-70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name} — built in{" "}
          {profile.location} with Next.js.
        </p>
        <Link href="/terminal" className="link-line font-mono">
          ⌨ terminal
        </Link>
      </div>
    </footer>
  );
}
