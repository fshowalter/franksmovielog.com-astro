import { ProgressRing } from "./ProgressRing";

export interface CalloutsData {
  reviewed: number;
  total: number;
  directorTotal: number;
  directorReviewed: number;
  performerTotal: number;
  performerReviewed: number;
  writerTotal: number;
  writerReviewed: number;
  collectionTotal: number;
  collectionReviewed: number;
}

function Callout({
  total,
  reviewed,
  label,
  subLabel,
}: {
  total: number | null;
  reviewed: number | null;
  label: string;
  subLabel?: string;
}): JSX.Element {
  return (
    <>
      <ProgressRing
        width={144}
        height={144}
        total={total ?? 0}
        complete={reviewed ?? 0}
        label={label}
        subLabel={subLabel}
      />
      <div className="spacer-y-2" />
      <div className="text-center text-subtle">
        <div>
          {reviewed?.toLocaleString()}/{total?.toLocaleString()}
        </div>
        <div className="text-sm leading-4">Reviewed</div>
      </div>
    </>
  );
}

export function Callouts({ data }: { data: CalloutsData }): JSX.Element {
  return (
    <section className="flex flex-wrap justify-center gap-x-8">
      <div className="flex min-w-full flex-col items-center tablet:min-w-0">
        <div className="spacer-y-8" />
        <Callout
          total={data.total}
          reviewed={data.reviewed}
          label="Total Progress"
        />
      </div>
      <div>
        <div className="spacer-y-8" />
        <Callout
          total={data.directorTotal}
          reviewed={data.directorReviewed}
          label="Director"
          subLabel="Titles"
        />
      </div>
      <div>
        <div className="spacer-y-8" />
        <Callout
          total={data.performerTotal}
          reviewed={data.performerReviewed}
          label="Performer"
          subLabel="Titles"
        />
      </div>
      <div>
        <div className="spacer-y-8" />
        <Callout
          total={data.writerTotal}
          reviewed={data.writerReviewed}
          label="Writer"
          subLabel="Titles"
        />
      </div>
      <div>
        <div className="spacer-y-8" />
        <Callout
          total={data.collectionTotal}
          reviewed={data.collectionReviewed}
          label="Collection"
          subLabel="Titles"
        />
      </div>
    </section>
  );
}
