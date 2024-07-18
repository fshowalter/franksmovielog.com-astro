import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";
import { describe, it } from "vitest";

import page from "./progress.astro";

describe("/watchlist/progress", () => {
  it("matches snapshot", { timeout: 20000 }, async ({ expect }) => {
    const renderers = await loadRenderers([reactContainerRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const result = await container.renderToString(
      page as AstroComponentFactory,
      {},
    );

    void expect(result).toMatchFileSnapshot(`__snapshots__/progress.html`);
  });
});
