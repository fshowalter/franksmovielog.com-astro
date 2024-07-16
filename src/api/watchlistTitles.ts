import {
  allWatchlistTitlesJson,
  type WatchlistTitleJson,
} from "./data/watchlistTitlesJson";

export interface WatchlistTitle extends WatchlistTitleJson {}

interface WatchlistTitles {
  watchlistTitles: WatchlistTitle[];
  distinctDirectors: string[];
  distinctPerformers: string[];
  distinctWriters: string[];
  distinctCollections: string[];
  distinctReleaseYears: string[];
}

let cache: WatchlistTitles;

export async function allWatchlistTitles(): Promise<WatchlistTitles> {
  if (cache) {
    return cache;
  }

  const watchlistTitlesJson = await allWatchlistTitlesJson();
  const distinctDirectors = new Set<string>();
  const distinctPerformers = new Set<string>();
  const distinctWriters = new Set<string>();
  const distinctCollections = new Set<string>();
  const distinctReleaseYears = new Set<string>();

  const watchlistTitles = watchlistTitlesJson.map((title) => {
    title.directorNames.forEach((name) => distinctDirectors.add(name));
    title.performerNames.forEach((name) => distinctPerformers.add(name));
    title.writerNames.forEach((name) => distinctWriters.add(name));
    title.collectionNames.forEach((name) => distinctCollections.add(name));
    distinctReleaseYears.add(title.year);

    return {
      ...title,
    };
  });

  cache = {
    watchlistTitles,
    distinctDirectors: Array.from(distinctDirectors).toSorted(),
    distinctPerformers: Array.from(distinctPerformers).toSorted(),
    distinctWriters: Array.from(distinctWriters).toSorted(),
    distinctCollections: Array.from(distinctCollections).toSorted(),
    distinctReleaseYears: Array.from(distinctReleaseYears).toSorted(),
  };

  return cache;
}
