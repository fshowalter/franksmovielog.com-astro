import type { PosterImageData } from "src/api/posters";
import type { UnderseenGem } from "src/api/underseenGems";
import { Grade } from "src/components/Grade";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemGenres } from "src/components/ListItemGenres";
import { ListItemPoster } from "src/components/ListItemPoster";
import { ListItemTitle } from "src/components/ListItemTitle";

import type { Action } from "./Underseen.reducer";
import { ActionType } from "./Underseen.reducer";

export interface ListItemUnderseenGemData
  extends Pick<
    UnderseenGem,
    | "releaseSequence"
    | "title"
    | "year"
    | "sortTitle"
    | "slug"
    | "grade"
    | "gradeValue"
    | "imdbId"
    | "genres"
  > {}

export function List({
  groupedItems,
  totalCount,
  visibleCount,
  dispatch,
  posters,
}: {
  groupedItems: Map<string, ListItemUnderseenGemData[]>;
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
  movie: ListItemUnderseenGemData;
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
