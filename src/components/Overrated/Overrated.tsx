import { useReducer } from "react";
import type { PosterImageData } from "src/api/posters";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import { Filters } from "./Filters";
import { Header } from "./Header";
import type { ListItemValue } from "./List";
import { List } from "./List";
import type { Sort } from "./Overrated.reducer";
import { initState, reducer } from "./Overrated.reducer";

export interface Props {
  values: ListItemValue[];
  distinctGenres: string[];
  distinctReleaseYears: string[];
  initialSort: Sort;
  posters: Record<string, PosterImageData>;
}

export function Overrated({
  values,
  distinctGenres,
  distinctReleaseYears,
  initialSort,
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
      header={<Header />}
      filters={
        <Filters
          dispatch={dispatch}
          sortValue={state.sortValue}
          distinctGenres={distinctGenres}
          distinctReleaseYears={distinctReleaseYears}
        />
      }
      list={
        <List
          posters={posters}
          dispatch={dispatch}
          groupedValues={state.groupedValues}
          visibleCount={state.showCount}
          totalCount={state.filteredValues.length}
        />
      }
    />
  );
}
