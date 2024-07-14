import type { StillImageData } from "@/api/stills";
import { StillListItem } from "./StillListItem";
import type { StillListItemData } from "./StillListItem";

export function StillList({
  titles,
  seeAllLinkText,
  seeAllLinkTarget,
  stills,
}: {
  titles: StillListItemData[];
  seeAllLinkText: string;
  seeAllLinkTarget: string;
  stills: Record<string, StillImageData>;
}): JSX.Element {
  return (
    <ul className="w-full tablet:grid tablet:w-auto tablet:grid-cols-[repeat(2,minmax(100px,312px))] tablet:gap-8 tablet:px-gutter desktop:max-w-unset desktop:grid-cols-[repeat(4,1fr)] desktop:px-pageMargin desktop:pt-2">
      {titles.map((title) => {
        return (
          <StillListItem
            key={title.slug}
            title={title}
            imageData={stills[title.slug]!}
          />
        );
      })}
      <li className="col-[1_/_-1] block px-gutter py-4 text-right shadow-bottom shadow-border tablet:absolute tablet:right-0 tablet:top-0 tablet:shadow-none desktop:right-[var(--gutter-width)]">
        <a href={seeAllLinkTarget}>
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
