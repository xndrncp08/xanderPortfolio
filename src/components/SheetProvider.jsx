"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { FiArrowUpRight, FiDownload, FiGithub } from "react-icons/fi";
import ProjectArt from "./race/ProjectArt";
import { profile } from "@/data/content";
import Sheet from "./Sheet";

const SheetContext = createContext(null);

export function useSheets() {
  return useContext(SheetContext);
}

function centerOf(el) {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export default function SheetProvider({ children }) {
  // Keep the last content mounted through the exit animation.
  const [state, setState] = useState({ open: false, kind: null, project: null, origin: null });

  const openProject = useCallback(
    (project, el) => setState({ open: true, kind: "project", project, origin: centerOf(el) }),
    []
  );
  const openResume = useCallback(
    (el) => setState({ open: true, kind: "resume", project: null, origin: centerOf(el) }),
    []
  );
  const close = useCallback(() => {
    if (window.location.hash === "#resume") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setState((s) => ({ ...s, open: false }));
  }, []);

  // Deep link: /#resume (on load or via any link) opens the resume.
  useEffect(() => {
    const check = () => window.location.hash === "#resume" && openResume(null);
    const frame = requestAnimationFrame(check);
    window.addEventListener("hashchange", check);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", check);
    };
  }, [openResume]);

  return (
    <SheetContext.Provider value={{ openProject, openResume }}>
      <div id="page">{children}</div>
      <Sheet
        open={state.open}
        onClose={close}
        origin={state.origin}
        size={state.kind === "resume" ? "lg" : "md"}
        label={state.kind === "resume" ? "Driver resume" : `Race report: ${state.project?.title}`}
      >
        {() => (state.kind === "resume" ? <ResumeContent /> : <ProjectContent project={state.project} />)}
      </Sheet>
    </SheetContext.Provider>
  );
}

function ProjectContent({ project }) {
  if (!project) return null;
  const { links } = project;

  return (
    <div className="overflow-y-auto overscroll-contain" data-lenis-prevent>
      <div className="group">
        <ProjectArt project={project} sizes="(min-width: 640px) 704px, 100vw" className="aspect-[16/9]" />
      </div>

      <div className="px-6 pt-6 pb-10 sm:px-9 sm:pb-12">
        <p className="t-label flex flex-wrap gap-x-4 gap-y-1">
          <span className="text-red">Race report</span>
          <span className="text-dim">Season {project.year}</span>
          <span style={{ color: project.accent }}>{project.tech}</span>
        </p>
        <h2 className="t-display mt-3 italic">{project.title}</h2>
        <p className="mt-3 text-xl text-muted">{project.tagline}</p>

        <div className="mt-6 grid grid-cols-[auto_1fr] items-center gap-x-4 border-y border-line py-4">
          <span className="t-data text-4xl font-bold" style={{ color: project.accent }}>
            {project.metric.value}
          </span>
          <span>
            <span className="t-label block text-dim">Top speed</span>
            <span className="text-muted">{project.metric.label}</span>
          </span>
        </div>

        <p className="mt-6 leading-relaxed">{project.approach}</p>

        {project.highlights?.length > 0 && (
          <>
            <p className="t-label mt-8 text-dim">Key laps</p>
            <ol className="mt-3 space-y-3">
              {project.highlights.map((h, i) => (
                <li key={h} className="grid grid-cols-[2.5rem_1fr] leading-snug">
                  <span className="t-data text-sm text-dim">L{String(i + 1).padStart(2, "0")}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ol>
          </>
        )}

        <p className="t-label mt-8 text-dim">Engine specs</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li key={t} className="t-label bg-panel-2 px-2.5 py-1.5 text-muted">
              {t}
            </li>
          ))}
        </ul>

        {links && (
          <div className="mt-9 flex flex-wrap gap-3">
            {links.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LIVE DEMO"
                className="press chamfer-sm inline-flex items-center gap-2 bg-red px-5 py-3 font-display font-extrabold uppercase tracking-wide text-white"
              >
                Live demo <FiArrowUpRight aria-hidden />
              </a>
            )}
            {links.code && (
              <a
                href={links.code}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="SOURCE"
                className="press chamfer-sm inline-flex items-center gap-2 bg-panel-2 px-5 py-3 font-display font-extrabold uppercase tracking-wide text-fg ring-1 ring-line-strong hover:bg-panel"
              >
                <FiGithub aria-hidden /> Source code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResumeContent() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-line px-5 pt-7 pb-4 pr-16 sm:px-6 sm:pt-4">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-extrabold uppercase italic leading-none">Driver resume</p>
          <p className="t-label mt-1 text-dim">
            {profile.name} · #{profile.raceNumber} · PDF
          </p>
        </div>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="press t-label inline-flex items-center gap-1 px-3 py-2 text-muted ring-1 ring-line-strong hover:text-fg"
        >
          Open <FiArrowUpRight aria-hidden />
        </a>
        <a
          href={profile.resume}
          download="Xander_Rancap_Resume.pdf"
          className="press t-label inline-flex items-center gap-1.5 bg-red px-3 py-2 text-white"
        >
          <FiDownload aria-hidden />
          <span className="hidden sm:inline">Download</span>
          <span className="sr-only sm:hidden">Download PDF</span>
        </a>
      </header>
      <div className="relative flex-1 bg-panel" data-lenis-prevent>
        <div className="absolute inset-0 grid place-items-center p-8 text-center text-sm text-muted">
          <p>
            Can&apos;t preview the PDF here?{" "}
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-yellow">
              Open it in a new tab
            </a>
            .
          </p>
        </div>
        <iframe
          src={`${profile.resume}#view=FitH&navpanes=0`}
          title={`${profile.name} resume`}
          className="absolute inset-0 size-full"
        />
      </div>
    </div>
  );
}

export function ResumeButton({ className, children = "Resume" }) {
  const { openResume } = useSheets();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      data-cursor="DRIVER RESUME"
      onClick={(e) => openResume(e.currentTarget)}
      className={className}
    >
      {children}
    </button>
  );
}
