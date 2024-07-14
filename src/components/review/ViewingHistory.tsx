import type { Review } from "@/api/reviews";
import { ViewingHistoryListItem } from "./ViewingHistoryListItem";

export interface ViewingHistoryReviewData extends Pick<Review, "viewings"> {}

export function ViewingHistory({
  review,
  className,
}: {
  review: ViewingHistoryReviewData;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="border-bottom px-gutter text-md font-normal text-subtle">
        Viewing History
        <div className="h-2 min-h-2" />
      </h3>
      <ul>
        {review.viewings.map((viewing) => (
          <ViewingHistoryListItem key={viewing.sequence} viewing={viewing} />
        ))}
      </ul>
    </div>
  );
}
