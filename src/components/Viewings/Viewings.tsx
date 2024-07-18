import { useReducer } from "react";
import type { PosterImageData } from "src/api/posters";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import { Filters } from "./Filters";
import { Header } from "./Header";
import type { ListItemValue } from "./List";
import { List } from "./List";
import type { Sort } from "./Viewings.reducer";
import { initState, reducer } from "./Viewings.reducer";

export interface Props {
  values: ListItemValue[];
  distinctGenres: readonly string[];
  distinctMedia: readonly string[];
  distinctVenues: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctViewingYears: readonly string[];
  initialSort: Sort;
  posters: Record<string, PosterImageData>;
}

export function Viewings({
  values,
  distinctGenres,
  distinctMedia,
  distinctVenues,
  distinctReleaseYears,
  distinctViewingYears,
  initialSort,
  posters,
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
      header={<Header viewingCount={values.length} />}
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
          groupedValues={state.groupedValues}
          totalCount={state.filteredValues.length}
          visibleCount={state.showCount}
          posters={posters}
        />
      }
    />
  );
}
