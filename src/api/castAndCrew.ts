import type { CastAndCrewMemberJson } from "./data/castAndCrewJson";
import allCastAndCrewJson from "./data/castAndCrewJson";

export interface CastAndCrewMember extends CastAndCrewMemberJson {}

let cache: CastAndCrewMember[];

export async function allCastAndCrew(): Promise<CastAndCrewMember[]> {
  if (cache) {
    return cache;
  }

  const castAndCrewJson = await allCastAndCrewJson();

  cache = castAndCrewJson;

  return cache;
}
