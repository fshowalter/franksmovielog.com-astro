import { promises as fs } from "node:fs";
import { z } from "zod";
import { join } from "path";

const yearStatsJsonDirectory = join(
  process.cwd(),
  "content",
  "data",
  "year-stats",
);

const Distribution = z.object({
  name: z.string(),
  count: z.number(),
});

const MostWatchedTitle = z.object({
  title: z.string(),
  imdbId: z.string(),
  year: z.string(),
  count: z.number(),
  slug: z.nullable(z.string()),
});

const MostWatchedPersonViewing = z.object({
  sequence: z.number(),
  date: z.string(),
  slug: z.nullable(z.string()),
  title: z.string(),
  medium: z.nullable(z.string()),
  venue: z.nullable(z.string()),
  year: z.string(),
});

const MostWatchedPersonSchema = z.object({
  name: z.string(),
  count: z.number(),
  slug: z.nullable(z.string()),
  viewings: z.array(MostWatchedPersonViewing),
});

export type MostWatchedPerson = z.infer<typeof MostWatchedPersonSchema>;

const YearStatsJsonSchema = z.object({
  year: z.string(),
  newTitleCount: z.number(),
  viewingCount: z.number(),
  titleCount: z.number(),
  mediaDistribution: z.array(Distribution),
  decadeDistribution: z.array(Distribution),
  mostWatchedTitles: z.array(MostWatchedTitle),
  mostWatchedDirectors: z.array(MostWatchedPersonSchema),
  mostWatchedPerformers: z.array(MostWatchedPersonSchema),
  mostWatchedWriters: z.array(MostWatchedPersonSchema),
});

type YearStatsJson = z.infer<typeof YearStatsJsonSchema>;

let allYearStatsJson: YearStatsJson[];

async function parseAllYearStatsJson() {
  const dirents = await fs.readdir(yearStatsJsonDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((item) => !item.isDirectory() && item.name.endsWith(".json"))
      .map(async (item) => {
        const fileContents = await fs.readFile(
          `${yearStatsJsonDirectory}/${item.name}`,
          "utf8",
        );

        const json = JSON.parse(fileContents) as unknown;
        return YearStatsJsonSchema.parse(json);
      }),
  );
}

export default async function yearStatsJson(): Promise<YearStatsJson[]> {
  if (!allYearStatsJson) {
    allYearStatsJson = await parseAllYearStatsJson();
  }

  return allYearStatsJson;
}
