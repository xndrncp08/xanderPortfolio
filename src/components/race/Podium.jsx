"use client";
import { FiArrowUpRight, FiGithub, FiArrowRight } from "react-icons/fi";
import { projects } from "@/data/content";
import { useSheets } from "../SheetProvider";
import { play } from "@/lib/sfx";
import ProjectArt from "./ProjectArt";
import SectorHeader from "./SectorHeader";

const PLACES = [
  { pos: "P1", color: "var(--yellow)", step: "h-28", order: "lg:order-2", lift: "lg:-translate-y-10" },
  { pos: "P2", color: "#d6d6dc", step: "h-20", order: "lg:order-1", lift: "" },
  { pos: "P3", color: "#e08a4a", step: "h-12", order: "lg:order-3", lift: "" },
];

function Spec({ k, children }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-line py-2.5">
      <dt className="t-label text-dim">{k}</dt>
      <dd className="text-right text-sm">{children}</dd>
    </div>
  );
}

function PodiumCard({ project, place, index }) {
  const { openProject } = useSheets();
  const open = (e) => {
    play("press");
    openProject(project, e.currentTarget);
  };

  return (
    <article
      data-reveal
      style={{ "--delay": `${index * 90}ms` }}
      className={`group flex flex-col ${place.order} ${place.lift}`}
    >
      <div className="brackets flex flex-1 flex-col bg-carbon/80 p-4 sm:p-5">
        <div className="mb-4 flex items-end justify-between">
          <span className="font-display text-6xl leading-none font-black italic" style={{ color: place.color }}>
            {place.pos}
          </span>
          <span className="t-label text-right text-dim">
            Season {project.year}
            <br />
            <span style={{ color: project.accent }}>{project.tech}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          aria-label={`Open race report: ${project.title}`}
          data-cursor="RACE REPORT"
          className="chamfer relative block"
        >
          <ProjectArt
            project={project}
            sizes="(min-width: 1024px) 420px, 100vw"
            className="aspect-[16/10]"
            priority={index === 0}
          />
          {/* Spec readout that slides up on hover */}
          <div className="t-label absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-ink/90 px-3 py-2 text-fg backdrop-blur transition-transform duration-500 ease-[var(--ease)] group-hover:translate-y-0 group-focus-within:translate-y-0">
            <span>
              Top speed <span style={{ color: project.accent }}>{project.metric.value}</span>
            </span>
            <span className="text-dim">Tap for report ›</span>
          </div>
        </button>

        <h3 className="t-title mt-5 italic">{project.title}</h3>
        <p className="mt-1 text-muted">{project.tagline}</p>

        <dl className="mt-5">
          <Spec k="Top speed">
            <span className="t-data font-bold" style={{ color: project.accent }}>
              {project.metric.value}
            </span>{" "}
            <span className="text-muted">{project.metric.label}</span>
          </Spec>
          <Spec k="Engine specs">
            <span className="text-muted">{project.tags.slice(0, 4).join(" · ")}</span>
          </Spec>
        </dl>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <button
            type="button"
            onClick={open}
            aria-haspopup="dialog"
            className="press chamfer-sm inline-flex items-center gap-2 bg-fg px-4 py-2 font-display text-sm font-extrabold uppercase tracking-wide text-ink hover:bg-yellow"
          >
            Race report <FiArrowRight />
          </button>
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LIVE DEMO"
              className="press chamfer-sm inline-flex items-center gap-1.5 bg-red px-4 py-2 font-display text-sm font-extrabold uppercase tracking-wide text-white"
            >
              Live demo <FiArrowUpRight />
            </a>
          )}
          {project.links?.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="SOURCE"
              aria-label={`${project.title} source code`}
              className="press chamfer-sm inline-flex items-center gap-1.5 px-3 py-2 text-muted ring-1 ring-line-strong hover:text-fg"
            >
              <FiGithub />
            </a>
          )}
        </div>
      </div>

      {/* Podium step */}
      <div
        aria-hidden
        className={`hidden items-start justify-center border-t-2 bg-panel pt-2 lg:flex ${place.step}`}
        style={{ borderColor: place.color }}
      >
        <span className="font-display text-3xl font-black italic text-dim">{place.pos.slice(1)}</span>
      </div>
    </article>
  );
}

function CalendarRow({ project, round }) {
  const { openProject } = useSheets();
  return (
    <li data-reveal>
      <button
        type="button"
        aria-haspopup="dialog"
        data-cursor="RACE REPORT"
        onClick={(e) => {
          play("press");
          openProject(project, e.currentTarget);
        }}
        className="group relative grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-line py-5 pr-2 text-left transition-colors duration-300 hover:bg-panel/70 md:grid-cols-[4.5rem_1.4fr_1fr_1fr_7rem] md:gap-x-6"
      >
        <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-red transition-transform duration-500 ease-[var(--ease)] group-hover:scale-y-100" />
        <span className="t-data pl-4 text-sm text-dim">R{String(round).padStart(2, "0")}</span>
        <span>
          <span className="block font-display text-2xl font-extrabold uppercase italic leading-none transition-colors group-hover:text-fg">
            {project.title}
          </span>
          <span className="mt-1 block text-sm text-muted">{project.tagline}</span>
        </span>
        <span className="t-label hidden text-muted md:block">{project.tech}</span>
        <span className="hidden md:block">
          <span className="t-data block font-bold" style={{ color: project.accent }}>
            {project.metric.value}
          </span>
          <span className="block text-xs text-dim">{project.metric.label}</span>
        </span>
        <span className="t-label flex items-center justify-end gap-2 text-dim group-hover:text-yellow">
          {project.year}
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>

        {/* Hover preview */}
        <span className="chamfer pointer-events-none absolute top-1/2 right-40 z-10 hidden w-56 -translate-y-1/2 scale-95 opacity-0 transition-[opacity,scale] duration-300 ease-[var(--ease)] group-hover:scale-100 group-hover:opacity-100 xl:block">
          <ProjectArt project={project} sizes="224px" className="aspect-[16/10]" />
        </span>
      </button>
    </li>
  );
}

export default function Podium() {
  const podium = projects.slice(0, 3);
  const calendar = projects.slice(3);

  return (
    <section id="s1" className="relative mx-auto max-w-[1320px] px-4 py-28 sm:px-6 sm:py-36">
      <SectorHeader
        code="Sector 1"
        kicker="Selected works"
        title="Podium finishers"
        lead="The builds I'd put on the top step. Open any one for the full race report."
      />

      <div className="grid gap-6 lg:grid-cols-3 lg:items-end lg:gap-5 lg:pt-10">
        {podium.map((p, i) => (
          <PodiumCard key={p.title} project={p} place={PLACES[i]} index={i} />
        ))}
      </div>

      <div className="mt-24">
        <div data-reveal className="mb-2 flex items-end justify-between">
          <h3 className="font-display text-3xl font-extrabold uppercase italic">Grand Prix calendar</h3>
          <span className="t-label text-dim">{calendar.length} rounds</span>
        </div>
        <div className="t-label hidden grid-cols-[4.5rem_1.4fr_1fr_1fr_7rem] gap-x-6 border-y border-line py-2 text-dim md:grid">
          <span className="pl-4">Rnd</span>
          <span>Grand Prix</span>
          <span>Engine</span>
          <span>Top speed</span>
          <span className="text-right">Season</span>
        </div>
        <ol className="border-t border-line md:border-t-0">
          {calendar.map((p, i) => (
            <CalendarRow key={p.title} project={p} round={i + 4} />
          ))}
        </ol>
      </div>
    </section>
  );
}
