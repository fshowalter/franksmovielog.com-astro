import { BarGradient } from "@/components/BarGradient";
import { StatHeading } from "@/components/StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/StatsTable";

type EntityType = "director" | "writer" | "performer" | "collection";

export interface DetailData {
  name: string;
  reviewCount: number;
  titleCount: number;
  slug: string | null;
}

export function Details({
  label,
  entityType,
  data,
}: {
  label: string;
  entityType: EntityType;
  data: readonly DetailData[];
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
          {data.map((entity) => {
            return (
              <TableRow key={entity.name}>
                <TableDataCell align="left">
                  <EntityName entity={entity} entityType={entityType} />
                </TableDataCell>
                <TableDataCell hideOnSmallScreens align="fill">
                  <BarGradient
                    value={entity.reviewCount}
                    maxValue={entity.titleCount}
                  />
                </TableDataCell>
                <TableDataCell
                  align="right"
                  className={
                    entity.reviewCount === entity.titleCount
                      ? "text-progress"
                      : "text-subtle"
                  }
                >
                  {entity.reviewCount}/{entity.titleCount}
                </TableDataCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
}

function EntityName({
  entity,
  entityType,
}: {
  entityType: EntityType;
  entity: DetailData;
}) {
  let linkTarget;

  if (entityType === "collection") {
    linkTarget = `/collections/${entity.slug}`;
  } else {
    linkTarget = `/cast-and-crew/${entity.slug}`;
  }

  if (entity.slug) return <a href={linkTarget}>{entity.name}</a>;

  return <span className="text-subtle">{entity.name}</span>;
}
