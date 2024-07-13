import { allReviews } from "@/api/reviews";
import { join } from "node:path";
import { getImage } from "astro:assets";

export interface ImageData {
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

const reviews = await allReviews();
const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/posters/*.png",
);

const cache: Record<string, Record<string, ImageData>> = {};

export async function allPosters(
  width: number,
): Promise<Record<string, ImageData>> {
  const key = width.toString();

  if (key in cache) {
    return cache[key]!;
  }

  const height = width * 1.5;

  const imageMap: Record<string, ImageData> = {};

  reviews.forEach(async (review) => {
    const imagePath = `/${join("content", "assets", "posters")}/${review.slug}.png`;

    if (images[imagePath]) {
      const poasterFile = await images[imagePath]();

      const optimizedImage = await getImage({
        src: poasterFile.default,
        width: width,
        height: height,
        format: "avif",
        densities: [1, 2],
        quality: 80,
      });

      imageMap[review.slug] = {
        width: width,
        height: height,
        srcSet: optimizedImage.srcSet.attribute,
        src: optimizedImage.src,
      };
    }
  });

  cache[key] = imageMap;

  return imageMap;
}
