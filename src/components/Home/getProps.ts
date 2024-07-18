import { allReviews } from "src/api/reviews";
import { getStills } from "src/api/stills";

import type { Props } from "./Home";
import { StillImageConfig } from "./HomeListItem";

export async function getProps(): Promise<Props> {
  const { reviews } = await allReviews();

  reviews.sort((a, b) => b.sequence.localeCompare(a.sequence));

  const values = reviews.slice(0, 10);

  const stills = await getStills(StillImageConfig);

  return {
    values,
    stills,
  };
}
