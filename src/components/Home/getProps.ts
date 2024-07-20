import { loadExcerptHtml, mostRecentReviews } from "src/api/reviews";
import { getStills } from "src/api/stills";

import type { Props } from "./Home";
import { StillImageConfig } from "./HomeListItem";

export async function getProps(): Promise<Props> {
  const titles = await mostRecentReviews(10);

  const values = await Promise.all(
    titles.map(async (review) => {
      return await loadExcerptHtml(review);
    }),
  );

  const stills = await getStills(StillImageConfig);

  return {
    values,
    stills,
  };
}
