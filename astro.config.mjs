// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// TODO: replace with your real domain — used for sitemap, canonical, og:url
const SITE = "https://example.com";

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
