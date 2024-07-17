import { promises as fs } from "node:fs";
import matter from "gray-matter";
import { z } from "zod";
import { getContentPath } from "./utils/getContentPath";

const reviewsMarkdownDirectory = getContentPath("reviews");

export interface MarkdownReview {
  slug: string;
  date: Date;
  grade: string;
  imdbId: string;
  rawContent: string;
}

const DataSchema = z.object({
  date: z.date(),
  grade: z.string(),
  imdb_id: z.string(),
});

let cache: MarkdownReview[];

async function parseAllReviewsMarkdown(): Promise<MarkdownReview[]> {
  const dirents = await fs.readdir(reviewsMarkdownDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((item) => !item.isDirectory() && item.name.endsWith(".md"))
      .map(async (item) => {
        const fileContents = await fs.readFile(
          `${reviewsMarkdownDirectory}/${item.name}`,
          "utf8",
        );

        const { data, content } = matter(fileContents);
        const greyMatter = DataSchema.parse(data);

        return {
          slug: data.slug,
          date: greyMatter.date,
          grade: greyMatter.grade,
          imdbId: greyMatter.imdb_id,
          rawContent: content,
        };
      }),
  );
}

export async function allReviewsMarkdown(): Promise<MarkdownReview[]> {
  if (!cache) {
    cache = await parseAllReviewsMarkdown();
  }

  return cache;
}
