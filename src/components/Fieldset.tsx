import { twJoin } from "tailwind-merge";

export function Fieldset({
  legend,
  className,
  children,
}: {
  legend: string;
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <fieldset
      className={twJoin(
        "border-all text-subtle px-gutter rounded-md pb-8 pt-6",
        className,
      )}
    >
      <legend className="bg-default px-ch text-center text-md">{legend}</legend>
      <div className="tablet::gap-8 flex flex-wrap justify-between gap-6 *:shrink-0 *:grow *:basis-64">
        {children}
      </div>
    </fieldset>
  );
}
