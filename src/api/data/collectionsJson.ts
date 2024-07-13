import { promises as fs, existsSync } from "node:fs";
import { z } from "zod";
import { join } from "path";

const collectionsJsonDirectory = join(
  process.cwd(),
  "content",
  "data",
  "collections",
);

const TitleSchema = z.object({
  imdbId: z.string(),
  title: z.string(),
  year: z.string(),
  slug: z.nullable(z.string()),
  grade: z.nullable(z.string()),
  sortTitle: z.string(),
  gradeValue: z.nullable(z.number()),
  releaseSequence: z.string(),
});

const CollectionJsonSchema = z.object({
  name: z.string(),
  slug: z.string(),
  reviewCount: z.number(),
  titleCount: z.number(),
  description: z.nullable(z.string()),
  titles: z.array(TitleSchema),
});

let allCollectionsJson: CollectionJson[];

async function parseAllCollectionsJson() {
  const dirents = await fs.readdir(collectionsJsonDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((item) => !item.isDirectory() && item.name.endsWith(".json"))
      .map(async (item) => {
        const fileContents = await fs.readFile(
          `${collectionsJsonDirectory}/${item.name}`,
          "utf8",
        );

        const json = JSON.parse(fileContents) as unknown;
        const collection = CollectionJsonSchema.parse(json);

        const avatar = existsSync(
          join(
            process.cwd(),
            "public",
            "assets",
            "avatars",
            `${collection.slug}.png`,
          ),
        )
          ? `/assets/avatars/${collection.slug}.png`
          : null;

        return {
          ...collection,
          avatar,
        };
      }),
  );
}

type CollectionJson = z.infer<typeof CollectionJsonSchema> & {
  avatar: string | null;
};

export default async function castAndCrewJson(): Promise<CollectionJson[]> {
  if (!allCollectionsJson) {
    allCollectionsJson = await parseAllCollectionsJson();
  }

  return allCollectionsJson;
}
