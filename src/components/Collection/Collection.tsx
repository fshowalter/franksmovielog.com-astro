import { useReducer } from "react";
import type { AvatarImageData } from "src/api/avatars";
import type { Collection } from "src/api/collections";
import type { PosterImageData } from "src/api/posters";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import { initState, reducer, type Sort } from "./Collection.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";

export interface Props {
  value: Pick<
    Collection,
    "description" | "reviewCount" | "titleCount" | "slug" | "titles" | "name"
  >;
  distinctReleaseYears: readonly string[];
  initialSort: Sort;
  avatarImageData: AvatarImageData;
  posters: Record<string, PosterImageData>;
}

export function Collection({
  value,
  distinctReleaseYears,
  initialSort,
  avatarImageData,
  posters,
}: Props): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      values: [...value.titles],
      initialSort,
    },
    initState,
  );
  return (
    <ListWithFiltersLayout
      header={
        <Header
          name={value.name}
          reviewCount={value.reviewCount}
          titleCount={value.titleCount}
          avatarImageData={avatarImageData}
          description={value.description}
        />
      }
      filters={
        <Filters
          dispatch={dispatch}
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          distinctReleaseYears={distinctReleaseYears}
          showHideReviewed={value.reviewCount != value.titles.length}
        />
      }
      list={
        <List
          posters={posters}
          dispatch={dispatch}
          totalCount={state.filteredValues.length}
          visibleCount={state.showCount}
          groupedValues={state.groupedValues}
        />
      }
    />
  );
}
