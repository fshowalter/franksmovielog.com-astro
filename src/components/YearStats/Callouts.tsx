import { StatsCallout } from "src/components/StatsCallout";

export interface CalloutsData {
  titleCount: number;
  viewingCount: number;
  newTitleCount: number;
}

export function Callouts({ data }: { data: CalloutsData }): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 desktop:flex-nowrap">
      <StatsCallout label="Viewings" stat={data.viewingCount} />
      <StatsCallout label="Movies" stat={data.titleCount} />
      <StatsCallout label="New Movies" stat={data.newTitleCount} />
    </div>
  );
}
