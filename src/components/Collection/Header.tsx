import type { AvatarImageData } from "src/api/avatars";
import type { Collection } from "src/api/collections";
import { Avatar } from "src/components/Avatar";
import { PageTitle } from "src/components/PageTitle";
import { RenderedMarkdown } from "src/components/RenderedMarkdown";

export const AvatarImageConfig = {
  width: 200,
  height: 200,
};

function tagline(titleCount: number, reviewCount: number): string {
  if (titleCount === reviewCount) {
    return `Collection of ${reviewCount.toLocaleString()} reviewed movies.`;
  }

  return `Collection of ${titleCount.toLocaleString()} movies. ${reviewCount.toLocaleString()} reviewed.`;
}

interface Props
  extends Pick<
    Collection,
    "name" | "description" | "titleCount" | "reviewCount"
  > {
  avatarImageData: AvatarImageData;
}

export function Header({
  name,
  description,
  avatarImageData,
  titleCount,
  reviewCount,
}: Props): JSX.Element {
  return (
    <>
      <div className="text-center leading-9">
        <a href="/collections/">Collections</a>
      </div>
      <div className="spacer-y-4" />
      {avatarImageData && (
        <div className="flex flex-col items-center">
          <div className="safari-border-radius-fix w-[200px] max-w-[200px] overflow-hidden rounded-[50%] shadow-all">
            <Avatar
              imageData={avatarImageData}
              name={name}
              width={AvatarImageConfig.width}
              height={AvatarImageConfig.height}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}
      <div className="spacer-y-4" />
      <PageTitle className="text-center">{name}</PageTitle>
      <div className="spacer-y-6" />
      <div className="max-w-prose px-gutter text-center text-subtle">
        <RenderedMarkdown
          // eslint-disable-next-line react/no-danger
          text={description || tagline(titleCount, reviewCount)}
          className="leading-none"
          as="span"
        />
      </div>
    </>
  );
}
