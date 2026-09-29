import { stack } from "@/data/content";
import SectionHeader from "./SectionHeader";

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeader index="03" title="Stack" aside="Tools I reach for" />

      <dl className="border-t border-line">
        {stack.map(({ group, items }) => (
          <div
            key={group}
            data-reveal
            className="grid gap-3 border-b border-line py-6 sm:grid-cols-[12rem_1fr] sm:items-baseline sm:gap-6"
          >
            <dt className="font-mono text-xs text-muted">{group}</dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1 font-serif text-3xl leading-tight sm:text-4xl">
              {items.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < items.length - 1 && <span className="ml-3 text-line">/</span>}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
