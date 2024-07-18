import { getAvatars } from "src/api/avatars";
import { allCastAndCrew } from "src/api/castAndCrew";
import { ListItemAvatarImageConfig } from "src/components/ListItemAvatar";

import type { Props } from "./CastAndCrew";
import { type ListItemValue } from "./List";

export async function getProps(): Promise<Props> {
  const { castAndCrew } = await allCastAndCrew();
  const avatars = await getAvatars(ListItemAvatarImageConfig);

  castAndCrew.sort((a, b) => a.name.localeCompare(b.name));

  const values = castAndCrew.map((member) => {
    const value: ListItemValue = {
      name: member.name,
      slug: member.slug,
      reviewCount: member.reviewCount,
      totalCount: member.totalCount,
      creditedAs: member.creditedAs,
    };

    return value;
  });

  return { values, avatars, initialSort: "name-asc" };
}
