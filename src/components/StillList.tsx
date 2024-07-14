import Link from "next/link";
import { StillListItem } from "./StillListItem";
import type { StillListItemData } from "./StillListItem";

export function StillList({
  data,
  seeAllLinkText,
  seeAllLinkTarget,
}: {
  data: StillListItemData[];
  seeAllLinkText: string;
  seeAllLinkTarget: string;
}): JSX.Element {
  return (
    <ul className="w-full tablet:grid tablet:w-auto tablet:grid-cols-[repeat(2,minmax(100px,312px))] tablet:gap-8 tablet:px-gutter desktop:max-w-unset desktop:grid-cols-[repeat(4,1fr)] desktop:px-pageMargin desktop:pt-2">
      {data.map((title) => {
        return <StillListItem key={title.slug} data={title} />;
      })}
      <li className="col-[1_/_-1] block px-gutter py-4 text-right shadow-bottom shadow-border tablet:absolute tablet:right-0 tablet:top-0 tablet:shadow-none desktop:right-[var(--gutter-width)]">
        <Link href={seeAllLinkTarget}>
          All{" "}
          <span className="inline tablet:hidden desktop:inline">
            {seeAllLinkText}
          </span>{" "}
          &#8594;
        </Link>
      </li>
    </ul>
  );
}
