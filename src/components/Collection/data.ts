import collectionJson from "@/data/collectionsJson";
import type { CollectionProps } from "./Collection";

export default async function getComponentData(
  slug: string,
): Promise<CollectionProps> {
  const json = await collectionJson();

  const collectionWithSlug = json.find((member) => {
    return member.slug === slug;
  });

  if (!collectionWithSlug) {
    throw new Error(`No matching collection with slug: ${slug}`);
  }

  collectionWithSlug.titles.sort((a, b) =>
    a.releaseSequence.localeCompare(b.releaseSequence),
  );

  const releaseYears = new Set<string>();

  collectionWithSlug.titles.forEach((title) => {
    releaseYears.add(title.year);
  });

  return {
    collection: collectionWithSlug,
    initialSort: "release-date-asc",
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
  };
}
