import type { Review } from "@/api/reviews";
import { Content } from "./Content";
import { Credits } from "./Credits";
import { Header } from "./Header";
import { MoreReviews } from "./MoreReviews";
import { StructuredData } from "./StructuredData";
import { ViewingHistory } from "./ViewingHistory";
import type { StillImageData } from "@/api/stills";
import type { PosterImageData } from "@/api/posters";
import { Still } from "@/components/Still";
import type { HeaderReviewData } from "./Header";
import type { ContentReviewData } from "./Content";
import type { ViewingHistoryReviewData } from "./ViewingHistory";
import type { CreditsReviewData } from "./Credits";
import type { ChipsReviewData } from "./Chips";
import { Chips } from "./Chips";

export const StillImageConfig = {
  width: 960,
  height: 540,
  sizes: "(min-width: 960px) 960px, 100vw",
  quality: 80,
};

interface ReviewData
  extends Pick<Review, "title" | "year" | "slug">,
    HeaderReviewData,
    ContentReviewData,
    ViewingHistoryReviewData,
    CreditsReviewData,
    ChipsReviewData {}

export interface Props {
  review: ReviewData;
  stillImageData: StillImageData;
  posterImageData: PosterImageData;
}

export function Review({
  review,
  stillImageData,
  posterImageData,
}: Props): JSX.Element {
  return (
    <main id="top" className="scroll-margin-top flex flex-col items-center">
      <Header
        review={review}
        className="px-pageMargin py-6 text-center desktop:py-8"
      />
      <Still
        slug={review.slug}
        title={review.title}
        year={review.year}
        width={960}
        height={540}
        sizes="(min-width: 960px) 960px, 100vw"
        className="mb-[5.33px]"
        imageData={stillImageData}
        loading="eager"
        decoding="sync"
      />
      <div className="h-6 min-h-6 tablet:h-8 tablet:min-h-8" />
      <Content review={review} className="items-center px-pageMargin" />
      <div className="spacer-y-20" />
      <ViewingHistory review={review} className="w-full max-w-popout" />
      <div className="spacer-y-32" />
      <Credits
        review={review}
        posterImageData={posterImageData}
        className="w-full max-w-popout"
      >
        <Chips review={review} />
      </Credits>
      <div className="spacer-y-32" />
      <MoreReviews
        review={review}
        className="w-full max-w-popout tablet:max-w-full"
      />
      <div className="spacer-y-32 tablet:spacer-y-0" />
      <StructuredData review={review} />
    </main>
  );
}
