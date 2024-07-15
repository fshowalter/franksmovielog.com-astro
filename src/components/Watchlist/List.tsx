import { ListItem } from "@/components/ListItem";
import { ListItemPoster } from "@/components/ListItemPoster";
import { ListItemTitle } from "@/components/ListItemTitle";
import { GroupedList } from "@/components/GroupedList";
import SvgIcon from "@/components/SvgIcon";
import { WatchlistTitleSlug } from "@/components/WatchlistTitleSlug";
import { ActionType } from "./Watchlist.reducer";
import type { Action } from "./Watchlist.reducer";

export interface ListItemData {
  imdbId: string;
  title: string;
  year: string;
  releaseSequence: string;
  sortTitle: string;
  directorNames: string[];
  performerNames: string[];
  writerNames: string[];
  collectionNames: string[];
  viewed: boolean;
}

export function List({
  groupedItems,
  dispatch,
  totalCount,
  visibleCount,
}: {
  groupedItems: Map<string, ListItemData[]>;
  dispatch: React.Dispatch<Action>;
  totalCount: number;
  visibleCount: number;
}) {
  return (
    <GroupedList
      data-testid="poster-list"
      groupedItems={groupedItems}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: ActionType.SHOW_MORE })}
    >
      {(item) => {
        return <WatchlistTitle data={item} key={item.imdbId} />;
      }}
    </GroupedList>
  );
}

function WatchlistTitle({ data }: { data: ListItemData }): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster title={data.title} year={data.year} />
      <div className="flex-1 pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle title={data.title} year={data.year} />
          <div className="spacer-y-3" />
          <WatchlistTitleSlug
            directorNames={data.directorNames}
            performerNames={data.performerNames}
            writerNames={data.writerNames}
            collectionNames={data.collectionNames}
          />
          <div className="spacer-y-2" />
        </div>
      </div>
      <div className="pr-gutter desktop:pr-4">
        {data.viewed && (
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
