import Image from "next/image";
import Link from "next/link";
import { ListItem } from "@/components/ListItem";
import { ListItemCounts } from "@/components/ListItemCounts";
import { ListInfo } from "../ListWithFiltersLayout/ListInfo";
import type { Collection } from "./Collections";

export function List({
  entities,
  totalCount,
  visibleCount,
}: {
  entities: readonly Collection[];
  totalCount: number;
  visibleCount: number;
}): JSX.Element {
  return (
    <>
      <ListInfo totalCount={totalCount} visibleCount={visibleCount} />
      <ol data-testid="list">
        {entities.map((entity) => {
          return <CollectionListItem key={entity.name} entity={entity} />;
        })}
      </ol>
      <div className="spacer-y-8" />
    </>
  );
}

function CollectionListItem({ entity }: { entity: Collection }): JSX.Element {
  return (
    <ListItem className="items-center">
      <Avatar entity={entity} />
      <CollectionName entity={entity} />
      <ListItemCounts current={entity.reviewCount} total={entity.titleCount} />
    </ListItem>
  );
}

function Avatar({ entity }: { entity: Collection }) {
  let avatarImage;

  if (entity.avatar) {
    avatarImage = (
      <Image
        src={entity.avatar}
        alt={`An image of ${entity.name}`}
        width={64}
        height={64}
      />
    );
  } else {
    avatarImage = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="var(--bg-subtle)"
        width="100%"
      >
        <path
          clipRule="evenodd"
          d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zM8 9a5 5 0 00-4.546 2.916A5.986 5.986 0 008 14a5.986 5.986 0 004.546-2.084A5 5 0 008 9z"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <Link
      href={`/collections/${entity.slug}/`}
      className="safari-border-radius-fix w-16 max-w-16 overflow-hidden rounded-[50%] shadow-all"
    >
      {avatarImage}
    </Link>
  );
}

function CollectionName({ entity }: { entity: Collection }) {
  return (
    <Link href={`/collections/${entity.slug}/`} className="text-md">
      <div className="leading-normal">{entity.name}</div>
    </Link>
  );
}
