import { offTheClock, profile, story } from "@/data/content";
import SectionIntro from "./SectionIntro";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[980px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionIntro
        eyebrow="About"
        title="Manila-raised. Calgary-built."
        lead={`Just finished ${profile.school}'s Software Development program. Building Resoniq, keeping BMR's sales tracker running, and figuring out what I'm genuinely good at. Slowly.`}
      />

      <ol className="grid gap-4 md:grid-cols-2 md:gap-5">
        {story.map((chapter, i) => (
          <li
            key={chapter.title}
            data-reveal
            style={{ "--delay": `${(i % 2) * 80}ms` }}
            className="rounded-[28px] bg-tile p-7 sm:p-9"
          >
            <p className="t-caption font-semibold text-muted">
              {String(i + 1).padStart(2, "0")} · {chapter.tag}
            </p>
            <h3 className="t-title mt-2">{chapter.title}</h3>
            <p className="mt-3 text-muted">{chapter.body}</p>
          </li>
        ))}
      </ol>

      <div data-reveal className="mt-20 text-center">
        <p className="t-eyebrow text-muted">Off the clock</p>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {offTheClock.map((item) => (
            <li key={item.label} className="rounded-3xl bg-tile px-5 py-7">
              <p className="text-xl font-semibold tracking-[-0.02em]">{item.label}</p>
              <p className="t-small mt-1 text-muted">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
