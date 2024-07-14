import { Button } from "@/components/Button";
import { DebouncedInput } from "@/components/DebouncedInput";
import { SelectField } from "@/components/SelectField";
import { YearInput } from "@/components/YearInput";
import { Action, ActionType, Sort } from "./Collection.reducer";

export function Filters({
  dispatch,
  distinctReleaseYears,
  hideReviewed,
  sortValue,
  showHideReviewd,
}: {
  dispatch: React.Dispatch<Action>;
  showHideReviewd: boolean;
  hideReviewed: boolean;
  distinctReleaseYears: readonly string[];
  sortValue: Sort;
}): JSX.Element {
  return (
    <>
      {showHideReviewd && (
        <div className="flex basis-full flex-col items-center justify-end">
          <Button
            onClick={() => dispatch({ type: ActionType.TOGGLE_REVIEWED })}
          >
            {hideReviewed ? "Show Reviewed" : "Hide Reviewed"}
          </Button>
        </div>
      )}
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
      <SelectField
        className="basis-full"
        value={sortValue}
        label="Order By"
        onChange={(e) =>
          dispatch({
            type: ActionType.SORT,
            value: e.target.value as Sort,
          })
        }
      >
        <option value="release-date-desc">Release Date (Newest First)</option>
        <option value="release-date-asc">Release Date (Oldest First)</option>
        <option value="title">Title</option>
        <option value="grade-desc">Grade (Best First)</option>
        <option value="grade-asc">Grade (Worst First)</option>
      </SelectField>
    </>
  );
}
