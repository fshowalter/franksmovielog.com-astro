import { PageTitle } from "src/components/PageTitle";
import { DecadeDistribution } from "src/components/DecadeDistribution";
import { MediaDistribution } from "src/components/MediaDistribution";
import { MostWatchedMovies } from "src/components/MostWatchedMovies";
import { MostWatchedDirectors } from "src/components/MostWatchedDirectors";
import { MostWatchedPerformers } from "src/components/MostWatchedPerformers";
import { MostWatchedWriters } from "src/components/MostWatchedWriters";
import { StatsNavigation } from "src/components/StatsNavigation";
import { Callouts } from "./Callouts";
import { GradeDistribution } from "./GradeDistribution";
import type { CalloutsAlltimeStatsData } from "./Callouts";
import type { GradeDistributionData } from "./GradeDistribution";
import type { MostWatchedMoviesListItemData } from "src/components/MostWatchedMovies";
import type { DecadeDistributionData } from "src/components/DecadeDistribution";
import type { MediaDistributionData } from "src/components/MediaDistribution";
import type { MostWatchedPeopleListItemData } from "src/components/MostWatchedPeople";
import type { PosterImageData } from "src/api/posters";

interface AlltimeStatsData extends CalloutsAlltimeStatsData {
  gradeDistribution: readonly GradeDistributionData[];
  mostWatchedTitles: readonly MostWatchedMoviesListItemData[];
  decadeDistribution: readonly DecadeDistributionData[];
  mediaDistribution: readonly MediaDistributionData[];
  mostWatchedDirectors: readonly MostWatchedPeopleListItemData[];
  mostWatchedPerformers: readonly MostWatchedPeopleListItemData[];
  mostWatchedWriters: readonly MostWatchedPeopleListItemData[];
}

export interface AlltimeStatsProps {
  stats: AlltimeStatsData;
  mostWatchedMoviesPosters: Record<string, PosterImageData>;
  mostWatchedPeoplePosters: Record<string, PosterImageData>;
  distinctStatYears: readonly string[];
}

export function AlltimeStats({
  stats,
  distinctStatYears,
  mostWatchedMoviesPosters,
  mostWatchedPeoplePosters,
}: AlltimeStatsProps): JSX.Element {
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
          <Callouts stats={stats} />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col items-stretch gap-y-8 py-8 tablet:px-gutter desktop:px-pageMargin">
        <MostWatchedMovies
          titles={stats.mostWatchedTitles}
          posters={mostWatchedMoviesPosters}
        />
        <DecadeDistribution data={stats.decadeDistribution} />
        <MediaDistribution data={stats.mediaDistribution} />
        <GradeDistribution data={stats.gradeDistribution} />
        <MostWatchedDirectors
          people={stats.mostWatchedDirectors}
          posters={mostWatchedPeoplePosters}
        />
        <MostWatchedPerformers
          people={stats.mostWatchedPerformers}
          posters={mostWatchedPeoplePosters}
        />
        <MostWatchedWriters
          people={stats.mostWatchedWriters}
          posters={mostWatchedPeoplePosters}
        />
      </div>
    </main>
  );
}
