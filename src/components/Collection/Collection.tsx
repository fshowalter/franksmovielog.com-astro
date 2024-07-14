"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "@/components/ListWithFiltersLayout";
import { initState, reducer } from "./Collection.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import type { Sort } from "./Collection.reducer";

export interface CollectionTitle {
  imdbId: string;
  title: string;
  year: string;
  grade: string | null;
  gradeValue: number | null;
  slug: string | null;
  sortTitle: string;
  releaseSequence: string;
}

export interface Collection {
  name: string;
  reviewCount: number;
  description: string | null;
  avatar: string | null;
  titles: CollectionTitle[];
}

export interface CollectionProps {
  collection: Collection;
  distinctReleaseYears: readonly string[];
  initialSort: Sort;
}

export function Collection({
  collection,
  distinctReleaseYears,
  initialSort,
}: CollectionProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...collection.titles],
      sort: initialSort,
    },
    initState,
  );
  return (
    <ListWithFiltersLayout
      header={<Header collection={collection} />}
      filters={
        <Filters
          dispatch={dispatch}
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          distinctReleaseYears={distinctReleaseYears}
          showHideReviewd={collection.reviewCount != collection.titles.length}
        />
      }
      list={
        <List
          dispatch={dispatch}
          totalCount={state.filteredItems.length}
          visibleCount={state.showCount}
          groupedItems={state.groupedItems}
        />
      }
    />
  );
}
