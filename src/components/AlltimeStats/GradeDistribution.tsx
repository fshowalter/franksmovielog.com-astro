import { BarGradient } from "src/components/BarGradient";
import { StatHeading } from "src/components/StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "src/components/StatsTable";

export interface GradeDistributionData {
  name: string;
  count: number;
}

export function GradeDistribution({
  data,
}: {
  data: readonly GradeDistributionData[];
}): JSX.Element | null {
  const maxBar = data.reduce((acc, distribution) => {
    const value = distribution.count;
    return acc > value ? acc : value;
  }, 0);

  return (
    <section>
      <StatHeading>Grade Distribution</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Grade</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Reviews</TableHeaderCell>
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
