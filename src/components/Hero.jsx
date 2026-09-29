import Image from "next/image";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { profile, stats } from "@/data/content";
import LocalTime from "./LocalTime";
import { ResumeButton } from "./ResumeViewer";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
      <div
        className="rise flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted"
        style={{ "--delay": "0ms" }}
      >
        <span className="flex items-center gap-2">
          <span
            className="size-2 rounded-full bg-green-500"
            style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
          />
          {profile.status}
        </span>
        <span>
          {profile.location} · <LocalTime timeZone={profile.timeZone} />
        </span>
      </div>

      <h1 className="mt-8 font-serif text-[clamp(4.5rem,17vw,13rem)] leading-[0.85] tracking-[-0.03em]">
        <span className="rise block" style={{ "--delay": "80ms" }}>
          Xander
        </span>
        <span className="rise block italic text-accent" style={{ "--delay": "160ms" }}>
          Rancap
        </span>
      </h1>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="rise max-w-xl" style={{ "--delay": "260ms" }}>
          <p className="text-xl leading-relaxed text-balance sm:text-2xl">
            {profile.role} and {profile.school} Software Development grad.{" "}
            <span className="text-muted">{profile.intro}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="press group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg hover:-translate-y-0.5"
            >
              See my work
              <FiArrowDown className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="press group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium hover:border-fg"
            >
              Get in touch
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <ResumeButton className="press inline-flex items-center rounded-full px-4 py-3 text-sm font-medium text-muted hover:text-fg">
              View resume
            </ResumeButton>
          </div>
        </div>

        <figure className="rise w-40 sm:w-48" style={{ "--delay": "340ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="200px"
              priority
              className="object-cover grayscale transition duration-500 hover:grayscale-0"
            />
          </div>
          <figcaption className="mt-2 font-mono text-xs text-muted">
            ↳ that&apos;s me
          </figcaption>
        </figure>
      </div>

      <dl
        className="rise mt-20 grid grid-cols-3 border-t border-line"
        style={{ "--delay": "420ms" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 border-line pt-5 pr-4 not-first:border-l not-first:pl-4 sm:not-first:pl-6">
            <dt className="order-2 font-mono text-xs text-muted">{s.label}</dt>
            <dd className="font-serif text-4xl sm:text-5xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
