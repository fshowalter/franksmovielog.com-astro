import { promises as fs } from "node:fs";
import { z } from "zod";
import { join } from "path";
import { getContentPath } from "./utils/getContentPath";

const underseenGemsJsonFile = getContentPath("data", "underseen-gems.json");

const UnderseenGemsJsonSchema = z.object({
  imdbId: z.string(),
  title: z.string(),
  year: z.string(),
  slug: z.string(),
  grade: z.string(),
  genres: z.array(z.string()),
  sortTitle: z.string(),
  gradeValue: z.number(),
  releaseSequence: z.string(),
});

let cache: UnderseenGemsJson[];

export type UnderseenGemsJson = z.infer<typeof UnderseenGemsJsonSchema>;

export async function allUnderseenGemsJson(): Promise<UnderseenGemsJson[]> {
  if (cache) {
    return cache;
  }

  const json = await fs.readFile(underseenGemsJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  cache = data.map((item) => {
    return UnderseenGemsJsonSchema.parse(item);
  });

  return cache;
}
