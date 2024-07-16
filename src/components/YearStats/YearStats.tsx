import { PageTitle } from "src/components/PageTitle";
import {
  DecadeDistribution,
  type DecadeDistributionData,
} from "src/components/DecadeDistribution";
import {
  MediaDistribution,
  type MediaDistributionData,
} from "src/components/MediaDistribution";
import {
  MostWatchedMovies,
  type MostWatchedMoviesListItemData,
} from "src/components/MostWatchedMovies";
import { MostWatchedDirectors } from "src/components/MostWatchedDirectors";
import { MostWatchedPerformers } from "src/components/MostWatchedPerformers";
import { MostWatchedWriters } from "src/components/MostWatchedWriters";
import { StatsNavigation } from "src/components/StatsNavigation";
import { Callouts, type CalloutsData } from "./Callouts";
import type { MostWatchedPeopleListItemData } from "src/components/MostWatchedPeople";
import type { PosterImageData } from "src/api/posters";

interface YearStatsData extends CalloutsData {
  decadeDistribution: readonly DecadeDistributionData[];
  mediaDistribution: readonly MediaDistributionData[];
  mostWatchedTitles: readonly MostWatchedMoviesListItemData[];
  mostWatchedDirectors: readonly MostWatchedPeopleListItemData[];
  mostWatchedWriters: readonly MostWatchedPeopleListItemData[];
  mostWatchedPerformers: readonly MostWatchedPeopleListItemData[];
}

export interface YearStatsProps {
  year: string;
  stats: YearStatsData;
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
}: YearStatsProps): JSX.Element {
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
          <Callouts data={stats} />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col items-stretch gap-y-8 py-8 tablet:px-gutter desktop:px-pageMargin">
        <MostWatchedMovies
          posters={mostWatchedMoviesPosters}
          titles={stats.mostWatchedTitles}
        />
        <DecadeDistribution data={stats.decadeDistribution} />
        <MediaDistribution data={stats.mediaDistribution} />
        <MostWatchedDirectors
          posters={mostWatchedPeoplePosters}
          people={stats.mostWatchedDirectors}
        />
        <MostWatchedPerformers
          posters={mostWatchedPeoplePosters}
          people={stats.mostWatchedPerformers}
        />
        <MostWatchedWriters
          posters={mostWatchedPeoplePosters}
          people={stats.mostWatchedWriters}
        />
      </div>
    </main>
  );
}
