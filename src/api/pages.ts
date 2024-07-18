import { promises as fs } from "node:fs";

import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";

import { allReviewedTitlesJson } from "./data/reviewedTitlesJson";
import { getHtml } from "./utils/markdown/getHtml";

const pagesDirectory = join(process.cwd(), "content", "pages");

export interface MarkdownPage {
  title: string;
  content: string | null;
}

const DataSchema = z.object({
  title: z.string(),
});

export async function getPage(slug: string): Promise<MarkdownPage> {
  const fileContents = await fs.readFile(
    `${pagesDirectory}/${slug}.md`,
    "utf8",
  );

  const { data, content } = matter(fileContents);
  const greyMatter = DataSchema.parse(data);

  const reviewedTitlesJson = await allReviewedTitlesJson();

  return {
    title: greyMatter.title,
    content: getHtml(content, reviewedTitlesJson),
  };
}
