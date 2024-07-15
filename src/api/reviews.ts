import { allReviewedTitlesJson } from "./data/reviewedTitlesJson";
import type { ReviewedTitleJson } from "./data/reviewedTitlesJson";
import { allReviewsMarkdown } from "./data/reviewsMarkdown";
import type { MarkdownReview } from "./data/reviewsMarkdown";
import type { MarkdownViewing } from "./data/viewingsMarkdown";
import { allViewingsMarkdown } from "./data/viewingsMarkdown";
import type { Root, Node } from "mdast";
import rehypeRaw from "rehype-raw";
import type { Processor } from "unified";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import { linkReviewedTitles } from "./utils/linkReviewedTitles";
import { removeFootnotes } from "./utils/markdown/removeFootnotes";
import { rootAsSpan } from "./utils/markdown/rootAsSpan";
import {
  trimToExcerpt,
  EXCERPT_SEPARATOR,
} from "./utils/markdown/trimToExcerpt";
import strip from "strip-markdown";

export interface ReviewViewing extends MarkdownViewing {
  venueNotes: string | null;
  mediumNotes: string | null;
  viewingNotes: string | null;
}

export interface Review extends ReviewedTitleJson, MarkdownReview {
  viewings: ReviewViewing[];
  excerpt: string;
  excerptPlainText: string;
  content: string | null;
}

let cache: Review[];

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
  slug: string,
  reviewedTitles: { imdbId: string; slug: string }[],
) {
  let excerptHtml = processorToHtml(
    getMastProcessor().use(trimToExcerpt),
    content,
  );

  const hasExcerptBreak = content.includes(EXCERPT_SEPARATOR);

  if (hasExcerptBreak) {
    excerptHtml = excerptHtml.replace(/\n+$/, "");
    excerptHtml = excerptHtml.replace(
      /<\/p>$/,
      ` <a data-continue-reading href="/reviews/${slug}/">Continue reading...</a></p>`,
    );
  }

  return linkReviewedTitles(excerptHtml, reviewedTitles);
}

function getExcerptPlainText(content: string) {
  return getMastProcessor()
    .use(trimToExcerpt)
    .use(strip)
    .processSync(content)
    .toString();
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
          title.slug,
          reviewedTitlesJson,
        ),
        excerptPlainText: getExcerptPlainText(review.rawContent),
      };
    }),
  );

  return cache;
}
