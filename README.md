# xanderPortfolio

Personal portfolio for Xander Rancap (#08) — an F1 telemetry-themed site built with Next.js 16, Tailwind CSS 4, Motion and Lenis.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

All copy lives in `src/data/content.js`. Components read from it, so you rarely need to touch them.

- **Projects:** order is grid order. The first three stand on the podium (P1, P2, P3); the rest run in the Grand Prix calendar. Each opens a race report (`approach`, `highlights`, `tags`, `links`).
- **Top speed:** every project needs a `metric` (`{ value, label }`) — keep it factual; it's shown as the headline stat.
- **Project art:** `logo` for a logo on a near-black panel (put it in `public/projects/`) or `image` for a screenshot. `accent` tints the specs.
- **Season:** the career timeline is `season`; `type` is `start`, `race`, `podium` or `flag`.
- **Telemetry:** the radar is computed, not typed in — each entry in `disciplines` counts how many projects' `tags`/`tech` match it.
- **Resume:** replace `public/resume.pdf`. It opens in a sheet from the header, hero, Season and Pit wall, and at `/#resume`.

## How it's built

```
src/
  app/                 layout (fonts, race-start script), page, globals.css (tokens, type, HUD surfaces)
  components/race/     Hero, Podium, Driver, Season, PitWall + the engine:
                         LightsOut   start-lights sequence (skipped on repeat visits / reduced motion)
                         SmoothScroll Lenis + the telemetry feed (speed, sector, lap %, velocity skew)
                         SpeedLines  canvas streaks driven by scroll speed (idle when stationary)
                         Hud         header sectors, live telemetry strip, sector timing flash
                         Reticle     crosshair cursor (fine pointers only)
                         RpmGauge, Radar, Magnetic, ProjectArt
  components/          Sheet (Motion springs, drag-to-dismiss), SheetProvider, Reveal
  lib/                 telemetry.js (frame store), sfx.js (Web Audio HUD sounds, off by default)
```

Performance notes: all motion is transform/opacity; per-frame values are written to the DOM through refs rather than React state; no WebGL. `prefers-reduced-motion` disables the lights, smooth scroll, speed lines, skew and custom cursor, and swaps movement for fades.
