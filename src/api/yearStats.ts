import { allYearStatsJson, type YearStatsJson } from "./data/yearStatsJson";

export interface YearStats extends YearStatsJson {}

let cache: Record<string, YearStats> = {};
const statYears = new Set<string>();

export async function allStatYears() {
  if (statYears.values.length > 0) {
    return Array.from(statYears).toSorted();
  }

  const yearStats = await allYearStatsJson();

  yearStats.forEach((stats) => {
    statYears.add(stats.year);
  });

  return Array.from(statYears).toSorted();
}

export async function statsForYear(year: string): Promise<YearStats> {
  if (year in cache) {
    return cache[year];
  }

  const yearStats = await allYearStatsJson();

  yearStats.forEach((stats) => {
    cache[stats.year] = stats;
    statYears.add(stats.year);
  });

  return cache[year];
}
