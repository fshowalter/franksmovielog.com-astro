import { MostWatchedPeople } from "./MostWatchedPeople";
import type { MostWatchedPersonListItemData } from "./MostWatchedPeople";

export function MostWatchedWriters({
  data,
}: {
  data: readonly MostWatchedPersonListItemData[];
}): JSX.Element | null {
  return <MostWatchedPeople data={data} header="Most Watched Writers" />;
}
