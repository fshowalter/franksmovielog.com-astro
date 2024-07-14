export function ListInfo({
  visibleCount,
  totalCount,
}: {
  visibleCount: number;
  totalCount: number;
}): JSX.Element {
  let showingText;

  if (visibleCount > totalCount) {
    showingText = `Showing ${totalCount.toLocaleString()} of ${totalCount.toLocaleString()}`;
  } else {
    showingText = `Showing 1-${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`;
  }

  return (
    <div className="text-subtle px-gutter bg-default desktop:top-[176px] max:top-[128px] sticky top-0 z-40 text-center leading-10">
      {showingText}
    </div>
  );
}
