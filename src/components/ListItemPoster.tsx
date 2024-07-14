import Link from "next/link";
import Image from "next/image";

export function ListItemPoster({
  slug,
  title,
  year,
}: {
  slug?: string | null;
  title: string;
  year: string;
}) {
  if (slug) {
    return (
      <Link
        href={`/reviews/${slug}/`}
        className="safari-border-radius-fix min-w-14 max-w-14 shrink-0 overflow-hidden rounded-lg shadow-all"
      >
        <Image
          src={`/assets/posters/${slug}.png`}
          alt={`A poster from ${title} (${year})`}
          width={56}
          height={84}
        />
      </Link>
    );
  }

  return (
    <Image
      src="/assets/posters/default.png"
      alt="An unreviewed title."
      className="safari-border-radius-fix min-w-14 max-w-14 shrink-0 overflow-hidden rounded-lg shadow-all"
      width={56}
      height={84}
    />
  );
}
