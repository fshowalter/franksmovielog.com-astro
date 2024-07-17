/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    // Vitest configuration options
    setupFiles: ["setupTests.ts"],
    globals: true,
    environmentMatchGlobs: [
      ["src/pages/**", "node"],
      ["src/components/**", "jsdom"],
      // ...
    ],
    coverage: {
      include: ["src/**"],
    },
  },
});
