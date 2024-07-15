import { useReducer } from "react";

import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Viewings.reducer";
import type { ListItemViewingData } from "./List";
import type { Sort } from "./Viewings.reducer";
import type { PosterImageData } from "src/api/posters";

export interface ViewingsProps {
  viewings: readonly ListItemViewingData[];
  distinctGenres: readonly string[];
  distinctMedia: readonly string[];
  distinctVenues: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctViewingYears: readonly string[];
  initialSort: Sort;
  posters: Record<string, PosterImageData>;
}

export function Viewings({
  viewings,
  distinctGenres,
  distinctMedia,
  distinctVenues,
  distinctReleaseYears,
  distinctViewingYears,
  initialSort,
  posters,
}: ViewingsProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...viewings],
      sort: initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header viewingCount={viewings.length} />}
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
          groupedItems={state.groupedItems}
          totalCount={state.filteredItems.length}
          visibleCount={state.showCount}
          posters={posters}
        />
      }
    />
  );
}
