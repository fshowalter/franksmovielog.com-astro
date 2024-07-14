import { Grade } from "@/components/Grade.tsx";
import { LongFormText } from "@/components/LongFormText.tsx";
import { twMerge } from "tailwind-merge";
import type { Review } from "@/api/reviews";

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

export function Content({
  review,
  className,
}: {
  review: Pick<Review, "grade" | "date" | "content">;
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
