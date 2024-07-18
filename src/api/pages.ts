import { allPagesMarkdown } from "./data/pagesMarkdown";
import { allReviewedTitlesJson } from "./data/reviewedTitlesJson";
import { getHtml } from "./utils/markdown/getHtml";

interface MarkdownPage {
  title: string;
  content: string | null;
}

export async function getPage(slug: string): Promise<MarkdownPage> {
  const pages = await allPagesMarkdown();

  const matchingPage = pages.find((page) => {
    return page.slug === slug;
  })!;

  const reviewedTitlesJson = await allReviewedTitlesJson();

  return {
    title: matchingPage.title,
    content: getHtml(matchingPage?.rawContent, reviewedTitlesJson),
  };
}
