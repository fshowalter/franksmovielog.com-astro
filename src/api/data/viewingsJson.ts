import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const viewingsJsonFile = getContentPath("data", "viewings.json");

const ViewingJsonSchema = z.object({
  sequence: z.number(),
  title: z.string(),
  viewingYear: z.string(),
  viewingDate: z.string(),
  sortTitle: z.string(),
  genres: z.array(z.string()),
  medium: z.nullable(z.string()),
  venue: z.nullable(z.string()),
  slug: z.nullable(z.string()),
  year: z.string(),
  releaseSequence: z.string(),
});

export type ViewingJson = z.infer<typeof ViewingJsonSchema>;

export async function allViewingsJson(): Promise<ViewingJson[]> {
  const json = await fs.readFile(viewingsJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return data.map((item) => {
    return ViewingJsonSchema.parse(item);
  });
}
