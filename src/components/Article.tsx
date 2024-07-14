import { LongFormText } from "@/components/LongFormText";
import { PageTitle } from "@/components/PageTitle";
import {
  StillList,
  StillListHeading,
  StillListNav,
} from "@/components/StillList";
import type { StillListItemData } from "./StillList/StillListItem";

export function Article({
  slug,
  alt,
  title,
  articleText,
  moreReviewsData,
}: {
  slug: string;
  alt: string;
  articleText: string;
  title: string;
  moreReviewsData: StillListItemData[];
}): JSX.Element {
  return (
    <main>
      <article className="flex flex-col items-center">
        <PageTitle className="px-pageMargin py-6 text-center desktop:py-8">
          {title}
        </PageTitle>
        <img
          src={`/assets/stills/${slug}.png`}
          width={960}
          height={540}
          alt={alt}
          className="mb-[5.33px]"
        />
        <div className="spacer-y-16" />
        <div className="px-pageMargin">
          <LongFormText text={articleText} className="max-w-prose" />
        </div>
        <div className="spacer-y-32" />
      </article>
      <div className="flex w-full max-w-popout items-center justify-center bg-default tablet:max-w-full tablet:bg-subtle tablet:pb-32 tablet:pt-8">
        <StillListNav>
          <StillListHeading
            leadText="Latest"
            linkText="Reviews"
            linkTarget={`/reviews/`}
          />
          <StillList
            data={moreReviewsData}
            seeAllLinkTarget="/reviews/"
            seeAllLinkText="Reviews"
          />
        </StillListNav>
      </div>
    </main>
  );
}
