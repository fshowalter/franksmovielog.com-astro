import { toSentence } from "@/utils";
import { Grade } from "@/components/Grade";
import { RenderedMarkdown } from "@/components/RenderedMarkdown";
import { Still } from "@/components/Still";
import type { Review } from "@/api/reviews";
import type { StillImageData } from "@/api/stills";

export const StillImageConfig = {
  width: 512,
  height: 288,
  sizes: "(min-width: 512px) 512px, 100vw",
  quality: 80,
};

function formatDate(reviewDate: Date) {
  return reviewDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export interface HomeListItemReviewData
  extends Pick<
    Review,
    | "imdbId"
    | "sequence"
    | "title"
    | "year"
    | "date"
    | "slug"
    | "grade"
    | "principalCastNames"
    | "directorNames"
    | "excerpt"
  > {}

export function HomeListItem({
  review,
  eagerLoadImage,
  stillImageData,
}: {
  review: HomeListItemReviewData;
  eagerLoadImage: boolean;
  stillImageData: StillImageData | undefined;
}) {
  return (
    <li className="flex even:bg-subtle">
      <article className="mx-auto flex flex-col items-center px-pageMargin py-10 desktop:grid desktop:w-full desktop:grid-cols-8">
        <div className="col-span-2 mb-6 text-center text-sm font-light uppercase leading-4 tracking-0.75px text-subtle desktop:mb-0 desktop:pb-6 desktop:text-left desktop:leading-8 max:col-span-1 max:self-start">
          {formatDate(review.date)}
        </div>
        <a
          rel="canonical"
          href={`/reviews/${review.slug}/`}
          className="still-border block max-w-prose desktop:col-start-4 desktop:col-end-9 desktop:row-span-2 desktop:row-start-1 desktop:mt-10 desktop:self-start desktop:justify-self-end max:row-start-1 max:mt-0"
        >
          {stillImageData && (
            <Still
              title={review.title}
              year={review.year}
              width={StillImageConfig.width}
              height={StillImageConfig.height}
              sizes={StillImageConfig.sizes}
              imageData={stillImageData}
              loading={eagerLoadImage ? "eager" : "lazy"}
              className="h-auto rounded-xl"
              decoding={eagerLoadImage ? "sync" : "async"}
            />
          )}
        </a>
        <div className="flex max-w-lg flex-col items-center pt-4 desktop:col-span-5 desktop:col-start-1 desktop:row-start-2 desktop:items-start desktop:place-self-start desktop:pt-0 max:col-start-2 max:row-start-1">
          <h2 className="text-2.5xl font-bold leading-8">
            <a
              href={`/reviews/${review.slug}/`}
              rel="canonical"
              className="inline-block text-default"
            >
              {review.title}{" "}
              <span className="inline-block text-base font-light leading-none text-subtle">
                {review.year}
              </span>
            </a>
          </h2>
          <div className="spacer-y-4" />
          <Grade grade={review.grade} height={32} />
          <div className="spacer-y-6" />
          <p className="text-base font-normal leading-normal tracking-0.25px text-subtle">
            Directed by {toSentence(review.directorNames)}. Starring{" "}
            {toSentence(review.principalCastNames)}.
          </p>
          <div className="spacer-y-6" />
          <RenderedMarkdown
            text={review.excerpt}
            className="self-start text-lg leading-normal tracking-0.3px text-muted"
          />
        </div>
      </article>
    </li>
  );
}
