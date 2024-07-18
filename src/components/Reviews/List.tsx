import type { PosterImageData } from "src/api/posters";
import type { Review } from "src/api/reviews";
import { Grade } from "src/components/Grade";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemGenres } from "src/components/ListItemGenres";
import { ListItemPoster } from "src/components/ListItemPoster";
import { ListItemTitle } from "src/components/ListItemTitle";

import type { ActionType } from "./Reviews.reducer";
import { Actions } from "./Reviews.reducer";

export interface ListItemValue
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
  groupedValues,
  totalCount,
  visibleCount,
  dispatch,
  posters,
}: {
  groupedValues: Map<string, ListItemValue[]>;
  totalCount: number;
  visibleCount: number;
  dispatch: React.Dispatch<ActionType>;
  posters: Record<string, PosterImageData>;
}) {
  return (
    <GroupedList
      data-testid="list"
      groupedValues={groupedValues}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: Actions.SHOW_MORE })}
    >
      {(value) => (
        <ReviewsListItem
          value={value}
          key={value.imdbId}
          imageData={posters[value.slug]}
        />
      )}
    </GroupedList>
  );
}

function ReviewsListItem({
  value,
  imageData,
}: {
  value: ListItemValue;
  imageData: PosterImageData;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster
        slug={value.slug}
        title={value.title}
        year={value.year}
        imageData={imageData}
      />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle
            title={value.title}
            year={value.year}
            slug={value.slug}
          />
          <div className="spacer-y-1" />
          <div className="py-px">
            <Grade value={value.grade} height={18} />
          </div>
          <div className="spacer-y-2" />
          <ListItemGenres values={value.genres} />
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}
