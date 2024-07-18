import { getAvatars } from "src/api/avatars";
import { allCollections } from "src/api/collections";
import { getFixedWidthPosters } from "src/api/posters";
import { ListItemPosterImageConfig } from "src/components/ListItemPoster";

import type { Props } from "./Collection";
import { AvatarImageConfig } from "./Header";

export async function getProps(slug: string): Promise<Props> {
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
