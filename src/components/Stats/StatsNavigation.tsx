import Link from "next/link";

function AllTimeLink({
  currentYear,
  linkFunc,
}: {
  currentYear: string;
  linkFunc: (year: string) => string;
}): JSX.Element {
  if (!currentYear || currentYear === "all") {
    return <></>;
  }

  return (
    <li className="block">
      <Link href={linkFunc("all")}>All-Time</Link>
    </li>
  );
}

function YearLink({
  year,
  currentYear,
  linkFunc,
}: {
  year: string;
  currentYear: string;
  linkFunc: (y: string) => string;
}): JSX.Element | null {
  if (year === currentYear) {
    return <li className="block">{year}</li>;
  }

  return (
    <li className="block">
      <Link href={linkFunc(year)}>{year}</Link>
    </li>
  );
}

export function StatsNavigation({
  currentYear,
  years,
  linkFunc,
}: {
  currentYear: string;
  years: readonly string[];
  linkFunc: (year: string) => string;
}): JSX.Element {
  return (
    <ul className="flex flex-wrap justify-center gap-4 text-md">
      <AllTimeLink currentYear={currentYear} linkFunc={linkFunc} />
      {[...years].reverse().map((year) => {
        return (
          <YearLink
            key={year}
            year={year}
            currentYear={currentYear}
            linkFunc={linkFunc}
          />
        );
      })}
    </ul>
  );
}
