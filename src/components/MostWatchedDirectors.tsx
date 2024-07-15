import type { PosterImageData } from "@/api/posters";
import { MostWatchedPeople } from "./MostWatchedPeople";
import type { MostWatchedPeopleListItemData } from "./MostWatchedPeople";

export function MostWatchedDirectors({
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
      header="Most Watched Directors"
    />
  );
}
