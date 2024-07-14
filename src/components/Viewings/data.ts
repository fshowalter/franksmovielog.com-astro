import viewingsJson from "@/data/viewingsJson";
import type { ViewingsProps } from "./Viewings";

export default async function getComponentData(): Promise<ViewingsProps> {
  const viewingsJsonData = await viewingsJson();

  viewingsJsonData.sort((a, b) => b.sequence - a.sequence);

  const genres = new Set<string>();
  const releaseYears = new Set<string>();
  const viewingYears = new Set<string>();
  const media = new Set<string>();
  const venues = new Set<string>();

  const data = viewingsJsonData.map((title) => {
    const viewingDate = new Date(title.viewingDate);
    title.genres.forEach((genre) => genres.add(genre));
    releaseYears.add(title.year);
    viewingYears.add(title.viewingYear);
    if (title.medium) {
      media.add(title.medium);
    }
    if (title.venue) {
      venues.add(title.venue);
    }

    const itemData: ViewingsProps["data"][0] = {
      sequence: title.sequence,
      viewingYear: title.viewingYear,
      viewingMonth: viewingDate.toLocaleString("en-US", {
        month: "long",
        timeZone: "UTC",
      }),
      viewingDay: viewingDate.toLocaleString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      }),
      viewingDate: viewingDate.getUTCDate().toString(),
      releaseSequence: title.releaseSequence,
      title: title.title,
      medium: title.medium,
      venue: title.venue,
      year: title.year,
      sortTitle: title.sortTitle,
      slug: title.slug,
      genres: title.genres,
    };

    return itemData;
  });

  return {
    distinctGenres: Array.from(genres).toSorted(),
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
    distinctViewingYears: Array.from(viewingYears).toSorted(),
    distinctMedia: Array.from(media).toSorted(),
    distinctVenues: Array.from(venues).toSorted(),
    data,
    initialSort: "viewing-date-desc",
  };
}
