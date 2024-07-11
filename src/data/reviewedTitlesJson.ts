import { promises as fs } from "node:fs";
import { z } from "zod";
import { join } from "path";

const reviewedTitlesJsonFile = join(
  process.cwd(),
  "content",
  "data",
  "reviewed-titles.json",
);

const ViewingSchema = z.object({
  sequence: z.number(),
  medium: z.nullable(z.string()),
  mediumNotes: z.nullable(z.string()),
  date: z.string(),
  venue: z.nullable(z.string()),
  venueNotes: z.nullable(z.string()),
});

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

const MoreCastAndCrewMemberSchema = z.object({
  name: z.string(),
  slug: z.string(),
  creditKind: z.string(),
  titles: z.array(MoreTitleSchema),
});

const MoreCollectionsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  titles: z.array(MoreTitleSchema),
});

const ReviewedTitlesJsonSchema = z.object({
  imdbId: z.string(),
  title: z.string(),
  year: z.string(),
  slug: z.string(),
  grade: z.string(),
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
  reviewDate: z.string(),
  reviewYear: z.string(),
  sequence: z.string(),
  viewings: z.array(ViewingSchema),
  castAndCrew: z.array(CastAndCrewMemberSchema),
  collections: z.array(CollectionSchema),
  moreCastAndCrew: z.array(MoreCastAndCrewMemberSchema),
  moreCollections: z.array(MoreCollectionsSchema),
  moreReviews: z.array(MoreTitleSchema),
});

type ReviewedTitlesJson = z.infer<typeof ReviewedTitlesJsonSchema>;

let allReviewedTitlesJson: ReviewedTitlesJson[];

async function parseAllReviewedTitlesJson() {
  const json = await fs.readFile(reviewedTitlesJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return data.map((item) => {
    return ReviewedTitlesJsonSchema.parse(item);
  });
}

export default async function reviewedTitlesJson(): Promise<
  ReviewedTitlesJson[]
> {
  if (!allReviewedTitlesJson) {
    allReviewedTitlesJson = await parseAllReviewedTitlesJson();
  }

  return allReviewedTitlesJson;
}
