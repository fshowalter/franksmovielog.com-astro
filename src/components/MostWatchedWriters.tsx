import type { PosterImageData } from "src/api/posters";

import type { MostWatchedPeopleListItemData } from "./MostWatchedPeople";
import { MostWatchedPeople } from "./MostWatchedPeople";

export function MostWatchedWriters({
  people,
  posters,
}: {
  people: readonly MostWatchedPeopleListItemData[];
  posters: Record<string, PosterImageData>;
}): JSX.Element | null {
  return (
    <MostWatchedPeople
      people={people}
      posters={posters}
      header="Most Watched Writers"
    />
  );
}
