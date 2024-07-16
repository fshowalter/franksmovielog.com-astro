import type { OverratedDisappointmentsJson } from "./data/overratedDisappointmentsJson";
import { allOverratedDisappointmentsJson } from "./data/overratedDisappointmentsJson";

export interface OverratedDisappointment extends OverratedDisappointmentsJson {}

export interface OverratedDisappointments {
  overratedDisappintments: OverratedDisappointment[];
  distinctReleaseYears: string[];
  distinctGenres: string[];
}

let cache: OverratedDisappointments;

export async function allOverratedDisappintments(): Promise<OverratedDisappointments> {
  if (cache) {
    return cache;
  }

  const overratedJson = await allOverratedDisappointmentsJson();
  const distinctReleaseYears = new Set<string>();
  const distinctGenres = new Set<string>();

  const overratedDisappintments = overratedJson.map((title) => {
    title.genres.forEach((genre) => distinctGenres.add(genre));
    distinctReleaseYears.add(title.year);

    return {
      ...title,
    };
  });

  cache = {
    overratedDisappintments: overratedDisappintments,
    distinctGenres: Array.from(distinctGenres).toSorted(),
    distinctReleaseYears: Array.from(distinctReleaseYears).toSorted(),
  };

  return cache;
}
