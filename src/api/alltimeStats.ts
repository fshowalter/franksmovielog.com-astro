import type { AlltimeStatsJson } from "./data/alltimeStatsJson";
import { alltimeStatsJson } from "./data/alltimeStatsJson";
import { yearStatsJson } from "./data/yearStatsJson";

export interface AlltimeStats {
  stats: AlltimeStatsJson;
  distinctStatYears: string[];
}

let cache: AlltimeStats;

export async function alltimeStats(): Promise<AlltimeStats> {
  if (cache) {
    return cache;
  }

  const yearsJson = await yearStatsJson();

  const distinctStatYears = new Set<string>();

  yearsJson.map((stats) => {
    distinctStatYears.add(stats.year);
  });

  cache = {
    stats: await alltimeStatsJson(),
    distinctStatYears: Array.from(distinctStatYears).toSorted(),
  };

  return cache;
}
