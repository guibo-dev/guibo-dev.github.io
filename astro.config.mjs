import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: replace with the production domain before deploy.
// This is the only place the site URL lives; sitemap, canonical URLs,
// and Open Graph tags all derive from it.
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
});
