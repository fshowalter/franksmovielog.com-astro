import { basename, extname, join } from "node:path";

import { getImage } from "astro:assets";
import { normalizeSources } from "src/utils";

export interface StillImageData {
  src: string;
  srcSet: string;
}

interface Props {
  width: number;
  height: number;
}

export const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/stills/*.png",
);

export function getStillImagePath(slug: string) {
  return `/${join("content", "assets", "stills")}/${slug}.png`;
}

const cache: Record<string, Record<string, StillImageData>> = {};

export async function getStills({
  width,
  height,
}: Props): Promise<Record<string, StillImageData>> {
  const key = width;

  if (key in cache) {
    return cache[key];
  }

  const imageMap: Record<string, StillImageData> = {};

  await Promise.all(
    Object.keys(images).map(async (image) => {
      const stillFile = await images[image]();

      const optimizedImage = await getImage({
        src: stillFile.default,
        width: width,
        height: height,
        format: "avif",
        widths: [0.25, 0.5, 1, 2].map((w) => w * width),
        quality: 80,
      });

      imageMap[basename(image, extname(image))] = {
        srcSet: normalizeSources(optimizedImage.srcSet.attribute),
        src: normalizeSources(optimizedImage.src),
      };
    }),
  );

  cache[key] = imageMap;

  return imageMap;
}
