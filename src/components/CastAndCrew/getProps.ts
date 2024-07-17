import { type ListItemValue } from "./List";
import { allCastAndCrew } from "src/api/castAndCrew";
import { getAvatars } from "src/api/avatars";
import { ListItemAvatarImageConfig } from "src/components/ListItemAvatar";
import type { Props } from "./CastAndCrew";

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
