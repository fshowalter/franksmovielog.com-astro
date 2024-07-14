import collectionsJson from "@/data/collectionsJson";
import type { CollectionsProps } from "./Collections";

export default async function getComponentData(): Promise<CollectionsProps> {
  const json = await collectionsJson();

  json.sort((a, b) => a.name.localeCompare(b.name));

  const collections = json.map((member) => {
    const propMember: CollectionsProps["collections"][0] = {
      name: member.name,
      slug: member.slug,
      titleCount: member.titleCount,
      reviewCount: member.reviewCount,
      avatar: member.avatar,
    };

    return propMember;
  });

  return {
    collections,
    initialSort: "name-asc",
  };
}
