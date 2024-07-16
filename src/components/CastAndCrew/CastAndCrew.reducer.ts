import { filterValues, sortNumber, sortString } from "../../utils";
import type { ListItemValue } from "./List";

export enum Actions {
  FILTER_NAME = "FILTER_NAME",
  FILTER_CREDIT_KIND = "FILTER_CREDIT_KIND",
  SORT = "SORT",
}

export type Sort =
  | "name-asc"
  | "name-desc"
  | "title-count-asc"
  | "title-count-desc"
  | "review-count-asc"
  | "review-count-desc";

function sortValues(values: ListItemValue[], sortOrder: Sort): ListItemValue[] {
  const sortMap: Record<Sort, (a: ListItemValue, b: ListItemValue) => number> =
    {
      "name-asc": (a, b) => sortString(a.name, b.name),
      "name-desc": (a, b) => sortString(a.name, b.name) * -1,
      "title-count-asc": (a, b) => sortNumber(a.totalCount, b.totalCount),
      "title-count-desc": (a, b) => sortNumber(a.totalCount, b.totalCount) * -1,
      "review-count-asc": (a, b) => sortNumber(a.reviewCount, b.reviewCount),
      "review-count-desc": (a, b) =>
        sortNumber(a.reviewCount, b.reviewCount) * -1,
    };

  const comparer = sortMap[sortOrder];

  return values.sort(comparer);
}

interface State {
  allValues: ListItemValue[];
  filteredValues: ListItemValue[];
  filters: Record<string, (value: ListItemValue) => boolean>;
  sortValue: Sort;
}

export function initState({
  values,
  initialSort,
}: {
  values: readonly ListItemValue[];
  initialSort: Sort;
}): State {
  return {
    allValues: [...values],
    filteredValues: [...values],
    filters: {},
    sortValue: initialSort,
  };
}

interface FilterNameAction {
  type: Actions.FILTER_NAME;
  value: string;
}

interface FilterCreditKindAction {
  type: Actions.FILTER_CREDIT_KIND;
  value: string;
}

interface SortAction {
  type: Actions.SORT;
  value: Sort;
}

export type ActionType = FilterNameAction | FilterCreditKindAction | SortAction;

export function reducer(state: State, action: ActionType): State {
  let filters;
  let filteredValues;

  switch (action.type) {
    case Actions.FILTER_NAME: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        name: (value: ListItemValue) => {
          return regex.test(value.name);
        },
      };
      filteredValues = sortValues(
        filterValues<ListItemValue>({
          values: state.allValues,
          filters,
        }),
        state.sortValue,
      );
      return {
        ...state,
        filters,
        filteredValues,
      };
    }
    case Actions.FILTER_CREDIT_KIND: {
      if (action.value === "All") {
        filters = {
          ...state.filters,
        };

        delete filters.credits;
      } else {
        filters = {
          ...state.filters,
          credits: (value: ListItemValue) => {
            return value.creditedAs.includes(action.value);
          },
        };
      }
      filteredValues = sortValues(
        filterValues<ListItemValue>({
          values: state.allValues,
          filters,
        }),
        state.sortValue,
      );
      return {
        ...state,
        filters,
        filteredValues,
      };
    }
    case Actions.SORT: {
      filteredValues = sortValues(state.filteredValues, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredValues,
      };
    }
    // no default
  }
}
