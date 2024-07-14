import Link from "next/link";

export function ListItemTitle({
  title,
  year,
  slug,
}: {
  title: string;
  year: string;
  slug?: string | null;
}) {
  const yearBox = (
    <span className="text-xs font-light text-subtle">{year}</span>
  );

  if (slug) {
    return (
      <Link href={`/reviews/${slug}/`} className="block text-md">
        {title}&#8239;&#8239;{yearBox}
      </Link>
    );
  }

  return (
    <span className="block text-md">
      {title}&#8239;&#8239;{yearBox}
    </span>
  );
}
