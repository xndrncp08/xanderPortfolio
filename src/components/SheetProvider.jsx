"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { FiArrowUpRight, FiDownload, FiGithub } from "react-icons/fi";
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
        label={state.kind === "resume" ? "Master resume" : state.project?.title}
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
    <div className="overflow-y-auto overscroll-contain">
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{ background: project.logo ? "var(--logo-bg)" : "var(--tile)" }}
      >
        <Image
          src={project.logo ?? project.image}
          alt={`${project.title} ${project.logo ? "logo" : "screenshot"}`}
          fill
          sizes="(min-width: 640px) 704px, 100vw"
          className={project.logo ? "object-cover" : "object-cover object-top"}
        />
        {project.logo && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background: `radial-gradient(60% 90% at 50% 120%, ${project.accent}38, transparent 70%)`,
            }}
          />
        )}
      </div>

      <div className="px-6 pt-7 pb-10 sm:px-10 sm:pt-9 sm:pb-12">
        <p className="t-small font-semibold" style={{ color: project.accent }}>
          {project.tech} · {project.year}
        </p>
        <h2 className="t-headline mt-1">{project.title}</h2>
        <p className="t-lead mt-3 text-muted">{project.tagline}</p>

        <p className="mt-6 leading-relaxed">{project.approach}</p>

        {project.highlights?.length > 0 && (
          <ul className="mt-6 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 leading-snug">
                <span
                  className="mt-[0.55em] size-1.5 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-7 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="t-caption rounded-full bg-tile px-3 py-1.5 font-medium text-muted">
              {t}
            </li>
          ))}
        </ul>

        {links && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[15px] font-medium text-accent-fg hover:bg-accent-hover"
              >
                Visit site <FiArrowUpRight aria-hidden />
              </a>
            )}
            {links.code && (
              <a
                href={links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center gap-2 rounded-full bg-tile px-5 py-2.5 text-[15px] font-medium hover:bg-tile-2"
              >
                <FiGithub aria-hidden /> View code
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
      <header className="flex items-center gap-3 border-b border-line px-5 pt-6 pb-4 pr-16 sm:px-6 sm:pt-4">
        <div className="min-w-0 flex-1">
          <p className="t-eyebrow truncate">Master resume</p>
          <p className="t-caption text-muted">{profile.name} · PDF</p>
        </div>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="press inline-flex items-center gap-1 rounded-full bg-tile px-3.5 py-1.5 text-sm font-medium hover:bg-tile-2"
        >
          Open <FiArrowUpRight aria-hidden />
        </a>
        <a
          href={profile.resume}
          download="Xander_Rancap_Resume.pdf"
          className="press inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-accent-fg hover:bg-accent-hover"
        >
          <FiDownload aria-hidden />
          <span className="hidden sm:inline">Download</span>
          <span className="sr-only sm:hidden">Download PDF</span>
        </a>
      </header>
      <div className="relative flex-1 bg-tile">
        <div className="t-small absolute inset-0 grid place-items-center p-8 text-center text-muted">
          <p>
            Can&apos;t preview the PDF here?{" "}
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-accent">
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
      onClick={(e) => openResume(e.currentTarget)}
      className={className}
    >
      {children}
    </button>
  );
}
