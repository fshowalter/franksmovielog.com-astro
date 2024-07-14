import Image from "next/image";
import Link from "next/link";
import { PageTitle } from "../PageTitle";
import type { CastAndCrewMember } from "./CastAndCrewMember";

function creditList(member: CastAndCrewMember): string {
  const creditString = new Intl.ListFormat().format(member.creditedAs);

  return creditString.charAt(0).toUpperCase() + creditString.slice(1);
}

function reviewedTitleCount(member: CastAndCrewMember): string {
  return `${member.reviewCount} reviewed`;
}

function watchlistTitleCount(member: CastAndCrewMember): string {
  if (member.reviewCount === member.totalCount) {
    return "";
  }

  const watchlistTitleCount = member.totalCount - member.reviewCount;

  return ` and ${watchlistTitleCount} watchlist`;
}

function titles(member: CastAndCrewMember): string {
  const watchlistTitleCount = member.totalCount - member.reviewCount;

  if (member.reviewCount === 1 && watchlistTitleCount < 2) {
    return "title";
  }

  return `titles`;
}

export function Header({ member }: { member: CastAndCrewMember }): JSX.Element {
  return (
    <>
      <div className="text-center leading-9">
        <Link href="/cast-and-crew/">Cast & Crew</Link>
      </div>
      <div className="spacer-y-4" />
      {member.avatar && (
        <div className="flex flex-col items-center">
          <div className="safari-border-radius-fix w-[200px] max-w-[200px] overflow-hidden rounded-[50%] shadow-all">
            <Image
              src={member.avatar}
              alt={member.name}
              width={200}
              height={200}
            />
          </div>
        </div>
      )}
      <div className="spacer-y-4" />
      <PageTitle className="text-center">{member.name}</PageTitle>
      <div className="spacer-y-6" />
      <div className="px-gutter text-center text-subtle">
        {`${creditList(member)} with ${reviewedTitleCount(member)}${watchlistTitleCount(member)} ${titles(member)}.`}
      </div>
    </>
  );
}
