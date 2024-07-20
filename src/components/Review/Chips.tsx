import type { AvatarImageData } from "src/api/avatars";
import type { Review } from "src/api/reviews";
import { Avatar } from "src/components/Avatar";

export const ChipAvatarImageConfig = {
  width: 40,
  height: 40,
  quality: 80,
};

interface Props extends Pick<Review, "castAndCrew" | "collections"> {
  avatars: Record<string, AvatarImageData>;
}

export function Chips({
  castAndCrew,
  collections,
  avatars,
}: Props): JSX.Element {
  return (
    <ul className="flex flex-wrap gap-2">
      {castAndCrew.map((member) => {
        return (
          <Chip
            linkTarget={`/cast-and-crew/${member.slug}`}
            name={member.name}
            key={member.slug}
            imageData={avatars[member.slug]}
          />
        );
      })}
      {collections.map((collection) => {
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
  imageData: AvatarImageData | undefined;
}) {
  return (
    <li className="block">
      <a
        href={linkTarget}
        className="flex items-center whitespace-nowrap rounded-lg bg-inverse px-4 py-2 text-accent shadow-all hover:shadow-accent"
      >
        <Avatar
          alt={`More ${name} reviews`}
          name={name}
          width={ChipAvatarImageConfig.width}
          height={ChipAvatarImageConfig.height}
          imageData={imageData}
          loading="lazy"
          decoding="async"
          className="mr-[1ch] block size-10 rounded-[50%]"
        />
        {name}
      </a>
    </li>
  );
}
