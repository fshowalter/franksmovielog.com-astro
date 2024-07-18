import type { WatchlistProgress } from "src/api/watchlistProgress";

import type { Props as CalloutsProps } from "./Callouts";
import { Callouts } from "./Callouts";
import { Details } from "./Details";
import { Header } from "./Header";

interface Props {
  progress: Pick<
    WatchlistProgress,
    | "collectionDetails"
    | "directorDetails"
    | "writerDetails"
    | "performerDetails"
  > &
    CalloutsProps;
}

export function WatchlistProgress({ progress }: Props): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <Header />
      <div className="spacer-y-8" />
      <Callouts
        total={progress.total}
        reviewed={progress.reviewed}
        writerReviewed={progress.writerReviewed}
        writerTotal={progress.writerTotal}
        directorReviewed={progress.directorReviewed}
        directorTotal={progress.directorTotal}
        performerReviewed={progress.performerReviewed}
        performerTotal={progress.performerTotal}
        collectionReviewed={progress.collectionReviewed}
        collectionTotal={progress.collectionTotal}
      />
      <div className="spacer-y-8" />
      <div className="flex w-full max-w-[960px] flex-col items-stretch tablet:px-gutter desktop:px-pageMargin">
        <div className="spacer-y-8" />
        <Details
          label="Director Progress"
          valueType="director"
          values={progress.directorDetails}
        />
        <div className="spacer-y-16" />
        <Details
          label="Performer Progress"
          valueType="performer"
          values={progress.performerDetails}
        />
        <div className="spacer-y-16" />
        <Details
          label="Writer Progress"
          valueType="writer"
          values={progress.writerDetails}
        />
        <div className="spacer-y-16" />
        <Details
          label="Collection Progress"
          valueType="collection"
          values={progress.collectionDetails}
        />
        <div className="spacer-y-16" />
      </div>
    </main>
  );
}
