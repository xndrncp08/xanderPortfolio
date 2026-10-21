import { education, experience, path } from "@/data/content";
import Section from "./Section";

function Entry({ item }) {
  return (
    <li className="border-t border-line py-6">
      <p className="label flex justify-between gap-4">
        <span>{item.period}</span>
        <span>{item.place}</span>
      </p>
      <h4 className="mt-2 text-lg font-medium">{item.title}</h4>
      <p className="text-muted">{item.org}</p>
      <p className="mt-2">{item.detail}</p>
    </li>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      index="05"
      label="Experience & education"
      title="The route so far."
      intro="An internship in Manila, a move across the Pacific, two years at SAIT and a lot of shipped software since."
      className="border-t border-line"
    >
      <div className="grid gap-16 lg:grid-cols-12">
        <ol className="lg:col-span-7">
          {path.map((step, i) => (
            <li
              key={i}
              className="reveal grid grid-cols-[4.5rem_1fr] gap-x-4 sm:grid-cols-[7.5rem_1fr] sm:gap-x-6"
            >
              <p className="display pt-0.5 text-2xl text-muted sm:text-3xl">{step.date}</p>
              <div className="relative border-l border-line-strong pb-10 pl-5 sm:pl-7">
                <span
                  aria-hidden
                  className={`absolute top-2 -left-[6px] size-[11px] rounded-full border-2 border-bg ${step.kind === "move" ? "bg-volt ring-1 ring-fg" : "bg-fg"}`}
                />
                <p className="label">{step.place}</p>
                <h3 className="mt-1 text-xl font-medium tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-1 text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="space-y-12 lg:col-span-5">
          <div className="reveal">
            <h3 className="label text-fg">Experience</h3>
            <ul className="mt-4">
              {experience.map((item) => (
                <Entry key={item.org} item={item} />
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h3 className="label text-fg">Education</h3>
            <ul className="mt-4">
              {education.map((item) => (
                <Entry key={item.org} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
