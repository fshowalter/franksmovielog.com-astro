export function StatHeading({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <h3 className="sticky top-0 z-30 bg-canvas px-gutter py-2 text-md font-normal desktop:top-[160px] max:top-[128px]">
      {children}
    </h3>
  );
}
