import type { ViewingJson } from "./data/viewingsJson";
import { allViewingsJson } from "./data/viewingsJson";

export interface Viewing extends ViewingJson {}

interface Viewings {
  viewings: Viewing[];
  distinctReleaseYears: string[];
  distinctGenres: string[];
  distinctViewingYears: string[];
  distinctMedia: string[];
  distinctVenues: string[];
}

export async function allViewings(): Promise<Viewings> {
  const viewingsJson = await allViewingsJson();
  const distinctViewingYears = new Set<string>();
  const distinctReleaseYears = new Set<string>();
  const distinctGenres = new Set<string>();
  const distinctMedia = new Set<string>();
  const distinctVenues = new Set<string>();

  const viewings = viewingsJson.map((title) => {
    title.genres.forEach((genre) => distinctGenres.add(genre));
    distinctReleaseYears.add(title.year);
    distinctViewingYears.add(title.viewingYear);
    if (title.medium) {
      distinctMedia.add(title.medium);
    }
    if (title.venue) {
      distinctVenues.add(title.venue);
    }

    return {
      ...title,
    };
  });

  return {
    viewings: viewings,
    distinctGenres: Array.from(distinctGenres).toSorted(),
    distinctReleaseYears: Array.from(distinctReleaseYears).toSorted(),
    distinctViewingYears: Array.from(distinctViewingYears).toSorted(),
    distinctVenues: Array.from(distinctVenues).toSorted(),
    distinctMedia: Array.from(distinctMedia).toSorted(),
  };
}
