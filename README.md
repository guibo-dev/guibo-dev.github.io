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
