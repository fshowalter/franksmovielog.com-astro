import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { expect, it, beforeEach, vi } from "vitest";
import index from "./index.astro";
import { describe } from "node:test";
import { vol } from "memfs";

// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock("node:fs");
vi.mock("node:fs/promises");

beforeEach(() => {
  // reset the state of in-memory fs
  vol.reset();
});

describe("/", () => {
  it("matches snapshot", { timeout: 10000 }, async () => {
    const renderers = await loadRenderers([reactContainerRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const result = await container.renderToString(index, {});

    expect(result).toMatchSnapshot();
  });
});
