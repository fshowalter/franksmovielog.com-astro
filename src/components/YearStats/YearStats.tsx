import type { PosterImageData } from "src/api/posters";
import type { YearStats } from "src/api/yearStats";
import { DecadeDistribution } from "src/components/DecadeDistribution";
import { MediaDistribution } from "src/components/MediaDistribution";
import { MostWatchedDirectors } from "src/components/MostWatchedDirectors";
import { MostWatchedMovies } from "src/components/MostWatchedMovies";
import { MostWatchedPerformers } from "src/components/MostWatchedPerformers";
import { MostWatchedWriters } from "src/components/MostWatchedWriters";
import { PageTitle } from "src/components/PageTitle";
import { StatsNavigation } from "src/components/StatsNavigation";

import { Callouts } from "./Callouts";

export interface Props {
  year: string;
  stats: YearStats;
  distinctStatYears: readonly string[];
  mostWatchedMoviesPosters: Record<string, PosterImageData>;
  mostWatchedPeoplePosters: Record<string, PosterImageData>;
}

export function YearStats({
  year,
  stats,
  distinctStatYears,
  mostWatchedMoviesPosters,
  mostWatchedPeoplePosters,
}: Props): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <header className="flex flex-col flex-wrap justify-between px-pageMargin">
        <div className="flex flex-col items-center">
          <PageTitle className="pt-6 desktop:pt-8">{`${year} Stats`}</PageTitle>
          <p className="text-subtle">
            {[...distinctStatYears].reverse()[1] === year
              ? "A year in progress..."
              : "A Year in Review"}
          </p>
          <div className="spacer-y-6" />
          <StatsNavigation
            currentYear={year}
            linkFunc={(year: string) => {
              if (year === "all") {
                return "/viewings/stats/";
              }

              return `/viewings/stats/${year}/`;
            }}
            years={distinctStatYears}
          />
        </div>
        <div>
          <div className="spacer-y-8" />
          <Callouts
            titleCount={stats.titleCount}
            newTitleCount={stats.newTitleCount}
            viewingCount={stats.viewingCount}
          />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col items-stretch gap-y-8 py-8 tablet:px-gutter desktop:px-pageMargin">
        <MostWatchedMovies
          posters={mostWatchedMoviesPosters}
          values={stats.mostWatchedTitles}
        />
        <DecadeDistribution values={stats.decadeDistribution} />
        <MediaDistribution values={stats.mediaDistribution} />
        <MostWatchedDirectors
          posters={mostWatchedPeoplePosters}
          values={stats.mostWatchedDirectors}
        />
        <MostWatchedPerformers
          posters={mostWatchedPeoplePosters}
          values={stats.mostWatchedPerformers}
        />
        <MostWatchedWriters
          posters={mostWatchedPeoplePosters}
          values={stats.mostWatchedWriters}
        />
      </div>
    </main>
  );
}
