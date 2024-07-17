import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { expect, it, describe } from "vitest";
import page from "./gone.astro";

describe("/gone", () => {
  it("matches snapshot", { timeout: 20000 }, async () => {
    const renderers = await loadRenderers([reactContainerRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const result = await container.renderToString(page, {});

    expect(result).toMatchFileSnapshot(`__snapshots__/gone.html`);
  });
});
