import { Grade } from "@/components/Grade";
import { ListItem } from "@/components/ListItem";
import { ListItemPoster } from "@/components/ListItemPoster";
import { ListItemTitle } from "@/components/ListItemTitle";
import { GroupedList } from "@/components/ListWithFiltersLayout";
import { Action, ActionType } from "./Collection.reducer";
import type { CollectionTitle } from "./Collection";

export function List({
  groupedItems,
  dispatch,
  totalCount,
  visibleCount,
}: {
  groupedItems: Map<string, CollectionTitle[]>;
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
        return <CollectionTitleItem item={item} key={item.imdbId} />;
      }}
    </GroupedList>
  );
}

function CollectionTitleItem({ item }: { item: CollectionTitle }): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster slug={item.slug} title={item.title} year={item.year} />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle title={item.title} year={item.year} slug={item.slug} />
          <div className="spacer-y-2" />
          {item.grade && (
            <div className="py-px">
              <Grade grade={item.grade} height={18} />
            </div>
          )}
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}
