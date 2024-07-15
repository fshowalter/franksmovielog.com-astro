import type { AvatarImageData } from "src/api/avatars";
import type { Review } from "src/api/reviews";
import { Avatar } from "src/components/Avatar";

export const ChipAvatarImageConfig = {
  width: 40,
  height: 40,
  quality: 80,
};

export interface ChipsReviewData
  extends Pick<Review, "castAndCrew" | "collections"> {}

export function Chips({
  review,
  avatars,
}: {
  review: ChipsReviewData;
  avatars: Record<string, AvatarImageData>;
}): JSX.Element {
  return (
    <ul className="flex flex-wrap gap-2">
      {review.castAndCrew.map((member) => {
        return (
          <Chip
            linkTarget={`/cast-and-crew/${member.slug}`}
            name={member.name}
            key={member.slug}
            imageData={avatars[member.slug]}
          />
        );
      })}
      {review.collections.map((collection) => {
        return (
          <Chip
            linkTarget={`/collections/${collection.slug}`}
            name={collection.name}
            key={collection.slug}
            imageData={avatars[collection.slug]}
          />
        );
      })}
    </ul>
  );
}

function Chip({
  linkTarget,
  name,
  imageData,
}: {
  linkTarget: string;
  name: string;
  imageData: AvatarImageData | unknown;
}) {
  return (
    <li className="block">
      <a
        href={linkTarget}
        className="border-all hover:border-all-accent flex items-center whitespace-nowrap rounded-lg bg-inverse px-4 py-2"
      >
        <Avatar
          alt={`More ${name} reviews`}
          name={name}
          width={ChipAvatarImageConfig.width}
          height={ChipAvatarImageConfig.height}
          imageData={imageData}
          loading="lazy"
          decoding="async"
          className="avatar-border mr-[1ch] block size-10"
        />
        {name}
      </a>
    </li>
  );
}
