import { Callouts } from "./Callouts";
import { Header } from "./Header";
import { Details } from "./Details";
import type { DetailData } from "./Details";
import type { CalloutsData } from "./Callouts";

interface WatchlistProgressData extends CalloutsData {
  directorDetails: DetailData[];
  performerDetails: DetailData[];
  writerDetails: DetailData[];
  collectionDetails: DetailData[];
}

export interface WatchlistProgressProps {
  data: WatchlistProgressData;
}

export function WatchlistProgress({
  data,
}: WatchlistProgressProps): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <Header />
      <div className="spacer-y-8" />
      <Callouts data={data} />
      <div className="spacer-y-8" />
      <div className="flex w-full max-w-[960px] flex-col items-stretch tablet:px-gutter desktop:px-pageMargin">
        <div className="spacer-y-8" />
        <Details
          label="Director Progress"
          entityType="director"
          data={data.directorDetails}
        />
        <div className="spacer-y-16" />
        <Details
          label="Performer Progress"
          entityType="performer"
          data={data.performerDetails}
        />
        <div className="spacer-y-16" />
        <Details
          label="Writer Progress"
          entityType="writer"
          data={data.writerDetails}
        />
        <div className="spacer-y-16" />
        <Details
          label="Collection Progress"
          entityType="collection"
          data={data.collectionDetails}
        />
        <div className="spacer-y-16" />
      </div>
    </main>
  );
}
