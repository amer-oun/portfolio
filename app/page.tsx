import Link from "next/link";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
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
    <header className="sticky top-0 z-sticky bg-ink text-bg">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a href="#top" className="text-[0.95rem] font-semibold tracking-tight">
          Amer&nbsp;Oun
        </a>

        <ul className="hidden items-center gap-7 text-sm opacity-75 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-line pb-0.5">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Scrolls to the contact fold. A bare mailto: opens a blank tab for
            anyone without a desktop mail client configured. */}
        <a
          href="#contact"
          className="btn rounded-md bg-accent px-4 py-2 text-sm font-semibold text-brandink"
        >
          Get in touch
        </a>
      </nav>

      <div
        id="scroll-progress"
        aria-hidden
        className="scroll-progress h-[3px] w-full bg-accent"
      />
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="bg-accent text-brandink">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
        <p
          className="rise mb-8 flex items-center gap-2.5 font-mono text-[0.8rem]"
          style={{ ["--rise-delay" as string]: "0ms" }}
        >
          <span
            aria-hidden
            className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-brandink"
          />
          {profile.status}
        </p>

        <h1 className="text-[clamp(2.7rem,8.5vw,6rem)] font-extrabold leading-[0.94] tracking-[-0.03em]">
          <span className="line-mask">
            <span
              className="line-inner"
              style={{ ["--rise-delay" as string]: "80ms" }}
            >
              I build the systems
            </span>
          </span>
          <span className="line-mask">
            <span
              className="line-inner"
              style={{ ["--rise-delay" as string]: "200ms" }}
            >
              a business runs on.
            </span>
          </span>
        </h1>

        <div
          className="rule-draw mt-10 h-[4px] w-28 bg-brandink"
          style={{ ["--rise-delay" as string]: "420ms" }}
        />

        <p
          className="rise mt-10 max-w-prose text-lg leading-relaxed sm:text-xl"
          style={{ ["--rise-delay" as string]: "330ms", textWrap: "pretty" }}
        >
          Dispatch for a fibre-optic crew, sales forecasting for a telecom
          operator, coastline monitoring for a hotel group. Three final-year
          projects for real clients in {profile.location} — two of them running
          in production today.
        </p>

        <div
          className="rise mt-11 flex flex-wrap items-center gap-x-7 gap-y-4"
          style={{ ["--rise-delay" as string]: "430ms" }}
        >
          <a
            href="#work"
            className="btn rounded-md bg-ink px-7 py-3.5 font-semibold text-bg"
          >
            See the work
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-semibold"
          >
            GitHub
          </a>
          <Link href="/terminal" className="link-line font-medium opacity-80">
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
    <section id="work" className="border-b border-border bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal
          variant="rise-lg"
          className="mb-16 flex items-end justify-between gap-6 sm:mb-24"
        >
          <h2 className="text-[clamp(2rem,5.5vw,3.5rem)] font-bold tracking-[-0.025em] text-ink">
            Selected work
          </h2>
          <span className="hidden shrink-0 pb-2 font-mono text-sm text-muted sm:block">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </Reveal>

        <div className="flex flex-col gap-24 sm:gap-32">
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
      variant="scale"
      className="proj group grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
    >
      <div className={flipped ? "lg:order-2" : undefined}>
        <Parallax amount={22}>
          <ProjectMedia project={project} />
        </Parallax>
      </div>

      <div className={flipped ? "lg:order-1" : undefined}>
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="proj-title text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
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
          {project.stack.map((tech, i) => (
            <li
              key={tech}
              className="chip rounded border border-border bg-surface px-2.5 py-1 font-mono text-xs text-inksoft"
              style={{ ["--chip-delay" as string]: `${i * 45}ms` }}
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
              className="link-line font-semibold text-accentdeep"
            >
              Visit the live app
            </a>
          )}
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-semibold text-ink"
          >
            Read the code
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.demoVideo) {
    return (
      <div className="proj-frame">
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

  const href = project.liveUrl ?? project.codeUrl;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="proj-frame block"
      aria-label={`${project.name} — open the live app`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.heroImage}
        alt={`${project.name} — ${project.pitch}`}
        loading="lazy"
        decoding="async"
        className="proj-media"
      />
      <span aria-hidden className="proj-veil" />
      <span aria-hidden className="proj-cta">
        {project.liveUrl ? "Visit the live app" : "Read the code"}
        <span>→</span>
      </span>
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
    return <span className="font-mono text-xs text-muted">v1 complete</span>;
  }
  return <span className="font-mono text-xs text-warn">in development</span>;
}

/* ── Approach ─────────────────────────────────────────────────────────── */

function Approach() {
  return (
    <section id="approach" className="bg-ink text-bg">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
          <Reveal variant="rise-lg">
            <h2 className="mb-10 text-[clamp(2rem,5.5vw,3.5rem)] font-bold tracking-[-0.025em]">
              How I work
            </h2>
            <div className="flex max-w-prose flex-col gap-6 text-lg leading-relaxed opacity-85">
              {profile.about.map((para) => (
                <p key={para.slice(0, 24)} style={{ textWrap: "pretty" }}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <dl className="divide-y divide-white/15 border-y border-white/15">
              {profile.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 py-4"
                >
                  <dt className="font-mono text-xs uppercase tracking-wide text-accent">
                    {fact.label}
                  </dt>
                  <dd className="text-sm opacity-85">{fact.value}</dd>
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
    <section id="stack" className="bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal variant="rise-lg" className="mb-14">
          <h2 className="mb-4 text-[clamp(2rem,5.5vw,3.5rem)] font-bold tracking-[-0.025em] text-ink">
            Tools I&apos;ve actually shipped with
          </h2>
          <p className="max-w-prose text-muted">
            Everything here appears in one of the three projects above, not on a
            course syllabus.
          </p>
        </Reveal>

        <div className="border-t border-border">
          {groups.map(([group, items], i) => (
            <Reveal key={group} delay={i * 80}>
              <div className="grid gap-3 border-b border-border py-6 sm:grid-cols-[13rem_1fr] sm:gap-8 sm:py-7">
                <h3 className="font-mono text-sm text-accentdeep">{group}</h3>
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
    <section id="contact" className="bg-accent text-brandink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal variant="rise-lg">
          <h2
            className="max-w-[16ch] text-[clamp(2.3rem,7vw,4.8rem)] font-extrabold leading-[1.0] tracking-[-0.03em]"
            style={{ textWrap: "balance" }}
          >
            Looking for a junior who has already shipped.
          </h2>

          <div className="mt-9 h-[4px] w-28 bg-brandink" />

          <p className="mt-9 max-w-prose text-lg leading-relaxed">
            I&apos;m finishing my degree at {profile.school} and I&apos;m open to
            junior roles, remote or in {profile.location}. Email is the fastest
            way to reach me — I answer the same day.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="btn rounded-md bg-ink px-7 py-3.5 text-lg font-semibold text-bg"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line font-semibold"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line font-semibold"
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
    <footer className="bg-ink text-bg">
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
