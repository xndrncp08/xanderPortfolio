// Real GitHub activity, fetched on the server only. Uses GraphQL when
// GITHUB_TOKEN is set; otherwise GitHub's public contributions calendar,
// which needs no token. Results are cached for 12 hours.

const REVALIDATE = 60 * 60 * 12;
const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
const QUERY = `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar {
  weeks { contributionDays { date contributionCount contributionLevel } } } } } }`;

// Parses github.com/users/<name>/contributions into [{ date, count, level }],
// oldest first. Counts come from each cell's <tool-tip> ("3 contributions on…").
export function parseCalendarHtml(html) {
  const counts = new Map();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    counts.set(id, Number(text.match(/^([\d,]+) contribution/)?.[1].replace(/,/g, "") ?? 0));
  }
  const days = [];
  for (const [tag] of html.matchAll(/<td\b[^>]*\sdata-date="[^"]+"[^>]*>/g)) {
    const attr = (name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
    days.push({ date: attr("data-date"), count: counts.get(attr("id")) ?? 0, level: Number(attr("data-level") ?? 0) });
  }
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

// Totals derived from the days themselves — nothing here is estimated.
export function summarize(days) {
  let total = 0, active = 0, streak = 0, longest = 0, busiest = null;
  const months = new Map();
  for (const day of days) {
    total += day.count;
    if (day.count > 0) {
      active++;
      longest = Math.max(longest, ++streak);
    } else streak = 0;
    if (!busiest || day.count > busiest.count) busiest = day;
    const month = day.date.slice(0, 7);
    months.set(month, (months.get(month) ?? 0) + day.count);
  }
  return { total, active, longest, busiest, months: [...months].map(([month, count]) => ({ month, count })) };
}

async function fetchCalendar(login, token) {
  if (token) {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
    const { data } = await res.json();
    return data.user.contributionsCollection.contributionCalendar.weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVELS[d.contributionLevel] ?? 0 }))
    );
  }
  const res = await fetch(`https://github.com/users/${login}/contributions`, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`GitHub contributions ${res.status}`);
  const days = parseCalendarHtml(await res.text());
  if (days.length === 0) throw new Error("GitHub contributions markup not recognised");
  return days;
}

async function fetchRepos(login, token) {
  const res = await fetch(`https://api.github.com/users/${login}/repos?sort=pushed&per_page=100`, {
    headers: { Accept: "application/vnd.github+json", ...(token && { Authorization: `bearer ${token}` }) },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`GitHub repos ${res.status}`);
  const repos = (await res.json()).filter((r) => !r.fork && !r.archived);
  return {
    count: repos.length,
    recent: repos.slice(0, 4).map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      url: r.html_url,
      pushedAt: r.pushed_at,
    })),
  };
}

// Never throws: either half can fail (rate limit, outage) and the page shows
// a link to GitHub in its place.
export async function getGitHubActivity(login) {
  const token = process.env.GITHUB_TOKEN;
  const [calendar, repos] = await Promise.allSettled([fetchCalendar(login, token), fetchRepos(login, token)]);
  for (const r of [calendar, repos]) if (r.status === "rejected") console.warn("[github]", r.reason?.message);
  const days = calendar.status === "fulfilled" ? calendar.value : null;
  return {
    days,
    summary: days && summarize(days),
    repos: repos.status === "fulfilled" ? repos.value : null,
  };
}
