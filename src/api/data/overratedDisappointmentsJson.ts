import { promises as fs } from "node:fs";
import { z } from "zod";
import { join } from "path";

const overratedDisappointmentsJsonFile = join(
  process.cwd(),
  "content",
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

type OverratedDisappointmentsJson = z.infer<
  typeof OverratedDisappointmentsJsonSchema
>;

export async function overratedDisappointmentsJson(): Promise<
  OverratedDisappointmentsJson[]
> {
  const json = await fs.readFile(overratedDisappointmentsJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return data.map((item) => {
    return OverratedDisappointmentsJsonSchema.parse(item);
  });
}
