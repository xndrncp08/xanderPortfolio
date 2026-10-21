"use client";
import { useState } from "react";
import ContributionGraph from "./ContributionGraph";
import Skyline from "./Skyline";

// 3D by default because it's fun; flat because it's useful (and has tooltips).
export default function ContributionViews({ days, label }) {
  const [view, setView] = useState("3d");
  return (
    <div>
      <div role="group" aria-label="Calendar view" className="flex justify-end gap-1">
        {[
          ["3d", "3D"],
          ["flat", "Flat"],
        ].map(([id, name]) => (
          <button
            key={id}
            type="button"
            aria-pressed={view === id}
            onClick={() => setView(id)}
            className={`label rounded-full border px-3 py-1.5 transition-colors ${view === id ? "border-volt bg-volt text-[#0f0f0e]" : "border-line-strong hover:text-on-carbon"}`}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {view === "3d" ? (
          <figure>
            <Skyline days={days} className="aspect-[16/9] sm:aspect-[21/8]" />
            <figcaption className="label mt-2 text-center">
              {label} <span aria-hidden>Drag to spin it.</span>
            </figcaption>
          </figure>
        ) : (
          <ContributionGraph days={days} label={label} />
        )}
      </div>
    </div>
  );
}
