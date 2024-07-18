import type { Review } from "src/api/reviews";
import type { StillImageData } from "src/api/stills";
import { StillList } from "src/components/StillList";
import { StillListHeading } from "src/components/StillListHeading";
import type { StillListItemValue } from "src/components/StillListItem";
import { StillListNav } from "src/components/StillListNav";
import { twMerge } from "tailwind-merge";

interface Props
  extends Pick<Review, "moreCastAndCrew" | "moreCollections" | "moreReviews"> {
  className?: string;
  stillListStills: Record<string, StillImageData>;
}

export function MoreReviews({
  moreCastAndCrew,
  moreCollections,
  moreReviews,
  className,
  stillListStills,
}: Props) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-y-12 bg-default tablet:bg-subtle tablet:pb-32 tablet:pt-8 desktop:gap-y-24",
        className,
      )}
    >
      {moreCastAndCrew.map((castAndCrewMember) => (
        <MoreReviewsList
          key={castAndCrewMember.slug}
          leadText={leadTextForCreditKind(castAndCrewMember.creditKind)}
          linkText={castAndCrewMember.name}
          linkTarget={`/cast-and-crew/${castAndCrewMember.slug}`}
          values={castAndCrewMember.titles}
          stills={stillListStills}
        />
      ))}

      {moreCollections.map((collection) => (
        <MoreReviewsList
          key={collection.slug}
          leadText="More"
          linkText={collection.name}
          linkTarget={`/collections/${collection.slug}`}
          values={collection.titles}
          stills={stillListStills}
        />
      ))}

      <MoreReviewsList
        leadText="More"
        linkText="Reviews"
        linkTarget="/reviews/"
        values={moreReviews}
        stills={stillListStills}
      />
    </div>
  );
}

function leadTextForCreditKind(
  creditKind: "director" | "performer" | "writer",
): string {
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
    // no-default
  }
}

function MoreReviewsList({
  values,
  leadText,
  linkText,
  linkTarget,
  stills,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
  values: StillListItemValue[];
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
        values={values}
        seeAllLinkTarget={linkTarget}
        seeAllLinkText={linkText}
        stills={stills}
      />
    </StillListNav>
  );
}
