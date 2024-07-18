import { getFixedWidthPosters } from "src/api/posters";
import { allViewings } from "src/api/viewings";
import { ListItemPosterImageConfig } from "src/components/ListItemPoster";

import type { ListItemValue } from "./List";
import type { Props } from "./Viewings";

export async function getProps(): Promise<Props> {
  const {
    viewings,
    distinctGenres,
    distinctReleaseYears,
    distinctMedia,
    distinctVenues,
    distinctViewingYears,
  } = await allViewings();
  const posters = await getFixedWidthPosters(ListItemPosterImageConfig);

  viewings.sort((a, b) => b.sequence - a.sequence);

  const values = viewings.map((viewing) => {
    const viewingDate = new Date(viewing.viewingDate);
    const value: ListItemValue = {
      viewingDate: viewingDate.toLocaleString("en-US", {
        day: "numeric",
        timeZone: "UTC",
      }),
      viewingMonth: viewingDate.toLocaleString("en-US", {
        month: "long",
        timeZone: "UTC",
      }),
      viewingDay: viewingDate.toLocaleString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      }),
      title: viewing.title,
      year: viewing.year,
      slug: viewing.slug,
      genres: viewing.genres,
      releaseSequence: viewing.releaseSequence,
      sortTitle: viewing.sortTitle,
      viewingYear: viewing.viewingYear,
      venue: viewing.venue,
      medium: viewing.medium,
      sequence: viewing.sequence,
    };

    return value;
  });

  return {
    values,
    distinctGenres,
    distinctMedia,
    distinctReleaseYears,
    distinctVenues,
    distinctViewingYears,
    posters,
    initialSort: "viewing-date-desc",
  };
}
