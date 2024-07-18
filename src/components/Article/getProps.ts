import { getPage } from "src/api/pages";
import { allReviews } from "src/api/reviews";
import { getStills } from "src/api/stills";
import { StillListItemImageConfig } from "src/components/StillListItem";

import type { Props } from "./Article";
import { StillImageConfig } from "./Article";

export async function getProps({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}): Promise<Props> {
  const { title, content } = await getPage(slug);

  const { reviews } = await allReviews();

  reviews.sort((a, b) => b.sequence.localeCompare(a.sequence));

  const moreReviewsValues = reviews.slice(0, 4);

  const stills = await getStills(StillImageConfig);
  const imageData = stills[slug];

  const moreReviewsStills = await getStills(StillListItemImageConfig);

  return {
    title,
    content,
    alt,
    moreReviewsStills,
    imageData,
    moreReviewsValues,
  };
}
