import Image from "next/image";
import { interests, story } from "@/data/content";
import Section from "./Section";

export default function About() {
  return (
    <>
      <Section id="about" index="03" label="About" title="Manila-raised, Calgary-based, quietly stubborn about details.">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-6 lg:col-start-4">
            {story.map((s) => (
              <div key={s.title}>
                <h3 className="label text-fg">{s.title}</h3>
                <p className="prose-measure mt-3 text-lg">{s.body}</p>
              </div>
            ))}
          </div>
          <blockquote className="lg:col-span-3">
            <p className="display text-4xl text-accent italic lg:sticky lg:top-28">“The cringe is the compass.”</p>
          </blockquote>
        </div>
      </Section>

      <section id="life" aria-labelledby="life-title" className="bg-surface">
        <div className="wrap py-20 sm:py-28">
          <div className="grid gap-4 lg:grid-cols-12">
            <p className="label lg:col-span-3 lg:pt-3">04 — Off the clock</p>
            <div className="lg:col-span-9">
              <h2 id="life-title" className="display text-[2.5rem] sm:text-6xl">
                Beyond the code
              </h2>
              <p className="prose-measure mt-5 text-lg text-muted">
                The things that keep me curious when the editor is closed — and, more often than not, feed back into
                what I build.
              </p>
            </div>
          </div>

          <div className="mt-14 grid border-t border-line-strong sm:grid-cols-2">
            {interests.map((item, i) => (
              <article
                key={item.title}
                className={`border-b border-line-strong py-10 sm:px-8 ${i % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"}`}
              >
                {item.image && (
                  <div className="relative mb-8 aspect-[3/2] overflow-hidden rounded-[3px]">
                    <Image src={item.image} alt={item.alt ?? ""} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                )}
                <p className="label">
                  {String(i + 1).padStart(2, "0")} · {item.note}
                </p>
                <h3 className="display mt-3 text-5xl sm:text-6xl">{item.title}</h3>
                <p className="prose-measure mt-4 text-lg text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
