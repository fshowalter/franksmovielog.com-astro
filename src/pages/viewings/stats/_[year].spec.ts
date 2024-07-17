import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { expect, it, describe } from "vitest";
import index from "./[year].astro";
import { allStatYears } from "src/api/yearStats";

const statYears = await allStatYears();

describe("/viewings/stats/:year", () => {
  it.each(statYears)(
    "matches snapshot for year %i",
    { timeout: 10000 },
    async (year) => {
      const renderers = await loadRenderers([reactContainerRenderer()]);
      const container = await AstroContainer.create({ renderers });
      const result = await container.renderToString(index, {
        props: { year: year },
      });

      expect(result).toMatchFileSnapshot(`__snapshots__/${year}.html`);
    },
  );
});
