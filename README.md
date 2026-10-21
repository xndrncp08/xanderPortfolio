# xanderPortfolio

Personal portfolio for Xander Rancap — software developer in Calgary. Next.js 16 and Tailwind CSS 4, mostly server-rendered. Bone-and-carbon palette with one volt accent, Bricolage Grotesque display type, and two dependency-free canvas 3D pieces (a lapping circuit and a contribution skyline).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # node:test — content facts and the GitHub parser
npm run lint
npm run build
```

## Editing content

All copy lives in `src/data/content.js`; facts should match `public/resume.pdf` and github.com/xndrncp08.

- **Projects:** `featured: true` puts a project in Selected work (in array order); the rest go to the archive. Every project gets a case study at `/work/<slug>`. Art is `logo` (in `public/projects/`, shown on a dark plate) or `image` (a screenshot).
- **Path:** the timeline in `path` is chronological. Leave dates you don't know vague ("Then") rather than guessing.
- **Photos:** `profile.photo` (hero) and `profile.gradPhoto` (About) live in `public/me/`.
- **Off track:** `interests` holds the four hobby blurbs; project `aside` is the italic one-liner under each tagline.
- **Résumé:** replace `public/resume.pdf`.

## GitHub activity

`src/lib/github.js` fetches real contribution data on the server and the home page revalidates every 12 hours.

- With `GITHUB_TOKEN` set (a fine-grained token with no extra scopes is enough), it uses the GraphQL API.
- Without it, it reads GitHub's public contributions calendar — no token needed.
- If either request fails, the section falls back to a link to the GitHub profile. Nothing is ever estimated.

## Structure

```
src/
  app/          layout (fonts, metadata), home page, work/[slug] case studies,
                opengraph-image, sitemap, robots, globals.css (tokens + type)
  components/   one file per home section, plus client pieces: Circuit (3D track),
                Skyline + ContributionViews (3D/flat GitHub calendar), Strings
                (pluckable guitar), ArchiveList (hover preview), TiltCard,
                LocalTime (Calgary clock), Reveals (scroll-in), MobileMenu, CopyEmail
  data/         content.js
  lib/          github.js, projection.js (tiny 3D maths), pluck.js (Karplus–Strong)
test/           node:test suites + a trimmed contributions fixture
```
