import { getImage } from "astro:assets";
import { getAvatars } from "src/api/avatars";
import { getFluidWidthPosters } from "src/api/posters";
import { allReviews, loadContent } from "src/api/reviews";
import { getStillImagePath, getStills, images } from "src/api/stills";
import { StillListItemImageConfig } from "src/components/StillListItem";
import { normalizeSources } from "src/utils";

import { ChipAvatarImageConfig } from "./Chips";
import { PosterImageConfig } from "./Credits";
import { type Props, StillImageConfig } from "./Review";

export async function getProps(slug: string): Promise<Props> {
  const { reviews } = await allReviews();

  const review = reviews.find((review) => {
    return review.slug === slug;
  })!;

  const value = await loadContent(review);

  const imagePath = getStillImagePath(value.slug);
  const stillFile = await images[imagePath]();

  const optimizedImage = await getImage({
    src: stillFile.default,
    width: 1200,
    height: 675,
    format: "jpeg",
    quality: 80,
  });

  const seoImageSrc = normalizeSources(optimizedImage.src);

  const stills = await getStills(StillImageConfig);
  const stillImageData = stills[value.slug];
  const avatars = await getAvatars(ChipAvatarImageConfig);

  const stillListStills = await getStills(StillListItemImageConfig);

  const posters = await getFluidWidthPosters(PosterImageConfig);
  const posterImageData = posters[value.slug];

  return {
    value,
    seoImageSrc,
    stillImageData,
    stillListStills,
    posterImageData,
    avatars,
  };
}
