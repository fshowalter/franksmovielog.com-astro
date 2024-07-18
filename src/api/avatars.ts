import { basename, extname } from "node:path";

import { getImage } from "astro:assets";

export interface AvatarImageData {
  src: string;
  srcSet: string;
}

export interface Props {
  width: number;
  height: number;
}

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

  await Promise.all(
    Object.keys(images).map(async (image) => {
      const avatarFile = await images[image]();

      const optimizedImage = await getImage({
        src: avatarFile.default,
        width: width,
        height: height,
        format: "avif",
        densities: [1, 2],
        quality: 80,
      });

      imageMap[basename(image, extname(image))] = {
        srcSet: optimizedImage.srcSet.attribute,
        src: optimizedImage.src,
      };
    }),
  );

  cache[key] = imageMap;

  return imageMap;
}
