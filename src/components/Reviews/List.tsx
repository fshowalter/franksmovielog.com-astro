import type { PosterImageData } from "src/api/posters";
import type { Review } from "src/api/reviews";
import { Grade } from "src/components/Grade";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemGenres } from "src/components/ListItemGenres";
import { ListItemPoster } from "src/components/ListItemPoster";
import { ListItemTitle } from "src/components/ListItemTitle";

import type { Action } from "./Reviews.reducer";
import { ActionType } from "./Reviews.reducer";

export interface ListItemReviewData
  extends Pick<
    Review,
    | "imdbId"
    | "releaseSequence"
    | "title"
    | "year"
    | "sortTitle"
    | "slug"
    | "grade"
    | "gradeValue"
    | "genres"
  > {
  reviewDate: string;
  reviewMonth: string;
  reviewYear: string;
}

export function List({
  groupedItems,
  totalCount,
  visibleCount,
  dispatch,
  posters,
}: {
  groupedItems: Map<string, ListItemReviewData[]>;
  totalCount: number;
  visibleCount: number;
  dispatch: React.Dispatch<Action>;
  posters: Record<string, PosterImageData>;
}) {
  return (
    <GroupedList
      data-testid="poster-list"
      groupedItems={groupedItems}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: ActionType.SHOW_MORE })}
    >
      {(review) => (
        <ReviewListItem
          review={review}
          key={review.imdbId}
          imageData={posters[review.slug]!}
        />
      )}
    </GroupedList>
  );
}

function ReviewListItem({
  review,
  imageData,
}: {
  review: ListItemReviewData;
  imageData: PosterImageData;
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
