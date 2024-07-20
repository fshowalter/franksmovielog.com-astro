import { BarGradient } from "src/components/BarGradient";
import { StatHeading } from "src/components/StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "src/components/StatsTable";

type ValueType = "director" | "writer" | "performer" | "collection";

interface Value {
  name: string;
  reviewCount: number;
  titleCount: number;
  slug: string | null;
}

export function Details({
  label,
  valueType,
  values,
}: {
  label: string;
  valueType: ValueType;
  values: Value[];
}) {
  return (
    <section>
      <StatHeading>{label}</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Name</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Progress</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {values.map((value) => {
            return (
              <TableRow key={value.name}>
                <TableDataCell align="left">
                  <Name value={value} valueType={valueType} />
                </TableDataCell>
                <TableDataCell hideOnSmallScreens align="fill">
                  <BarGradient
                    value={value.reviewCount}
                    maxValue={value.titleCount}
                  />
                </TableDataCell>
                <TableDataCell
                  align="right"
                  className={
                    value.reviewCount === value.titleCount
                      ? "text-progress"
                      : "text-subtle"
                  }
                >
                  {value.reviewCount}/{value.titleCount}
                </TableDataCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
}

function Name({ value, valueType }: { valueType: ValueType; value: Value }) {
  let linkTarget;

  if (valueType === "collection") {
    linkTarget = `/collections/${value.slug}`;
  } else {
    linkTarget = `/cast-and-crew/${value.slug}`;
  }

  if (value.slug)
    return (
      <a className="text-accent" href={linkTarget}>
        {value.name}
      </a>
    );

  return <span className="text-subtle">{value.name}</span>;
}
