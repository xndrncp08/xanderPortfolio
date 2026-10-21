"use client";
import { useRef, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const describe = (d) =>
  `${d.count === 0 ? "No" : d.count} contribution${d.count === 1 ? "" : "s"} on ${fmt.format(new Date(d.date))}`;

// The calendar is one image to assistive tech (the monthly list beside it
// carries the numbers); the tooltip is a pointer-only enhancement.
export default function ContributionGraph({ days, label }) {
  const box = useRef(null);
  const [tip, setTip] = useState(null);
  const offset = new Date(days[0].date).getUTCDay(); // first column starts on Sunday

  const show = (e) => {
    const cell = e.target.closest("[data-i]");
    if (!cell) return setTip(null);
    const b = box.current.getBoundingClientRect();
    const c = cell.getBoundingClientRect();
    const x = Math.min(Math.max(c.left - b.left + c.width / 2, 120), b.width - 120);
    setTip({ text: describe(days[cell.dataset.i]), x, y: c.top - b.top });
  };

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div
        ref={box}
        role="img"
        aria-label={label}
        className="relative min-w-[680px] pt-1"
        onPointerMove={show}
        onPointerDown={show}
        onPointerLeave={() => setTip(null)}
      >
        <div className="cal">
          {Array.from({ length: offset }, (_, i) => (
            <span key={`pad-${i}`} />
          ))}
          {days.map((d, i) => (
            <span key={d.date} data-i={i} className={`l${d.level}`} />
          ))}
        </div>
        {tip && (
          <p
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-[3px] bg-fg px-2.5 py-1.5 text-xs whitespace-nowrap text-bg"
            style={{ left: tip.x, top: tip.y - 6 }}
          >
            {tip.text}
          </p>
        )}
      </div>
    </div>
  );
}
