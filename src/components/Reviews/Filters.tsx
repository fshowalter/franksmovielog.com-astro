import { MultiSelectField } from "src/components/MultiSelectField";
import { DebouncedInput } from "src/components/DebouncedInput";
import { GradeInput } from "src/components/GradeInput";
import { SelectField } from "src/components/SelectField";
import { YearInput } from "src/components/YearInput";
import { ActionType } from "./Reviews.reducer";
import type { Action, Sort } from "./Reviews.reducer";

export function Filters({
  dispatch,
  sortValue,
  distinctReleaseYears,
  distinctReviewYears,
  distinctGenres,
}: {
  dispatch: React.Dispatch<Action>;
  sortValue: string;
  distinctReviewYears: readonly string[];
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
      <YearInput
        label="Review Year"
        years={distinctReviewYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_REVIEW_YEAR, values })
        }
      />
      <GradeInput
        label="Grade"
        onGradeChange={(values) =>
          dispatch({
            type: ActionType.FILTER_GRADE,
            values,
          })
        }
      />
      <MultiSelectField
        label="Genres"
        options={distinctGenres}
        onChange={(e) =>
          dispatch({
            type: ActionType.FILTER_GENRES,
            values: e.map((selection) => selection.value),
          })
        }
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
        <option value="review-date-desc">Review Date (Newest First)</option>
        <option value="review-date-asc">Review Date (Oldest First)</option>
      </SelectField>
    </>
  );
}
