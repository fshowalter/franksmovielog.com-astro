import { StillList } from "@/components/StillList";
import { StillListHeading } from "@/components/StillListHeading";
import { StillListNav } from "@/components/StillListNav";
import { twMerge } from "tailwind-merge";
import type { StillListItemData } from "@/components/StillListItem";
import type { Review } from "@/api/reviews";
import type { StillImageData } from "@/api/stills";

export interface MoreReviewsReviewData
  extends Pick<Review, "moreCastAndCrew" | "moreCollections" | "moreReviews"> {}

export function MoreReviews({
  review,
  className,
  stillListStills,
}: {
  review: MoreReviewsReviewData;
  className?: string;
  stillListStills: Record<string, StillImageData>;
}) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-y-12 bg-default tablet:bg-subtle tablet:pb-32 tablet:pt-8 desktop:gap-y-24",
        className,
      )}
    >
      {review.moreCastAndCrew.map((castAndCrewMember) => (
        <MoreReviewsList
          key={castAndCrewMember.slug}
          leadText={leadTextForCreditKind(castAndCrewMember.creditKind)}
          linkText={castAndCrewMember.name}
          linkTarget={`/cast-and-crew/${castAndCrewMember.slug}`}
          titles={castAndCrewMember.titles}
          stills={stillListStills}
        />
      ))}

      {review.moreCollections.map((collection) => (
        <MoreReviewsList
          key={collection.slug}
          leadText="More"
          linkText={collection.name}
          linkTarget={`/collections/${collection.slug}`}
          titles={collection.titles}
          stills={stillListStills}
        />
      ))}

      <MoreReviewsList
        leadText="More"
        linkText="Reviews"
        linkTarget="/reviews/"
        titles={review.moreReviews}
        stills={stillListStills}
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
  titles,
  leadText,
  linkText,
  linkTarget,
  stills,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
  titles: StillListItemData[];
  stills: Record<string, StillImageData>;
}) {
  return (
    <StillListNav>
      <StillListHeading
        leadText={leadText}
        linkText={linkText}
        linkTarget={linkTarget}
      />
      <StillList
        titles={titles}
        seeAllLinkTarget={linkTarget}
        seeAllLinkText={linkText}
        stills={stills}
      />
    </StillListNav>
  );
}
