import yearStatsJson from "@/data/yearStatsJson";
import type { MostWatchedPerson } from "@/data/yearStatsJson";
import type { YearStatsProps } from "./YearStats";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatViewingDatesForMostWatchedPeople(
  mostWatchedPeople: MostWatchedPerson[],
) {
  return mostWatchedPeople.map((person) => {
    return {
      ...person,
      viewingsData: person.viewings.map((viewing) => {
        const viewingDate = new Date(viewing.date);
        return {
          ...viewing,
          date: dateFormat.format(viewingDate),
        };
      }),
    };
  });
}

export default async function getComponentData(
  year: string,
): Promise<YearStatsProps> {
  const json = await yearStatsJson();

  const statYears = new Set<string>();

  json.forEach((stats) => {
    statYears.add(stats.year);
  });

  const statYear = json.find((stats) => {
    return stats.year === year;
  });

  if (!statYear) {
    throw new Error(`No stat year found for ${year}`);
  }

  const props: YearStatsProps = {
    year: year,
    data: {
      ...statYear,
      mostWatchedDirectors: formatViewingDatesForMostWatchedPeople(
        statYear.mostWatchedDirectors,
      ),
      mostWatchedPerformers: formatViewingDatesForMostWatchedPeople(
        statYear.mostWatchedPerformers,
      ),
      mostWatchedWriters: formatViewingDatesForMostWatchedPeople(
        statYear.mostWatchedWriters,
      ),
    },
    statYears: Array.from(statYears).toSorted(),
  };

  return props;
}
