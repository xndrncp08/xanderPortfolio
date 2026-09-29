# xanderPortfolio

Personal portfolio for Xander Rancap, built with Next.js 16 and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

All copy (bio, projects, story, stack, links) lives in `src/data/content.js`. Components read from it, so you rarely need to touch them.

- **Add a project:** append an object to `projects`. The first one is the wide hero tile, the next four are large tiles, and the rest are compact tiles. Clicking any tile opens a detail sheet (`approach`, `highlights`, `tags`, `links`).
- **Project art:** use `logo` for a logo on a near-black tile (put it in `public/projects/`), or `image` for a full-bleed screenshot. `accent` tints the tile glow and the sheet. Remote images must come from a host listed in `images.remotePatterns` in `next.config.mjs`.
- **Resume:** replace `public/resume.pdf`. It opens in a sheet from the nav, hero and Experience section, and at `/#resume`.

## Structure

```
src/
  app/          layout (fonts, theme script), page, global styles + design tokens
  components/   one file per section, plus client pieces (Nav, SheetProvider/Sheet, ThemeToggle, LocalTime, CopyEmail, Reveal)
  data/         content.js
```

Colors, the type scale (`t-display`, `t-headline`, `t-title`, `t-lead` …) and materials live in `src/app/globals.css`. Sheets use Motion springs (`src/components/Sheet.jsx`).
