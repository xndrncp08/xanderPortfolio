"use client";
import { useState } from "react";

// Single-series radar: projects per discipline. The bar list beside it is the
// accessible table view, so this SVG is presentational (with a hover layer).
const SIZE = 320;
const C = SIZE / 2;
const R = 112;

const point = (i, n, r) => {
  const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};

export default function Radar({ data, total }) {
  const [hover, setHover] = useState(null);
  const n = data.length;
  const pts = data.map((d, i) => point(i, n, (d.count / total) * R));
  const poly = pts.map((p) => p.join(",")).join(" ");

  return (
    <div className="relative w-full" aria-hidden>
      <svg viewBox={`-80 -8 ${SIZE + 160} ${SIZE + 16}`} className="mx-auto block w-full max-w-[34rem]">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon
            key={f}
            points={data.map((_, i) => point(i, n, R * f).join(",")).join(" ")}
            fill="none"
            stroke="var(--line)"
          />
        ))}
        {data.map((d, i) => {
          const [x, y] = point(i, n, R);
          return <line key={d.key} x1={C} y1={C} x2={x} y2={y} stroke="var(--line)" />;
        })}
        <polygon points={poly} fill="rgb(41 211 255 / 0.14)" stroke="var(--cyan)" strokeWidth="2" strokeLinejoin="round" />
        {data.map((d, i) => {
          const [x, y] = pts[i];
          const [lx, ly] = point(i, n, R + 26);
          const active = hover === i;
          return (
            <g key={d.key} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
              {/* Hit target larger than the mark */}
              <circle cx={x} cy={y} r="18" fill="transparent" data-cursor={d.label.toUpperCase()} />
              <circle cx={x} cy={y} r={active ? 6 : 4.5} fill="var(--cyan)" stroke="var(--ink)" strokeWidth="2" />
              <text
                x={lx}
                y={ly}
                textAnchor={Math.abs(lx - C) < 8 ? "middle" : lx > C ? "start" : "end"}
                dominantBaseline="middle"
                className={`font-display text-[16px] font-extrabold uppercase ${active ? "fill-fg" : "fill-muted"}`}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {hover !== null && (
        <div className="chamfer-sm pointer-events-none absolute top-2 left-2 max-w-[15rem] bg-panel-2/95 p-3 ring-1 ring-line">
          <p className="t-label text-muted">
            {data[hover].label} · {data[hover].sub}
          </p>
          <p className="t-data mt-1 text-lg text-fg">
            {data[hover].count} <span className="text-sm text-muted">of {total} projects</span>
          </p>
          <p className="mt-1 text-xs leading-snug text-muted">{data[hover].projects.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
