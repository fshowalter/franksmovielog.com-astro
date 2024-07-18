import type { AvatarImageData } from "src/api/avatars";
import { PageTitle } from "src/components/PageTitle";

import { Avatar } from "../Avatar";

export const AvatarImageConfig = {
  width: 200,
  height: 200,
};

function creditList(creditedAs: string[]): string {
  const creditString = new Intl.ListFormat().format(creditedAs);

  return creditString.charAt(0).toUpperCase() + creditString.slice(1);
}

function reviewedTitleCount(reviewCount: number): string {
  return `${reviewCount} reviewed`;
}

function watchlistTitleCount(reviewCount: number, totalCount: number): string {
  if (reviewCount === totalCount) {
    return "";
  }

  const watchlistTitleCount = totalCount - reviewCount;

  return ` and ${watchlistTitleCount} watchlist`;
}

function titles(reviewCount: number, totalCount: number): string {
  const watchlistTitleCount = totalCount - reviewCount;

  if (reviewCount === 1 && watchlistTitleCount < 2) {
    return "title";
  }

  return `titles`;
}

export function Header({
  name,
  creditedAs,
  reviewCount,
  totalCount,
  avatarImageData,
}: {
  name: string;
  creditedAs: string[];
  reviewCount: number;
  totalCount: number;
  avatarImageData: AvatarImageData;
}): JSX.Element {
  return (
    <>
      <div className="text-center leading-9">
        <a href="/cast-and-crew/">Cast & Crew</a>
      </div>
      <div className="spacer-y-4" />
      {avatarImageData && (
        <div className="flex flex-col items-center">
          <div className="safari-border-radius-fix w-[200px] max-w-[200px] overflow-hidden rounded-[50%] shadow-all">
            <Avatar
              imageData={avatarImageData}
              name={name}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}
      <div className="spacer-y-4" />
      <PageTitle className="text-center">{name}</PageTitle>
      <div className="spacer-y-6" />
      <div className="px-gutter text-center text-subtle">
        {`${creditList(creditedAs)} with ${reviewedTitleCount(reviewCount)}${watchlistTitleCount(reviewCount, totalCount)} ${titles(reviewCount, totalCount)}.`}
      </div>
    </>
  );
}
