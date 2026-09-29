import { offTheClock, profile, story } from "@/data/content";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeader index="02" title="About" aside="PH → YYC" />

      <div className="grid gap-14 md:grid-cols-[5fr_7fr] md:gap-16">
        <div data-reveal className="md:sticky md:top-28 md:self-start">
          <p className="font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
            Build it. Cringe at it. <em className="text-accent">Make it better.</em>
          </p>
          <div className="mt-8 rounded-2xl bg-surface p-6">
            <p className="font-mono text-xs text-accent">Right now</p>
            <p className="mt-2 leading-relaxed">
              Just finished {profile.school}&apos;s Software Development program. Building
              Resoniq, keeping BMR&apos;s sales tracker running, and figuring out what I&apos;m
              genuinely good at. Slowly.
            </p>
          </div>
        </div>

        <ol className="border-t border-line">
          {story.map((chapter, i) => (
            <li key={chapter.title} data-reveal className="border-b border-line py-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="flex items-baseline gap-4 text-xl font-medium">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {chapter.title}
                </h3>
                <span className="shrink-0 font-mono text-xs text-muted">{chapter.tag}</span>
              </div>
              <p className="mt-3 pl-9 leading-relaxed text-muted">{chapter.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div data-reveal className="mt-24">
        <p className="max-w-2xl text-xl leading-relaxed text-balance sm:text-2xl">
          Off the clock I run, play sports and mess with music —{" "}
          <span className="text-muted">
            mostly to reset when I&apos;ve stared at a problem so long everything starts
            looking wrong.
          </span>
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {offTheClock.map((item) => (
            <li key={item.label} className="bg-bg p-6">
              <p className="font-serif text-2xl">{item.label}</p>
              <p className="mt-1 text-sm text-muted">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
