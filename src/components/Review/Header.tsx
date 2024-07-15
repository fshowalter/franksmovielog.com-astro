import type { Review } from "src/api/reviews";
import { PageTitle } from "src/components/PageTitle";
import { twMerge } from "tailwind-merge";

export interface HeaderReviewData
  extends Pick<
    Review,
    "title" | "originalTitle" | "year" | "countries" | "runtimeMinutes"
  > {}

export function Header({
  review,
  className,
}: {
  review: HeaderReviewData;
  className?: string;
}) {
  return (
    <header className={twMerge("flex flex-col gap-y-4", className)}>
      <PageTitle>{review.title}</PageTitle>
      <OriginalTitle originalTitle={review.originalTitle} />
      <Meta review={review} />
    </header>
  );
}

function OriginalTitle({ originalTitle }: { originalTitle: string | null }) {
  if (!originalTitle) {
    return null;
  }

  return <div className="text-muted">({originalTitle})</div>;
}

function Meta({ review }: { review: HeaderReviewData }) {
  return (
    <div className="text-muted">
      {review.year} <span>|</span>{" "}
      {review.countries.reduce<JSX.Element | null>((acc, country) => {
        if (acc === null) {
          return <>{country}</>;
        }

        return (
          <>
            {acc}
            <span>&ndash;</span>
            {country}
          </>
        );
      }, null)}{" "}
      <span>|</span> {review.runtimeMinutes}
      &#x02009;min{" "}
      <span>
        <span>|</span> <a href="#credits">More...</a>
      </span>
    </div>
  );
}
