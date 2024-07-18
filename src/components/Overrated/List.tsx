import type { OverratedDisappointment } from "src/api/overratedDisappointments";
import type { PosterImageData } from "src/api/posters";
import { Grade } from "src/components/Grade";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemGenres } from "src/components/ListItemGenres";
import { ListItemPoster } from "src/components/ListItemPoster";
import { ListItemTitle } from "src/components/ListItemTitle";

import { Actions, type ActionType } from "./Overrated.reducer";

export interface ListItemValue
  extends Pick<
    OverratedDisappointment,
    | "releaseSequence"
    | "title"
    | "year"
    | "sortTitle"
    | "slug"
    | "genres"
    | "grade"
    | "gradeValue"
    | "imdbId"
  > {}

export function List({
  groupedValues,
  totalCount,
  visibleCount,
  posters,
  dispatch,
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
        <UnderseenGemsListItem
          value={value}
          key={value.imdbId}
          imageData={posters[value.slug]}
        />
      )}
    </GroupedList>
  );
}

function UnderseenGemsListItem({
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
