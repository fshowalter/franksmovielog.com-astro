import type { AlltimeStats } from "src/api/alltimeStats";
import { StatsCallout } from "src/components/StatsCallout";

interface Props
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
      <StatsCallout label="Viewings" value={viewingCount} />
      <StatsCallout label="Movies" value={titleCount} />
      <StatsCallout label="Reviews" value={reviewCount} />
      <StatsCallout
        label="From Watchlist"
        value={watchlistTitlesReviewedCount}
      />
    </div>
  );
}
