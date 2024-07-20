import type { AvatarImageData } from "src/api/avatars";
import type { PosterImageData } from "src/api/posters";
import type { Review, ReviewWithContent } from "src/api/reviews";
import type { StillImageData } from "src/api/stills";
import { Still } from "src/components/Still";

import { Chips } from "./Chips";
import { Content } from "./Content";
import { Credits } from "./Credits";
import { Header } from "./Header";
import { MoreReviews } from "./MoreReviews";
import { StructuredData } from "./StructuredData";
import { ViewingHistory } from "./ViewingHistory";

export const StillImageConfig = {
  width: 960,
  height: 540,
  sizes: "(min-width: 960px) 960px, 100vw",
};

export interface Props {
  value: ReviewWithContent;
  stillImageData: StillImageData;
  posterImageData: PosterImageData;
  avatars: Record<string, AvatarImageData>;
  stillListStills: Record<string, StillImageData>;
  seoImageSrc: string;
}

export function Review({
  value,
  stillImageData,
  posterImageData,
  avatars,
  seoImageSrc,
  stillListStills,
}: Props): JSX.Element {
  return (
    <main
      id="top"
      className="flex scroll-mt-[var(--header-offset)] flex-col items-center"
    >
      <Header
        title={value.title}
        year={value.year}
        originalTitle={value.originalTitle}
        countries={value.countries}
        runtimeMinutes={value.runtimeMinutes}
        className="px-pageMargin py-6 text-center desktop:py-8"
      />
      <Still
        title={value.title}
        year={value.year}
        width={StillImageConfig.width}
        height={StillImageConfig.height}
        sizes={StillImageConfig.sizes}
        className="mb-[5.33px]"
        imageData={stillImageData}
        loading="eager"
        decoding="sync"
      />
      <div className="h-6 min-h-6 tablet:h-8 tablet:min-h-8" />
      <Content
        grade={value.grade}
        date={value.date}
        content={value.content}
        className="items-center px-pageMargin"
      />
      <div className="spacer-y-20" />
      <ViewingHistory
        viewings={value.viewings}
        className="w-full max-w-popout"
      />
      <div className="spacer-y-32" />
      <Credits
        title={value.title}
        year={value.year}
        directorNames={value.directorNames}
        principalCastNames={value.principalCastNames}
        writerNames={value.writerNames}
        originalTitle={value.originalTitle}
        runtimeMinutes={value.runtimeMinutes}
        countries={value.countries}
        posterImageData={posterImageData}
        className="w-full max-w-popout"
      >
        <Chips
          castAndCrew={value.castAndCrew}
          collections={value.collections}
          avatars={avatars}
        />
      </Credits>
      <div className="spacer-y-32" />
      <MoreReviews
        moreCastAndCrew={value.moreCastAndCrew}
        moreCollections={value.moreCollections}
        moreReviews={value.moreReviews}
        stillListStills={stillListStills}
        className="w-full max-w-popout tablet:max-w-full"
      />
      <div className="spacer-y-32 tablet:spacer-y-0" />
      <StructuredData
        title={value.title}
        year={value.year}
        directorNames={value.directorNames}
        imdbId={value.imdbId}
        grade={value.grade}
        seoImageSrc={seoImageSrc}
      />
    </main>
  );
}
