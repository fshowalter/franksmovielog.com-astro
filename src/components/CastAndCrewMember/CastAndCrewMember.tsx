import { useReducer } from "react";
import type { AvatarImageData } from "src/api/avatars";
import type { CastAndCrewMember } from "src/api/castAndCrew";
import type { PosterImageData } from "src/api/posters";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import { initState, reducer, type Sort } from "./CastAndCrewMember.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";

export interface Props {
  value: Pick<
    CastAndCrewMember,
    "name" | "reviewCount" | "totalCount" | "creditedAs" | "titles"
  >;
  initialSort: Sort;
  distinctReleaseYears: readonly string[];
  posters: Record<string, PosterImageData>;
  avatarImageData: AvatarImageData;
}

export function CastAndCrewMember({
  value,
  initialSort,
  distinctReleaseYears,
  posters,
  avatarImageData,
}: Props): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      values: [...value.titles],
      initialSort,
    },
    initState,
  );
  return (
    <ListWithFiltersLayout
      header={
        <Header
          creditedAs={value.creditedAs}
          totalCount={value.totalCount}
          reviewCount={value.reviewCount}
          name={value.name}
          avatarImageData={avatarImageData}
        />
      }
      filters={
        <Filters
          dispatch={dispatch}
          creditedAs={value.creditedAs}
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          distinctReleaseYears={distinctReleaseYears}
        />
      }
      list={
        <List
          dispatch={dispatch}
          totalCount={state.filteredValues.length}
          visibleCount={state.showCount}
          groupedValues={state.groupedValues}
          posters={posters}
        />
      }
    />
  );
}
