import { getFixedWidthPosters, getFluidWidthPosters } from "src/api/posters";
import { allStatYears, statsForYear } from "src/api/yearStats";
import { ListItemPosterImageConfig } from "src/components/ListItemPoster";
import { MostWatchedMoviesPosterConfig } from "src/components/MostWatchedMovies";

import type { Props } from "./YearStats";

export async function getProps(year: string): Promise<Props> {
  const distinctStatYears = await allStatYears();

  const stats = await statsForYear(year);

  const mostWatchedPeoplePosters = await getFixedWidthPosters(
    ListItemPosterImageConfig,
  );
  const mostWatchedMoviesPosters = await getFluidWidthPosters(
    MostWatchedMoviesPosterConfig,
  );

  return {
    year,
    stats,
    distinctStatYears,
    mostWatchedMoviesPosters,
    mostWatchedPeoplePosters,
  };
}
