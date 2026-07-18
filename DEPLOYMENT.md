# Deployment Guide

A complete, beginner-friendly guide to putting this portfolio permanently
online, getting it indexed by Google, and connecting a custom domain later.

You need only basic Git knowledge. Every command is copy-paste-ready.

---

## 0. What this project is (and the hosting decision)

- **Framework:** [Astro 5](https://astro.build) — a *static site generator*.
  `npm run build` produces a plain folder of HTML/CSS/JS (`dist/`). There is
  **no server, no database, and no environment variables** to manage.
- **Already built for you:** a GitHub Pages deploy workflow
  (`.github/workflows/deploy.yml`), a `sitemap` integration, `robots.txt`,
  per-page `<title>`/description, Open Graph + Twitter cards, canonical URLs,
  JSON-LD structured data, a favicon, and a 404 page.

### Recommended host: **GitHub Pages**

For *this* project it is the best fit:

1. The site is 100% static — Pages serves static files perfectly and for free.
2. The deploy workflow is **already written and tested** in this repo.
3. It gives you free HTTPS and free custom-domain support.
4. You asked to host on GitHub, so your code and site live in one place.

**Is GitHub Pages ever the wrong choice?** Only if you later need things a
static host can't do: server-side rendering, API routes, password protection,
per-pull-request preview URLs, or built-in analytics. If that day comes, the
same `dist/` output deploys unchanged to **Cloudflare Pages** or **Vercel**
(both have first-class Astro support, a global CDN, deploy previews, and
one-click rollbacks). Cloudflare Pages is the strongest upgrade *if you also
buy your domain through Cloudflare*, because DNS + HTTPS then take two clicks.
None of that is needed for a personal portfolio today — so we use GitHub Pages.

---

## 1. One important naming decision (read before creating the repo)

GitHub Pages can serve your site from two kinds of URLs:

| Repo name | Site URL | Notes |
| --- | --- | --- |
| `YOURNAME.github.io` | `https://YOURNAME.github.io/` | **Recommended.** Served at the domain root. |
| any other name (e.g. `portfolio`) | `https://YOURNAME.github.io/portfolio/` | Served under a sub-path — needs an extra config line (see below) or **all images and styles break**. |

**Recommendation: name the repository `YOURNAME.github.io`** (replace
`YOURNAME` with your GitHub username, lowercase). This serves the site at the
root, matches how a custom domain works, and avoids the single most common
Astro-on-Pages mistake. The rest of this guide assumes you did this.

> If you must use a different repo name, add `base: '/REPO-NAME'` to
> `astro.config.mjs`. Skip this if you named the repo `YOURNAME.github.io`.

---

## 2. Project changes to make before deploying

There is **one required change** and a few recommended ones. (Ask Claude to
make these for you, or edit them yourself.)

### Required: set the real site URL

The site currently points at a placeholder. Search engines, the sitemap, and
social-share previews all read this value, so it must be correct.

1. In **`astro.config.mjs`**, change:
   ```js
   site: 'https://example.com',
   ```
   to your real URL — for now, your Pages URL:
   ```js
   site: 'https://YOURNAME.github.io',
   ```
   (Later, when your custom domain is live, change it again to
   `https://yourdomain.com`.)

2. In **`public/robots.txt`**, change the sitemap line to match:
   ```
   Sitemap: https://YOURNAME.github.io/sitemap-index.xml
   ```

That's it — no environment variables, no secrets, no other config.

### Recommended (nice-to-have, not blocking)

- **Homepage social image:** shared links use a campaign photo by default. A
  dedicated 1200×630 px image (headshot or a branded card) reads best on
  LinkedIn/X. Drop one in `public/` and set the `ogImage` prop on the home
  page. Optional.
- Everything else SEO-related is already in place (see Section 7).

---

## 3. Create the GitHub repository

1. Go to <https://github.com/new>.
2. **Repository name:** `YOURNAME.github.io` (your username, lowercase).
3. **Visibility:** **Public** (free GitHub Pages requires public).
4. Do **not** add a README, `.gitignore`, or license (the project already has
   them). Leave those unchecked.
5. Click **Create repository**. Leave the page open — you'll need the URL.

> Privacy note: a public repo means your source code and images are viewable
> by anyone. That's normal for a portfolio (it's all content you're publishing
> anyway). Your commit email is also visible; if you'd rather hide it, enable
> "Keep my email addresses private" in GitHub → Settings → Emails first.

---

## 4. Push the project to GitHub

Open Terminal in the project folder and run these commands (replace `YOURNAME`):

```sh
cd "path/to/portfolio"

# Point your local repo at the new GitHub repo
git remote add origin https://github.com/YOURNAME/YOURNAME.github.io.git

# Make sure you're on the main branch
git branch -M main

# Upload everything
git push -u origin main
```

If prompted to log in, use your GitHub username and a **Personal Access Token**
(GitHub no longer accepts your account password on the command line). Create one
at GitHub → Settings → Developer settings → Personal access tokens → *Fine-grained
token*, give it **Contents: Read and write** on this repo, and paste it as the
password. (Or install [GitHub CLI](https://cli.github.com) and run `gh auth login`.)

After this, refresh the repo page on GitHub — you should see all the files.

---

## 5. Turn on GitHub Pages (this makes it permanently live)

The repo already contains the deploy workflow. You just need to tell GitHub to
use it.

1. On GitHub, go to your repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, select **GitHub Actions**.
   (Do **not** choose "Deploy from a branch" — that's the old method and won't
   run our build.)
3. That's all. There's no build command or output folder to type — the workflow
   handles `npm ci` + `npm run build` + publish automatically.

Now watch it deploy:

- Go to the **Actions** tab. You'll see a run named after your last commit.
- When it finishes (green check, ~1–2 minutes), your site is live at
  `https://YOURNAME.github.io/`.

**Your site is now permanent.** It does not depend on your computer, a local
server, or anything running. It stays up 24/7 on GitHub's infrastructure.

---

## 6. Continuous deployment (automatic redeploys)

This is already configured. The workflow triggers **on every push to `main`**.
Your normal workflow from now on:

```sh
# make edits, then:
git add -A
git commit -m "Describe what changed"
git push
```

Within a couple of minutes the live site updates itself. You can watch progress
in the **Actions** tab. No manual deploy step ever again.

There are **no environment variables or secrets** to configure for this project.

---

## 7. SEO — what's done, what to verify, and Search Console

### Already implemented (no action needed)

- Unique `<title>` and meta description on every page
- Canonical URLs (prevents duplicate-content penalties)
- Open Graph + Twitter Card tags (rich link previews) with per-page images
- JSON-LD structured data (`Person` on Home, `CreativeWork` on case studies)
- `sitemap-index.xml` + `sitemap-0.xml` generated automatically at build
- `robots.txt` allowing all crawlers and pointing to the sitemap
- Semantic HTML, one `<h1>` per page, descriptive image `alt` text
- `<html lang="en">`, favicon, custom 404

### The one thing that makes or breaks SEO here

The `site` value in `astro.config.mjs` (Section 2). If it's still
`example.com`, your canonical URLs, sitemap, and share images will all point at
the wrong domain and Google will index nothing useful. **Set it correctly.**

### Register with Google Search Console (how to confirm indexing)

1. Go to <https://search.google.com/search-console> and sign in.
2. Click **Add property**. Two choices:
   - **URL prefix** (simplest for a Pages URL): enter
     `https://YOURNAME.github.io/`. Verify by uploading the HTML file Google
     gives you (drop it in `public/`, commit, push) **or** by adding the
     `google-site-verification` meta tag it offers.
   - **Domain** (use this once you have a custom domain): enter `yourdomain.com`
     and add the TXT record Google gives you at your DNS provider.
3. After verification, open **Sitemaps** in the left menu and submit:
   `sitemap-index.xml`
4. Use **URL Inspection** on your homepage → **Request indexing** to nudge
   Google. Indexing typically takes hours to a few days.
5. (Optional) Repeat at [Bing Webmaster Tools](https://www.bing.com/webmasters)
   — you can import directly from Search Console.

---

## 8. Custom domain (buy later, connect anytime)

You can launch on the free `YOURNAME.github.io` URL today and add a domain
whenever you're ready. Here's the whole process.

### Step 8a — Buy the domain

Use any registrar (Cloudflare Registrar, Namecheap, Porkbun are good, ~$10–15/yr).
Cloudflare Registrar sells at cost and makes the DNS step below easiest.

### Step 8b — Point DNS at GitHub Pages

In your registrar's DNS settings, create these records. Use **both** the apex
(root) and `www` so either works.

**For the apex/root domain** (`yourdomain.com`) — create four `A` records and
four `AAAA` records:

```
Type  Name  Value
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
AAAA  @     2606:50c0:8000::153
AAAA  @     2606:50c0:8001::153
AAAA  @     2606:50c0:8002::153
AAAA  @     2606:50c0:8003::153
```

**For `www`** — one `CNAME` record:

```
Type   Name  Value
CNAME  www   YOURNAME.github.io
```

> DNS changes can take from a few minutes up to 24–48 hours to propagate. Be
> patient; check with <https://dnschecker.org>.

### Step 8c — Tell GitHub about the domain

1. Add a file `public/CNAME` (no extension) containing **just** your domain:
   ```
   yourdomain.com
   ```
   Commit and push. *(This step prevents the custom domain from being reset on
   future automated deploys — a real and common gotcha.)*
2. On GitHub → repo → **Settings → Pages → Custom domain**, enter
   `yourdomain.com` and **Save**. GitHub will run a DNS check.

### Step 8d — Enable HTTPS

Once the DNS check passes (green), tick **Enforce HTTPS** on the same Pages
settings screen. GitHub provisions a free Let's Encrypt SSL certificate
automatically — this can take a few minutes to an hour after DNS resolves. After
that, `http://` visitors are redirected to secure `https://`.

### Step 8e — Update the site URL to the custom domain

Change `site` in `astro.config.mjs` and the `Sitemap:` line in
`public/robots.txt` to `https://yourdomain.com`, then commit and push. This
keeps canonical URLs, the sitemap, and share images correct. Finally, add the
custom domain as a new **Domain property** in Google Search Console and
re-submit the sitemap.

---

## 9. Common deployment mistakes (and how to avoid them)

1. **Broken CSS/images (site looks like unstyled text).** Caused by the repo
   *not* being named `YOURNAME.github.io` and missing `base` in the config.
   Fix: name the repo `YOURNAME.github.io`, or add `base: '/REPO-NAME'`.
2. **Leaving `site: 'https://example.com'`.** Wrong canonicals, sitemap, and
   social previews. Always set the real URL (Section 2).
3. **Pages Source left on "Deploy from a branch."** The Actions build never
   publishes. Set Source to **GitHub Actions** (Section 5).
4. **Custom domain resets after a deploy.** Add `public/CNAME` (Section 8c).
5. **Filename case mismatches.** GitHub's servers are case-sensitive; your Mac
   is not. `Photo.JPG` referenced as `photo.jpg` works locally but shows a blank
   placeholder live. This project uses all-lowercase names, so you're fine — but
   keep new files lowercase-kebab-case.
6. **Pushing `node_modules/` or `dist/`.** Already prevented by `.gitignore`.
   Don't remove those lines.
7. **Panicking during DNS propagation or HTTPS issuance.** Both can take up to a
   day. Verify DNS at dnschecker.org before assuming something's wrong.
8. **Expecting instant Google results.** Indexing takes hours to days even after
   submitting the sitemap. That's normal.

---

## 10. Deployment checklist

Print this and tick as you go.

**Before pushing**
- [ ] Repo will be named `YOURNAME.github.io`
- [ ] `astro.config.mjs` `site` set to `https://YOURNAME.github.io`
- [ ] `public/robots.txt` sitemap line updated to match
- [ ] `npm run build` succeeds locally with no errors

**Going live**
- [ ] Created the public GitHub repository
- [ ] `git remote add origin …` and `git push -u origin main` succeeded
- [ ] Settings → Pages → Source set to **GitHub Actions**
- [ ] Actions run finished green; site loads at `https://YOURNAME.github.io/`
- [ ] Clicked through a few pages — images, styles, and links all work

**SEO**
- [ ] Added the site to Google Search Console and verified it
- [ ] Submitted `sitemap-index.xml`
- [ ] Requested indexing for the homepage

**Custom domain (when ready)**
- [ ] Bought the domain
- [ ] Added apex `A`/`AAAA` records and `www` `CNAME` at the registrar
- [ ] Added `public/CNAME` file with the domain, pushed
- [ ] Entered the domain in Settings → Pages → Custom domain
- [ ] Ticked **Enforce HTTPS**
- [ ] Updated `site` + `robots.txt` to the custom domain, pushed
- [ ] Added the domain property in Search Console and re-submitted the sitemap

---

## 11. Recommended project changes before deploying

1. **Required:** set `site` in `astro.config.mjs` and the sitemap URL in
   `robots.txt` to the real URL (Pages URL now, custom domain later).
2. **Recommended:** add a dedicated 1200×630 homepage social-share image and
   wire it to the home page's `ogImage` prop (better LinkedIn/X previews).
3. **Optional:** add a `public/CNAME` file at the moment you connect a custom
   domain (Section 8c).
4. Nothing else — no env vars, no build-setting changes, no dependency updates
   are required. The build is already clean and production-ready.

---

## 12. Why GitHub Pages is the best fit for this project

This is a **static** portfolio: the build output is just files, with no server
logic, database, or secrets. GitHub Pages serves exactly that — globally, over
HTTPS, for free, with automatic redeploys already wired up in this repo, and
free custom-domain support. Paid or more complex platforms (Vercel, Netlify,
Cloudflare Pages) add features this site doesn't use — serverless functions,
preview deployments, edge config — so they'd be extra moving parts for no gain
today. Keeping code and hosting together on GitHub also means one login, one
place to manage everything. If the site ever grows dynamic features, the same
`dist/` output moves to Cloudflare Pages or Vercel with zero code changes — so
you lose nothing by starting here.
