import { mostRecentReviews } from "src/api/reviews";
import { getStills } from "src/api/stills";

import type { Props } from "./Home";
import { StillImageConfig } from "./HomeListItem";

export async function getProps(): Promise<Props> {
  const values = await mostRecentReviews(10);

  const stills = await getStills(StillImageConfig);

  return {
    values,
    stills,
  };
}
