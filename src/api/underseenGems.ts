import type { UnderseenGemsJson } from "./data/underseenGemsJson";
import { allUnderseenGemsJson } from "./data/underseenGemsJson";

export interface UnderseenGem extends UnderseenGemsJson {}

export interface UnderseenGems {
  underseenGems: UnderseenGem[];
  distinctReleaseYears: string[];
  distinctGenres: string[];
}

let cache: UnderseenGems;

export async function allUnderseenGems(): Promise<UnderseenGems> {
  if (cache) {
    return cache;
  }

  const underseenGemsJson = await allUnderseenGemsJson();
  const distinctReleaseYears = new Set<string>();
  const distinctGenres = new Set<string>();

  const underseenGems = underseenGemsJson.map((title) => {
    title.genres.forEach((genre) => distinctGenres.add(genre));
    distinctReleaseYears.add(title.year);

    return {
      ...title,
    };
  });

  cache = {
    underseenGems: underseenGems,
    distinctGenres: Array.from(distinctGenres).toSorted(),
    distinctReleaseYears: Array.from(distinctReleaseYears).toSorted(),
  };

  return cache;
}
