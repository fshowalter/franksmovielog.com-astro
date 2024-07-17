/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    // Vitest configuration options
    setupFiles: ["setupTests.ts"],
    coverage: {
      include: ["src/**"],
    },
  },
});
