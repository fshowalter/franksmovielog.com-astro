import {
  StillList,
  StillListHeading,
  StillListNav,
} from "@/components/StillList";
import { twMerge } from "tailwind-merge";
import type { StillListItemData } from "@/components/StillList/StillListItem";

interface MoreReviewsCastAndCrewMember {
  name: string;
  slug: string;
  creditKind: string;
  titles: StillListItemData[];
}

interface MoreReviewsCollection {
  name: string;
  slug: string;
  titles: StillListItemData[];
}

export interface MoreReviewsData {
  moreCastAndCrew: MoreReviewsCastAndCrewMember[];
  moreCollections: MoreReviewsCollection[];
  moreReviews: StillListItemData[];
}

export function MoreReviews({
  data,
  className,
}: {
  data: MoreReviewsData;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-y-12 bg-default tablet:bg-subtle tablet:pb-32 tablet:pt-8 desktop:gap-y-24",
        className,
      )}
    >
      {data.moreCastAndCrew.map((castAndCrewMember) => (
        <MoreReviewsList
          key={castAndCrewMember.slug}
          leadText={leadTextForCreditKind(castAndCrewMember.creditKind)}
          linkText={castAndCrewMember.name}
          linkTarget={`/cast-and-crew/${castAndCrewMember.slug}`}
          data={castAndCrewMember.titles}
        />
      ))}

      {data.moreCollections.map((collection) => (
        <MoreReviewsList
          key={collection.slug}
          leadText="More"
          linkText={collection.name}
          linkTarget={`/collections/${collection.slug}`}
          data={collection.titles}
        />
      ))}

      <MoreReviewsList
        leadText="More"
        linkText="Reviews"
        linkTarget="/reviews/"
        data={data.moreReviews}
      />
    </div>
  );
}

function leadTextForCreditKind(creditKind: string): string {
  switch (creditKind) {
    case "director": {
      return "More directed by";
    }
    case "performer": {
      return "More with";
    }
    case "writer": {
      return "More written by";
    }
    default: {
      throw new Error(`Unknown credit kind ${creditKind}`);
    }
  }
}

function MoreReviewsList({
  data,
  leadText,
  linkText,
  linkTarget,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
  data: StillListItemData[];
}) {
  return (
    <StillListNav>
      <StillListHeading
        leadText={leadText}
        linkText={linkText}
        linkTarget={linkTarget}
      />
      <StillList
        data={data}
        seeAllLinkTarget={linkTarget}
        seeAllLinkText={linkText}
      />
    </StillListNav>
  );
}
