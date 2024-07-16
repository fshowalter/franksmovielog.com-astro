import type { AlltimeStats } from "src/api/alltimeStats";
import { StatsCallout } from "src/components/StatsCallout";

export interface Props
  extends Pick<
    AlltimeStats,
    | "titleCount"
    | "viewingCount"
    | "reviewCount"
    | "watchlistTitlesReviewedCount"
  > {}

export function Callouts({
  viewingCount,
  titleCount,
  reviewCount,
  watchlistTitlesReviewedCount,
}: Props): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 desktop:flex-nowrap">
      <StatsCallout label="Viewings" stat={viewingCount} />
      <StatsCallout label="Movies" stat={titleCount} />
      <StatsCallout label="Reviews" stat={reviewCount} />
      <StatsCallout
        label="From Watchlist"
        stat={watchlistTitlesReviewedCount}
      />
    </div>
  );
}
