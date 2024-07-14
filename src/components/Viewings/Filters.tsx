import { MultiSelectField } from "@/components/MultiSelectField";
import { DebouncedInput } from "@/components/DebouncedInput";
import { SelectField, SelectOptions } from "@/components/SelectField";
import { YearInput } from "@/components/YearInput";
import { Action, ActionType, Sort } from "./Viewings.reducer";

export function Filters({
  dispatch,
  distinctReleaseYears,
  distinctViewingYears,
  distinctGenres,
  distinctVenues,
  distinctMedia,
  sortValue,
}: {
  dispatch: React.Dispatch<Action>;
  distinctReleaseYears: readonly string[];
  distinctViewingYears: readonly string[];
  distinctGenres: readonly string[];
  distinctVenues: readonly string[];
  distinctMedia: readonly string[];
  sortValue: Sort;
}): JSX.Element {
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
        label="Viewing Year"
        years={distinctViewingYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_VIEWING_YEAR, values })
        }
      />
      <SelectField
        label="Medium"
        onChange={(e) =>
          dispatch({
            type: ActionType.FILTER_MEDIUM,
            value: e.target.value,
          })
        }
      >
        <SelectOptions options={distinctMedia} />
      </SelectField>
      <SelectField
        label="Venue"
        onChange={(e) =>
          dispatch({
            type: ActionType.FILTER_VENUE,
            value: e.target.value,
          })
        }
      >
        <SelectOptions options={distinctVenues} />
      </SelectField>
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
        <option value="viewing-date-desc">Viewing Date (Newest First)</option>
        <option value="viewing-date-asc">Viewing Date (Oldest First)</option>
      </SelectField>
    </>
  );
}
