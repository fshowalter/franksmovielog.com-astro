import { Grade } from "src/components/Grade";
import { ListItem } from "src/components/ListItem";
import { ListItemGenres } from "src/components/ListItemGenres";
import { ListItemPoster } from "src/components/ListItemPoster";
import { ListItemTitle } from "src/components/ListItemTitle";
import { GroupedList } from "src/components/GroupedList";
import { ActionType } from "./Overrated.reducer";
import type { Action } from "./Overrated.reducer";
import type { PosterImageData } from "src/api/posters";
import type { OverratedDisappointment } from "src/api/overratedDisappointments";

export interface ListItemOverratedData
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
  groupedItems,
  totalCount,
  visibleCount,
  posters,
  dispatch,
}: {
  groupedItems: Map<string, ListItemOverratedData[]>;
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
      {(movie) => (
        <UnderseenGemsListItem
          movie={movie}
          key={movie.imdbId}
          imageData={posters[movie.slug]!}
        />
      )}
    </GroupedList>
  );
}

function UnderseenGemsListItem({
  movie,
  imageData,
}: {
  movie: ListItemOverratedData;
  imageData: PosterImageData;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster
        slug={movie.slug}
        title={movie.title}
        year={movie.year}
        imageData={imageData}
      />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle
            title={movie.title}
            year={movie.year}
            slug={movie.slug}
          />
          <div className="spacer-y-1" />
          <div className="py-px">
            <Grade grade={movie.grade} height={18} />
          </div>
          <div className="spacer-y-2" />
          <ListItemGenres genres={movie.genres} />
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}
