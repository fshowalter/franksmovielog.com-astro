import { BarGradient } from "@/components/BarGradient";
import { StatHeading } from "@/components/StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/StatsTable";

export interface DecadeDistributionData {
  name: string;
  count: number;
}

export function DecadeDistribution({
  data,
}: {
  data: readonly DecadeDistributionData[];
}): JSX.Element {
  const maxBar = data.reduce((acc, distribution) => {
    const value = distribution.count;
    return acc > value ? acc : value;
  }, 0);

  return (
    <section>
      <StatHeading>By Release Year</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Decade</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Viewings</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {data.map((distribution) => {
            return (
              <TableRow key={distribution.name}>
                <TableDataCell align="left">{distribution.name}</TableDataCell>
                <TableDataCell align="fill">
                  <BarGradient value={distribution.count} maxValue={maxBar} />
                </TableDataCell>
                <TableDataCell align="right">
                  {distribution.count}
                </TableDataCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
}
