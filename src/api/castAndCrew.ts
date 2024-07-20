import {
  allCastAndCrewJson,
  type CastAndCrewMemberJson,
} from "./data/castAndCrewJson";

interface CastAndCrew {
  castAndCrew: CastAndCrewMember[];
  distinctReleaseYears: string[];
}

export interface CastAndCrewMember extends CastAndCrewMemberJson {}

export async function allCastAndCrew(): Promise<CastAndCrew> {
  const castAndCrewJson = await allCastAndCrewJson();
  const releaseYears = new Set<string>();

  castAndCrewJson.forEach((member) => {
    member.titles.forEach((title) => {
      releaseYears.add(title.year);
    });
  });

  return {
    castAndCrew: castAndCrewJson,
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
  };
}
