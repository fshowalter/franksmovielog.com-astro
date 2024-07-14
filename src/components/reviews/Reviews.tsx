"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Reviews.reducer";
import type { ListItemData } from "./List";
import type { Sort } from "./Reviews.reducer";

export interface ReviewsProps {
  data: ListItemData[];
  initialSort: Sort;
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctReviewYears: readonly string[];
}

export function Reviews({
  data,
  initialSort,
  distinctGenres,
  distinctReleaseYears,
  distinctReviewYears,
}: ReviewsProps): JSX.Element {
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
      header={<Header reviewCount={data.length} />}
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
          groupedItems={state.groupedItems}
          visibleCount={state.showCount}
          totalCount={state.filteredItems.length}
        />
      }
    />
  );
}
