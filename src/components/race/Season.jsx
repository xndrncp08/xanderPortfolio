"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { season } from "@/data/content";
import { ResumeButton } from "../SheetProvider";
import SectorHeader from "./SectorHeader";

const TYPE = {
  start: { label: "Lights out", color: "var(--green)" },
  race: { label: "Race", color: "var(--fg)" },
  podium: { label: "Podium", color: "var(--yellow)" },
  flag: { label: "Chequered flag", color: "var(--fg)" },
};

function Marker({ type }) {
  if (type === "flag") return <span className="chequer block size-4 ring-1 ring-fg" />;
  return (
    <span
      className="block size-4 rotate-45 ring-2 ring-ink"
      style={{ background: TYPE[type].color, boxShadow: type === "podium" ? "0 0 14px var(--yellow)" : undefined }}
    />
  );
}

export default function Season() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <section id="s3" className="relative mx-auto max-w-[1320px] px-4 py-28 sm:px-6 sm:py-36">
      <SectorHeader
        code="Sector 3"
        kicker="Career timeline"
        title="Season breakdown"
        lead="Lap by lap, from lights out at SAIT to what's on track right now."
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <ol ref={trackRef} className="relative">
          {/* Track + scroll-linked progress */}
          <span className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-line" aria-hidden />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top bg-red shadow-[0_0_12px_var(--red)]"
            style={{ scaleY: progress }}
          />
          {season.map((lap, i) => (
            <li key={lap.title} data-reveal className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-10 last:pb-0">
              <span className="relative z-10 mt-1.5 flex justify-center">
                <Marker type={lap.type} />
              </span>
              <div className="grid gap-x-8 sm:grid-cols-[8rem_1fr]">
                <p className="t-label pt-1.5 text-dim">
                  Lap {String(i + 1).padStart(2, "0")}
                  <br />
                  <span className="t-data text-muted">{lap.date}</span>
                </p>
                <div>
                  <p className="t-label" style={{ color: TYPE[lap.type].color }}>
                    {TYPE[lap.type].label}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-extrabold uppercase italic leading-none sm:text-3xl">
                    {lap.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-muted">{lap.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <aside data-reveal className="self-start lg:sticky lg:top-24">
          <div className="chamfer relative overflow-hidden bg-red p-6 text-white">
            <div className="hazard absolute inset-x-0 top-0 h-2 opacity-90" />
            <p className="t-label mt-2 text-white/80">Full season data</p>
            <p className="mt-2 font-display text-3xl leading-none font-black uppercase italic">
              Every project, test suite and tool.
            </p>
            <ResumeButton className="press chamfer-sm mt-6 inline-flex bg-ink px-5 py-3 font-display font-extrabold uppercase tracking-wide text-white hover:bg-black">
              Open driver resume
            </ResumeButton>
          </div>
        </aside>
      </div>
    </section>
  );
}
