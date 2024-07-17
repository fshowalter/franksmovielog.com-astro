import { type ListItemValue } from "./List";
import { allCollections } from "src/api/collections";
import { getAvatars, type AvatarImageData } from "src/api/avatars";
import { ListItemAvatarImageConfig } from "src/components/ListItemAvatar";
import type { Sort } from "./Collections.reducer";

interface Data {
  values: ListItemValue[];
  avatars: Record<string, AvatarImageData>;
  initialSort: Sort;
}

export async function getData(): Promise<Data> {
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
