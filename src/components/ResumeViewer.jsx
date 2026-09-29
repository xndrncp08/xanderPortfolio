"use client";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiDownload, FiX } from "react-icons/fi";
import { profile } from "@/data/content";

const DIALOG_ID = "resume-viewer";

export function openResume() {
  document.getElementById(DIALOG_ID)?.showModal();
}

export function ResumeButton({ className = "", children = "Resume" }) {
  return (
    <button type="button" onClick={openResume} className={className}>
      {children}
    </button>
  );
}

// Rendered once per page. The PDF only loads the first time it's opened.
export default function ResumeViewer() {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    const onToggle = () => dialog.open && setLoaded(true);
    dialog.addEventListener("toggle", onToggle);

    // Deep link: /#resume opens the viewer directly.
    if (window.location.hash === "#resume") dialog.showModal();

    return () => dialog.removeEventListener("toggle", onToggle);
  }, []);

  return (
    <dialog
      id={DIALOG_ID}
      ref={ref}
      aria-label="Master resume"
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      className="resume-dialog fixed inset-0 m-auto h-[min(92dvh,62rem)] w-[min(100vw-2rem,56rem)] overflow-hidden rounded-2xl border border-line bg-bg p-0 text-fg shadow-2xl"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="truncate font-serif text-2xl leading-none">Master resume</p>
            <p className="mt-1 font-mono text-[11px] text-muted">{profile.name} · PDF</p>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm hover:border-fg"
            >
              <span className="hidden sm:inline">Open</span>
              <FiArrowUpRight aria-hidden />
              <span className="sr-only sm:hidden">Open in new tab</span>
            </a>
            <a
              href={profile.resume}
              download="Xander_Rancap_Resume.pdf"
              className="press inline-flex items-center gap-1.5 rounded-full bg-fg px-3 py-1.5 text-sm text-bg"
            >
              <FiDownload aria-hidden />
              <span className="hidden sm:inline">Download</span>
              <span className="sr-only sm:hidden">Download PDF</span>
            </a>
            <button
              type="button"
              onClick={() => ref.current.close()}
              aria-label="Close resume"
              className="press grid size-9 place-items-center rounded-full text-muted hover:bg-surface hover:text-fg"
            >
              <FiX className="size-5" />
            </button>
          </div>
        </header>

        <div className="relative flex-1 bg-surface">
          {loaded && (
            <iframe
              src={`${profile.resume}#view=FitH&navpanes=0`}
              title={`${profile.name} resume`}
              className="absolute inset-0 size-full"
            />
          )}
          {/* Shown behind the iframe; visible on browsers that won't embed PDFs. */}
          <div className="grid h-full place-items-center p-8 text-center text-sm text-muted">
            <p>
              Your browser can&apos;t preview PDFs here.{" "}
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-fg underline">
                Open the resume
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
