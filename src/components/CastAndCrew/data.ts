import castAndCrewJson from "@/data/castAndCrewJson";
import type { CastAndCrewProps } from "./CastAndCrew";

export default async function getComponentData(): Promise<CastAndCrewProps> {
  const json = await castAndCrewJson();

  json.sort((a, b) => a.name.localeCompare(b.name));

  const data = json.map((member) => {
    const castAndCrewMember: CastAndCrewProps["data"][0] = {
      name: member.name,
      slug: member.slug,
      totalCount: member.totalCount,
      reviewCount: member.reviewCount,
      creditedAs: member.creditedAs,
      avatar: member.avatar,
    };

    return castAndCrewMember;
  });

  return {
    data,
    initialSort: "name-asc",
  };
}
