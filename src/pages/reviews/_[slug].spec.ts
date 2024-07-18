import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { allReviews } from "src/api/reviews";
import { describe,expect, it } from "vitest";

import index from "./[slug].astro";

const { reviews } = await allReviews();

describe("/reviews/:slug", () => {
  it.each(reviews)(
    "matches snapshot for slug $slug",
    { timeout: 10000 },
    async (review) => {
      const renderers = await loadRenderers([reactContainerRenderer()]);
      const container = await AstroContainer.create({ renderers });
      const result = await container.renderToString(index, {
        props: { review: review },
      });

      expect(result).toMatchFileSnapshot(`__snapshots__/${review.slug}.html`);
    },
  );
});
