import { promises as fs, existsSync } from "node:fs";
import { z } from "zod";
import { join } from "path";

const castAndCrewJsonDirectory = join(
  process.cwd(),
  "content",
  "data",
  "cast-and-crew",
);

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

let allCastAndCrewJson: CastAndCrewJson[];

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
        const member = CastAndCrewJsonSchema.parse(json);

        const avatar = existsSync(
          join(
            process.cwd(),
            "public",
            "assets",
            "avatars",
            `${member.slug}.png`,
          ),
        )
          ? `/assets/avatars/${member.slug}.png`
          : null;

        return {
          ...member,
          avatar,
        };
      }),
  );
}

type CastAndCrewJson = z.infer<typeof CastAndCrewJsonSchema> & {
  avatar: string | null;
};

export default async function castAndCrewJson(): Promise<CastAndCrewJson[]> {
  if (!allCastAndCrewJson) {
    allCastAndCrewJson = await parseAllCastAndCrewJson();
  }

  return allCastAndCrewJson;
}
