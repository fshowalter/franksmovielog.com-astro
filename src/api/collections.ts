import {
  allCollectionsJson,
  type CollectionJson,
} from "./data/collectionsJson";

interface Collections {
  collections: Collection[];
  distinctReleaseYears: string[];
}

export interface Collection extends CollectionJson {}

let cache: Collections;

export async function allCollections(): Promise<Collections> {
  if (cache) {
    return cache;
  }

  const collections = await allCollectionsJson();
  const releaseYears = new Set<string>();

  collections.forEach((collection) => {
    collection.titles.forEach((title) => {
      releaseYears.add(title.year);
    });
  });

  cache = {
    collections: collections,
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
  };

  return cache;
}
