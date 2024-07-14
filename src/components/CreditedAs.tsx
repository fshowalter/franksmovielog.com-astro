import { capitalize } from "@/utils";

export function CreditedAs({
  creditedAs,
}: {
  creditedAs: readonly string[];
}): JSX.Element | null {
  return (
    <div className="text-sm leading-4 tracking-0.5px text-subtle">
      {creditedAs.map((credit, index) => {
        if (index === 0) {
          return <span key={credit}>{capitalize(credit)}</span>;
        }

        return <span key={credit}> | {capitalize(credit)}</span>;
      })}
    </div>
  );
}
