import { allReviews } from "@/api/reviews";
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

const fluidCache: Record<string, Record<string, PosterImageData>> = {};
const fixedWidthCache: Record<string, Record<string, PosterImageData>> = {};

const defaultImagePath = `/content/assets/posters/default.png`;

export async function getPosters({
  width,
  height,
}: Props): Promise<Record<string, PosterImageData>> {
  const key = width.toString();

  if (key in fluidCache) {
    return fluidCache[key]!;
  }

  const imageMap: Record<string, PosterImageData> = {};

  reviews.forEach(async (review) => {
    let imagePath = imagePathForSlug(review.slug);

    if (!(imagePath in images)) {
      imagePath = defaultImagePath;
    }

    const poasterFile = await images[imagePath]!();

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
  });

  fluidCache[key] = imageMap;

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

  reviews.forEach(async (review) => {
    let imagePath = imagePathForSlug(review.slug);

    if (!(imagePath in images)) {
      imagePath = defaultImagePath;
    }

    const poasterFile = await images[imagePath]!();

    const optimizedImage = await getImage({
      src: poasterFile.default,
      width: width,
      height: height,
      format: "avif",
      densities: [1, 2],
      quality: 80,
    });

    imageMap[review.slug] = {
      srcSet: optimizedImage.srcSet.attribute,
      src: optimizedImage.src,
    };
  });

  fixedWidthCache[key] = imageMap;

  return imageMap;
}

function imagePathForSlug(slug: string) {
  return `/content/assets/posters/${slug}.png`;
}
