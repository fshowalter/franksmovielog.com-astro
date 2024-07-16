import {
  watchlistProgressJson,
  type WatchlistProgressJson,
} from "./data/watchlistProgressJson";

export interface WatchlistProgress extends WatchlistProgressJson {}

let cache: WatchlistProgress;

export async function watchlistProgress(): Promise<WatchlistProgress> {
  if (cache) {
    return cache;
  }

  cache = await watchlistProgressJson();

  return cache;
}
