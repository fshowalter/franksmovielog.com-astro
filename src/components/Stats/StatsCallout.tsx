export function StatsCallout({
  stat,
  label,
}: {
  stat: number;
  label: string;
}): JSX.Element {
  return (
    <div className="flex size-36 flex-col justify-center rounded-[50%] text-center shadow-all">
      <div className="text-[2rem] leading-8">{stat.toLocaleString()}</div>{" "}
      <div className="text-subtle">{label}</div>
    </div>
  );
}
