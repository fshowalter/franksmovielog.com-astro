import { useReducer } from "react";
import type { PosterImageData } from "src/api/posters";

import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List, type ListItemValue } from "./List";
import { initState, reducer, type Sort } from "./Watchlist.reducer";

export interface Props {
  values: ListItemValue[];
  initialSort: Sort;
  distinctDirectors: string[];
  distinctPerformers: string[];
  distinctWriters: string[];
  distinctCollections: string[];
  distinctReleaseYears: string[];
  defaultPosterImageData: PosterImageData;
}

export function Watchlist({
  values,
  initialSort,
  distinctDirectors,
  distinctPerformers,
  distinctWriters,
  distinctCollections,
  distinctReleaseYears,
  defaultPosterImageData,
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
      header={<Header titleCount={values.length} />}
      filters={
        <Filters
          sortValue={state.sortValue}
          dispatch={dispatch}
          distinctDirectors={distinctDirectors}
          distinctPerformers={distinctPerformers}
          distinctWriters={distinctWriters}
          distinctCollections={distinctCollections}
          distinctReleaseYears={distinctReleaseYears}
        />
      }
      list={
        <List
          groupedValues={state.groupedValues}
          visibleCount={state.showCount}
          totalCount={state.filteredValues.length}
          dispatch={dispatch}
          defaultPosterImageData={defaultPosterImageData}
        />
      }
    />
  );
}
