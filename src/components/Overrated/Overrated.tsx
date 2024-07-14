"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "@/components/ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { Sort, initState, reducer } from "./Overrated.reducer";

export interface OverratedTitle {
  releaseSequence: string;
  title: string;
  year: string;
  sortTitle: string;
  slug: string;
  grade: string;
  gradeValue: number;
  imdbId: string;
  genres: string[];
}

export interface OverratedProps {
  titles: readonly OverratedTitle[];
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  initialSort: Sort;
}

export function Overrated({
  titles,
  distinctGenres,
  distinctReleaseYears,
  initialSort,
}: OverratedProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...titles],
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
          groupedItems={state.groupedItems}
          visibleCount={state.showCount}
          totalCount={state.filteredItems.length}
        />
      }
    />
  );
}
