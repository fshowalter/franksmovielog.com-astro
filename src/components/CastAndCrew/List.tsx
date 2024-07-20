import type { AvatarImageData } from "src/api/avatars";
import type { CastAndCrewMember } from "src/api/castAndCrew";
import { CreditedAs } from "src/components/CreditedAs";
import { ListInfo } from "src/components/ListInfo";
import { ListItem } from "src/components/ListItem";
import { ListItemAvatar } from "src/components/ListItemAvatar";
import { ListItemCounts } from "src/components/ListItemCounts";

export interface ListItemValue
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
  values: readonly ListItemValue[];
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
  value: ListItemValue;
  imageData: AvatarImageData | undefined;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <ListItemAvatar
        name={value.name}
        href={`/cast-and-crew/${value.slug}/`}
        imageData={imageData}
      />
      <Name value={value} />
      <ListItemCounts current={value.reviewCount} total={value.totalCount} />
    </ListItem>
  );
}

function Name({ value }: { value: ListItemValue }) {
  return (
    <div>
      <a href={`/cast-and-crew/${value.slug}/`} className="text-md text-accent">
        <div className="leading-normal">{value.name}</div>
      </a>
      <div className="spacer-y-1" />
      <CreditedAs values={value.creditedAs} />
    </div>
  );
}
