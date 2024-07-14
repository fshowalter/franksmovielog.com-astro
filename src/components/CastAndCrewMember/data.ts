import castAndCrewJson from "@/data/castAndCrewJson";
import type { CastAndCrewMemberProps } from "./CastAndCrewMember";

export default async function getComponentData(
  slug: string,
): Promise<CastAndCrewMemberProps> {
  const json = await castAndCrewJson();

  const memberWithSlug = json.find((member) => {
    return member.slug === slug;
  });

  if (!memberWithSlug) {
    throw new Error(`No matching cast and crew member with slug: ${slug}`);
  }

  memberWithSlug.titles.sort((a, b) =>
    a.releaseSequence.localeCompare(b.releaseSequence),
  );

  const releaseYears = new Set<string>();

  memberWithSlug.titles.forEach((title) => {
    releaseYears.add(title.year);
  });

  return {
    member: memberWithSlug,
    initialSort: "release-date-asc",
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
  };
}
