import type { StillImageData } from "src/api/stills";

import type { ListItemValue } from "./HomeListItem";
import { HomeListItem } from "./HomeListItem";

export function Home({
  values,
  stills,
}: {
  values: ListItemValue[];
  stills: Record<string, StillImageData>;
}): JSX.Element {
  return (
    <main>
      <ol className="flex flex-col">
        {values.map((value, index) => {
          return (
            <HomeListItem
              key={value.sequence}
              value={value}
              eagerLoadImage={index === 0}
              stillImageData={stills[value.slug]}
            />
          );
        })}
      </ol>
      <a
        href="/reviews/"
        className="flex justify-end px-pageMargin py-10 text-lg text-accent"
      >
        All Reviews →
      </a>
    </main>
  );
}
