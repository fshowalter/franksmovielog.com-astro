"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";
import { initState, reducer } from "./Collections.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List, type ListItemValue } from "./List";
import type { Sort } from "./Collections.reducer";
import type { AvatarImageData } from "src/api/avatars";

export interface CollectionsProps {
  values: readonly ListItemValue[];
  initialSort: Sort;
  avatars: Record<string, AvatarImageData>;
}

export function Collections({
  values,
  initialSort,
  avatars,
}: CollectionsProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      values,
      initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header />}
      filters={<Filters dispatch={dispatch} sortValue={state.sortValue} />}
      list={
        <List
          values={state.filteredValues}
          totalCount={state.filteredValues.length}
          visibleCount={state.filteredValues.length}
          avatars={avatars}
        />
      }
    />
  );
}
