import { promises as fs } from "node:fs";
import { z } from "zod";
import { join } from "path";

const viewingsJsonFile = join(
  process.cwd(),
  "content",
  "data",
  "viewings.json",
);

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

let cache: ViewingJson[];

export async function allViewingsJson(): Promise<ViewingJson[]> {
  if (cache) {
    return cache;
  }

  const json = await fs.readFile(viewingsJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  cache = data.map((item) => {
    return ViewingJsonSchema.parse(item);
  });

  return cache;
}
