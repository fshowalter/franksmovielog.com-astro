import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const castAndCrewJsonDirectory = getContentPath("data", "cast-and-crew");

const TitleSchema = z.object({
  creditedAs: z.array(z.string()),
  imdbId: z.string(),
  title: z.string(),
  year: z.string(),
  slug: z.nullable(z.string()),
  grade: z.nullable(z.string()),
  sortTitle: z.string(),
  gradeValue: z.nullable(z.number()),
  releaseSequence: z.string(),
  reviewDate: z.nullable(z.string()),
  viewingSequence: z.nullable(z.string()),
  watchlistDirectorNames: z.array(z.string()),
  watchlistPerformerNames: z.array(z.string()),
  watchlistWriterNames: z.array(z.string()),
  collectionNames: z.array(z.string()),
});

const CastAndCrewJsonSchema = z.object({
  name: z.string(),
  slug: z.string(),
  reviewCount: z.number(),
  totalCount: z.number(),
  creditedAs: z.array(z.string()),
  titles: z.array(TitleSchema),
});

async function parseAllCastAndCrewJson() {
  const dirents = await fs.readdir(castAndCrewJsonDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((item) => !item.isDirectory() && item.name.endsWith(".json"))
      .map(async (item) => {
        const fileContents = await fs.readFile(
          `${castAndCrewJsonDirectory}/${item.name}`,
          "utf8",
        );

        const json = JSON.parse(fileContents) as unknown;
        return CastAndCrewJsonSchema.parse(json);
      }),
  );
}

export type CastAndCrewMemberJson = z.infer<typeof CastAndCrewJsonSchema>;

export async function allCastAndCrewJson(): Promise<CastAndCrewMemberJson[]> {
  return await parseAllCastAndCrewJson();
}
