import { useReducer } from "react";
import { ListWithFiltersLayout } from "../list-with-filters/ListWithFiltersLayout.tsx";
import { Filters } from "./Filters.tsx";
import { Header } from "./Header.tsx";
import { List } from "./List.tsx";
import { initState, reducer } from "./Reviews.reducer";
import type { ReviewedTitle } from "./List";
import type { Sort } from "./Reviews.reducer";
import type { ImageData } from "@/api/posters.ts";

export interface ReviewsProps {
  reviews: ReviewedTitle[];
  initialSort: Sort;
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctReviewYears: readonly string[];
  posterImageDataCache: Record<string, ImageData>;
}

export function Reviews({
  reviews,
  initialSort,
  distinctGenres,
  distinctReleaseYears,
  distinctReviewYears,
  posterImageDataCache,
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
          imageDataCache={posterImageDataCache}
        />
      }
    />
  );
}
