import { allReviews } from "@/api/reviews";
import { join } from "node:path";
import { getImage } from "astro:assets";

export interface StillImageData {
  src: string;
  srcSet: string;
}

export interface Props {
  width: number;
  height: number;
}

const { reviews } = await allReviews();
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
    return cache[key]!;
  }

  const imageMap: Record<string, StillImageData> = {};

  reviews.forEach(async (review) => {
    const imagePath = getStillImagePath(review.slug);

    if (images[imagePath]) {
      const stillFile = await images[imagePath]();

      const optimizedImage = await getImage({
        src: stillFile.default,
        width: width,
        height: height,
        format: "avif",
        widths: [0.25, 0.5, 1, 2].map((w) => w * width),
        quality: 80,
      });

      imageMap[review.slug] = {
        srcSet: optimizedImage.srcSet.attribute,
        src: optimizedImage.src,
      };
    }
  });

  cache[key] = imageMap;

  return imageMap;
}
