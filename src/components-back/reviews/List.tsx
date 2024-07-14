import { Grade } from "@/components/Grade";
import { ListItem } from "@/components/ListItem";
import { ListItemGenres } from "@/components/ListItemGenres.tsx";
import { ListItemPoster } from "@/components/ListItemPoster.tsx";
import { ListItemTitle } from "@/components/ListItemTitle.tsx";
import { GroupedList } from "@/components/list-with-filters/GroupedList";
import { ActionType } from "./Reviews.reducer";
import type { Review } from "@/api/reviews";
import type { Action } from "./Reviews.reducer";
import type { ImageData } from "@/api/posters";

export type ReviewedTitle = Pick<
  Review,
  | "imdbId"
  | "date"
  | "releaseSequence"
  | "title"
  | "year"
  | "sortTitle"
  | "slug"
  | "grade"
  | "gradeValue"
  | "genres"
>;

export function List({
  groupedItems,
  totalCount,
  visibleCount,
  imageDataCache,
  dispatch,
}: {
  groupedItems: Map<string, ReviewedTitle[]>;
  totalCount: number;
  visibleCount: number;
  imageDataCache: Record<string, ImageData>;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <GroupedList
      data-testid="poster-list"
      groupedItems={groupedItems}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: ActionType.SHOW_MORE })}
    >
      {(review: ReviewedTitle) => {
        return (
          <ReviewListItem
            review={review}
            imageData={imageDataCache[review.slug]!}
            key={review.imdbId}
          />
        );
      }}
    </GroupedList>
  );
}

function ReviewListItem({
  review,
  imageData,
}: {
  review: ReviewedTitle;
  imageData: ImageData;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster
        slug={review.slug}
        title={review.title}
        year={review.year}
        imageData={imageData}
      />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle
            title={review.title}
            year={review.year}
            slug={review.slug}
          />
          <div className="spacer-y-1" />
          <div className="py-px">
            <Grade grade={review.grade} height={18} />
          </div>
          <div className="spacer-y-2" />
          <ListItemGenres genres={review.genres} />
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}
