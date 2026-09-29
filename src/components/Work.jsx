import Image from "next/image";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/data/content";
import SectionHeader from "./SectionHeader";

const FEATURED_COUNT = 4;

function Tags({ tags }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ links, title }) {
  if (!links) return null;
  return (
    <div className="flex gap-4 text-sm">
      {links.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} live site`}
          className="link-underline inline-flex items-center gap-1"
        >
          Live <FiArrowUpRight aria-hidden />
        </a>
      )}
      {links.code && (
        <a
          href={links.code}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} source code on GitHub`}
          className="link-underline inline-flex items-center gap-1.5"
        >
          <FiGithub aria-hidden /> Code
        </a>
      )}
    </div>
  );
}

function Cover({ project, sizes, small = false }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={small ? "" : `${project.title} screenshot`}
        fill
        sizes={sizes}
        className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
      />
    );
  }
  // Typographic cover for projects without a screenshot yet.
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_60%)]">
      <span
        className={`font-serif italic tracking-tight transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03] ${
          small ? "text-lg" : "text-6xl sm:text-7xl"
        }`}
      >
        {project.title}
      </span>
    </div>
  );
}

function FeaturedCard({ project, index }) {
  return (
    <article data-reveal style={{ "--delay": `${(index % 2) * 90}ms` }} className="group">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
        <Cover project={project} sizes="(min-width: 768px) 560px, 100vw" />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-3xl leading-none">{project.title}</h3>
        <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
      </div>
      <p className="mt-1 font-mono text-xs text-muted">{project.tech}</p>
      <p className="mt-3 text-base leading-relaxed">{project.tagline}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.approach}</p>
      <div className="mt-4">
        <Tags tags={project.tags} />
      </div>
      <div className="mt-4">
        <Links links={project.links} title={project.title} />
      </div>
    </article>
  );
}

function ProjectRow({ project, number }) {
  return (
    <li
      data-reveal
      className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-b border-line py-6 sm:grid-cols-[3rem_5.5rem_1fr_auto] sm:items-center sm:gap-x-6"
    >
      <span className="font-mono text-xs text-muted">{String(number).padStart(2, "0")}</span>
      <div className="relative hidden aspect-[4/3] w-22 overflow-hidden rounded-lg border border-line bg-surface sm:block">
        <Cover project={project} sizes="88px" small />
      </div>
      <div className="col-start-2 sm:col-start-auto">
        <h3 className="font-serif text-2xl leading-tight">{project.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{project.tagline}</p>
      </div>
      <div className="col-start-2 flex flex-col gap-2 sm:col-start-auto sm:items-end">
        <span className="font-mono text-xs text-muted">
          {project.tech} · {project.year}
        </span>
        <Links links={project.links} title={project.title} />
      </div>
    </li>
  );
}

export default function Work() {
  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeader
        index="01"
        title="Selected work"
        aside={`${String(projects.length).padStart(2, "0")} projects`}
      />

      <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <h3 data-reveal className="mt-24 mb-2 font-mono text-xs text-muted">
        More projects
      </h3>
      <ul className="border-t border-line">
        {rest.map((p, i) => (
          <ProjectRow key={p.title} project={p} number={FEATURED_COUNT + i + 1} />
        ))}
      </ul>
    </section>
  );
}
