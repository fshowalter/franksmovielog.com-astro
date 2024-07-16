import { CreditedAs } from "src/components/CreditedAs";
import { ListItem } from "src/components/ListItem";
import { ListItemCounts } from "src/components/ListItemCounts";
import { ListInfo } from "src/components/ListInfo";
import type { CastAndCrewMember } from "src/api/castAndCrew";
import type { AvatarImageData } from "src/api/avatars";
import { Avatar } from "src/components/Avatar";

export const AvatarImageConfig = {
  width: 64,
  height: 64,
};

export interface CastAndCrewValue
  extends Pick<
    CastAndCrewMember,
    "name" | "slug" | "totalCount" | "reviewCount" | "creditedAs"
  > {}

export function List({
  values,
  totalCount,
  visibleCount,
  avatars,
}: {
  values: readonly CastAndCrewValue[];
  totalCount: number;
  visibleCount: number;
  avatars: Record<string, AvatarImageData>;
}): JSX.Element {
  return (
    <>
      <ListInfo totalCount={totalCount} visibleCount={visibleCount} />
      <ol data-testid="list">
        {values.map((value) => {
          return (
            <MemberListItem
              key={value.name}
              value={value}
              imageData={avatars[value.slug]}
            />
          );
        })}
      </ol>
      <div className="spacer-y-8" />
    </>
  );
}

function MemberListItem({
  value,
  imageData,
}: {
  value: CastAndCrewValue;
  imageData: AvatarImageData | undefined;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <MemberAvatar value={value} imageData={imageData} />
      <Name value={value} />
      <ListItemCounts current={value.reviewCount} total={value.totalCount} />
    </ListItem>
  );
}

function MemberAvatar({
  value,
  imageData,
}: {
  value: CastAndCrewValue;
  imageData: AvatarImageData | undefined;
}) {
  const avatar = (
    <Avatar
      name={value.name}
      imageData={imageData}
      width={AvatarImageConfig.width}
      height={AvatarImageConfig.height}
      loading="lazy"
      decoding="async"
    />
  );

  if (value.slug) {
    return (
      <a
        href={`/cast-and-crew/${value.slug}/`}
        className="safari-border-radius-fix w-16 max-w-16 overflow-hidden rounded-[50%] shadow-all"
      >
        {avatar}
      </a>
    );
  }

  return <div className="w-16 max-w-16">{avatar}</div>;
}

function Name({ value }: { value: CastAndCrewValue }) {
  return (
    <div>
      <a href={`/cast-and-crew/${value.slug}/`} className="text-md">
        <div className="leading-normal">{value.name}</div>
      </a>
      <div className="spacer-y-1" />
      <CreditedAs creditedAs={value.creditedAs} />
    </div>
  );
}
