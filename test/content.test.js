import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { experience, path, projects, story } from "../src/data/content.js";

test("the First Eduspec internship is dated 2022, in Manila", () => {
  const internship = experience.find((e) => e.org.startsWith("First Eduspec"));
  assert.equal(internship.period, "2022");
  assert.match(internship.place, /Manila/);
  assert.equal(path[0].date, "2022");
  assert.match(path[0].title, /First Eduspec/);
});

test("no copy pairs the internship with 2024", () => {
  const source = readFileSync(new URL("../src/data/content.js", import.meta.url), "utf8");
  for (const block of source.split(/\n\s*\{\n/)) {
    if (block.includes("First Eduspec")) assert.doesNotMatch(block, /2024/);
  }
  assert.ok(story.some((s) => s.body.includes("2022")));
});

test("the timeline runs internship → move → SAIT → graduation", () => {
  const order = ["First Eduspec", "Moved to Canada", "Started Software Development", "Graduated"];
  const idx = order.map((t) => path.findIndex((p) => p.title.includes(t)));
  assert.ok(idx.every((i) => i >= 0), `missing timeline entries: ${idx}`);
  assert.deepEqual([...idx].sort((a, b) => a - b), idx);
});

test("projects have unique slugs, the four featured ones, and art that exists", () => {
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual(
    projects.filter((p) => p.featured).map((p) => p.title),
    ["Diskarte", "Resoniq", "FJuan", "BMR Pharmacy"]
  );
  for (const p of projects) {
    assert.ok(p.logo || p.image, `${p.title} has no art`);
    if (p.logo) assert.ok(existsSync(new URL(`../public${p.logo}`, import.meta.url)), `${p.logo} missing`);
    for (const url of Object.values(p.links ?? {})) assert.match(url, /^https:\/\//);
  }
});

test("the résumé PDF ships with the site", () => {
  assert.ok(existsSync(new URL("../public/resume.pdf", import.meta.url)));
});
