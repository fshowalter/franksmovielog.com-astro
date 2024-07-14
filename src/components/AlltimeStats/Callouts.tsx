import { StatsCallout } from "@/components/Stats";

export interface CalloutsData {
  titleCount: number;
  viewingCount: number;
  reviewCount: number;
  watchlistTitlesReviewedCount: number;
}

export function Callouts({ data }: { data: CalloutsData }): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 desktop:flex-nowrap">
      <StatsCallout label="Viewings" stat={data.viewingCount} />
      <StatsCallout label="Movies" stat={data.titleCount} />
      <StatsCallout label="Reviews" stat={data.reviewCount} />
      <StatsCallout
        label="From Watchlist"
        stat={data.watchlistTitlesReviewedCount}
      />
    </div>
  );
}
