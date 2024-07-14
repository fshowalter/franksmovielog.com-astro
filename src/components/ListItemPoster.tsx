import type { PosterImageData } from "@/api/posters";

export const ListItemPosterImageConfig = {
  width: 56,
  height: 84,
  quality: 80,
};

export function ListItemPoster({
  slug,
  title,
  year,
  imageData,
}: {
  slug?: string | null;
  title: string;
  year: string;
  imageData: PosterImageData;
}) {
  if (slug) {
    return (
      <a
        href={`/reviews/${slug}/`}
        className="safari-border-radius-fix min-w-14 max-w-14 shrink-0 overflow-hidden rounded-lg shadow-all"
      >
        <img
          {...imageData}
          alt={`A poster from ${title} (${year})`}
          width={ListItemPosterImageConfig.width}
          height={ListItemPosterImageConfig.height}
          loading="lazy"
          decoding="async"
        />
      </a>
    );
  }

  return (
    <img
      {...imageData}
      alt="An unreviewed title."
      className="safari-border-radius-fix min-w-14 max-w-14 shrink-0 overflow-hidden rounded-lg shadow-all"
      width={ListItemPosterImageConfig.width}
      height={ListItemPosterImageConfig.height}
      loading="lazy"
      decoding="async"
    />
  );
}
