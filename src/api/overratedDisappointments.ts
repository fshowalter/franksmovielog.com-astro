import type { OverratedDisappointmentsJson } from "./data/overratedDisappointmentsJson";
import { allOverratedDisappointmentsJson } from "./data/overratedDisappointmentsJson";

export interface OverratedDisappointment extends OverratedDisappointmentsJson {}

interface OverratedDisappointments {
  overratedDisappointments: OverratedDisappointment[];
  distinctReleaseYears: string[];
  distinctGenres: string[];
}

export async function allOverratedDisappointments(): Promise<OverratedDisappointments> {
  const overratedJson = await allOverratedDisappointmentsJson();
  const distinctReleaseYears = new Set<string>();
  const distinctGenres = new Set<string>();

  const overratedDisappointments = overratedJson.map((title) => {
    title.genres.forEach((genre) => distinctGenres.add(genre));
    distinctReleaseYears.add(title.year);

    return {
      ...title,
    };
  });

  return {
    overratedDisappointments: overratedDisappointments,
    distinctGenres: Array.from(distinctGenres).toSorted(),
    distinctReleaseYears: Array.from(distinctReleaseYears).toSorted(),
  };
}
