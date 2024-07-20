import type { AvatarImageData } from "src/api/avatars";
import type { Collection } from "src/api/collections";
import { ListInfo } from "src/components/ListInfo";
import { ListItem } from "src/components/ListItem";
import { ListItemAvatar } from "src/components/ListItemAvatar";
import { ListItemCounts } from "src/components/ListItemCounts";

export interface ListItemValue
  extends Pick<Collection, "name" | "slug" | "titleCount" | "reviewCount"> {}

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
            <CollectionListItem
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

function CollectionListItem({
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
        href={`/collections/${value.slug}/`}
        imageData={imageData}
      />
      <CollectionName value={value} />
      <ListItemCounts current={value.reviewCount} total={value.titleCount} />
    </ListItem>
  );
}

function CollectionName({ value }: { value: ListItemValue }) {
  return (
    <a href={`/collections/${value.slug}/`} className="text-md text-accent">
      <div className="leading-normal">{value.name}</div>
    </a>
  );
}
