import { PageTitle } from "@/components/PageTitle";
import {
  DecadeDistribution,
  MediaDistribution,
  MostWatchedMovies,
} from "@/components/";
import { MostWatchedDirectors } from "@/components/MostWatchedDirectors";
import { MostWatchedPerformers } from "@/components/MostWatchedPerformers";
import { MostWatchedWriters } from "@/components/MostWatchedWriters";
import { StatsNavigation } from "@/components/StatsNavigation";
import { Callouts } from "./Callouts";
import type { CalloutsData } from "./Callouts";
import type { DecadeDistributionData } from "@/components/DecadeDistribution";
import type { MediaDistributionData } from "@/components/MediaDistribution";
import type { MostWatchedMovieListItemData } from "@/components/MostWatchedMovies";
import type { MostWatchedPersonListItemData } from "@/components/MostWatchedPeople";

interface YearStatsData extends CalloutsData {
  decadeDistribution: readonly DecadeDistributionData[];
  mediaDistribution: readonly MediaDistributionData[];
  mostWatchedTitles: readonly MostWatchedMovieListItemData[];
  mostWatchedDirectors: readonly MostWatchedPersonListItemData[];
  mostWatchedWriters: readonly MostWatchedPersonListItemData[];
  mostWatchedPerformers: readonly MostWatchedPersonListItemData[];
}

export interface YearStatsProps {
  year: string;
  data: YearStatsData;
  statYears: readonly string[];
}

export function YearStats({
  year,
  data,
  statYears,
}: YearStatsProps): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <header className="flex flex-col flex-wrap justify-between px-pageMargin">
        <div className="flex flex-col items-center">
          <PageTitle className="pt-6 desktop:pt-8">{`${year} Stats`}</PageTitle>
          <p className="text-subtle">
            {[...statYears].reverse()[1] === year
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
            years={statYears}
          />
        </div>
        <div>
          <div className="spacer-y-8" />
          <Callouts data={data} />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col items-stretch gap-y-8 py-8 tablet:px-gutter desktop:px-pageMargin">
        <MostWatchedMovies data={data.mostWatchedTitles} />
        <DecadeDistribution data={data.decadeDistribution} />
        <MediaDistribution data={data.mediaDistribution} />
        <MostWatchedDirectors data={data.mostWatchedDirectors} />
        <MostWatchedPerformers data={data.mostWatchedPerformers} />
        <MostWatchedWriters data={data.mostWatchedWriters} />
      </div>
    </main>
  );
}
