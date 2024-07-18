import type { AlltimeStats } from "src/api/alltimeStats";
import type { PosterImageData } from "src/api/posters";
import { DecadeDistribution } from "src/components/DecadeDistribution";
import { MediaDistribution } from "src/components/MediaDistribution";
import { MostWatchedDirectors } from "src/components/MostWatchedDirectors";
import { MostWatchedMovies } from "src/components/MostWatchedMovies";
import { MostWatchedPerformers } from "src/components/MostWatchedPerformers";
import { MostWatchedWriters } from "src/components/MostWatchedWriters";
import { PageTitle } from "src/components/PageTitle";
import { StatsNavigation } from "src/components/StatsNavigation";

import { Callouts } from "./Callouts";
import { GradeDistribution } from "./GradeDistribution";

export interface Props {
  stats: Pick<
    AlltimeStats,
    | "decadeDistribution"
    | "gradeDistribution"
    | "mediaDistribution"
    | "mostWatchedDirectors"
    | "mostWatchedPerformers"
    | "mostWatchedTitles"
    | "mostWatchedWriters"
    | "reviewCount"
    | "titleCount"
    | "viewingCount"
    | "watchlistTitlesReviewedCount"
  >;
  mostWatchedMoviesPosters: Record<string, PosterImageData>;
  mostWatchedPeoplePosters: Record<string, PosterImageData>;
  distinctStatYears: readonly string[];
}

export function AlltimeStats({
  stats,
  distinctStatYears,
  mostWatchedMoviesPosters,
  mostWatchedPeoplePosters,
}: Props): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <header className="flex flex-col flex-wrap justify-between px-pageMargin">
        <div className="flex flex-col items-center">
          <PageTitle className="pt-6 desktop:pt-8">All-Time Stats</PageTitle>
          <p className="text-subtle">
            {`${(distinctStatYears.length - 1).toString()} Years in Review`}
          </p>
          <div className="spacer-y-6" />
          <StatsNavigation
            currentYear={"all"}
            linkFunc={(year: string) => {
              return `/viewings/stats/${year}/`;
            }}
            years={distinctStatYears}
          />
        </div>
        <div>
          <div className="spacer-y-8" />
          <Callouts
            titleCount={stats.titleCount}
            viewingCount={stats.viewingCount}
            reviewCount={stats.reviewCount}
            watchlistTitlesReviewedCount={stats.watchlistTitlesReviewedCount}
          />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col items-stretch gap-y-8 py-8 tablet:px-gutter desktop:px-pageMargin">
        <MostWatchedMovies
          values={stats.mostWatchedTitles}
          posters={mostWatchedMoviesPosters}
        />
        <DecadeDistribution values={stats.decadeDistribution} />
        <MediaDistribution values={stats.mediaDistribution} />
        <GradeDistribution values={stats.gradeDistribution} />
        <MostWatchedDirectors
          values={stats.mostWatchedDirectors}
          posters={mostWatchedPeoplePosters}
        />
        <MostWatchedPerformers
          values={stats.mostWatchedPerformers}
          posters={mostWatchedPeoplePosters}
        />
        <MostWatchedWriters
          values={stats.mostWatchedWriters}
          posters={mostWatchedPeoplePosters}
        />
      </div>
    </main>
  );
}
