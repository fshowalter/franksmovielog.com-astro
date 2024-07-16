"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Underseen.reducer";
import type { Sort } from "./Underseen.reducer";
import type { ListItemUnderseenGemData } from "./List";
import type { PosterImageData } from "src/api/posters";

export interface UnderseenProps {
  underseenGems: readonly ListItemUnderseenGemData[];
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  initialSort: Sort;
  posters: Record<string, PosterImageData>;
}

export function Underseen({
  underseenGems,
  distinctGenres,
  distinctReleaseYears,
  initialSort,
  posters,
}: UnderseenProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...underseenGems],
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
          dispatch={dispatch}
          posters={posters}
          groupedItems={state.groupedItems}
          visibleCount={state.showCount}
          totalCount={state.filteredItems.length}
        />
      }
    />
  );
}
