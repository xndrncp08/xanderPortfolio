"use client";
import { useRef, useState } from "react";
import { pluck, strings } from "@/lib/pluck";

// Six strings you can pluck (click, tap, Enter) or strum (drag across with
// the button held). Audio starts only on a user gesture.
export default function Strings() {
  const audio = useRef(null);
  const lines = useRef([]);
  const mouse = useRef(false); // the click after a mouse press already played
  const [last, setLast] = useState(null);

  const play = (i) => {
    const s = strings[i];
    try {
      audio.current ??= new AudioContext();
      const ctx = audio.current;
      if (ctx.state === "suspended") ctx.resume();
      const data = pluck(s.hz, ctx.sampleRate);
      const buffer = ctx.createBuffer(1, data.length, ctx.sampleRate);
      buffer.copyToChannel(data, 0);
      const src = ctx.createBufferSource();
      const gain = ctx.createGain();
      gain.gain.value = 0.32;
      src.buffer = buffer;
      src.connect(gain).connect(ctx.destination);
      src.start();
    } catch {
      // No Web Audio: the string still wobbles, which is honestly most of the fun.
    }
    const el = lines.current[i];
    el.classList.remove("plucked");
    void el.offsetWidth; // restart the animation
    el.classList.add("plucked");
    setLast(`${s.note}${s.octave} · ${s.hz.toFixed(1)} Hz`);
  };

  return (
    <div className="rounded-md bg-carbon p-5 text-on-carbon sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="label text-on-carbon-muted">Standard tuning · pluck one, or drag to strum</p>
        <p className="label text-volt tabular-nums" aria-live="polite">
          {last ?? "Sound on, if you're brave"}
        </p>
      </div>
      <div className="mt-5" role="group" aria-label="Guitar strings">
        {strings.map((s, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Pluck the ${s.note}${s.octave} string`}
            // Mouse plays on press so a drag can strum; touch and keyboard play on
            // click, which is also the gesture iOS needs to unlock audio.
            onPointerDown={(e) => (mouse.current = e.pointerType === "mouse") && play(i)}
            onClick={(e) => (e.detail === 0 || !mouse.current ? play(i) : (mouse.current = false))}
            onPointerEnter={(e) => e.pointerType === "mouse" && e.buttons === 1 && play(i)}
            className="group flex h-11 w-full items-center gap-4 rounded-sm outline-offset-0 sm:h-12"
          >
            <span className="label w-8 shrink-0 text-left text-on-carbon-muted group-hover:text-volt">
              {s.note}
              <sub className="text-[0.6rem]">{s.octave}</sub>
            </span>
            <span
              ref={(el) => (lines.current[i] = el)}
              style={{ "--amp": `${4 - i * 0.4}px`, height: `${3 - i * 0.4}px` }}
              className="string-line block flex-1 rounded-full bg-gradient-to-r from-[#8a8577] via-[#d9d4c7] to-[#8a8577] transition-colors group-hover:from-volt group-hover:via-volt group-hover:to-volt"
            />
            <span className="label hidden w-24 shrink-0 text-right text-on-carbon-muted sm:block">
              {i < 4 ? "bass too" : "guitar only"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
