import { alltimeStats } from "src/api/alltimeStats";
import { getFluidWidthPosters, getFixedWidthPosters } from "src/api/posters";
import { MostWatchedMoviesPosterConfig } from "src/components/MostWatchedMovies";
import { ListItemPosterImageConfig } from "src/components/ListItemPoster";
import { allStatYears } from "src/api/yearStats";
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
