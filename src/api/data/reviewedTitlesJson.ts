import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const reviewedTitlesJsonFile = getContentPath("data", "reviewed-titles.json");

const CastAndCrewMemberSchema = z.object({
  name: z.string(),
  slug: z.string(),
  creditedAs: z.array(z.string()),
});

const CollectionSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

const MoreTitleSchema = z.object({
  title: z.string(),
  imdbId: z.string(),
  year: z.string(),
  slug: z.string(),
  grade: z.string(),
  genres: z.array(z.string()),
});

const CreditKindSchema = z.enum(["writer", "director", "performer"]);

const MoreCastAndCrewMemberSchema = z.object({
  name: z.string(),
  slug: z.string(),
  creditKind: CreditKindSchema,
  titles: z.array(MoreTitleSchema),
});

const MoreCollectionsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  titles: z.array(MoreTitleSchema),
});

const ReviewedTitleJsonSchema = z.object({
  imdbId: z.string(),
  title: z.string(),
  year: z.string(),
  slug: z.string(),
  countries: z.array(z.string()),
  genres: z.array(z.string()),
  sortTitle: z.string(),
  originalTitle: z.nullable(z.string()),
  gradeValue: z.number(),
  runtimeMinutes: z.number(),
  releaseSequence: z.string(),
  directorNames: z.array(z.string()),
  writerNames: z.array(z.string()),
  principalCastNames: z.array(z.string()),
  sequence: z.string(),
  castAndCrew: z.array(CastAndCrewMemberSchema),
  collections: z.array(CollectionSchema),
  moreCastAndCrew: z.array(MoreCastAndCrewMemberSchema),
  moreCollections: z.array(MoreCollectionsSchema),
  moreReviews: z.array(MoreTitleSchema),
});

export type ReviewedTitleJson = z.infer<typeof ReviewedTitleJsonSchema>;

async function parseAllReviewedTitlesJson() {
  const json = await fs.readFile(reviewedTitlesJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return data.map((item) => {
    return ReviewedTitleJsonSchema.parse(item);
  });
}

export async function allReviewedTitlesJson(): Promise<ReviewedTitleJson[]> {
  return await parseAllReviewedTitlesJson();
}
