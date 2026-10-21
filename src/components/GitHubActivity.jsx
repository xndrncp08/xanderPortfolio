import { getGitHubActivity } from "@/lib/github";
import { profile } from "@/data/content";
import ContributionViews from "./ContributionViews";
import Section from "./Section";

const num = new Intl.NumberFormat("en-CA");
const monthName = (ym, style = "short") =>
  new Intl.DateTimeFormat("en-CA", { month: style, year: style === "long" ? "numeric" : undefined, timeZone: "UTC" }).format(
    new Date(`${ym}-01`)
  );
const dayName = (date) =>
  new Intl.DateTimeFormat("en-CA", { month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(date));
const pushed = (iso) =>
  new Intl.DateTimeFormat("en-CA", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

export default async function GitHubActivity() {
  const { days, summary, repos } = await getGitHubActivity(profile.github);
  const profileUrl = `https://github.com/${profile.github}`;
  const peak = summary ? Math.max(1, ...summary.months.map((m) => m.count)) : 1;

  return (
    <Section
      id="receipts"
      index="07"
      label={`github.com/${profile.github}`}
      title="Receipts."
      intro="Real contributions from the last twelve months, fetched from GitHub and refreshed twice a day. Not a screenshot, not vibes."
      className="carbon"
    >
      {summary ? (
        <>
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              ["Contributions", num.format(summary.total)],
              ["Active days", num.format(summary.active)],
              ["Longest streak", `${summary.longest}d`],
              ["Busiest day", summary.busiest?.count || "—", summary.busiest?.count ? dayName(summary.busiest.date) : null],
            ].map(([term, value, note], i) => (
              <div key={term} className="reveal flex flex-col-reverse border-t border-line pt-4" style={{ "--d": `${i * 60}ms` }}>
                <dt className="label mt-2">
                  {term}
                  {note && ` · ${note}`}
                </dt>
                <dd className="display text-5xl text-volt tabular-nums sm:text-6xl">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="reveal mt-12">
            <ContributionViews
              days={days}
              label={`${num.format(summary.total)} contributions on ${summary.active} days in the last year.`}
            />
          </div>

          <h3 className="label mt-14 text-fg">By month</h3>
          <ol className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(2.5rem,1fr))] items-end gap-1.5">
            {summary.months.map((m, i) => (
              <li key={m.month} className="flex flex-col items-center gap-1.5">
                <span className="label tabular-nums">{m.count}</span>
                <span aria-hidden className="flex h-20 w-full items-end">
                  <span className="w-full rounded-t-[2px] bg-volt/80" style={{ height: `${Math.max(2, (m.count / peak) * 100)}%` }} />
                </span>
                <span className="label">
                  <span aria-hidden>
                    {monthName(m.month)}
                    {(i === 0 || m.month.endsWith("-01")) && ` ’${m.month.slice(2, 4)}`}
                  </span>
                  <span className="sr-only">{monthName(m.month, "long")}</span>
                </span>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p className="border-t border-line pt-6 text-lg">
          GitHub isn&apos;t answering right now, which is ironic for a section called Receipts.{" "}
          <a href={profileUrl} target="_blank" rel="noopener" className="link">
            See my activity on GitHub<span aria-hidden> ↗</span>
          </a>
        </p>
      )}

      {repos && repos.recent.length > 0 && (
        <div className="mt-16">
          <h3 className="label text-fg">Recently pushed</h3>
          <ul className="mt-4 grid border-t border-line sm:grid-cols-2">
            {repos.recent.map((r, i) => (
              <li key={r.name} className={`border-b border-line ${i % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"}`}>
                <a href={r.url} target="_blank" rel="noopener" className="group block py-6">
                  <p className="flex items-baseline justify-between gap-4">
                    <span className="text-lg font-medium group-hover:text-volt">{r.name}</span>
                    <span className="label shrink-0">{pushed(r.pushedAt)}</span>
                  </p>
                  {r.description && <p className="mt-1 line-clamp-2 text-muted">{r.description}</p>}
                  {r.language && <p className="label mt-3">{r.language}</p>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-10">
        <a href={profileUrl} target="_blank" rel="noopener" className="btn btn-ghost">
          {repos ? `All ${repos.count} public repositories` : "GitHub profile"}
          <span aria-hidden className="arrow arrow-ne">↗</span>
        </a>
      </p>
    </Section>
  );
}
