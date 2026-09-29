import { stack } from "@/data/content";
import SectionIntro from "./SectionIntro";

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-[980px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionIntro
        eyebrow="Stack"
        title="The toolkit."
        lead="What I reach for, from the first commit to the test run."
      />

      <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {stack.map(({ group, items }, i) => (
          <div
            key={group}
            data-reveal
            style={{ "--delay": `${(i % 3) * 70}ms` }}
            className="rounded-[28px] bg-tile p-7"
          >
            <h3 className="t-eyebrow">{group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="t-small rounded-full bg-bg px-3 py-1.5 font-medium ring-1 ring-line"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
