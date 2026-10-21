import { test } from "node:test";
import assert from "node:assert/strict";
import { project, sampleLoop } from "../src/lib/projection.js";
import { pluck, strings } from "../src/lib/pluck.js";

test("projection puts the origin at the screen centre and nearer points further out", () => {
  const cam = { yaw: 0, pitch: 0, dist: 3, scale: 100, cx: 50, cy: 50 };
  assert.deepEqual(project([0, 0, 0], cam), [50, 50, 0]);
  const near = project([1, 0, -1], cam);
  const far = project([1, 0, 1], cam);
  assert.ok(near[0] > far[0] && near[2] < far[2]);
});

test("sampleLoop passes through its control points and closes the loop", () => {
  const pts = [[0, 0], [1, 0], [1, 1], [0, 1]];
  const loop = sampleLoop(pts, 8);
  assert.equal(loop.length, 8);
  assert.deepEqual(loop[0], [0, 0]);
  assert.deepEqual(loop[2], [1, 0]);
});

test("a plucked string repeats at its period and dies away", () => {
  let seed = 1;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const sr = 8000;
  const out = pluck(strings[0].hz, sr, 1, rand);
  const period = Math.round(sr / strings[0].hz);
  assert.equal(out.length, sr);
  const energy = (from) => out.slice(from, from + period).reduce((s, v) => s + v * v, 0);
  assert.ok(energy(period * 70) < energy(0) * 0.2, "should decay");
  assert.ok(Math.abs(out[period * 3] - out[period * 4]) < 0.2, "should be roughly periodic");
});
