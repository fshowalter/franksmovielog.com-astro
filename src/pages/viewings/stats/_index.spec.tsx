import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { expect, it, describe } from "vitest";
import index from "./index.astro";

describe("/viewings/stats", () => {
  it("matches snapshot", { timeout: 10000 }, async () => {
    const renderers = await loadRenderers([reactContainerRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const result = await container.renderToString(index, {});

    expect(result).toMatchFileSnapshot(`__snapshots__/index.html`);
  });
});
