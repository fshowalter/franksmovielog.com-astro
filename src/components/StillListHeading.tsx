export function StillListHeading({
  leadText,
  linkText,
  linkTarget,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
}) {
  return (
    <div className="border-bottom w-full px-gutter py-2 tablet:py-4 tablet:shadow-none desktop:px-pageMargin desktop:py-4">
      <span className="font-semibold text-muted">{leadText} </span>
      <a href={linkTarget}>{linkText}</a>
    </div>
  );
}
