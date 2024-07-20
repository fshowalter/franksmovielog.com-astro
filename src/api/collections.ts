import {
  allCollectionsJson,
  type CollectionJson,
} from "./data/collectionsJson";

interface Collections {
  collections: Collection[];
  distinctReleaseYears: string[];
}

export interface Collection extends CollectionJson {}

export async function allCollections(): Promise<Collections> {
  const collections = await allCollectionsJson();
  const releaseYears = new Set<string>();

  collections.forEach((collection) => {
    collection.titles.forEach((title) => {
      releaseYears.add(title.year);
    });
  });

  return {
    collections: collections,
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
  };
}
