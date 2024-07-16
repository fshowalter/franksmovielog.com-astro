import type { AlltimeStatsJson } from "./data/alltimeStatsJson";
import { alltimeStatsJson } from "./data/alltimeStatsJson";

export interface AlltimeStats extends AlltimeStatsJson {}

let cache: AlltimeStats;

export async function alltimeStats(): Promise<AlltimeStats> {
  if (cache) {
    return cache;
  }

  cache = await alltimeStatsJson();

  return cache;
}
