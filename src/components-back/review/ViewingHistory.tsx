import { ViewingHistoryListItem } from "./ViewingHistoryListItem.tsx";
import type { Review } from "@/api/reviews.ts";

export function ViewingHistory({
  review,
  className,
}: {
  review: Pick<Review, "viewings">;
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
