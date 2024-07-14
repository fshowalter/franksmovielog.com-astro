import underseenGemsJson from "@/data/underseenGemsJson";
import type { UnderseenProps } from "./Underseen";

export default async function getComponentData(): Promise<UnderseenProps> {
  const json = await underseenGemsJson();

  json.sort((a, b) => b.releaseSequence.localeCompare(a.releaseSequence));

  const genres = new Set<string>();
  const releaseYears = new Set<string>();

  const items = json.map((title) => {
    title.genres.forEach((genre) => genres.add(genre));
    releaseYears.add(title.year);

    const itemData: UnderseenProps["items"][0] = {
      ...title,
    };

    return itemData;
  });

  return {
    items,
    distinctGenres: Array.from(genres).toSorted(),
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
    initialSort: "release-date-desc",
  };
}
