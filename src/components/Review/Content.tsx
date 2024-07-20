import type { ReviewWithContent } from "src/api/reviews";
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

interface Props extends Pick<ReviewWithContent, "grade" | "date" | "content"> {
  className?: string;
}

export function Content({ grade, date, content, className }: Props) {
  return (
    <div className={twMerge("flex flex-col gap-y-8", className)}>
      <div className="flex flex-col items-center">
        <Grade value={grade} height={32} />
        <div className="flex flex-col items-center tracking-0.5px text-subtle">
          <span>on</span> {formatDate(date)}
        </div>
      </div>
      <LongFormText text={content} className="max-w-prose" />
    </div>
  );
}
