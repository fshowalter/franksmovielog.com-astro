import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const overratedDisappointmentsJsonFile = getContentPath(
  "data",
  "overrated-disappointments.json",
);

const OverratedDisappointmentsJsonSchema = z.object({
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

export type OverratedDisappointmentsJson = z.infer<
  typeof OverratedDisappointmentsJsonSchema
>;

export async function allOverratedDisappointmentsJson(): Promise<
  OverratedDisappointmentsJson[]
> {
  const json = await fs.readFile(overratedDisappointmentsJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return data.map((item) => {
    return OverratedDisappointmentsJsonSchema.parse(item);
  });
}
