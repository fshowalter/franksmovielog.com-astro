import { alltimeStats } from "src/api/alltimeStats";
import { getFixedWidthPosters, getFluidWidthPosters } from "src/api/posters";
import { allStatYears } from "src/api/yearStats";
import { ListItemPosterImageConfig } from "src/components/ListItemPoster";
import { MostWatchedMoviesPosterConfig } from "src/components/MostWatchedMovies";

import { type Props } from "./AlltimeStats";

export async function getProps(): Promise<Props> {
  const stats = await alltimeStats();
  const distinctStatYears = await allStatYears();

  const mostWatchedPeoplePosters = await getFixedWidthPosters(
    ListItemPosterImageConfig,
  );
  const mostWatchedMoviesPosters = await getFluidWidthPosters(
    MostWatchedMoviesPosterConfig,
  );

  return {
    stats,
    distinctStatYears,
    mostWatchedMoviesPosters,
    mostWatchedPeoplePosters,
  };
}
