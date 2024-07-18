import { getFixedWidthPosters } from "src/api/posters";
import { allWatchlistTitles } from "src/api/watchlistTitles";
import { ListItemPosterImageConfig } from "src/components/ListItemPoster";

import type { Props } from "./Watchlist";

export async function getProps(): Promise<Props> {
  const {
    watchlistTitles,
    distinctCollections,
    distinctDirectors,
    distinctPerformers,
    distinctReleaseYears,
    distinctWriters,
  } = await allWatchlistTitles();

  const posters = await getFixedWidthPosters(ListItemPosterImageConfig);
  const defaultPosterImageData = posters["default"];

  watchlistTitles.sort((a, b) =>
    a.releaseSequence.localeCompare(b.releaseSequence),
  );

  return {
    values: watchlistTitles,
    distinctCollections,
    distinctDirectors,
    distinctPerformers,
    distinctWriters,
    distinctReleaseYears,
    defaultPosterImageData,
    initialSort: "release-date-asc",
  };
}
