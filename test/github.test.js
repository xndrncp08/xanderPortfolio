import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseCalendarHtml, summarize } from "../src/lib/github.js";

const html = readFileSync(new URL("./fixtures/contributions.html", import.meta.url), "utf8");

test("parses GitHub's public calendar markup into sorted days with counts", () => {
  const days = parseCalendarHtml(html);
  assert.equal(days.length, 12);
  assert.deepEqual(days[0], { date: "2025-10-19", count: 0, level: 0 });
  assert.deepEqual(days.find((d) => d.date === "2025-11-10"), { date: "2025-11-10", count: 4, level: 1 });
  assert.ok(days.every((d, i) => i === 0 || days[i - 1].date < d.date));
});

test("returns no days for unrecognised markup, so the caller can fall back", () => {
  assert.deepEqual(parseCalendarHtml("<html>rate limited</html>"), []);
});

test("reads thousands separators in tooltip counts", () => {
  const cell = '<td data-date="2026-01-01" id="d1" data-level="4"><tool-tip for="d1">1,204 contributions on January 1st.</tool-tip>';
  assert.equal(parseCalendarHtml(cell)[0].count, 1204);
});

test("summarizes totals, active days, longest streak and months from real days only", () => {
  const s = summarize([
    { date: "2026-01-30", count: 2 },
    { date: "2026-01-31", count: 0 },
    { date: "2026-02-01", count: 5 },
    { date: "2026-02-02", count: 1 },
    { date: "2026-02-03", count: 3 },
  ]);
  assert.equal(s.total, 11);
  assert.equal(s.active, 4);
  assert.equal(s.longest, 3);
  assert.equal(s.busiest.date, "2026-02-01");
  assert.deepEqual(s.months, [
    { month: "2026-01", count: 2 },
    { month: "2026-02", count: 9 },
  ]);
});

test("summarizes an empty calendar without inventing activity", () => {
  assert.deepEqual(summarize([]), { total: 0, active: 0, longest: 0, busiest: null, months: [] });
});
