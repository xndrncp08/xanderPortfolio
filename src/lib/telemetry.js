// A tiny frame-rate store for live telemetry (scroll speed, sector).
// Subscribers mutate DOM through refs instead of re-rendering React each frame.

const state = { velocity: 0, speed: 0, progress: 0, sector: "grid" };
const listeners = new Set();

export const MAX_KMH = 340;

export function publish(patch) {
  Object.assign(state, patch);
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

export function getTelemetry() {
  return state;
}

// Lenis velocity (px/frame) → a believable km/h readout.
export function toKmh(velocity) {
  return Math.min(MAX_KMH, Math.round(Math.abs(velocity) * 9));
}

let lenis = null;
export function setLenis(instance) {
  lenis = instance;
}
export function getLenis() {
  return lenis;
}
