import { Grade } from "@/components/Grade";
import { ListItem } from "@/components/ListItem";
import { ListItemGenres } from "@/components/ListItemGenres";
import { ListItemPoster } from "@/components/ListItemPoster";
import { ListItemTitle } from "@/components/ListItemTitle";
import { GroupedList } from "@/components/ListWithFiltersLayout";
import { Action, ActionType } from "./Overrated.reducer";
import type { OverratedTitle } from "./Overrated";

export function List({
  groupedItems,
  totalCount,
  visibleCount,
  dispatch,
}: {
  groupedItems: Map<string, OverratedTitle[]>;
  totalCount: number;
  visibleCount: number;
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
      {(item) => <UnderseenGemsListItem item={item} key={item.imdbId} />}
    </GroupedList>
  );
}

function UnderseenGemsListItem({
  item,
}: {
  item: OverratedTitle;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster slug={item.slug} title={item.title} year={item.year} />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle title={item.title} year={item.year} slug={item.slug} />
          <div className="spacer-y-1" />
          <div className="py-px">
            <Grade grade={item.grade} height={18} />
          </div>
          <div className="spacer-y-2" />
          <ListItemGenres genres={item.genres} />
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}
