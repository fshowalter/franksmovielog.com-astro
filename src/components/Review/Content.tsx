import type { Review } from "src/api/reviews";
import { Grade } from "src/components/Grade";
import { LongFormText } from "src/components/LongFormText";
import { twMerge } from "tailwind-merge";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(date: Date) {
  return dateFormat.format(date);
}

export interface ContentReviewData
  extends Pick<Review, "grade" | "date" | "content"> {}

export function Content({
  review,
  className,
}: {
  review: ContentReviewData;
  className?: string;
}) {
  return (
    <div className={twMerge("flex flex-col gap-y-8", className)}>
      <div className="flex flex-col items-center">
        <Grade grade={review.grade} height={32} />
        <div className="flex flex-col items-center tracking-0.5px text-subtle">
          <span>on</span> {formatDate(review.date)}
        </div>
      </div>
      <LongFormText text={review.content} className="max-w-prose" />
    </div>
  );
}
