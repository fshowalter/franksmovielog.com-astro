"use client";

import { useReducer } from "react";
import { ListWithFiltersLayout } from "@/components/ListWithFiltersLayout";
import { initState, reducer } from "./CastAndCrewMember.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import type { Sort } from "./CastAndCrewMember.reducer";

export interface CastAndCrewMemberTitle {
  imdbId: string;
  title: string;
  year: string;
  grade: string | null;
  gradeValue: number | null;
  slug: string | null;
  sortTitle: string;
  releaseSequence: string;
  creditedAs: string[];
  watchlistDirectorNames: string[];
  watchlistPerformerNames: string[];
  watchlistWriterNames: string[];
  collectionNames: string[];
}

export interface CastAndCrewMember {
  name: string;
  reviewCount: number;
  totalCount: number;
  creditedAs: string[];
  avatar: string | null;
  titles: CastAndCrewMemberTitle[];
}

export interface CastAndCrewMemberProps {
  member: CastAndCrewMember;
  initialSort: Sort;
  distinctReleaseYears: readonly string[];
}

export function CastAndCrewMember({
  member,
  initialSort,
  distinctReleaseYears,
}: CastAndCrewMemberProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...member.titles],
      sort: initialSort,
    },
    initState,
  );
  return (
    <ListWithFiltersLayout
      header={<Header member={member} />}
      filters={
        <Filters
          dispatch={dispatch}
          creditedAs={member.creditedAs}
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          distinctReleaseYears={distinctReleaseYears}
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
