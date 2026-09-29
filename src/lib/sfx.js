// Synthesised HUD sounds (Web Audio — no files). Off by default; the toggle
// lives in the telemetry bar and the choice is remembered per browser.

let ctx = null;
let enabled = false;
const listeners = new Set();

export function initSfx() {
  try {
    enabled = localStorage.getItem("sfx") === "on";
  } catch {}
  listeners.forEach((fn) => fn(enabled));
}

export function isSfxOn() {
  return enabled;
}

export function onSfxChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function toggleSfx() {
  enabled = !enabled;
  try {
    localStorage.setItem("sfx", enabled ? "on" : "off");
  } catch {}
  listeners.forEach((fn) => fn(enabled));
  if (enabled) play("confirm");
}

function tone(freq, { start = 0, duration = 0.05, type = "square", gain = 0.035, slideTo } = {}) {
  const t = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + duration);
  amp.gain.setValueAtTime(gain, t);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(amp).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

const SOUNDS = {
  tick: () => tone(2400, { duration: 0.018, gain: 0.02 }),
  press: () => tone(900, { duration: 0.04, slideTo: 520 }),
  confirm: () => {
    tone(880, { duration: 0.06 });
    tone(1320, { start: 0.07, duration: 0.09 });
  },
  light: () => tone(440, { duration: 0.12, type: "sine", gain: 0.06 }),
  go: () => tone(220, { duration: 0.5, type: "sawtooth", gain: 0.04, slideTo: 880 }),
  radio: () => {
    tone(1200, { duration: 0.05, type: "sine", gain: 0.05 });
    tone(1600, { start: 0.08, duration: 0.05, type: "sine", gain: 0.05 });
  },
};

export function play(name) {
  if (!enabled || typeof window === "undefined") return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    SOUNDS[name]?.();
  } catch {}
}
