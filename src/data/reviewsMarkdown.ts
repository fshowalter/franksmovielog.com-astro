import { promises as fs } from "node:fs";
import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";
import type { Root, RootContent, Node, Parent } from "mdast";
import rehypeRaw from "rehype-raw";
import type { Processor } from "unified";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import { visit, SKIP, CONTINUE } from "unist-util-visit";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import reviewedTitlesJson from "./reviewedTitlesJson";
import { linkReviewedTitles } from "./utils/linkReviewedTitles";

const reviewsMarkdownDirectory = join(process.cwd(), "content", "reviews");

function removeFootnotes() {
  return (tree: Node) => {
    visit(
      tree,
      "footnoteReference",
      function (
        node: Node,
        index: number | undefined,
        parent: Parent | undefined,
      ) {
        if (parent && index && node.type === "footnoteReference") {
          parent.children.splice(index, 1);
          return [SKIP, index];
        }
        return CONTINUE;
      },
    );

    return tree;
  };
}

function trimToExcerpt({ separator }: { separator: string }) {
  return (tree: Root) => {
    const separatorIndex = tree.children.findIndex((node: RootContent) => {
      return node.type === "html" && node.value.trim() === separator;
    });

    if (separatorIndex !== -1) {
      tree.children.splice(separatorIndex);
    }
  };
}

function getMastProcessor() {
  return remark().use(remarkGfm).use(removeFootnotes).use(smartypants);
}

function processorToHtml(
  processor: Processor<Root, Node, Node, Root, string>,
  content: string,
) {
  return processor
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content)
    .toString();
}

function getExcerptHtml(
  content: string,
  excerptSeparator: string,
  slug: string,
  reviewedTitles: { imdbId: string; slug: string }[],
) {
  let excerptHtml = processorToHtml(
    getMastProcessor().use(trimToExcerpt, { separator: excerptSeparator }),
    content,
  );

  const hasExcerptBreak = content.includes(excerptSeparator);

  if (hasExcerptBreak) {
    excerptHtml = excerptHtml.replace(/\n+$/, "");
    excerptHtml = excerptHtml.replace(
      /<\/p>$/,
      ` <a data-continue-reading href="/reviews/${slug}/">Continue reading...</a></p>`,
    );
  }

  return linkReviewedTitles(excerptHtml, reviewedTitles);
}

function getHtml(
  content: string,
  reviewedTitles: { imdbId: string; slug: string }[],
) {
  const html = remark()
    .use(remarkGfm)
    .use(removeFootnotes)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content)
    .toString();

  return linkReviewedTitles(html, reviewedTitles);
}

export interface MarkdownReview {
  slug: string;
  date: Date;
  grade: string;
  imdbId: string;
  excerpt: string;
  content: string;
}

const DataSchema = z.object({
  date: z.date(),
  grade: z.string(),
  imdb_id: z.string(),
});

let allReviewsMarkdown: MarkdownReview[];

async function parseAllReviewsMarkdown() {
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
        const reviewedTitles = await reviewedTitlesJson();

        return {
          slug: data.slug,
          date: greyMatter.date,
          grade: greyMatter.grade,
          imdbId: greyMatter.imdb_id,
          excerpt: getExcerptHtml(
            content,
            "<!-- end -->",
            data.slug,
            reviewedTitles,
          ),
          content: getHtml(content, reviewedTitles),
        };
      }),
  );
}

export default async function reviewsMarkdown(): Promise<MarkdownReview[]> {
  if (!allReviewsMarkdown) {
    allReviewsMarkdown = await parseAllReviewsMarkdown();
  }

  return allReviewsMarkdown;
}
