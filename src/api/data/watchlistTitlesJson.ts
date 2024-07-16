import { promises as fs } from "node:fs";
import { z } from "zod";
import { join } from "path";

const watchlistTitlesJsonFile = join(
  process.cwd(),
  "content",
  "data",
  "watchlist-titles.json",
);

const WatchlistTitleJsonSchema = z.object({
  imdbId: z.string(),
  title: z.string(),
  year: z.string(),
  sortTitle: z.string(),
  releaseSequence: z.string(),
  viewed: z.boolean(),
  directorNames: z.array(z.string()),
  performerNames: z.array(z.string()),
  writerNames: z.array(z.string()),
  collectionNames: z.array(z.string()),
});

let cache: WatchlistTitleJson[];

export type WatchlistTitleJson = z.infer<typeof WatchlistTitleJsonSchema>;

export async function allWatchlistTitlesJson(): Promise<WatchlistTitleJson[]> {
  if (cache) {
    return cache;
  }

  const json = await fs.readFile(watchlistTitlesJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  cache = data.map((title) => {
    return WatchlistTitleJsonSchema.parse(title);
  });

  return cache;
}
