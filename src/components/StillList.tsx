import type { StillImageData } from "src/api/stills";

import type { StillListItemValue } from "./StillListItem";
import { StillListItem } from "./StillListItem";

export function StillList({
  values,
  seeAllLinkText,
  seeAllLinkTarget,
  stills,
}: {
  values: StillListItemValue[];
  seeAllLinkText: string;
  seeAllLinkTarget: string;
  stills: Record<string, StillImageData>;
}): JSX.Element {
  return (
    <ul className="w-full tablet:grid tablet:w-auto tablet:grid-cols-[repeat(2,minmax(100px,312px))] tablet:gap-8 tablet:px-gutter desktop:max-w-unset desktop:grid-cols-[repeat(4,1fr)] desktop:px-pageMargin desktop:pt-2">
      {values.map((value) => {
        return (
          <StillListItem
            key={value.slug}
            value={value}
            imageData={stills[value.slug]}
          />
        );
      })}
      <li className="col-[1_/_-1] block px-gutter py-4 text-right shadow-bottom shadow-border tablet:absolute tablet:right-0 tablet:top-0 tablet:shadow-none desktop:right-[var(--gutter-width)]">
        <a className="text-accent" href={seeAllLinkTarget}>
          All{" "}
          <span className="inline tablet:hidden desktop:inline">
            {seeAllLinkText}
          </span>{" "}
          &#8594;
        </a>
      </li>
    </ul>
  );
}
