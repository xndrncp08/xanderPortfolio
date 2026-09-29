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

- **Add a project:** append an object to `projects`. The first four show as large featured cards; the rest go in the list below them.
- **Images:** project images are loaded from `i.postimg.cc` and `images.unsplash.com`. To use another host, add it to `images.remotePatterns` in `next.config.mjs`, or drop files in `public/` and use a path like `/my-shot.png`.

## Structure

```
src/
  app/          layout (fonts, theme script), page, global styles + design tokens
  components/   one file per section, plus small client pieces (Nav, ThemeToggle, LocalTime, CopyEmail, Reveal)
  data/         content.js
```

Theme colors are CSS variables at the top of `src/app/globals.css`, with light and dark sets.
