import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { expect, it, describe } from "vitest";
import index from "./[slug].astro";
import { allReviews } from "src/api/reviews";

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
