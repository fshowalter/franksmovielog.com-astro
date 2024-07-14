import { overratedDisappointmentsJson } from "@/data/overratedDisappointmentsJson";
import type { OverratedProps } from "./Overrated";

export default async function getComponentData(): Promise<OverratedProps> {
  const json = await overratedDisappointmentsJson();

  json.sort((a, b) => b.releaseSequence.localeCompare(a.releaseSequence));

  const genres = new Set<string>();
  const releaseYears = new Set<string>();

  const titles = json.map((title) => {
    title.genres.forEach((genre) => genres.add(genre));
    releaseYears.add(title.year);

    return title;
  });

  return {
    titles,
    distinctGenres: Array.from(genres).toSorted(),
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
    initialSort: "release-date-desc",
  };
}
