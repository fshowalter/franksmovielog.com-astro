import { allReviewedTitlesJson } from "./data/reviewedTitlesJson";
import type { ReviewedTitleJson } from "./data/reviewedTitlesJson";
import { allReviewsMarkdown } from "./data/reviewsMarkdown";
import type { MarkdownReview } from "./data/reviewsMarkdown";
import type { MarkdownViewing } from "./data/viewingsMarkdown";
import { allViewingsMarkdown } from "./data/viewingsMarkdown";
import type { Root, RootContent, Node, Parent } from "mdast";
import rehypeRaw from "rehype-raw";
import type { Processor } from "unified";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import { visit, SKIP, CONTINUE } from "unist-util-visit";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import { linkReviewedTitles } from "./utils/linkReviewedTitles";
import type { Root as HastRoot } from "hast";

export interface ReviewViewing extends MarkdownViewing {
  venueNotes: string | null;
  mediumNotes: string | null;
  viewingNotes: string | null;
}

export interface Review extends ReviewedTitleJson, MarkdownReview {
  viewings: ReviewViewing[];
  excerpt: string;
  content: string | null;
}

let cache: Review[];

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

function getHtml(
  content: string | null,
  reviewedTitles: { imdbId: string; slug: string }[],
) {
  if (!content) {
    return null;
  }

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

export async function allReviews(): Promise<Review[]> {
  if (cache) {
    return cache;
  }

  const reviewedTitlesJson = await allReviewedTitlesJson();
  const reviewsMarkdown = await allReviewsMarkdown();
  const viewingsMarkdown = await allViewingsMarkdown();

  cache = await Promise.all(
    reviewedTitlesJson.map((title) => {
      const review = reviewsMarkdown.find((reviewsarkdown) => {
        return reviewsarkdown.slug === title.slug;
      });

      if (!review) {
        throw new Error(
          `No markdown review found with slug ${title.slug} for title "${title.title}"`,
        );
      }

      const viewings = viewingsMarkdown
        .filter((viewing) => {
          return viewing.imdbId === title.imdbId;
        })
        .map((viewing) => {
          return {
            ...viewing,
            venueNotes: getHtmlAsSpan(
              viewing.venueNotesRaw,
              reviewedTitlesJson,
            ),
            mediumNotes: getHtmlAsSpan(
              viewing.mediumNotesRaw,
              reviewedTitlesJson,
            ),
            viewingNotes: getHtml(viewing.viewingNotesRaw, reviewedTitlesJson),
          };
        });

      if (viewings.length === 0) {
        throw new Error(
          `No markdown viewings found with imdb_id ${title.imdbId} for title "${title.title}"`,
        );
      }

      return {
        ...title,
        ...review,
        viewings,
        content: getHtml(review.rawContent, reviewedTitlesJson),
        excerpt: getExcerptHtml(
          review.rawContent,
          "<!-- end -->",
          title.slug,
          reviewedTitlesJson,
        ),
      };
    }),
  );

  return cache;
}
