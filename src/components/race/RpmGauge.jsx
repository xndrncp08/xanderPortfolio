"use client";
import { useEffect, useRef } from "react";
import { MAX_KMH, subscribe } from "@/lib/telemetry";
import { gearFor } from "./Hud";

// Steering-wheel style readout driven by scroll speed.
const C = 120;
const R = 96;
const START = 150; // degrees, SVG space (clockwise from +x)
const SWEEP = 240;
const IDLE = 0.18; // idle RPM as a fraction of the dial
const LEDS = 15;

const polar = (deg, r) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};
const [sx, sy] = polar(START, R);
const [ex, ey] = polar(START + SWEEP, R);
const ARC = `M${sx} ${sy} A${R} ${R} 0 1 1 ${ex} ${ey}`;

const LED_COLOR = (i) => (i < 5 ? "var(--green)" : i < 10 ? "var(--red)" : "var(--purple)");

export default function RpmGauge() {
  const arcRef = useRef(null);
  const needleRef = useRef(null);
  const rpmRef = useRef(null);
  const gearRef = useRef(null);
  const kmhRef = useRef(null);
  const ledsRef = useRef([]);

  useEffect(() => {
    return subscribe(({ speed }) => {
      const p = IDLE + (1 - IDLE) * (speed / MAX_KMH);
      arcRef.current?.setAttribute("stroke-dasharray", `${p * 100} 100`);
      needleRef.current?.setAttribute("transform", `rotate(${START + SWEEP * p} ${C} ${C})`);
      if (rpmRef.current) rpmRef.current.textContent = String(Math.round(p * 15000)).padStart(5, "0");
      if (gearRef.current) gearRef.current.textContent = gearFor(speed);
      if (kmhRef.current) kmhRef.current.textContent = String(speed);
      const lit = Math.round((speed / MAX_KMH) * LEDS);
      ledsRef.current.forEach((el, i) => {
        if (el) el.style.opacity = i < lit ? "1" : "0.14";
      });
    });
  }, []);

  return (
    <div className="brackets relative bg-carbon/70 p-5" role="img" aria-label="RPM gauge, driven by how fast you scroll">
      <div className="mb-3 flex justify-center gap-1" aria-hidden>
        {Array.from({ length: LEDS }, (_, i) => (
          <span
            key={i}
            ref={(el) => {
              ledsRef.current[i] = el;
            }}
            className="size-2.5 rounded-full transition-opacity duration-75"
            style={{ background: LED_COLOR(i), opacity: 0.14, boxShadow: `0 0 8px ${LED_COLOR(i)}` }}
          />
        ))}
      </div>

      <svg viewBox="0 0 240 200" className="w-full" aria-hidden>
        <path d={ARC} fill="none" stroke="var(--panel-2)" strokeWidth="10" pathLength="100" />
        {/* Redline zone: 12k–15k */}
        <path
          d={ARC}
          fill="none"
          stroke="var(--red)"
          strokeOpacity="0.35"
          strokeWidth="10"
          pathLength="100"
          strokeDasharray="20 100"
          strokeDashoffset="-80"
        />
        <path
          ref={arcRef}
          d={ARC}
          fill="none"
          stroke="url(#rpm-grad)"
          strokeWidth="10"
          pathLength="100"
          strokeDasharray={`${IDLE * 100} 100`}
          style={{ transition: "stroke-dasharray 60ms linear" }}
        />
        <defs>
          <linearGradient id="rpm-grad" x1="0" x2="1">
            <stop offset="0" stopColor="var(--cyan)" />
            <stop offset="0.7" stopColor="var(--yellow)" />
            <stop offset="1" stopColor="var(--red)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 16 }, (_, i) => {
          const deg = START + (SWEEP * i) / 15;
          const [x1, y1] = polar(deg, 80);
          const [x2, y2] = polar(deg, i % 5 === 0 ? 70 : 75);
          const [lx, ly] = polar(deg, 60);
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={i >= 12 ? "var(--red)" : "var(--muted)"} strokeWidth={i % 5 === 0 ? 2 : 1} />
              {i % 3 === 0 && (
                <text x={lx} y={ly + 3} textAnchor="middle" className="fill-dim font-mono text-[8px]">
                  {i}
                </text>
              )}
            </g>
          );
        })}
        <g ref={needleRef} transform={`rotate(${START + SWEEP * IDLE} ${C} ${C})`}>
          <line x1={C} y1={C} x2={C + 84} y2={C} stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <circle cx={C} cy={C} r="30" fill="var(--ink)" stroke="var(--line-strong)" />
        <text ref={gearRef} x={C} y={C + 12} textAnchor="middle" className="fill-fg font-display text-[34px] font-black">
          N
        </text>
        <text x={C} y="186" textAnchor="middle" className="fill-muted font-mono text-[9px] tracking-[0.2em]">
          RPM × 1000
        </text>
      </svg>

      <dl className="mt-2 grid grid-cols-2 gap-px bg-line text-center">
        <div className="bg-carbon py-2">
          <dt className="t-label text-dim">RPM</dt>
          <dd ref={rpmRef} className="t-data text-lg text-fg">
            02700
          </dd>
        </div>
        <div className="bg-carbon py-2">
          <dt className="t-label text-dim">KM/H</dt>
          <dd ref={kmhRef} className="t-data text-lg text-fg">
            0
          </dd>
        </div>
      </dl>
    </div>
  );
}
