import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import path from "path";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "always",
  integrations: [
    react(),
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      applyBaseStyles: false,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        // your aliases should mirror the ones defined in your tsconfig.json
        // i'll re-use the ones in the official docs:
        "@/components": path.resolve(path.dirname(""), "./src/components"),
        "@/layouts": path.resolve(path.dirname(""), "./src/layouts"),
        "@/utils": path.resolve(path.dirname(""), "./src/utils"),
        "@/api": path.resolve(path.dirname(""), "./src/api"),
      },
    },
  },
});
