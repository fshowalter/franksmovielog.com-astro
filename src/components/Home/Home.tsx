import { HomeListItem } from "./HomeListItem";
import type { HomeListItemReviewData } from "./HomeListItem";
import type { StillImageData } from "src/api/stills";

export function Home({
  reviews,
  stills,
}: {
  reviews: HomeListItemReviewData[];
  stills: Record<string, StillImageData>;
}): JSX.Element {
  return (
    <main>
      <ol className="flex flex-col">
        {reviews.map((review, index) => {
          return (
            <HomeListItem
              key={review.sequence}
              review={review}
              eagerLoadImage={index === 0}
              stillImageData={stills[review.slug]}
            />
          );
        })}
      </ol>
      <a
        href="/reviews/"
        className="flex justify-end px-pageMargin py-10 text-lg text-accent"
      >
        All Reviews →
      </a>
    </main>
  );
}
