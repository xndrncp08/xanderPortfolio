import { FiFileText } from "react-icons/fi";
import { education, experience } from "@/data/content";
import SectionHeader from "./SectionHeader";
import { ResumeButton } from "./ResumeViewer";

function Timeline({ label, items }) {
  return (
    <div data-reveal>
      <h3 className="mb-2 font-mono text-xs text-muted">{label}</h3>
      <ol className="border-t border-line">
        {items.map((item) => (
          <li
            key={item.title + item.org}
            className="grid gap-2 border-b border-line py-6 sm:grid-cols-[9rem_1fr] sm:gap-6"
          >
            <span className="font-mono text-xs text-muted sm:pt-1.5">{item.period}</span>
            <div>
              <p className="text-lg font-medium">{item.title}</p>
              <p className="text-sm text-muted">{item.org}</p>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeader index="04" title="Experience" aside="Education & work" />

      <div className="grid gap-16 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div className="grid gap-14">
          <Timeline label="Work" items={experience} />
          <Timeline label="Education" items={education} />
        </div>

        <aside data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line p-6">
            <FiFileText className="size-6 text-accent" aria-hidden />
            <p className="mt-4 font-serif text-3xl leading-tight">The full picture</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              My master resume has every project, test suite and tool in one place, including
              the details that didn&apos;t fit here.
            </p>
            <ResumeButton className="press mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg hover:-translate-y-0.5">
              View master resume
            </ResumeButton>
          </div>
        </aside>
      </div>
    </section>
  );
}
