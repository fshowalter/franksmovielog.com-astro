import { type ListItemValue } from "./List";
import { allCastAndCrew } from "src/api/castAndCrew";
import { getAvatars, type AvatarImageData } from "src/api/avatars";
import { ListItemAvatarImageConfig } from "src/components/ListItemAvatar";
import type { Sort } from "./CastAndCrew.reducer";

interface Data {
  values: ListItemValue[];
  avatars: Record<string, AvatarImageData>;
  initialSort: Sort;
}

export async function getData(): Promise<Data> {
  const { castAndCrew } = await allCastAndCrew();
  const avatars = await getAvatars(ListItemAvatarImageConfig);

  castAndCrew.sort((a, b) => a.name.localeCompare(b.name));

  const listItemValues = castAndCrew.map((member) => {
    const listItemValue: ListItemValue = {
      name: member.name,
      slug: member.slug,
      reviewCount: member.reviewCount,
      totalCount: member.totalCount,
      creditedAs: member.creditedAs,
    };

    return listItemValue;
  });

  return { values: listItemValues, avatars, initialSort: "name-asc" };
}
