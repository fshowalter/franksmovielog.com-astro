import { MostWatchedPeople } from "./MostWatchedPeople";
import type { MostWatchedPersonListItemData } from "./MostWatchedPeople";

export function MostWatchedDirectors({
  data,
}: {
  data: readonly MostWatchedPersonListItemData[];
}): JSX.Element | null {
  return <MostWatchedPeople data={data} header="Most Watched Directors" />;
}
