import { getFixedWidthPosters, type PosterImageData } from "src/api/posters";
import { ListItemPosterImageConfig } from "src/components/ListItemPoster";
import { allCollections, type Collection } from "src/api/collections";
import { AvatarImageConfig } from "./Header";
import { getAvatars, type AvatarImageData } from "src/api/avatars";
import type { Sort } from "./Collection.reducer";

interface Data {
  value: Collection;
  posters: Record<string, PosterImageData>;
  avatarImageData: AvatarImageData;
  distinctReleaseYears: string[];
  initialSort: Sort;
}

export async function getData(slug: string): Promise<Data> {
  const { collections, distinctReleaseYears } = await allCollections();

  const member = collections.find((member) => {
    return slug == member.slug;
  })!;

  member.titles.sort((a, b) =>
    a.releaseSequence.localeCompare(b.releaseSequence),
  );

  const posters = await getFixedWidthPosters(ListItemPosterImageConfig);
  const avatars = await getAvatars(AvatarImageConfig);
  const avatarImageData = avatars[member.slug];

  return {
    value: member,
    posters,
    avatarImageData,
    distinctReleaseYears,
    initialSort: "release-date-asc",
  };
}
