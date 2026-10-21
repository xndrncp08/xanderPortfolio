import Image from "next/image";
import { interests, profile, story } from "@/data/content";
import Section from "./Section";
import Strings from "./Strings";

export default function About() {
  return (
    <>
      <Section
        id="about"
        index="03"
        label="About"
        title="Manila-raised. Calgary-tested."
        intro="The short version, with fewer buzzwords than the average LinkedIn bio."
        className="border-t border-line"
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <figure className="reveal max-w-md lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-surface lg:sticky lg:top-24">
              <Image
                src={profile.gradPhoto}
                alt={`${profile.name} smiling outside Heritage Hall at SAIT, holding his graduation cap with a 2026 tassel`}
                fill
                sizes="(min-width: 1024px) 40vw, 448px"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="aside mt-3 text-lg text-muted">
              Heritage Hall, SAIT. Pointing at the tassel because I earned the tassel.
            </figcaption>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7">
            {story.map((s, i) => (
              <div key={s.title} className="reveal border-t border-line py-8 first:border-t-0 first:pt-0">
                <h3 className="label flex gap-3 text-fg">
                  <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h3>
                <p className="prose-measure mt-4 text-xl leading-relaxed">{s.body}</p>
              </div>
            ))}
            <blockquote className="reveal mt-6 border-t border-line pt-8">
              <p className="display text-5xl sm:text-6xl">
                <span className="mark">The cringe</span> is the compass.
              </p>
              <footer className="label mt-4">— Me, looking at last month&apos;s code</footer>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section
        id="off-track"
        index="04"
        label="Off track"
        title="When the laptop's closed."
        intro="Things that keep me curious away from the editor, and somehow keep sneaking back into it."
        className="bg-surface"
      >
        <div className="grid border-t border-line-strong sm:grid-cols-2">
          {interests.map((item, i) => (
            <article
              key={item.title}
              className={`reveal border-b border-line-strong py-10 ${i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"}`}
              style={{ "--d": `${(i % 2) * 80}ms` }}
            >
              <p className="label">
                {String(i + 1).padStart(2, "0")} · {item.note}
              </p>
              <h3 className="display mt-4 text-5xl sm:text-6xl">{item.title}</h3>
              <p className="prose-measure mt-4 text-lg text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="reveal mt-12">
          <h3 className="display text-3xl sm:text-4xl">Go on, pluck one.</h3>
          <p className="mt-2 mb-6 text-muted">
            Real string physics (Karplus–Strong, if you&apos;re curious), in about ten lines of maths. Tuned better than my
            actual guitar.
          </p>
          <Strings />
        </div>
      </Section>
    </>
  );
}
