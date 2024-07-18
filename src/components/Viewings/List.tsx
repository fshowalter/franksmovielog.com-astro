import type { PosterImageData } from "src/api/posters";
import type { Viewing } from "src/api/viewings";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemMediumAndVenue } from "src/components/ListItemMediumAndVenue";
import { ListItemPoster } from "src/components/ListItemPoster";
import { ListItemTitle } from "src/components/ListItemTitle";

import type { ActionType } from "./Viewings.reducer";
import { Actions } from "./Viewings.reducer";

export interface ListItemValue
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
  groupedValues,
  visibleCount,
  totalCount,
  dispatch,
  posters,
}: {
  groupedValues: Map<string, Map<string, ListItemValue[]>>;
  visibleCount: number;
  totalCount: number;
  posters: Record<string, PosterImageData>;
  dispatch: React.Dispatch<ActionType>;
}) {
  return (
    <GroupedList
      data-testid="list"
      groupedValues={groupedValues}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: Actions.SHOW_MORE })}
    >
      {(dateGroup) => {
        const [dayAndDate, values] = dateGroup;
        return (
          <DateListItem
            values={values}
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
  values,
  posters,
}: {
  dayAndDate: string;
  values: ListItemValue[];
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
        {values.map((value) => {
          return (
            <SubListItem
              value={value}
              key={value.sequence}
              imageData={posters[value.slug || "default"]}
            />
          );
        })}
      </ul>
    </ListItem>
  );
}

function SubListItem({
  value,
  imageData,
}: {
  value: ListItemValue;
  imageData: PosterImageData;
}): JSX.Element {
  return (
    <ListItem className="items-center pt-0 shadow-bottom even:bg-unset last-of-type:shadow-none">
      <ListItemPoster
        slug={value.slug}
        title={value.title}
        year={value.year}
        imageData={imageData}
      />
      <div className="grow">
        <div>
          <ListItemTitle
            title={value.title}
            year={value.year}
            slug={value.slug}
          />
          <div className="spacer-y-1 tablet:spacer-y-2" />
        </div>
        <div className="flex flex-col text-sm/none font-light tracking-0.5px text-subtle">
          <div className="spacer-y-1 tablet:spacer-y-0" />
          <div>
            <ListItemMediumAndVenue medium={value.medium} venue={value.venue} />
          </div>
        </div>
        <div className="spacer-y-2" />
      </div>
    </ListItem>
  );
}
