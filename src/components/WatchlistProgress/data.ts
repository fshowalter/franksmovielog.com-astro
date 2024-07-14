import watchlistProgressJson from "@/data/watchlistProgressJson";
import type { WatchlistProgressProps } from "./WatchlistProgress";

export default async function getComponentData(): Promise<WatchlistProgressProps> {
  const data = await watchlistProgressJson();

  return {
    data,
  };
}
