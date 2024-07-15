import { ListItem } from "src/components/ListItem";
import { ListItemMediumAndVenue } from "src/components/ListItemMediumAndVenue";
import { ListItemPoster } from "src/components/ListItemPoster";
import { ListItemTitle } from "src/components/ListItemTitle";
import { GroupedList } from "src/components/GroupedList";
import { ActionType } from "./Viewings.reducer";
import type { Viewing } from "src/api/viewings";
import type { Action } from "./Viewings.reducer";
import type { PosterImageData } from "src/api/posters";

export interface ListItemViewingData
  extends Pick<
    Viewing,
    | "sequence"
    | "viewingYear"
    | "viewingDate"
    | "releaseSequence"
    | "title"
    | "medium"
    | "venue"
    | "year"
    | "sortTitle"
    | "slug"
    | "genres"
  > {
  viewingMonth: string;
  viewingDay: string;
}

export function List({
  groupedItems,
  visibleCount,
  totalCount,
  dispatch,
  posters,
}: {
  groupedItems: Map<string, Map<string, ListItemViewingData[]>>;
  visibleCount: number;
  totalCount: number;
  posters: Record<string, PosterImageData>;
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
      {(dateGroup) => {
        const [dayAndDate, viewings] = dateGroup;
        return (
          <DateListItem
            viewings={viewings}
            key={dayAndDate}
            posters={posters}
            dayAndDate={dayAndDate}
          />
        );
      }}
    </GroupedList>
  );
}

function DateListItem({
  dayAndDate,
  viewings,
  posters,
}: {
  dayAndDate: string;
  viewings: ListItemViewingData[];
  posters: Record<string, PosterImageData>;
}): JSX.Element {
  const [day, date] = dayAndDate.split("-");

  return (
    <ListItem className="items-center pb-0">
      <div>
        <div className="rounded-md shadow-all">
          <div className="w-12 bg-canvas py-2 text-center text-sm/none uppercase">
            {day}
          </div>
          <div className="text-center text-2.5xl/8">{date}</div>
        </div>
        <div className="h-4 min-h-4" />
      </div>
      <ul className="flex grow flex-col gap-y-4">
        {viewings.map((viewing) => {
          return (
            <SubListItem
              viewing={viewing}
              key={viewing.sequence}
              imageData={posters[viewing.slug || "default"]!}
            />
          );
        })}
      </ul>
    </ListItem>
  );
}

function SubListItem({
  viewing,
  imageData,
}: {
  viewing: ListItemViewingData;
  imageData: PosterImageData;
}): JSX.Element {
  return (
    <ListItem className="items-center pt-0 shadow-bottom even:bg-unset last-of-type:shadow-none">
      <ListItemPoster
        slug={viewing.slug}
        title={viewing.title}
        year={viewing.year}
        imageData={imageData}
      />
      <div className="grow">
        <div>
          <ListItemTitle
            title={viewing.title}
            year={viewing.year}
            slug={viewing.slug}
          />
          <div className="spacer-y-1 tablet:spacer-y-2" />
        </div>
        <div className="flex flex-col text-sm/none font-light tracking-0.5px text-subtle">
          <div className="spacer-y-1 tablet:spacer-y-0" />
          <div>
            <ListItemMediumAndVenue
              medium={viewing.medium}
              venue={viewing.venue}
            />
          </div>
        </div>
        <div className="spacer-y-2" />
      </div>
    </ListItem>
  );
}
