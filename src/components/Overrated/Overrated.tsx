"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Overrated.reducer";
import type { ListItemOverratedData } from "./List";
import type { PosterImageData } from "src/api/posters";
import type { Sort } from "./Overrated.reducer";

export interface OverratedProps {
  movies: readonly ListItemOverratedData[];
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  initialSort: Sort;
  posters: Record<string, PosterImageData>;
}

export function Overrated({
  movies,
  distinctGenres,
  distinctReleaseYears,
  initialSort,
  posters,
}: OverratedProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...movies],
      sort: initialSort,
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
          groupedItems={state.groupedItems}
          visibleCount={state.showCount}
          totalCount={state.filteredItems.length}
        />
      }
    />
  );
}
