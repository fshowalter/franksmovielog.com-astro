import { CreditedAs } from "@/components/CreditedAs";
import Image from "next/image";
import Link from "next/link";
import { ListItem } from "@/components/ListItem";
import { ListItemCounts } from "@/components/ListItemCounts";
import { ListInfo } from "@/components/ListWithFiltersLayout/ListInfo";

export interface CastAndCrewListItemData {
  name: string;
  slug: string | null;
  totalCount: number;
  reviewCount: number;
  creditedAs: string[];
  avatar: string | null;
}

export function List({
  data,
  totalCount,
  visibleCount,
}: {
  data: readonly CastAndCrewListItemData[];
  totalCount: number;
  visibleCount: number;
}): JSX.Element {
  return (
    <>
      <ListInfo totalCount={totalCount} visibleCount={visibleCount} />
      <ol data-testid="list">
        {data.map((member) => {
          return <MemberListItem key={member.name} data={member} />;
        })}
      </ol>
      <div className="spacer-y-8" />
    </>
  );
}

function MemberListItem({
  data,
}: {
  data: CastAndCrewListItemData;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <Avatar data={data} />
      <Name data={data} />
      <ListItemCounts current={data.reviewCount} total={data.totalCount} />
    </ListItem>
  );
}

function Avatar({ data }: { data: CastAndCrewListItemData }) {
  if (data.avatar) {
    return (
      <Link
        href={`/cast-and-crew/${data.slug}/`}
        className="safari-border-radius-fix w-16 max-w-16 overflow-hidden rounded-[50%] shadow-all"
      >
        <Image
          src={data.avatar}
          alt={`An image of ${data.name}`}
          width={64}
          height={64}
        />
      </Link>
    );
  }

  return (
    <div className="w-16 max-w-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="var(--bg-stripe)"
        width="100%"
      >
        <path
          clipRule="evenodd"
          d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zM8 9a5 5 0 00-4.546 2.916A5.986 5.986 0 008 14a5.986 5.986 0 004.546-2.084A5 5 0 008 9z"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}

function Name({ data }: { data: CastAndCrewListItemData }) {
  return (
    <div>
      <Link href={`/cast-and-crew/${data.slug}/`} className="text-md">
        <div className="leading-normal">{data.name}</div>
      </Link>
      <div className="spacer-y-1" />
      <CreditedAs creditedAs={data.creditedAs} />
    </div>
  );
}
