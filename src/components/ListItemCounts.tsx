export function ListItemCounts({
  current,
  total,
}: {
  current: number;
  total: number;
}): JSX.Element {
  return (
    <div className="ml-auto">
      {current} / {total}
    </div>
  );
}
