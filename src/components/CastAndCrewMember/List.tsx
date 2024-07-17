import { CreditedAs } from "src/components/CreditedAs";
import { Grade } from "src/components/Grade";
import { ListItem } from "src/components/ListItem";
import { ListItemPoster } from "src/components/ListItemPoster";
import { ListItemTitle } from "src/components/ListItemTitle";
import { GroupedList } from "src/components/GroupedList";
import { WatchlistTitleSlug } from "src/components/WatchlistTitleSlug";
import { Actions, type ActionType } from "./CastAndCrewMember.reducer";
import type { CastAndCrewMember } from "src/api/castAndCrew";
import type { PosterImageData } from "src/api/posters";

export interface ListItemValue
  extends Pick<
    CastAndCrewMember["titles"][0],
    | "imdbId"
    | "title"
    | "year"
    | "grade"
    | "gradeValue"
    | "slug"
    | "sortTitle"
    | "releaseSequence"
    | "creditedAs"
    | "watchlistDirectorNames"
    | "watchlistPerformerNames"
    | "watchlistWriterNames"
    | "collectionNames"
  > {}

export function List({
  groupedValues,
  dispatch,
  totalCount,
  visibleCount,
  posters,
}: {
  groupedValues: Map<string, ListItemValue[]>;
  dispatch: React.Dispatch<ActionType>;
  totalCount: number;
  visibleCount: number;
  posters: Record<string, PosterImageData>;
}) {
  return (
    <GroupedList
      data-testid="list"
      groupedValues={groupedValues}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: Actions.SHOW_MORE })}
    >
      {(value) => {
        return (
          <TitleListItem
            value={value}
            key={value.imdbId}
            imageData={posters[value.slug || "default"]}
          />
        );
      }}
    </GroupedList>
  );
}

function TitleListItem({
  value,
  imageData,
}: {
  value: ListItemValue;
  imageData: PosterImageData;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemPoster
        slug={value.slug}
        title={value.title}
        year={value.year}
        imageData={imageData}
      />
      <div className="grow pr-gutter tablet:w-full desktop:pr-4">
        <div>
          <CreditedAs creditedAs={value.creditedAs} />
          <div className="spacer-y-2" />
          <ListItemTitle
            title={value.title}
            year={value.year}
            slug={value.slug}
          />
          <div className="spacer-y-2" />
          {value.grade && (
            <div className="py-px">
              <Grade grade={value.grade} height={18} />
            </div>
          )}
          {!value.grade && (
            <>
              <WatchlistTitleSlug
                directorNames={value.watchlistDirectorNames}
                performerNames={value.watchlistPerformerNames}
                writerNames={value.watchlistWriterNames}
                collectionNames={value.collectionNames}
              />
            </>
          )}
          <div className="spacer-y-2" />
        </div>
      </div>
    </ListItem>
  );
}
