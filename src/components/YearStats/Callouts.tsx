import type { YearStats } from "src/api/yearStats";
import { StatsCallout } from "src/components/StatsCallout";

interface Props
  extends Pick<YearStats, "titleCount" | "viewingCount" | "newTitleCount"> {}

export function Callouts({
  titleCount,
  viewingCount,
  newTitleCount,
}: Props): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 desktop:flex-nowrap">
      <StatsCallout label="Viewings" value={viewingCount} />
      <StatsCallout label="Movies" value={titleCount} />
      <StatsCallout label="New Movies" value={newTitleCount} />
    </div>
  );
}
