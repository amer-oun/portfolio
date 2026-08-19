import Link from "next/link";
import Reveal from "@/components/Reveal";
import FiberCanvas from "@/components/FiberCanvas";
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
    <header className="sticky top-0 z-sticky border-b border-border bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a href="#top" className="text-[0.95rem] font-semibold tracking-tight">
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

        {/* Scrolls to the contact fold. A bare mailto: opens a blank tab for
            anyone without a desktop mail client configured. */}
        <a
          href="#contact"
          className="btn rounded-md border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accenttext hover:bg-accent hover:text-ink"
        >
          Get in touch
        </a>
      </nav>

      <div
        id="scroll-progress"
        aria-hidden
        className="scroll-progress h-[2px] w-full bg-accent"
      />
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <FiberCanvas />

      <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-24 sm:px-8 sm:pb-36 sm:pt-32">
        <p
          className="rise mb-8 flex items-center gap-2.5 font-mono text-[0.8rem] text-muted"
          style={{ ["--rise-delay" as string]: "0ms" }}
        >
          <span
            aria-hidden
            className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          {profile.status}
        </p>

        <h1
          data-split
          className="max-w-[19ch] text-[clamp(2.7rem,8.5vw,6rem)] font-extrabold leading-[0.94] tracking-[-0.03em]"
          style={{ textWrap: "balance" }}
        >
          I build the systems a business runs on.
        </h1>

        <div
          className="rule-draw mt-10 h-[3px] w-28 bg-accent"
          style={{ ["--rise-delay" as string]: "500ms" }}
        />

        <p
          className="rise mt-10 max-w-prose text-lg leading-relaxed text-inksoft sm:text-xl"
          style={{ ["--rise-delay" as string]: "400ms", textWrap: "pretty" }}
        >
          Dispatch for a fibre-optic crew, sales forecasting for a telecom
          operator, coastline monitoring for a hotel group. Three final-year
          projects for real clients in {profile.location} — two of them running
          in production today.
        </p>

        <div
          className="rise mt-11 flex flex-wrap items-center gap-x-7 gap-y-4"
          style={{ ["--rise-delay" as string]: "520ms" }}
        >
          <a
            href="#work"
            className="magnetic rounded-md bg-accent px-7 py-3.5 font-semibold text-ink"
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
      <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="mb-14 flex items-end justify-between gap-6">
          <h2
            data-split
            className="text-[clamp(2rem,5.5vw,3.5rem)] font-bold tracking-[-0.025em]"
          >
            Selected work
          </h2>
          <span className="hidden shrink-0 pb-2 font-mono text-sm text-muted sm:block">
            {String(projects.length).padStart(2, "0")} projects
            <span className="ml-3 hidden lg:inline">— scroll →</span>
          </span>
        </div>
      </div>

      {/* On desktop GSAP pins this section and drags the reel sideways.
          Below 1024px the same markup is an ordinary vertical stack. */}
      <div className="overflow-hidden pb-20 sm:pb-28">
        <div className="reel mx-auto max-w-6xl px-5 sm:px-8 lg:max-w-none lg:px-0">
          {projects.map((project, i) => (
            <div className="reel-item" key={project.slug}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="proj grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <ProjectMedia project={project} />

      <div>
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="proj-title text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
            {project.name}
          </h3>
          <StatusTag status={project.status} />
        </div>

        {project.client && (
          <p className="mb-4 font-mono text-xs text-muted">
            client: <span className="text-inksoft">{project.client}</span>
          </p>
        )}

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
              className="link-line font-semibold text-accenttext"
            >
              Visit the live app
            </a>
          )}
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-semibold"
          >
            Read the code
          </a>
        </div>
      </div>
    </article>
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

  return (
    <a
      href={project.liveUrl ?? project.codeUrl}
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
      <span className="inline-flex items-center gap-2 font-mono text-xs text-accenttext">
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
    <section id="approach" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
          <div>
            <h2
              data-split
              className="mb-10 text-[clamp(2rem,5.5vw,3.5rem)] font-bold tracking-[-0.025em]"
            >
              How I work
            </h2>
            <Reveal className="flex max-w-prose flex-col gap-6 text-lg leading-relaxed text-inksoft">
              {profile.about.map((para) => (
                <p key={para.slice(0, 24)} style={{ textWrap: "pretty" }}>
                  {para}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={140}>
            <dl className="divide-y divide-border border-y border-border">
              {profile.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 py-4"
                >
                  <dt className="font-mono text-xs uppercase tracking-wide text-accenttext">
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
        <div className="mb-14">
          <h2
            data-split
            className="mb-4 text-[clamp(2rem,5.5vw,3.5rem)] font-bold tracking-[-0.025em]"
          >
            Tools I have actually shipped with
          </h2>
          <p className="max-w-prose text-muted">
            Everything here appears in one of the three projects above, not on a
            course syllabus.
          </p>
        </div>

        <div className="border-t border-border">
          {groups.map(([group, items], i) => (
            <Reveal key={group} delay={i * 80}>
              <div className="grid gap-3 border-b border-border py-6 sm:grid-cols-[13rem_1fr] sm:gap-8 sm:py-7">
                <h3 className="font-mono text-sm text-accenttext">{group}</h3>
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
  const wa = profile.whatsapp.replace(/\D/g, "");

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <h2
          data-split
          className="max-w-[16ch] text-[clamp(2.3rem,7vw,4.8rem)] font-extrabold leading-[1.0] tracking-[-0.03em]"
        >
          Looking for a junior who has already shipped.
        </h2>

        <div className="mt-9 h-[3px] w-28 bg-accent" />

        <Reveal delay={80}>
          <p className="mt-9 max-w-prose text-lg leading-relaxed text-inksoft">
            I am finishing my degree at {profile.school} and I am open to junior
            roles, remote or in {profile.location}. Pick whichever channel suits
            you — I answer the same day.
          </p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            <ContactRow
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            {wa && (
              <ContactRow
                label="WhatsApp"
                value={profile.whatsapp}
                href={`https://wa.me/${wa}`}
                external
              />
            )}
            <ContactRow
              label="LinkedIn"
              value="in/amer-oun"
              href={profile.linkedin}
              external
            />
            <ContactRow
              label="GitHub"
              value="@amer-oun"
              href={profile.github}
              external
            />
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li className="bg-bg">
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        className="group flex items-center justify-between gap-5 px-6 py-6 transition-colors duration-300 hover:bg-surface sm:px-8 sm:py-7"
      >
        <span className="min-w-0">
          <span className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted">
            {label}
          </span>
          <span className="block truncate text-lg font-medium text-ink">
            {value}
          </span>
        </span>
        <span
          aria-hidden
          className="shrink-0 text-xl text-accenttext transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5"
        >
          →
        </span>
      </a>
    </li>
  );
}

/* ── Footer ───────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
