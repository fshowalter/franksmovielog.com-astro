"use client";

import { useReducer } from "react";

import { ListWithFiltersLayout } from "@/components/ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Viewings.reducer";
import type { ListItemData } from "./List";
import type { Sort } from "./Viewings.reducer";

export interface ViewingsProps {
  data: readonly ListItemData[];
  distinctGenres: readonly string[];
  distinctMedia: readonly string[];
  distinctVenues: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctViewingYears: readonly string[];
  initialSort: Sort;
}

export function Viewings({
  data,
  distinctGenres,
  distinctMedia,
  distinctVenues,
  distinctReleaseYears,
  distinctViewingYears,
  initialSort,
}: ViewingsProps): JSX.Element {
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
      header={<Header viewingCount={data.length} />}
      filters={
        <Filters
          dispatch={dispatch}
          distinctGenres={distinctGenres}
          distinctMedia={distinctMedia}
          distinctVenues={distinctVenues}
          distinctReleaseYears={distinctReleaseYears}
          distinctViewingYears={distinctViewingYears}
          sortValue={state.sortValue}
        />
      }
      list={
        <List
          dispatch={dispatch}
          groupedItems={state.groupedItems}
          totalCount={state.filteredItems.length}
          visibleCount={state.showCount}
        />
      }
    />
  );
}
