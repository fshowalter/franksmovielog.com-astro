import { promises as fs } from "node:fs";
import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";
import type { Root as HastRoot } from "hast";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import { linkReviewedTitles } from "./utils/linkReviewedTitles";
import reviewedTitlesJson from "./reviewedTitlesJson";

const viewingsMarkdownDirectory = join(process.cwd(), "content", "viewings");

const DataSchema = z.object({
  imdbId: z.string(),
  date: z.date(),
  sequence: z.number(),
  venue: z.nullable(z.string()),
  medium: z.nullable(z.string()),
  venueNotes: z.nullable(z.string()),
  mediumNotes: z.nullable(z.string()),
});

function rootAsSpan() {
  return (tree: HastRoot) => {
    const firstChild = tree.children[0];

    if (firstChild && firstChild.type === "element") {
      firstChild.tagName = "span";
    }
  };
}

function getHtmlAsSpan(
  content: string | null,
  reviewedTitles: { imdbId: string; slug: string }[],
) {
  if (!content) {
    return null;
  }

  const html = remark()
    .use(remarkGfm)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rootAsSpan)
    .use(rehypeStringify)
    .processSync(content)
    .toString();

  return linkReviewedTitles(html, reviewedTitles);
}

function getHtml(
  content: string | null,
  reviewedTitles: { imdbId: string; slug: string }[],
) {
  if (!content) {
    return null;
  }

  const html = remark()
    .use(remarkGfm)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content)
    .toString();

  return linkReviewedTitles(html, reviewedTitles);
}

export interface MarkdownViewing {
  sequence: number;
  imdbId: string;
  date: Date;
  venue: string | null;
  venueNotes: string | null;
  medium: string | null;
  mediumNotes: string | null;
  viewingNotes: string | null;
}

let allViewingsMarkdown: MarkdownViewing[];

async function parseAllViewingsMarkdown() {
  const dirents = await fs.readdir(viewingsMarkdownDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((item) => !item.isDirectory() && item.name.endsWith(".md"))
      .map(async (item) => {
        const fileContents = await fs.readFile(
          `${viewingsMarkdownDirectory}/${item.name}`,
          "utf8",
        );

        const { data, content } = matter(fileContents);
        const greyMatter = DataSchema.parse(data);
        const reviewedTitles = await reviewedTitlesJson();

        const markdownViewing: MarkdownViewing = {
          sequence: greyMatter.sequence,
          date: greyMatter.date,
          venue: greyMatter.venue,
          imdbId: greyMatter.imdbId,
          medium: greyMatter.medium,
          venueNotes: getHtmlAsSpan(greyMatter.venueNotes, reviewedTitles),
          mediumNotes: getHtmlAsSpan(greyMatter.mediumNotes, reviewedTitles),
          viewingNotes: getHtml(content, reviewedTitles),
        };

        return markdownViewing;
      }),
  );
}

export default async function viewingsMarkdown(): Promise<MarkdownViewing[]> {
  if (!allViewingsMarkdown) {
    allViewingsMarkdown = await parseAllViewingsMarkdown();
  }

  return allViewingsMarkdown;
}
