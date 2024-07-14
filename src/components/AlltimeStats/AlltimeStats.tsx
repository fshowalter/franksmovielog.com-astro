import { PageTitle } from "@/components/PageTitle";
import {
  DecadeDistribution,
  MediaDistribution,
  MostWatchedMovies,
} from "@/components/Stats";
import { MostWatchedDirectors } from "@/components/Stats/MostWatchedDirectors";
import { MostWatchedPerformers } from "@/components/Stats/MostWatchedPerformers";
import { MostWatchedWriters } from "@/components/Stats/MostWatchedWriters";
import { StatsNavigation } from "@/components/Stats/StatsNavigation";
import { Callouts } from "./Callouts";
import { GradeDistribution } from "./GradeDistribution";
import type { CalloutsData } from "./Callouts";
import type { GradeDistributionData } from "./GradeDistribution";
import type { MostWatchedMovieListItemData } from "@/components/Stats/MostWatchedMovies";
import type { DecadeDistributionData } from "@/components/Stats/DecadeDistribution";
import type { MediaDistributionData } from "@/components/Stats/MediaDistribution";
import type { MostWatchedPersonListItemData } from "@/components/Stats/MostWatchedPeople";

interface AllTimeStatsData extends CalloutsData {
  gradeDistribution: readonly GradeDistributionData[];
  mostWatchedTitles: readonly MostWatchedMovieListItemData[];
  decadeDistribution: readonly DecadeDistributionData[];
  mediaDistribution: readonly MediaDistributionData[];
  mostWatchedDirectors: readonly MostWatchedPersonListItemData[];
  mostWatchedPerformers: readonly MostWatchedPersonListItemData[];
  mostWatchedWriters: readonly MostWatchedPersonListItemData[];
}

export interface AllTimeStatsProps {
  data: AllTimeStatsData;
  distinctStatYears: readonly string[];
}

export function AllTimeStats({
  data,
  distinctStatYears,
}: AllTimeStatsProps): JSX.Element {
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
          <Callouts data={data} />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col items-stretch gap-y-8 py-8 tablet:px-gutter desktop:px-pageMargin">
        <MostWatchedMovies data={data.mostWatchedTitles} />
        <DecadeDistribution data={data.decadeDistribution} />
        <MediaDistribution data={data.mediaDistribution} />
        <GradeDistribution data={data.gradeDistribution} />
        <MostWatchedDirectors data={data.mostWatchedDirectors} />
        <MostWatchedPerformers data={data.mostWatchedPerformers} />
        <MostWatchedWriters data={data.mostWatchedWriters} />
      </div>
    </main>
  );
}
