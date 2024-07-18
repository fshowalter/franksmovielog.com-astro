import type { Review } from "src/api/reviews";

import { ViewingHistoryListItem } from "./ViewingHistoryListItem";

interface Props extends Pick<Review, "viewings"> {
  className?: string;
}

export function ViewingHistory({ viewings, className }: Props) {
  return (
    <div className={className}>
      <h3 className="border-bottom px-gutter text-md font-normal text-subtle">
        Viewing History
        <div className="h-2 min-h-2" />
      </h3>
      <ul>
        {viewings.map((viewing) => (
          <ViewingHistoryListItem key={viewing.sequence} value={viewing} />
        ))}
      </ul>
    </div>
  );
}
