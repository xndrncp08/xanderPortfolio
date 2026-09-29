import Image from "next/image";
import { disciplines, offTheClock, profile, projects, stack, story } from "@/data/content";
import Radar from "./Radar";
import SectorHeader from "./SectorHeader";

function measure() {
  return disciplines.map((d) => {
    const used = projects.filter((p) => {
      const hay = [...p.tags, p.tech].join(" | ");
      return d.match.some((m) => hay.includes(m));
    });
    return { ...d, count: used.length, projects: used.map((p) => p.title) };
  });
}

const SPEC = [
  ["Driver", profile.name],
  ["Number", `#${profile.raceNumber}`],
  ["Origin", profile.origin],
  ["Base", profile.base],
  ["Team", "Free agent — open to contracts"],
  ["Licence", `${profile.school} Software Development, 2026`],
  ["Qualifying", "3.61 GPA"],
  ["Debut", "2024"],
];

export default function Driver() {
  const telemetry = measure();
  const total = projects.length;

  return (
    <section id="s2" className="relative mx-auto max-w-[1320px] px-4 py-28 sm:px-6 sm:py-36">
      <SectorHeader
        code="Sector 2"
        kicker="Driver profile & telemetry"
        title="Driver spec sheet"
        lead={profile.intro}
      />

      <div className="grid gap-6 lg:grid-cols-[22rem_1fr] lg:gap-10">
        {/* Official spec sheet */}
        <div data-reveal className="brackets self-start bg-carbon/80 p-4">
          <div className="group chamfer relative aspect-[4/5] overflow-hidden bg-panel">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="352px"
              className="object-cover grayscale transition duration-700 group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/60 to-transparent p-4 pt-16">
              <p className="font-display text-4xl leading-none font-black italic uppercase">
                <span className="text-red">#{profile.raceNumber}</span> Rancap
              </p>
            </div>
          </div>
          <dl className="mt-4">
            {SPEC.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-t border-line py-2">
                <dt className="t-label pt-0.5 text-dim">{k}</dt>
                <dd className="text-right text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Team radio transcripts */}
        <div>
          <ol className="grid gap-4 md:grid-cols-2">
            {story.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ "--delay": `${(i % 2) * 80}ms` }}
                className="chamfer bg-panel/80 p-6 ring-1 ring-line"
              >
                <p className="t-label flex items-center gap-2 text-cyan">
                  <span className="led size-1.5 text-cyan" /> Team radio {String(i + 1).padStart(2, "0")} ·{" "}
                  {s.tag}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold uppercase italic leading-none">
                  {s.title}
                </h3>
                <p className="mt-3 text-muted">“{s.body}”</p>
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-6">
            <p className="t-label mb-3 text-dim">Off track</p>
            <ul className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
              {offTheClock.map((o) => (
                <li key={o.label} className="bg-carbon p-4">
                  <p className="font-display text-lg font-extrabold uppercase">{o.label}</p>
                  <p className="text-sm text-muted">{o.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Car telemetry */}
      <div className="mt-24">
        <div data-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="t-label text-yellow">Car telemetry</p>
            <h3 className="mt-2 font-display text-4xl font-extrabold uppercase italic">Race craft, measured</h3>
          </div>
          <p className="max-w-sm text-sm text-muted">
            No self-rated skill bars. Each channel counts how many of the {total} projects above use that
            discipline.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div data-reveal className="brackets flex items-center justify-center bg-carbon/60 p-6">
            <Radar data={telemetry} total={total} />
          </div>

          <div data-reveal style={{ "--delay": "80ms" }}>
            <table className="w-full">
              <caption className="sr-only">Projects using each discipline, out of {total}</caption>
              <thead className="sr-only">
                <tr>
                  <th>Channel</th>
                  <th>Projects</th>
                </tr>
              </thead>
              <tbody>
                {telemetry.map((d) => (
                  <tr key={d.key} className="border-t border-line">
                    <th scope="row" className="w-40 py-4 text-left align-top font-normal">
                      <span className="block font-display text-lg font-extrabold uppercase italic leading-none">
                        {d.label}
                      </span>
                      <span className="t-label text-dim">{d.sub}</span>
                    </th>
                    <td className="py-4 pl-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 bg-panel-2">
                          <div
                            className="h-full rounded-r bg-cyan"
                            style={{ width: `${(d.count / total) * 100}%` }}
                          />
                        </div>
                        <span className="t-data w-12 text-right text-fg">
                          {d.count}/{total}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-dim">{d.projects.join(" · ")}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full engine spec */}
        <div className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((g, i) => (
            <div key={g.group} data-reveal style={{ "--delay": `${(i % 3) * 60}ms` }} className="bg-carbon p-5">
              <p className="t-label text-dim">Engine spec · {g.group}</p>
              <p className="mt-2 text-fg">{g.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
