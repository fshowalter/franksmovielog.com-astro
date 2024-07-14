"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Watchlist.reducer";
import type { ListItemData } from "./List";
import type { Sort } from "./Watchlist.reducer";

export interface WatchlistProps {
  data: readonly ListItemData[];
  initialSort: Sort;
  distinctDirectors: readonly string[];
  distinctPerformers: readonly string[];
  distinctWriters: readonly string[];
  distinctCollections: readonly string[];
  distinctReleaseYears: readonly string[];
}

export function Watchlist({
  data,
  initialSort,
  distinctDirectors,
  distinctPerformers,
  distinctWriters,
  distinctCollections,
  distinctReleaseYears,
}: WatchlistProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...data],
      sort: initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header titleCount={data.length} />}
      filters={
        <Filters
          sortValue={state.sortValue}
          dispatch={dispatch}
          distinctDirectors={distinctDirectors}
          distinctPerformers={distinctPerformers}
          distinctWriters={distinctWriters}
          distinctCollections={distinctCollections}
          distinctReleaseYears={distinctReleaseYears}
        />
      }
      list={
        <List
          groupedItems={state.groupedItems}
          visibleCount={state.showCount}
          totalCount={state.filteredItems.length}
          dispatch={dispatch}
        />
      }
    />
  );
}
