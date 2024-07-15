import type { PosterImageData } from "src/api/posters";

export const ListItemPosterImageConfig = {
  width: 56,
  height: 84,
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
          className="aspect-[0.66666667]"
        />
      </a>
    );
  }

  return (
    <div className="safari-border-radius-fix min-w-14 max-w-14 shrink-0 overflow-hidden rounded-lg shadow-all">
      <img
        {...imageData}
        alt="An unreviewed title."
        width={ListItemPosterImageConfig.width}
        height={ListItemPosterImageConfig.height}
        loading="lazy"
        decoding="async"
        className="aspect-[0.66666667]"
      />
    </div>
  );
}
