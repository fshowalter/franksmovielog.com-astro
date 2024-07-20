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
      <a href={`/reviews/${slug}/`} className="block text-md text-accent">
        {title}&#8239;&#8239;{yearBox}
      </a>
    );
  }

  return (
    <span className="block text-md">
      {title}&#8239;&#8239;{yearBox}
    </span>
  );
}
