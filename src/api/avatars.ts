import { allCastAndCrew } from "src/api/castAndCrew";
import { join } from "node:path";
import { getImage } from "astro:assets";

export interface AvatarImageData {
  src: string;
  srcSet: string;
}

export interface Props {
  width: number;
  height: number;
}

const castAndCrew = await allCastAndCrew();
const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/avatars/*.png",
);

const cache: Record<string, Record<string, AvatarImageData>> = {};

export async function getAvatars({
  width,
  height,
}: Props): Promise<Record<string, AvatarImageData>> {
  const key = width.toString();

  if (key in cache) {
    return cache[key]!;
  }

  const imageMap: Record<string, AvatarImageData> = {};

  castAndCrew.forEach(async (member) => {
    const imagePath = `/${join("content", "assets", "avatars")}/${member.slug}.png`;

    if (images[imagePath]) {
      const avatarFile = await images[imagePath]();

      const optimizedImage = await getImage({
        src: avatarFile.default,
        width: width,
        height: height,
        format: "avif",
        densities: [1, 2, 3, 4],
        quality: 80,
      });

      imageMap[member.slug] = {
        srcSet: optimizedImage.srcSet.attribute,
        src: optimizedImage.src,
      };
    }
  });

  cache[key] = imageMap;

  return imageMap;
}
