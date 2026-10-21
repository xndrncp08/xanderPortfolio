import Link from "next/link";
import { projects } from "@/data/content";
import ProjectPlate from "./ProjectPlate";
import Section from "./Section";

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);

function ExternalLinks({ links }) {
  if (!links) return null;
  return (
    <>
      {links.live && (
        <a href={links.live} target="_blank" rel="noopener" className="link">
          Live site<span aria-hidden className="arrow arrow-ne"> ↗</span>
        </a>
      )}
      {links.code && (
        <a href={links.code} target="_blank" rel="noopener" className="link">
          Source<span aria-hidden className="arrow arrow-ne"> ↗</span>
        </a>
      )}
    </>
  );
}

function Feature({ project, index }) {
  const href = `/work/${project.slug}`;
  const flip = index % 2 === 1;
  return (
    <article className="group grid gap-8 border-t border-line py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-12 lg:py-16">
      <Link href={href} tabIndex={-1} aria-hidden className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <ProjectPlate project={project} sizes="(min-width: 1024px) 58vw, 100vw" priority={index === 0} />
      </Link>
      <div className="flex flex-col lg:col-span-5">
        <p className="label">
          {String(index + 1).padStart(2, "0")} · {project.kind} · {project.year}
          {project.status && <span className="text-accent"> · {project.status}</span>}
        </p>
        <h3 className="display mt-4 text-5xl">
          <Link href={href} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-xl">{project.tagline}</p>
        <p className="mt-4 text-muted">{project.approach}</p>
        <p className="mt-6 flex items-baseline gap-3 border-t border-line pt-4">
          <span className="display text-4xl text-accent">{project.metric.value}</span>
          <span className="text-muted">{project.metric.label}</span>
        </p>
        <p className="label mt-4">{project.tags.join(" · ")}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href={href} className="link font-medium">
            Read the case study<span aria-hidden className="arrow"> →</span>
          </Link>
          <ExternalLinks links={project.links} />
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <>
      <Section
        id="work"
        index="01"
        label="Selected work"
        title="Things I've built, and why they hold up."
        intro="Four projects I'd walk you through first: a realtime platform, an audio-analysis pipeline, a sports data product and a system a business runs on every day."
      >
        {featured.map((project, i) => (
          <Feature key={project.slug} project={project} index={i} />
        ))}
      </Section>

      <Section
        id="archive"
        index="02"
        label="Archive"
        title="More work"
        intro="Client sites, experiments, coursework and team projects. Each has a short write-up."
      >
        <ul className="border-t border-line">
          {archive.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-line py-5 transition-colors hover:bg-surface sm:grid-cols-[5.5rem_minmax(0,14rem)_1fr_auto] sm:px-3"
              >
                <span className="label order-3 sm:order-none">{p.year}</span>
                <span className="display text-3xl group-hover:text-accent">{p.title}</span>
                <span className="order-4 col-span-2 text-muted sm:order-none sm:col-span-1">{p.tagline}</span>
                <span className="label hidden sm:inline">
                  {p.kind} <span aria-hidden className="arrow">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
