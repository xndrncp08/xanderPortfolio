import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { profile } from "@/data/content";
import Magnetic from "./Magnetic";
import RpmGauge from "./RpmGauge";
import { ResumeButton } from "../SheetProvider";

function Kinetic({ text, base = 0, className = "" }) {
  return (
    <span className={`kinetic block ${className}`} style={{ "--base": `${base}ms` }} aria-hidden>
      {[...text].map((ch, i) => (
        <span key={i} style={{ "--i": i }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

const QUICK = [
  { k: "Quali", v: "3.61", note: "GPA · SAIT Software Development" },
  { k: "Podiums", v: "10+", note: "Projects built" },
  { k: "Race wins", v: "1", note: "App in daily production use" },
];

export default function Hero() {
  return (
    <section id="grid" className="relative overflow-hidden">
      {/* Race number watermark */}
      <span
        aria-hidden
        className="outline-text pointer-events-none absolute -right-[4vw] top-10 select-none font-display text-[46vw] font-black italic leading-none [-webkit-text-stroke-color:rgb(255_40_0/0.22)] lg:text-[36vw]"
      >
        {profile.raceNumber}
      </span>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1320px] gap-12 px-4 pt-24 pb-20 sm:px-6 lg:grid-cols-[1fr_22rem] lg:items-center">
        <div>
          <div className="after-go t-label flex flex-wrap gap-x-6 gap-y-1 text-muted" style={{ "--base": "0ms" }}>
            <span>Season 2026 · Round 01</span>
            <span className="t-data">{profile.coords}</span>
          </div>

          <h1 className="t-mega mt-6 italic" aria-label={profile.name}>
            <Kinetic text="Xander" base={80} />
            <Kinetic text="Rancap" base={260} className="text-red" />
          </h1>

          <div className="after-go mt-8 flex items-center gap-4" style={{ "--base": "520ms" }}>
            <span className="h-10 w-1.5 bg-red" />
            <p className="leading-tight">
              <span className="font-display text-2xl font-extrabold uppercase tracking-wide">
                {profile.role}
              </span>
              <br />
              <span className="text-muted">
                {profile.school} Software Development · Class of 2026 · {profile.base}
              </span>
            </p>
          </div>

          <p
            className="after-go chamfer-sm t-label mt-8 inline-flex items-center gap-3 bg-panel px-4 py-2.5 text-fg ring-1 ring-line"
            style={{ "--base": "620ms" }}
          >
            <span className="led text-green" />
            <span>
              Status: <span className="text-green">P1</span> — Ready for contracts / freelance
            </span>
          </p>

          <div className="after-go mt-10 flex flex-wrap items-center gap-4" style={{ "--base": "720ms" }}>
            <Magnetic>
              <a
                href="#s1"
                data-cursor="SECTOR 1"
                className="press chamfer group inline-flex items-center gap-3 bg-red px-7 py-4 font-display text-lg font-extrabold uppercase tracking-wide text-white hover:shadow-[0_0_40px_-4px_var(--red)]"
              >
                Enter sector 1
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <ResumeButton className="press chamfer inline-flex items-center gap-2 bg-panel px-7 py-4 font-display text-lg font-extrabold uppercase tracking-wide text-fg ring-1 ring-line-strong hover:bg-panel-2">
                Driver resume
              </ResumeButton>
            </Magnetic>
          </div>
        </div>

        <aside className="after-go space-y-3" style={{ "--base": "400ms" }}>
          <RpmGauge />
          <dl className="grid gap-px bg-line">
            {QUICK.map((q) => (
              <div key={q.k} className="flex items-baseline justify-between gap-4 bg-carbon px-4 py-3">
                <dt>
                  <span className="t-label block text-dim">{q.k}</span>
                  <span className="text-sm text-muted">{q.note}</span>
                </dt>
                <dd className="t-data text-2xl font-bold text-fg">{q.v}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <a
          href="#s1"
          className="after-go t-label absolute bottom-14 left-4 hidden items-center gap-2 text-dim hover:text-fg sm:left-6 lg:flex"
          style={{ "--base": "900ms" }}
        >
          <FiArrowDown className="animate-bounce motion-reduce:animate-none" /> Hold throttle — scroll
        </a>
      </div>
    </section>
  );
}
