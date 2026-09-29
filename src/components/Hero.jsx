import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import { profile, stats } from "@/data/content";
import LocalTime from "./LocalTime";
import { ResumeButton } from "./SheetProvider";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[980px] px-4 pt-28 pb-16 text-center sm:px-6 sm:pt-36">
      <div className="rise flex flex-col items-center gap-5" style={{ "--delay": "0ms" }}>
        <div className="relative size-24 overflow-hidden rounded-full bg-tile ring-1 ring-line">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="96px"
            priority
            className="object-cover"
          />
        </div>
        <p className="t-small inline-flex items-center gap-2 rounded-full bg-tile px-3.5 py-1.5 text-muted">
          <span
            className="size-2 rounded-full bg-[#30d158]"
            style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
          />
          <span>
            Open to roles · {profile.location.split(",")[0]}, <LocalTime timeZone={profile.timeZone} />
          </span>
        </p>
      </div>

      <h1 className="t-display rise mx-auto mt-8 max-w-4xl" style={{ "--delay": "90ms" }}>
        Build it. Cringe at it.
        <br />
        <span className="text-gradient">Make it better.</span>
      </h1>

      <p className="t-lead rise mx-auto mt-6 max-w-2xl text-muted" style={{ "--delay": "180ms" }}>
        I&apos;m Xander — a full-stack developer and {profile.school} Software Development grad in
        Calgary. I build things where clean design meets solid engineering, and I test them
        properly.
      </p>

      <div
        className="rise mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        style={{ "--delay": "260ms" }}
      >
        <a
          href="#work"
          className="press rounded-full bg-accent px-6 py-3 text-[17px] font-medium text-accent-fg hover:bg-accent-hover"
        >
          See my work
        </a>
        <ResumeButton className="press group inline-flex items-center gap-0.5 text-[17px] text-accent">
          View resume
          <FiChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </ResumeButton>
      </div>

      <dl className="rise mt-20 grid gap-3 sm:grid-cols-3" style={{ "--delay": "340ms" }}>
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse rounded-3xl bg-tile px-6 py-7">
            <dt className="t-small mt-1 text-muted">{s.label}</dt>
            <dd className="text-5xl font-semibold tracking-[-0.04em]">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
