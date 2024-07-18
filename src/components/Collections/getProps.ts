import { getAvatars } from "src/api/avatars";
import { allCollections } from "src/api/collections";
import { ListItemAvatarImageConfig } from "src/components/ListItemAvatar";

import type { Props } from "./Collections";
import { type ListItemValue } from "./List";

export async function getProps(): Promise<Props> {
  const { collections } = await allCollections();
  const avatars = await getAvatars(ListItemAvatarImageConfig);

  collections.sort((a, b) => a.name.localeCompare(b.name));

  const listItemValues = collections.map((member) => {
    const listItemValue: ListItemValue = {
      name: member.name,
      slug: member.slug,
      reviewCount: member.reviewCount,
      titleCount: member.titleCount,
    };

    return listItemValue;
  });

  return { values: listItemValues, avatars, initialSort: "name-asc" };
}
