import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site URL lives here; sitemap, canonical URLs, and Open Graph tags all
// derive from it. Change to the custom domain (e.g. https://yourdomain.com)
// once it is connected — see DEPLOYMENT.md, Section 8.
export default defineConfig({
  site: 'https://guibo-dev.github.io',
  integrations: [sitemap()],
});
