// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Real domain — used for sitemap, canonical, og:url.
// Override per-environment with the SITE_URL env var (set it in Vercel → Settings → Environment Variables).
const SITE = process.env.SITE_URL || "https://bm-studio-landing.vercel.app";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: SITE,
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en", "kk"],
    routing: {
      prefixDefaultLocale: false, // ru served at "/", en at "/en/", kk at "/kk/"
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
