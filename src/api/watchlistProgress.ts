import {
  type WatchlistProgressJson,
  watchlistProgressJson,
} from "./data/watchlistProgressJson";

export interface WatchlistProgress extends WatchlistProgressJson {}

export async function watchlistProgress(): Promise<WatchlistProgress> {
  return await watchlistProgressJson();
}
