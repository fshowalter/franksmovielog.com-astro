import { DebouncedInput } from "src/components/DebouncedInput";
import { SelectField } from "src/components/SelectField";
import { YearInput } from "src/components/YearInput";
import { ActionType } from "./Overrated.reducer";
import { MultiSelectField } from "src/components/MultiSelectField";
import type { Sort } from "./Overrated.reducer";
import type { Action } from "./Overrated.reducer";

export function Filters({
  dispatch,
  sortValue,
  distinctReleaseYears,
  distinctGenres,
}: {
  dispatch: React.Dispatch<Action>;
  sortValue: Sort;
  distinctReleaseYears: readonly string[];
  distinctGenres: readonly string[];
}) {
  return (
    <>
      <DebouncedInput
        label="Title"
        placeholder="Enter all or part of a title"
        onInputChange={(value) =>
          dispatch({ type: ActionType.FILTER_TITLE, value })
        }
      />
      <YearInput
        label="Release Year"
        years={distinctReleaseYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
        }
      />
      <MultiSelectField
        onChange={(e) =>
          dispatch({
            type: ActionType.FILTER_GENRES,
            values: e.map((selection) => selection.value),
          })
        }
        options={distinctGenres}
        label="Genres"
      />
      <SelectField
        value={sortValue}
        label="Order By"
        onChange={(e) =>
          dispatch({
            type: ActionType.SORT,
            value: e.target.value as Sort,
          })
        }
      >
        <option value="title-asc">Title (A &rarr; Z)</option>
        <option value="title-desc">Title (Z &rarr; A)</option>
        <option value="grade-desc">Grade (Best First)</option>
        <option value="grade-asc">Grade (Worst First)</option>
        <option value="release-date-desc">Release Date (Newest First)</option>
        <option value="release-date-asc">Release Date (Oldest First)</option>
      </SelectField>
    </>
  );
}
