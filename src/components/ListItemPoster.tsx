import type { ImageData } from "@/api/posters";

export function ListItemPoster({
  slug,
  title,
  year,
  imageData,
}: {
  slug?: string | null;
  title: string;
  year: string;
  imageData: ImageData;
}) {
  if (slug) {
    return (
      <a
        href={`/reviews/${slug}/`}
        className="safari-border-radius-fix min-w-14 max-w-14 shrink-0 overflow-hidden rounded-lg shadow-all"
      >
        <img {...imageData} alt={`A poster for ${title} (${year})`} />
      </a>
    );
  }

  return <img {...imageData} alt={`No poster for ${title} (${year})`} />;
}
