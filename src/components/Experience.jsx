import { FiChevronRight } from "react-icons/fi";
import { education, experience } from "@/data/content";
import SectionIntro from "./SectionIntro";
import { ResumeButton } from "./SheetProvider";

function Entry({ item }) {
  return (
    <li className="grid gap-1 border-t border-line py-6 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
      <span className="t-small text-muted sm:pt-0.5">{item.period}</span>
      <div>
        <p className="font-semibold">{item.title}</p>
        <p className="t-small text-muted">{item.org}</p>
        <p className="mt-2 text-muted">{item.detail}</p>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[980px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionIntro eyebrow="Experience" title="Where I've been." />

      <div className="grid gap-4 md:gap-5 lg:grid-cols-[1fr_20rem]">
        <div data-reveal className="rounded-[28px] bg-tile p-7 sm:p-9">
          <h3 className="t-eyebrow mb-5 text-muted">Work</h3>
          <ol>
            {experience.map((item) => (
              <Entry key={item.title} item={item} />
            ))}
          </ol>
          <h3 className="t-eyebrow mt-10 mb-5 text-muted">Education</h3>
          <ol>
            {education.map((item) => (
              <Entry key={item.title} item={item} />
            ))}
          </ol>
        </div>

        <div
          data-reveal
          style={{ "--delay": "80ms" }}
          className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-logo p-7 text-white ring-1 ring-white/10 ring-inset sm:p-9"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 60% at 100% 0%, #2997ff40, transparent 70%), radial-gradient(70% 50% at 0% 100%, #ff6a0030, transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="t-eyebrow text-[#2997ff]">Master resume</p>
            <p className="t-title mt-2">Every project, test suite and tool. One page.</p>
          </div>
          <ResumeButton className="press group relative mt-10 inline-flex items-center justify-center gap-1 rounded-full bg-white px-5 py-3 text-[15px] font-medium text-black hover:bg-white/90">
            View resume
            <FiChevronRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </ResumeButton>
        </div>
      </div>
    </section>
  );
}
