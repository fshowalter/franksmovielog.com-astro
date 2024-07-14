import { allReviews } from "@/api/reviews";
import { join } from "node:path";
import { getImage } from "astro:assets";

export interface PosterImageData {
  src: string;
  srcSet: string;
}

export interface Props {
  width: number;
  height: number;
}

const reviews = await allReviews();
const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/posters/*.png",
);

const cache: Record<string, Record<string, PosterImageData>> = {};

export async function getPosters({
  width,
  height,
}: Props): Promise<Record<string, PosterImageData>> {
  const key = width.toString();

  if (key in cache) {
    return cache[key]!;
  }

  const imageMap: Record<string, PosterImageData> = {};

  reviews.forEach(async (review) => {
    const imagePath = `/${join("content", "assets", "posters")}/${review.slug}.png`;

    if (images[imagePath]) {
      const poasterFile = await images[imagePath]();

      const optimizedImage = await getImage({
        src: poasterFile.default,
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
