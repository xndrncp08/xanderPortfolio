import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectPlate from "@/components/ProjectPlate";
import { projects } from "@/data/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} — ${project.kind}`;
  return {
    title,
    description: `${project.tagline} ${project.approach}`.slice(0, 200),
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title, description: project.tagline, images: [project.logo ?? project.image] },
  };
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const project = projects[i];
  const next = projects[(i + 1) % projects.length];
  const { links } = project;

  return (
    <article>
      <header className="wrap pt-10 pb-12 sm:pt-16">
        <Link href="/#work" className="label hover:text-fg">
          <span aria-hidden>← </span>All work
        </Link>
        <p className="label mt-12">
          {project.kind} · {project.year}
          {project.status && <span className="text-accent"> · {project.status}</span>}
        </p>
        <h1 className="display mt-4 text-6xl sm:text-8xl">{project.title}</h1>
        <p className="prose-measure mt-5 text-xl sm:text-2xl">{project.tagline}</p>
      </header>

      <div className="wrap">
        <ProjectPlate project={project} sizes="(min-width: 1240px) 1160px, 100vw" priority className="aspect-[16/9]" />
      </div>

      <div className="wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-12">
        <dl className="space-y-6 lg:col-span-3">
          <div>
            <dt className="label">Outcome</dt>
            <dd className="mt-1">
              <span className="display block text-4xl text-accent">{project.metric.value}</span>
              <span className="text-muted">{project.metric.label}</span>
            </dd>
          </div>
          <div>
            <dt className="label">Built with</dt>
            <dd className="mt-1">{project.tags.join(", ")}</dd>
          </div>
          {links && (
            <div>
              <dt className="label">Links</dt>
              <dd className="mt-1 flex flex-col items-start gap-1">
                {links.live && (
                  <a href={links.live} target="_blank" rel="noopener" className="link">
                    Live site<span aria-hidden className="arrow arrow-ne"> ↗</span>
                  </a>
                )}
                {links.code && (
                  <a href={links.code} target="_blank" rel="noopener" className="link">
                    Source on GitHub<span aria-hidden className="arrow arrow-ne"> ↗</span>
                  </a>
                )}
              </dd>
            </div>
          )}
        </dl>

        <div className="lg:col-span-7 lg:col-start-5">
          <h2 className="label text-fg">Overview</h2>
          <p className="prose-measure mt-4 text-xl leading-relaxed">{project.approach}</p>

          {project.highlights?.length > 0 && (
            <>
              <h2 className="label mt-14 text-fg">Engineering decisions</h2>
              <ol className="mt-4 border-t border-line">
                {project.highlights.map((h, n) => (
                  <li key={h} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-5">
                    <span className="label pt-1">{String(n + 1).padStart(2, "0")}</span>
                    <span className="text-lg">{h}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>

      <nav aria-label="Next project" className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="wrap group flex items-baseline justify-between gap-6 py-12 sm:py-16">
          <span className="label">Next project</span>
          <span className="display text-4xl group-hover:text-accent sm:text-6xl">
            {next.title} <span aria-hidden className="arrow">→</span>
          </span>
        </Link>
      </nav>
    </article>
  );
}
