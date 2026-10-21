import Link from "next/link";
import { projects } from "@/data/content";
import ArchiveList from "./ArchiveList";
import ProjectPlate from "./ProjectPlate";
import Section from "./Section";
import TiltCard from "./TiltCard";

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);

export function ExternalLinks({ links }) {
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
    <article className="group grid gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-14 lg:py-20">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={`reveal block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      >
        <TiltCard>
          <ProjectPlate project={project} sizes="(min-width: 1024px) 58vw, 100vw" priority={index === 0} />
        </TiltCard>
      </Link>
      <div className="reveal flex flex-col lg:col-span-5" style={{ "--d": "80ms" }}>
        <p className="label flex flex-wrap gap-x-3">
          <span className="text-fg">{String(index + 1).padStart(2, "0")}</span>
          <span>{project.kind}</span>
          <span>{project.year}</span>
          {project.status && <span className="mark">{project.status}</span>}
        </p>
        <h3 className="display mt-5 text-6xl sm:text-7xl">
          <Link href={href} className="transition-opacity hover:opacity-70">
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 text-xl font-medium tracking-[-0.01em]">{project.tagline}</p>
        {project.aside && <p className="aside mt-3 text-xl text-muted">{project.aside}</p>}
        <p className="mt-5 text-muted">{project.approach}</p>
        <p className="mt-7 flex items-baseline gap-3 border-t border-line pt-5">
          <span className="display text-4xl">
            <span className="mark">{project.metric.value}</span>
          </span>
          <span className="text-muted">{project.metric.label}</span>
        </p>
        <p className="label mt-5">{project.tags.join(" · ")}</p>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
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
        title="Things I built that didn't fall over."
        intro="Four I'd walk you through first: a realtime platform, an audio pipeline, a sports data product and a system a business runs on every day."
      >
        {featured.map((project, i) => (
          <Feature key={project.slug} project={project} index={i} />
        ))}
      </Section>

      <Section
        id="archive"
        index="02"
        label="The archive"
        title="More work."
        intro="Client sites, experiments, coursework and one Roblox heist. Hover for a peek; click for the write-up."
        className="border-t border-line"
      >
        <ArchiveList projects={archive} />
      </Section>
    </>
  );
}
