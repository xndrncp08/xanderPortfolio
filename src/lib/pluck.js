// Karplus–Strong: a burst of noise fed through a delay line one period long,
// averaged and damped each pass. It sounds like a plucked string because,
// physically, that's roughly what a plucked string does.
export function pluck(freq, sampleRate, seconds = 2.5, random = Math.random, damping = 0.996) {
  const period = Math.round(sampleRate / freq);
  const out = new Float32Array(Math.round(sampleRate * seconds));
  for (let i = 0; i < period && i < out.length; i++) out[i] = random() * 2 - 1;
  for (let i = period; i < out.length; i++) {
    out[i] = damping * 0.5 * (out[i - period] + out[i - period + 1]);
  }
  return out;
}

// Standard tuning, low to high. The bottom four are also a bass, an octave up.
export const strings = [
  { note: "E", octave: 2, hz: 82.41 },
  { note: "A", octave: 2, hz: 110.0 },
  { note: "D", octave: 3, hz: 146.83 },
  { note: "G", octave: 3, hz: 196.0 },
  { note: "B", octave: 3, hz: 246.94 },
  { note: "E", octave: 4, hz: 329.63 },
];
