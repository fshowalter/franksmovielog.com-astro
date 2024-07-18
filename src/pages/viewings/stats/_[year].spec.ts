import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { allStatYears } from "src/api/yearStats";
import { describe,expect, it } from "vitest";

import index from "./[year].astro";

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
