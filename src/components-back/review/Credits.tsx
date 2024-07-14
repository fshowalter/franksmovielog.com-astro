import { toSentence } from "../../utils";
import { twMerge } from "tailwind-merge";
import type { Review } from "@/api/reviews";

function Credit({
  title,
  creditValue,
}: {
  title: string;
  creditValue: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <dt className="font-bold text-subtle">{title}</dt>
      <dd className="text-subtle">{creditValue}</dd>
    </div>
  );
}

export function Credits({
  review,
  poster,
  className,
  children,
}: {
  review: Pick<
    Review,
    | "title"
    | "year"
    | "slug"
    | "originalTitle"
    | "countries"
    | "runtimeMinutes"
    | "directorNames"
    | "principalCastNames"
    | "writerNames"
  >;
  poster?: any;
  className?: string;
  children: any;
}): JSX.Element {
  return (
    <aside
      id="credits"
      className={twMerge(
        "scroll-margin-top relative bg-subtle px-gutter pb-8 pt-8 tablet:pt-12",
        className,
      )}
    >
      <header className="flex items-center justify-center gap-x-2 pb-6 text-center text-2.5xl">
        {review.title}{" "}
        <span className="text-sm font-light text-subtle">({review.year})</span>
      </header>
      <div className="mx-auto block tablet:float-left tablet:mr-gutter tablet:max-w-1/2">
        {poster}
      </div>

      <dl className="flex flex-col gap-y-4">
        {review.originalTitle && (
          <Credit title="Original Title" creditValue={review.originalTitle} />
        )}
        <Credit title="Financing" creditValue={toSentence(review.countries)} />
        <Credit
          title="Running Time"
          creditValue={`${review.runtimeMinutes} min`}
        />
        <Credit
          title="Directed by"
          creditValue={review.directorNames.map((name) => (
            <div key={name}>{name}</div>
          ))}
        />
        <Credit
          title="Written by"
          creditValue={review.writerNames.map((name) => (
            <div key={name}>{name}</div>
          ))}
        />
        <Credit
          title="Starring"
          creditValue={toSentence(review.principalCastNames)}
        />
      </dl>
      <div className="h-8 min-h-8" />
      {children}
      <div className="h-8 min-h-8" />
      <a
        href="#top"
        className="mx-auto flex max-w-1/2 cursor-pointer content-center items-center justify-center rounded-lg p-2 shadow-all shadow-border hover:shadow-border-accent"
      >
        Back to Top
        <svg viewBox="0 0 24 24" className="size-6 fill-default">
          <path d="M7.997 10l3.515-3.79a.672.672 0 0 1 .89-.076l.086.075L16 10 13 10.001V18h-2v-7.999L7.997 10z"></path>
        </svg>
      </a>
    </aside>
  );
}
