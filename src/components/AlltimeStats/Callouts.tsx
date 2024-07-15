import type { AlltimeStats } from "@/api/alltimeStats";
import { StatsCallout } from "@/components/StatsCallout";

export interface CalloutsAlltimeStatsData
  extends Pick<
    AlltimeStats["stats"],
    | "titleCount"
    | "viewingCount"
    | "reviewCount"
    | "watchlistTitlesReviewedCount"
  > {}

export function Callouts({
  stats,
}: {
  stats: CalloutsAlltimeStatsData;
}): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 desktop:flex-nowrap">
      <StatsCallout label="Viewings" stat={stats.viewingCount} />
      <StatsCallout label="Movies" stat={stats.titleCount} />
      <StatsCallout label="Reviews" stat={stats.reviewCount} />
      <StatsCallout
        label="From Watchlist"
        stat={stats.watchlistTitlesReviewedCount}
      />
    </div>
  );
}
