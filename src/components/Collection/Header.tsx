import Image from "next/image";
import Link from "next/link";
import { PageTitle } from "../PageTitle";
import { RenderedMarkdown } from "../RenderedMarkdown";
import type { Collection } from "./Collection";

function tagline(collection: Collection): string {
  if (collection.titles.length === collection.reviewCount) {
    return `Collection of ${collection.reviewCount.toLocaleString()} reviewed movies.`;
  }

  return `Collection of ${collection.titles.length.toLocaleString()} movies. ${collection.reviewCount.toLocaleString()} reviewed.`;
}

export function Header({
  collection,
}: {
  collection: Collection;
}): JSX.Element {
  return (
    <>
      <div className="text-center leading-9">
        <Link href="/collections/">Collections</Link>
      </div>
      <div className="spacer-y-4" />
      {collection.avatar && (
        <div className="flex flex-col items-center">
          <div className="safari-border-radius-fix w-[200px] max-w-[200px] overflow-hidden rounded-[50%] shadow-all">
            <Image
              src={collection.avatar}
              alt={collection.name}
              width={200}
              height={200}
            />
          </div>
        </div>
      )}
      <div className="spacer-y-4" />
      <PageTitle className="text-center">{collection.name}</PageTitle>
      <div className="spacer-y-6" />
      <div className="max-w-prose px-gutter text-center text-subtle">
        <RenderedMarkdown
          // eslint-disable-next-line react/no-danger
          text={collection.description || tagline(collection)}
          className="leading-none"
          as="span"
        />
      </div>
    </>
  );
}
