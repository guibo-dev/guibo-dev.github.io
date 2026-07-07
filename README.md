# Guillermo Purchese Escudero — Portfolio

Personal portfolio site. Static, content-driven, zero client-side JavaScript.

Built with [Astro 5](https://astro.build). Typography: Fraunces (display) +
Inter (body), self-hosted via Fontsource. Single accent color `#C8102E` on a
warm neutral base; design tokens live in `src/styles/global.css`.

## Local preview

Requires Node.js 18+ (a portable Node v22 is available at `../.node/bin` if
none is installed system-wide).

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the built site locally
```

## Deployment (GitHub Pages)

A GitHub Actions workflow at `.github/workflows/deploy.yml` builds and
deploys automatically on every push to `main`:

1. Create a GitHub repository. Naming it `<username>.github.io` serves the
   site at the root URL (recommended). Any other name serves it at
   `https://<username>.github.io/<repo>/`, which additionally requires
   setting `base: '/<repo>'` in `astro.config.mjs`.
2. Push this project to it (`git remote add origin … && git push -u origin main`).
3. In the repo: Settings → Pages → Source: **GitHub Actions**.
4. Set `site` in `astro.config.mjs` and the sitemap URL in
   `public/robots.txt` to the final URL, commit, push.

Custom domains work too (repo Settings → Pages → Custom domain, plus a
CNAME/A record at your DNS provider); then `site` is the custom domain.

The build is fully static (`dist/`), so Netlify or Vercel also work as-is:
build command `npm run build`, output directory `dist`.

## Project structure

```
src/
  config.ts               Site-wide constants: name, contact email, LinkedIn URL
  content.config.ts       Content-collection schema (the PART 2 project schema)
  content/projects/       One YAML file per case study — all copy and data
  data/partners.ts        Partner logo wall entries
  components/             Reusable components (StatStrip, ImageGallery, …)
  layouts/BaseLayout.astro  HTML shell, header nav, contact footer, SEO tags
  pages/index.astro       Home: hero, stat strip, project index, partners
  pages/work/[slug].astro One template that renders every case study
  styles/global.css       Design tokens and base styles
  lib/media.ts            Build-time image/video resolution
public/
  images/<folder-slug>/   Image assets (see Asset naming below)
```

## Adding a project

1. Add a new YAML file in `src/content/projects/` following the existing
   schema (`slug`, `title`, `descriptor`, `tier`, `role_tag`, `stat_strip`,
   `blocks`, `galleries`, …). Omit any field that has no content.
2. Assign it a `tier`; it appears automatically under that tier on Home
   (ordered by the `order` field).
3. Create `public/images/<slug>/` and add assets using the naming convention.

No component changes are required.

## Design system

All tokens live in `src/styles/global.css` under `:root`; components consume
tokens only — change a token and the whole site follows.

**Type.** Fraunces Variable (display; the `opsz` variant, so the browser uses
the high-contrast display cut automatically at large sizes) + Inter Variable
(body). Fluid scale via `clamp()` tokens: `--text-display`, `--text-title`,
`--text-section`, `--text-block`, `--text-stat`, `--text-lead`.

**Color.** Warm paper base (`--bg` #faf9f6, `--surface` #ffffff), near-black
ink (`--ink`, `--ink-soft`), hairlines (`--line`), and a single accent:
burnt vermilion `--accent` #bc3d0b (hover `--accent-dark` #9a3208), derived
from the OFF campaign's orange-red family; 5.2:1 on the base — WCAG AA for
normal text.

**Space & shape.** `--space-1…6` (0.5–6rem) rhythm; `--radius` 4px on all
media, tiles, and buttons; `--container` 72rem; `--measure` 65ch prose width.

**Motion.** One pattern: elements marked `data-reveal` fade/rise 14px with a
70ms sibling stagger (IntersectionObserver, ~0.6 KB, in `BaseLayout`).
Two safety nets: hiding CSS applies only when JS is confirmed (`html.js`)
and only under `prefers-reduced-motion: no-preference` — no-JS and
reduced-motion visitors get a fully visible static page. Hover transitions
(card image zoom, chip borders) sit inside the same media query.

**Components** (`src/components/`): StatStrip (the hero component — display
numerals, full-bleed rules, container-aligned, 2×2 on mobile), ProjectCard,
CaseStudyHeader, ContentBlock (`emphasis` adds the accent keyline used for
Impact), ImageGallery (natural-ratio slots), LinkList + PartnerTags (one
shared chip family: 0.85rem/550, 0.4rem×1rem padding, 999px radius),
TalentCard, DataTable (right-aligned tabular numerics), Placeholder,
MediaSlot, SectionTier (`featured` renders the 2-up flagship grid).

Case-study render order: header → StatStrip → hero image → feature copy →
blocks (galleries inline where referenced) → partner tags → remaining
galleries → proof links → prev/next navigation (site order, wrap-around,
from `src/lib/projects.ts`).

## Image sizing guide

Gallery images render at their content's natural shape (each slot's `ratio`
in the project YAML), so nothing in a gallery is cropped. Three slot types
crop to a fixed shape by design — size images for them accordingly:

| Slot | Aspect ratio | Recommended export | Used for |
| --- | --- | --- | --- |
| Case-study hero banner | 21:9 | 2100 × 900 px | Top image on each case-study page. Vertical images show only their middle band — keep the subject centered, or supply a landscape crop. |
| Project card thumbnail | 16:10 | 1600 × 1000 px | Home page cards (reuses the hero image). |
| Home headshot | 4:5 | 1200 × 1500 px | Hero portrait. |
| Talent portrait | 3:4 | 900 × 1200 px | TalentCard row (Stand-Up Stands Up). |
| Partner logo | any | ≤ 1200 px wide | Never cropped (object-fit: contain on a 3:2 tile). Transparent or white background. |
| Gallery slot | matches image | ≤ 2000 px long edge | Set the slot's `ratio` in the YAML to the image's true shape (e.g. `3 / 2`, `2 / 3`, `1 / 1`, `9 / 19.5`). |

To change what a hero banner shows without re-exporting, give the project's
`hero:` entry its own `ratio:` (e.g. `ratio: 3 / 2`) — the page simply gets a
taller, uncropped hero.

## Asset naming & placeholders

Images live at `public/images/<folder-slug>/` and are named
`<folder-slug>-<descriptor>-<n>.<ext>` in kebab-case with zero-padded
numbers, e.g. `stand-up-stands-up-live-03.jpg`,
`off-ooh-campaign-2025-roya-mahboob.jpg`. Supported extensions: jpg, jpeg,
png, webp, avif, gif, svg (video: mp4, webm, mov).

The build checks for each expected file. If it exists, it renders; if not, a
labeled placeholder shows the slot name and purpose at the correct
dimensions. **Drop an image in and rebuild — no code changes needed.**

## Outstanding TODOs

Marked in the rendered output and in code comments:

- Production domain — `astro.config.mjs` (`site:`) and `public/robots.txt`
- Remaining images (slots render labeled placeholders until provided):
  - Josimar partner logo (`partners/partners-josimar`)
  - Kleptocrats Dossier detail shots (`the-signal/the-signal-kleptocrats-dossier-01..03`)
  - Event app screenshots (`event-app/event-app-screen-01..03`)
  - Website screenshots (`website-content-management/website-content-management-screen-01..03`)
  - Spotify ad stills / CTR chart (`spotify-ad-campaigns/spotify-ad-campaigns-creative-01..02`)
  - Flytoget train campaign video (a train placement photo is used in the
    2026 Placements gallery instead; add the video and a slot if wanted)
