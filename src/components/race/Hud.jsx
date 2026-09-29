"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { MAX_KMH, subscribe } from "@/lib/telemetry";
import { isSfxOn, onSfxChange, play, toggleSfx } from "@/lib/sfx";
import { profile } from "@/data/content";
import { ResumeButton } from "../SheetProvider";

export const SECTORS = [
  { id: "s1", code: "S1", label: "Podium" },
  { id: "s2", code: "S2", label: "Driver" },
  { id: "s3", code: "S3", label: "Season" },
  { id: "pit", code: "PIT", label: "Radio" },
];

export function gearFor(kmh) {
  if (kmh < 2) return "N";
  return String(Math.min(8, 1 + Math.floor((kmh / MAX_KMH) * 8)));
}

function fmtLap(ms) {
  const m = Math.floor(ms / 60000);
  const s = ((ms % 60000) / 1000).toFixed(3).padStart(6, "0");
  return `${m}:${s}`;
}

function SfxToggle() {
  const on = useSyncExternalStore(onSfxChange, isSfxOn, () => false);
  return (
    <button
      type="button"
      onClick={toggleSfx}
      aria-pressed={on}
      aria-label={on ? "Turn sound effects off" : "Turn sound effects on"}
      data-cursor={on ? "SFX OFF" : "SFX ON"}
      className="press t-label flex h-8 items-center gap-1.5 px-2 text-muted hover:text-fg"
    >
      {on ? <FiVolume2 className="size-3.5 text-yellow" /> : <FiVolumeX className="size-3.5" />}
      <span className="hidden sm:inline">SFX</span>
    </button>
  );
}

export default function Hud() {
  const [sector, setSector] = useState("grid");
  const [flash, setFlash] = useState(null);
  const speedRef = useRef(null);
  const barRef = useRef(null);
  const gearRef = useRef(null);
  const lapRef = useRef(null);
  const clockRef = useRef(null);
  const visited = useRef(new Set());
  const t0 = useRef(0);

  useEffect(() => {
    t0.current = performance.now();
    let lastSector = "grid";
    const unsubscribe = subscribe(({ speed, progress, sector: s }) => {
      if (speedRef.current) speedRef.current.textContent = String(speed).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${speed / MAX_KMH})`;
      if (gearRef.current) gearRef.current.textContent = gearFor(speed);
      if (lapRef.current) lapRef.current.textContent = `${Math.round(progress * 100)}%`;
      if (s !== lastSector) {
        lastSector = s;
        setSector(s);
        const meta = SECTORS.find((x) => x.id === s);
        if (meta) {
          const first = !visited.current.has(s);
          visited.current.add(s);
          setFlash({
            key: `${s}-${performance.now()}`,
            code: meta.code,
            label: meta.label,
            time: fmtLap(performance.now() - t0.current),
            first,
          });
          play("tick");
        }
      }
    });

    const clock = setInterval(() => {
      if (!clockRef.current) return;
      const d = new Date();
      clockRef.current.textContent = `${d.toISOString().slice(11, 21)} UTC`;
    }, 100);

    return () => {
      unsubscribe();
      clearInterval(clock);
    };
  }, []);

  useEffect(() => {
    if (!flash) return;
    const id = setTimeout(() => setFlash(null), 1800);
    return () => clearTimeout(id);
  }, [flash]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#grid" className="flex items-center gap-2.5" data-cursor="PIT EXIT">
            <span className="chamfer-sm grid h-8 w-11 place-items-center bg-red font-display text-lg font-black italic leading-none text-white">
              {profile.raceNumber}
            </span>
            <span className="font-display text-lg font-extrabold uppercase italic tracking-wide">
              Rancap
            </span>
          </a>

          <ul className="hidden items-stretch gap-1 md:flex">
            {SECTORS.map((s) => {
              const active = sector === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active ? "true" : undefined}
                    className={`group relative flex h-9 items-center gap-2 px-3 transition-colors ${
                      active ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <span className={`t-label ${active ? "text-yellow" : "text-dim"}`}>{s.code}</span>
                    <span className="font-display text-[15px] font-bold uppercase tracking-wide">
                      {s.label}
                    </span>
                    <span
                      className={`absolute inset-x-3 bottom-0 h-0.5 origin-left bg-yellow transition-transform duration-500 ease-[var(--ease)] ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <SfxToggle />
            <ResumeButton className="press chamfer-sm bg-fg px-3.5 py-1.5 font-display text-sm font-extrabold uppercase tracking-wide text-ink hover:bg-yellow">
              Resume
            </ResumeButton>
          </div>
        </nav>
      </header>

      {/* Sector timing flash */}
      <div className="pointer-events-none fixed inset-x-0 top-[72px] z-40 flex justify-center">
        <AnimatePresence>
          {flash && (
            <motion.div
              key={flash.key}
              initial={{ opacity: 0, y: -10, scaleX: 0.6 }}
              animate={{ opacity: 1, y: 0, scaleX: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="chamfer-sm flex items-center gap-3 bg-panel-2/95 px-4 py-2 ring-1 ring-line"
            >
              <span className="t-label text-muted">{flash.code}</span>
              <span className="font-display text-sm font-extrabold uppercase">{flash.label}</span>
              <span
                className="t-data text-sm font-bold"
                style={{ color: flash.first ? "var(--purple)" : "var(--green)" }}
              >
                {flash.time}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live telemetry strip */}
      <div className="t-label fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6">
          <span ref={clockRef} className="t-data hidden text-muted sm:inline">
            --:--:--.- UTC
          </span>
          <span className="flex items-center gap-2">
            <span className="text-dim">SPD</span>
            <span ref={speedRef} className="t-data w-[3ch] text-right text-fg">
              000
            </span>
            <span className="text-dim">KM/H</span>
            <span className="relative hidden h-1 w-24 overflow-hidden bg-panel-2 sm:block">
              <span
                ref={barRef}
                className="absolute inset-0 origin-left bg-gradient-to-r from-green via-yellow to-red"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-dim">GEAR</span>
            <span ref={gearRef} className="t-data text-yellow">
              N
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-dim">SEC</span>
            <span className="text-fg">
              {SECTORS.find((s) => s.id === sector)?.code ?? "GRID"}
            </span>
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="text-dim">LAP</span>
            <span ref={lapRef} className="t-data text-fg">
              0%
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
