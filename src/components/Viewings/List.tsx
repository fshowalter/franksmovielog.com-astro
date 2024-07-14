import { ListItem } from "@/components/ListItem";
import { ListItemMediumAndVenue } from "@/components/ListItemMediumAndVenue";
import { ListItemPoster } from "@/components/ListItemPoster";
import { ListItemTitle } from "@/components/ListItemTitle";
import { GroupedList } from "@/components/ListWithFiltersLayout";
import { Action, ActionType } from "./Viewings.reducer";

export interface ListItemData {
  sequence: number;
  viewingYear: string;
  viewingMonth: string;
  viewingDay: string;
  viewingDate: string;
  releaseSequence: string;
  title: string;
  medium: string | null;
  venue: string | null;
  year: string;
  sortTitle: string;
  slug: string | null;
  genres: string[];
}

export function List({
  groupedItems,
  visibleCount,
  totalCount,
  dispatch,
}: {
  groupedItems: Map<string, Map<string, ListItemData[]>>;
  visibleCount: number;
  totalCount: number;
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
        const [dayAndDate, items] = dateGroup;
        return (
          <DateListItem data={items} key={dayAndDate} dayAndDate={dayAndDate} />
        );
      }}
    </GroupedList>
  );
}

function DateListItem({
  dayAndDate,
  data,
}: {
  dayAndDate: string;
  data: ListItemData[];
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
        {data.map((item) => {
          return <SubListItem data={item} key={item.sequence} />;
        })}
      </ul>
    </ListItem>
  );
}

function SubListItem({ data }: { data: ListItemData }): JSX.Element {
  return (
    <ListItem className="items-center pt-0 shadow-bottom even:bg-unset last-of-type:shadow-none">
      <ListItemPoster slug={data.slug} title={data.title} year={data.year} />
      <div className="grow">
        <div>
          <ListItemTitle title={data.title} year={data.year} slug={data.slug} />
          <div className="spacer-y-1 tablet:spacer-y-2" />
        </div>
        <div className="flex flex-col text-sm/none font-light tracking-0.5px text-subtle">
          <div className="spacer-y-1 tablet:spacer-y-0" />
          <div>
            <ListItemMediumAndVenue medium={data.medium} venue={data.venue} />
          </div>
        </div>
        <div className="spacer-y-2" />
      </div>
    </ListItem>
  );
}
