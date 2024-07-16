import {
  allCastAndCrewJson,
  type CastAndCrewMemberJson,
} from "./data/castAndCrewJson";

export interface CastAndCrew {
  castAndCrew: CastAndCrewMember[];
  distinctReleaseYears: string[];
}

export interface CastAndCrewMember extends CastAndCrewMemberJson {}

let cache: CastAndCrew;

export async function allCastAndCrew(): Promise<CastAndCrew> {
  if (cache) {
    return cache;
  }

  const castAndCrewJson = await allCastAndCrewJson();
  const releaseYears = new Set<string>();

  castAndCrewJson.forEach((member) => {
    member.titles.forEach((title) => {
      releaseYears.add(title.year);
    });
  });

  cache = {
    castAndCrew: castAndCrewJson,
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
  };

  return cache;
}
