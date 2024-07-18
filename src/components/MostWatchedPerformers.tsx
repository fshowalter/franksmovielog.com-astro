import type { PosterImageData } from "src/api/posters";

import type { MostWatchedPeopleListItemValue } from "./MostWatchedPeople";
import { MostWatchedPeople } from "./MostWatchedPeople";

export function MostWatchedPerformers({
  values,
  posters,
}: {
  values: readonly MostWatchedPeopleListItemValue[];
  posters: Record<string, PosterImageData>;
}): JSX.Element | null {
  return (
    <MostWatchedPeople
      values={values}
      posters={posters}
      header="Most Watched Performers"
    />
  );
}
