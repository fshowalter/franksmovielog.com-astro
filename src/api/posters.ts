import { basename, extname } from "node:path";

import { getImage } from "astro:assets";

export interface PosterImageData {
  src: string;
  srcSet: string;
}

export interface Props {
  width: number;
  height: number;
}

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/posters/*.png",
)!;

const fluidWidthCache: Record<string, Record<string, PosterImageData>> = {};
const fixedWidthCache: Record<string, Record<string, PosterImageData>> = {};

export async function getFluidWidthPosters({
  width,
  height,
}: Props): Promise<Record<string, PosterImageData>> {
  const key = width.toString();

  if (key in fluidWidthCache) {
    return fluidWidthCache[key]!;
  }

  const imageMap: Record<string, PosterImageData> = {};

  await Promise.all(
    Object.keys(images).map(async (image) => {
      const poasterFile = await images[image]!();

      const optimizedImage = await getImage({
        src: poasterFile.default,
        width: width,
        height: height,
        format: "avif",
        widths: [0.25, 0.5, 1, 2].map((w) => w * width),
        quality: 80,
      });

      imageMap[basename(image, extname(image))] = {
        srcSet: optimizedImage.srcSet.attribute,
        src: optimizedImage.src,
      };
    }),
  );

  fluidWidthCache[key] = imageMap;

  return imageMap;
}

export async function getFixedWidthPosters({
  width,
  height,
}: Props): Promise<Record<string, PosterImageData>> {
  const key = width.toString();

  if (key in fixedWidthCache) {
    return fixedWidthCache[key]!;
  }

  const imageMap: Record<string, PosterImageData> = {};

  await Promise.all(
    Object.keys(images).map(async (image) => {
      const poasterFile = await images[image]!();

      const optimizedImage = await getImage({
        src: poasterFile.default,
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

  fixedWidthCache[key] = imageMap;

  return imageMap;
}
