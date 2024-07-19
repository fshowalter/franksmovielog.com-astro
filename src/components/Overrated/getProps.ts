import { allOverratedDisappointments } from "src/api/overratedDisappointments";
import { getFixedWidthPosters } from "src/api/posters";
import { ListItemPosterImageConfig } from "src/components/ListItemPoster";

import type { ListItemValue } from "./List";
import type { Props } from "./Overrated";

export async function getProps(): Promise<Props> {
  const { overratedDisappointments, distinctGenres, distinctReleaseYears } =
    await allOverratedDisappointments();
  const posters = await getFixedWidthPosters(ListItemPosterImageConfig);

  overratedDisappointments.sort((a, b) =>
    b.releaseSequence.localeCompare(a.releaseSequence),
  );

  const values = overratedDisappointments.map((review) => {
    const listItemData: ListItemValue = {
      imdbId: review.imdbId,
      title: review.title,
      year: review.year,
      slug: review.slug,
      genres: review.genres,
      grade: review.grade,
      releaseSequence: review.releaseSequence,
      gradeValue: review.gradeValue,
      sortTitle: review.sortTitle,
    };

    return listItemData;
  });

  return {
    values,
    initialSort: "release-date-desc",
    distinctGenres,
    distinctReleaseYears,
    posters,
  };
}
