import { useReducer } from "react";
import type { PosterImageData } from "src/api/posters";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import { Filters } from "./Filters";
import { Header } from "./Header";
import type { ListItemValue } from "./List";
import { List } from "./List";
import type { Sort } from "./Reviews.reducer";
import { initState, reducer } from "./Reviews.reducer";

export interface Props {
  values: ListItemValue[];
  initialSort: Sort;
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctReviewYears: readonly string[];
  posters: Record<string, PosterImageData>;
}

export function Reviews({
  values,
  initialSort,
  distinctGenres,
  distinctReleaseYears,
  distinctReviewYears,
  posters,
}: Props): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      values,
      initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header reviewCount={values.length} />}
      filters={
        <Filters
          dispatch={dispatch}
          sortValue={state.sortValue}
          distinctGenres={distinctGenres}
          distinctReleaseYears={distinctReleaseYears}
          distinctReviewYears={distinctReviewYears}
        />
      }
      list={
        <List
          dispatch={dispatch}
          groupedValues={state.groupedValues}
          visibleCount={state.showCount}
          totalCount={state.filteredValues.length}
          posters={posters}
        />
      }
    />
  );
}
