import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const watchlistProgressJsonFile = getContentPath(
  "data",
  "watchlist-progress.json",
);

const Detail = z.object({
  name: z.string(),
  titleCount: z.number(),
  slug: z.nullable(z.string()),
  reviewCount: z.number(),
});

const WatchlistProgressJsonSchema = z.object({
  total: z.number(),
  reviewed: z.number(),
  directorTotal: z.number(),
  directorReviewed: z.number(),
  directorDetails: z.array(Detail),
  performerTotal: z.number(),
  performerReviewed: z.number(),
  performerDetails: z.array(Detail),
  writerTotal: z.number(),
  writerReviewed: z.number(),
  writerDetails: z.array(Detail),
  collectionTotal: z.number(),
  collectionReviewed: z.number(),
  collectionDetails: z.array(Detail),
});

export type WatchlistProgressJson = z.infer<typeof WatchlistProgressJsonSchema>;

export async function watchlistProgressJson(): Promise<WatchlistProgressJson> {
  const json = await fs.readFile(watchlistProgressJsonFile, "utf8");
  const data = JSON.parse(json) as unknown;

  return WatchlistProgressJsonSchema.parse(data);
}
