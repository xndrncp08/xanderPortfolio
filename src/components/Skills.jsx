import { skills } from "@/data/content";
import Section from "./Section";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="06"
      label="Toolkit"
      title="What I reach for."
      intro="Grouped by the work it does, not by how well I claim to know it."
    >
      <div className="grid gap-x-12 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group} className="border-b border-line py-8">
            <h3 className="display text-3xl">{s.group}</h3>
            <p className="mt-2 text-muted">{s.note}</p>
            <p className="mt-4 leading-relaxed">{s.items.join(", ")}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
