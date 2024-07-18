import { getAvatars } from "src/api/avatars";
import { allCastAndCrew } from "src/api/castAndCrew";
import { getFixedWidthPosters } from "src/api/posters";
import { ListItemPosterImageConfig } from "src/components/ListItemPoster";

import type { Props } from "./CastAndCrewMember";
import { AvatarImageConfig } from "./Header";

export async function getProps(slug: string): Promise<Props> {
  const { castAndCrew, distinctReleaseYears } = await allCastAndCrew();

  const member = castAndCrew.find((member) => {
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
