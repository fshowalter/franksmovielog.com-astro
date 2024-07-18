import { useReducer } from "react";
import type { AvatarImageData } from "src/api/avatars";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import type { Sort } from "./CastAndCrew.reducer";
import { initState, reducer } from "./CastAndCrew.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List, type ListItemValue } from "./List";

export interface Props {
  values: ListItemValue[];
  initialSort: Sort;
  avatars: Record<string, AvatarImageData>;
}

export function CastAndCrew({
  values,
  initialSort,
  avatars,
}: Props): JSX.Element {
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
          avatars={avatars}
          values={state.filteredValues}
          totalCount={state.filteredValues.length}
          visibleCount={state.filteredValues.length}
        />
      }
    />
  );
}
