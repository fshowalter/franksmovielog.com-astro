import type { FilterableState } from "src/utils";
import { filterTools, sortNumber } from "src/utils";

import type { ListItemValue } from "./List";

const SHOW_COUNT_DEFAULT = 100;

export type Sort = "viewing-date-desc" | "viewing-date-asc";

const { updateFilter, clearFilter } = filterTools(sortValues, groupValues);

function sortValues(values: ListItemValue[], sortOrder: Sort) {
  const sortMap: Record<Sort, (a: ListItemValue, b: ListItemValue) => number> =
    {
      "viewing-date-desc": (a, b) => sortNumber(a.sequence, b.sequence) * -1,
      "viewing-date-asc": (a, b) => sortNumber(a.sequence, b.sequence),
    };

  const comparer = sortMap[sortOrder];
  return values.sort(comparer);
}

function groupValues(
  values: ListItemValue[],
): Map<string, Map<string, ListItemValue[]>> {
  const groupedValues = new Map<string, Map<string, ListItemValue[]>>();

  values.map((value) => {
    const monthYearGroup = `${value.viewingMonth} ${value.viewingYear}`;

    let groupValue = groupedValues.get(monthYearGroup);

    if (!groupValue) {
      groupValue = new Map<string, ListItemValue[]>();
      groupedValues.set(monthYearGroup, groupValue);
    }

    const dayGroup = `${value.viewingDay}-${value.viewingDate}`;

    let dayGroupValue = groupValue.get(dayGroup);

    if (!dayGroupValue) {
      dayGroupValue = [];
      groupValue.set(dayGroup, dayGroupValue);
    }

    dayGroupValue.push(value);
  });

  return groupedValues;
}

type State = FilterableState<
  ListItemValue,
  Sort,
  Map<string, Map<string, ListItemValue[]>>
>;

export function initState({
  values,
  initialSort,
}: {
  values: ListItemValue[];
  initialSort: Sort;
}): State {
  return {
    allValues: values,
    filteredValues: values,
    filters: {},
    groupedValues: groupValues(values.slice(0, SHOW_COUNT_DEFAULT)),
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: initialSort,
  };
}

export enum Actions {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_MEDIUM = "FILTER_MEDIUM",
  FILTER_GENRES = "FILTER_GENRES",
  FILTER_VIEWING_YEAR = "FILTER_VIEWING_YEAR",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  FILTER_VENUE = "FILTER_VENUE",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
}

interface FilterTitleAction {
  type: Actions.FILTER_TITLE;
  value: string;
}

interface FilterMediumAction {
  type: Actions.FILTER_MEDIUM;
  value: string;
}

interface FilterVenueAction {
  type: Actions.FILTER_VENUE;
  value: string;
}

interface FilterGenresAction {
  type: Actions.FILTER_GENRES;
  values: string[];
}

interface FilterReleaseYearAction {
  type: Actions.FILTER_RELEASE_YEAR;
  values: [string, string];
}

interface FilterViewingYearAction {
  type: Actions.FILTER_VIEWING_YEAR;
  values: [string, string];
}

interface SortAction {
  type: Actions.SORT;
  value: Sort;
}

interface ShowMoreAction {
  type: Actions.SHOW_MORE;
}

export type ActionType =
  | FilterTitleAction
  | FilterReleaseYearAction
  | FilterViewingYearAction
  | FilterMediumAction
  | FilterVenueAction
  | FilterGenresAction
  | SortAction
  | ShowMoreAction;

export function reducer(state: State, action: ActionType): State {
  let groupedValues;
  let filteredValues;

  switch (action.type) {
    case Actions.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      return updateFilter(state, "title", (value) => {
        return regex.test(value.title);
      });
    }
    case Actions.FILTER_RELEASE_YEAR: {
      return updateFilter(state, "releaseYear", (value) => {
        const releaseYear = value.year;
        return (
          releaseYear >= action.values[0] && releaseYear <= action.values[1]
        );
      });
    }
    case Actions.FILTER_MEDIUM: {
      return (
        clearFilter(action.value, state, "medium") ??
        updateFilter(state, "medium", (value) => {
          return value.medium === action.value;
        })
      );
    }
    case Actions.FILTER_VENUE: {
      return (
        clearFilter(action.value, state, "venue") ??
        updateFilter(state, "venue", (value) => {
          return value.venue === action.value;
        })
      );
    }
    case Actions.FILTER_GENRES: {
      return updateFilter(state, "genres", (value) => {
        return action.values.every((genre) => value.genres.includes(genre));
      });
    }
    case Actions.FILTER_VIEWING_YEAR: {
      return updateFilter(state, "viewingYear", (value) => {
        return (
          value.viewingYear >= action.values[0] &&
          value.viewingYear <= action.values[1]
        );
      });
    }
    case Actions.SORT: {
      filteredValues = sortValues(state.filteredValues, action.value);
      groupedValues = groupValues(filteredValues.slice(0, state.showCount));
      return {
        ...state,
        sortValue: action.value,
        filteredValues,
        groupedValues,
      };
    }
    case Actions.SHOW_MORE: {
      const showCount = state.showCount + SHOW_COUNT_DEFAULT;

      groupedValues = groupValues(state.filteredValues.slice(0, showCount));

      return {
        ...state,
        groupedValues,
        showCount,
      };
    }
    // no default
  }
}
