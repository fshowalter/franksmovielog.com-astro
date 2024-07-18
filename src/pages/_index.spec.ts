import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { describe,expect, it } from "vitest";

import index from "./index.astro";

describe("/", () => {
  it("matches snapshot", { timeout: 20000 }, async () => {
    const renderers = await loadRenderers([reactContainerRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const result = await container.renderToString(index, {});

    expect(result).toMatchFileSnapshot(`__snapshots__/index.html`);
  });
});
