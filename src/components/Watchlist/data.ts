import watchlistTitlesJson from "@/data/watchlistTitlesJson";
import type { WatchlistProps } from "./Watchlist";

export default async function getComponentData(): Promise<WatchlistProps> {
  const json = await watchlistTitlesJson();

  json.sort((a, b) => a.releaseSequence.localeCompare(b.releaseSequence));

  const directors = new Set<string>();
  const performers = new Set<string>();
  const writers = new Set<string>();
  const collections = new Set<string>();
  const releaseYears = new Set<string>();

  const data = json.map((title) => {
    title.directorNames.forEach((name) => directors.add(name));
    title.performerNames.forEach((name) => performers.add(name));
    title.writerNames.forEach((name) => writers.add(name));
    title.collectionNames.forEach((name) => collections.add(name));
    releaseYears.add(title.year);

    const itemData: WatchlistProps["data"][0] = {
      ...title,
    };

    return itemData;
  });

  return {
    data,
    initialSort: "release-date-asc",
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
    distinctDirectors: Array.from(directors).toSorted(),
    distinctPerformers: Array.from(performers).toSorted(),
    distinctWriters: Array.from(writers).toSorted(),
    distinctCollections: Array.from(collections).toSorted(),
  };
}
