import { skills } from "@/data/content";
import Section from "./Section";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="06"
      label="Toolkit"
      title="What's in the garage."
      intro="Grouped by the job it does. No progress bars: nobody is 87% at React."
      className="border-t border-line"
    >
      <div className="grid gap-x-12 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <div key={s.group} className="reveal border-b border-line py-8" style={{ "--d": `${(i % 3) * 60}ms` }}>
            <h3 className="display text-3xl sm:text-4xl">{s.group}</h3>
            <p className="aside mt-2 text-lg text-muted">{s.note}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {s.items.map((item) => (
                <li key={item} className="rounded-full border border-line-strong px-3 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
