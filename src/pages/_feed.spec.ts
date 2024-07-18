import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import * as FeedEndpoint from "./feed.xml.ts";

describe("/feed.xml", () => {
  it("matches snapshot", { timeout: 20000 }, async () => {
    const container = await AstroContainer.create();

    // @ts-expect-error astro signature is wrong
    const response = await container.renderToResponse(FeedEndpoint, {
      routeType: "endpoint",
    });

    const result = await response.text();

    expect(result).toMatchFileSnapshot(`__snapshots__/feed.xml`);
  });
});
