"use client";
import { useEffect, useState } from "react";
import { play } from "@/lib/sfx";

// Five reds come on one by one, hold for a random beat, then all go out.
const LIGHT_INTERVAL = 320;
const START_DELAY = 350;

export default function LightsOut() {
  const [lit, setLit] = useState(0);
  const [status, setStatus] = useState("FORMATION LAP");

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.race === "go") return;

    const timers = [];
    const go = () => {
      timers.forEach(clearTimeout);
      setLit(0);
      setStatus("LIGHTS OUT");
      root.dataset.race = "go";
      play("go");
      try {
        sessionStorage.setItem("lights", "done");
      } catch {}
      window.removeEventListener("keydown", go);
    };

    for (let i = 1; i <= 5; i++) {
      timers.push(
        setTimeout(() => {
          setLit(i);
          setStatus(`LIGHT ${i} / 5`);
          play("light");
        }, START_DELAY + i * LIGHT_INTERVAL)
      );
    }
    // Real starts hold for an unpredictable moment before lights out.
    const hold = 250 + Math.random() * 650;
    timers.push(setTimeout(go, START_DELAY + 5 * LIGHT_INTERVAL + hold));

    window.addEventListener("keydown", go, { once: true });
    window.__skipLights = go;
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", go);
    };
  }, []);

  return (
    <div
      className="lights fixed inset-0 z-[200] grid place-items-center bg-ink"
      onClick={() => window.__skipLights?.()}
      role="presentation"
    >
      <div className="flex flex-col items-center gap-8 px-6">
        <p className="t-label text-muted">Grid · Calgary · Round 01</p>
        <div className="flex gap-2.5 rounded-md bg-[#0e0e11] p-3 ring-1 ring-line sm:gap-4 sm:p-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col gap-2 rounded-sm bg-black p-1.5 sm:p-2">
              <span className="light size-9 rounded-full sm:size-12" data-on={lit >= n} />
              <span className="light size-9 rounded-full sm:size-12" data-on={lit >= n} />
            </div>
          ))}
        </div>
        <p className="t-label t-data text-fg" aria-live="polite">
          {status}
        </p>
        <button
          type="button"
          className="t-label text-dim transition-colors hover:text-fg"
          onClick={(e) => {
            e.stopPropagation();
            window.__skipLights?.();
          }}
        >
          Skip start ›
        </button>
      </div>
    </div>
  );
}
