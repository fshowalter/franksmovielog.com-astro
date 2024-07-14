import { CreditedAs } from "@/components/CreditedAs";
import { Grade } from "@/components/Grade";
import { ListItem } from "@/components/ListItem";
import { ListItemPoster } from "@/components/ListItemPoster";
import { ListItemTitle } from "@/components/ListItemTitle";
import { GroupedList } from "@/components/ListWithFiltersLayout";
import { WatchlistTitleSlug } from "@/components/WatchlistTitleSlug";
import { Action, ActionType } from "./CastAndCrewMember.reducer";
import type { CastAndCrewMemberTitle } from "./CastAndCrewMember";

export function List({
  groupedItems,
  dispatch,
  totalCount,
  visibleCount,
}: {
  groupedItems: Map<string, CastAndCrewMemberTitle[]>;
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
        return <CastAndCrewMemberTitleItem item={item} key={item.imdbId} />;
      }}
    </GroupedList>
  );
}

function CastAndCrewMemberTitleItem({
  item,
}: {
  item: CastAndCrewMemberTitle;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster slug={item.slug} title={item.title} year={item.year} />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <CreditedAs creditedAs={item.creditedAs} />
          <div className="spacer-y-2" />
          <ListItemTitle title={item.title} year={item.year} slug={item.slug} />
          <div className="spacer-y-2" />
          {item.grade && (
            <div className="py-px">
              <Grade grade={item.grade} height={18} />
            </div>
          )}
          {!item.grade && (
            <>
              <WatchlistTitleSlug
                directorNames={item.watchlistDirectorNames}
                performerNames={item.watchlistPerformerNames}
                writerNames={item.watchlistWriterNames}
                collectionNames={item.collectionNames}
              />
            </>
          )}
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}
