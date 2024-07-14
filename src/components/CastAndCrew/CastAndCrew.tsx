"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "@/components/ListWithFiltersLayout";
import { initState, reducer } from "./CastAndCrew.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import type { CastAndCrewListItemData } from "./List";
import type { Sort } from "./CastAndCrew.reducer";

export interface CastAndCrewProps {
  data: CastAndCrewListItemData[];
  initialSort: Sort;
}

export function CastAndCrew({
  data,
  initialSort,
}: CastAndCrewProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      entities: data,
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
          data={state.filteredEntities}
          totalCount={state.filteredEntities.length}
          visibleCount={state.filteredEntities.length}
        />
      }
    />
  );
}
