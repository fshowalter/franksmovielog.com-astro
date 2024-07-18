import type { PosterImageData } from "src/api/posters";
import type { WatchlistTitle } from "src/api/watchlistTitles";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemPoster } from "src/components/ListItemPoster";
import { ListItemTitle } from "src/components/ListItemTitle";
import SvgIcon from "src/components/SvgIcon";
import { WatchlistTitleSlug } from "src/components/WatchlistTitleSlug";

import { Actions, type ActionType } from "./Watchlist.reducer";

export interface ListItemValue
  extends Pick<
    WatchlistTitle,
    | "imdbId"
    | "title"
    | "year"
    | "releaseSequence"
    | "sortTitle"
    | "directorNames"
    | "performerNames"
    | "writerNames"
    | "collectionNames"
    | "viewed"
  > {}

export function List({
  groupedValues,
  dispatch,
  totalCount,
  visibleCount,
  defaultPosterImageData,
}: {
  groupedValues: Map<string, ListItemValue[]>;
  dispatch: React.Dispatch<ActionType>;
  totalCount: number;
  visibleCount: number;
  defaultPosterImageData: PosterImageData;
}) {
  return (
    <GroupedList
      groupedValues={groupedValues}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: Actions.SHOW_MORE })}
      data-testid="list"
    >
      {(value) => {
        return (
          <WatchlistTitle
            value={value}
            key={value.imdbId}
            defaultPosterImageData={defaultPosterImageData}
          />
        );
      }}
    </GroupedList>
  );
}

function WatchlistTitle({
  value,
  defaultPosterImageData,
}: {
  value: ListItemValue;
  defaultPosterImageData: PosterImageData;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster
        title={value.title}
        year={value.year}
        imageData={defaultPosterImageData}
      />
      <div className="flex-1 pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle title={value.title} year={value.year} />
          <div className="spacer-y-3" />
          <WatchlistTitleSlug
            directorNames={value.directorNames}
            performerNames={value.performerNames}
            writerNames={value.writerNames}
            collectionNames={value.collectionNames}
          />
          <div className="spacer-y-2" />
        </div>
      </div>
      <div className="pr-gutter desktop:pr-4">
        {value.viewed && (
          <SvgIcon className="block h-6 min-w-6 text-subtle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </SvgIcon>
        )}
      </div>
    </ListItem>
  );
}
