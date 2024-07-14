import { Grade } from "@/components/Grade";
import { ListItem } from "@/components/ListItem";
import { ListItemGenres } from "@/components/ListItemGenres";
import { ListItemPoster } from "@/components/ListItemPoster";
import { ListItemTitle } from "@/components/ListItemTitle";
import { GroupedList } from "@/components/ListWithFiltersLayout";
import { Action, ActionType } from "./Reviews.reducer";

export interface ListItemData {
  imdbId: string;
  reviewDate: string;
  releaseSequence: string;
  reviewYear: string;
  reviewMonth: string;
  title: string;
  year: string;
  sortTitle: string;
  slug: string;
  grade: string;
  gradeValue: number;
  genres: string[];
}

export function List({
  groupedItems,
  totalCount,
  visibleCount,
  dispatch,
}: {
  groupedItems: Map<string, ListItemData[]>;
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
      {(item) => <ReviewListItem data={item} key={item.imdbId} />}
    </GroupedList>
  );
}

function ReviewListItem({ data }: { data: ListItemData }): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster slug={data.slug} title={data.title} year={data.year} />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <ListItemTitle title={data.title} year={data.year} slug={data.slug} />
          <div className="spacer-y-1" />
          <div className="py-px">
            <Grade grade={data.grade} height={18} />
          </div>
          <div className="spacer-y-2" />
          <ListItemGenres genres={data.genres} />
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}
