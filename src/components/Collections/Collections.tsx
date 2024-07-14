"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "@/components/ListWithFiltersLayout";
import { initState, reducer } from "./Collections.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import type { Sort } from "./Collections.reducer";

export interface Collection {
  name: string;
  slug: string;
  titleCount: number;
  reviewCount: number;
  avatar: string | null;
}

export interface CollectionsProps {
  collections: readonly Collection[];
  initialSort: Sort;
}

export function Collections({
  collections,
  initialSort,
}: CollectionsProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      entities: collections,
      sort: initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header />}
      filters={<Filters dispatch={dispatch} sortValue={state.sortValue} />}
      list={
        <List
          entities={state.filteredEntities}
          totalCount={state.filteredEntities.length}
          visibleCount={state.filteredEntities.length}
        />
      }
    />
  );
}
