"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Reviews.reducer";
import type { ListItemReviewData } from "./List";
import type { Sort } from "./Reviews.reducer";
import type { PosterImageData } from "src/api/posters";

export interface ReviewsProps {
  reviews: ListItemReviewData[];
  initialSort: Sort;
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctReviewYears: readonly string[];
  posters: Record<string, PosterImageData>;
}

export function Reviews({
  reviews,
  initialSort,
  distinctGenres,
  distinctReleaseYears,
  distinctReviewYears,
  posters,
}: ReviewsProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...reviews],
      sort: initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header reviewCount={reviews.length} />}
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
          posters={posters}
        />
      }
    />
  );
}
