import Image from "next/image";
import { profile, projects } from "@/data/content";
import Circuit from "./Circuit";

const telemetry = [
  ["3.61", "GPA, Software Development, SAIT ’26"],
  ["Daily", "BMR Pharmacy's tracker in production since Nov 2025"],
  [String(projects.length), "projects on this page, all actually built"],
  ["2022", "first award-winning build, back in Manila"],
];

export default function Hero() {
  return (
    <>
      <section aria-labelledby="hero-title" className="wrap pt-10 pb-16 sm:pt-16 sm:pb-24">
        <p className="label reveal">
          {profile.role} · {profile.location.split(",")[0]}, by way of {profile.origin.split(",")[0]}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 id="hero-title" className="display text-[clamp(4.25rem,15vw,11.5rem)] uppercase">
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="rise">Xander</span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="rise" style={{ "--d": "90ms" }}>
                  Rancap
                </span>
              </span>
            </h1>

            <p className="reveal mt-8 max-w-[32ch] text-2xl leading-snug font-medium tracking-[-0.01em] sm:text-[1.85rem]" style={{ "--d": "150ms" }}>
              I build full-stack apps and test them like someone depends on them.{" "}
              <span className="mark">Because, annoyingly, someone usually does.</span>
            </p>
            <p className="prose-measure reveal mt-6 text-lg text-muted" style={{ "--d": "220ms" }}>
              {profile.intro}
            </p>

            <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "280ms" }}>
              <a href="#work" className="btn btn-volt">
                See the work <span aria-hidden className="arrow">↓</span>
              </a>
              <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost">
                Résumé <span className="sr-only">(PDF, opens in a new tab)</span>
                <span aria-hidden className="arrow arrow-ne">↗</span>
              </a>
            </div>
            <p className="label reveal mt-6 flex items-center gap-2" style={{ "--d": "320ms" }}>
              <span aria-hidden className="live-dot inline-block size-1.5 rounded-full bg-[#3fb950]" />
              {profile.status}
            </p>
          </div>

          <figure className="reveal max-w-md lg:col-span-5 lg:max-w-none" style={{ "--d": "120ms" }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
              <Image
                src={profile.photo}
                alt={`${profile.name} in a black suit, holding a graduation folder, with the Calgary skyline behind him`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 448px"
                className="object-cover object-[50%_20%]"
              />
              <span className="label absolute top-3 left-3 rounded-sm bg-volt px-1.5 py-0.5 text-[#0f0f0e]">No. 08</span>
            </div>
            <figcaption className="aside mt-3 text-lg text-muted">
              Calgary skyline for scale. Rare footage of me not looking at a terminal.
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="telemetry-title" className="carbon">
        <div className="checker" aria-hidden />
        <div className="wrap py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label">Telemetry</p>
              <h2 id="telemetry-title" className="display mt-3 text-4xl sm:text-6xl">
                The pit wall.
              </h2>
            </div>
            <p className="aside max-w-sm text-lg text-on-carbon-muted">
              The car is fictional. The numbers below are not.
            </p>
          </div>

          <Circuit className="mt-8 aspect-[4/3] rounded-md border border-line sm:aspect-[16/7]" />

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {telemetry.map(([value, label], i) => (
              <div key={label} className="reveal flex flex-col-reverse border-t border-line pt-4" style={{ "--d": `${i * 70}ms` }}>
                <dt className="label mt-2">{label}</dt>
                <dd className="display text-5xl text-volt tabular-nums sm:text-6xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
