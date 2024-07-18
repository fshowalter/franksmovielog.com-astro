import { allReviews } from "src/api/reviews";
import type { StillImageData } from "src/api/stills";
import { getStills } from "src/api/stills";

import { type ListItemValue,StillImageConfig } from "./HomeListItem";

interface Data {
  values: ListItemValue[];
  stills: Record<string, StillImageData>;
}

export async function getData(): Promise<Data> {
  const { reviews } = await allReviews();

  reviews.sort((a, b) => b.sequence.localeCompare(a.sequence));

  const values = reviews.slice(0, 10);

  const stills = await getStills(StillImageConfig);

  return {
    values,
    stills,
  };
}
