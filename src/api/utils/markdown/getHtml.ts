import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import { linkReviewedTitles } from "src/api/utils/linkReviewedTitles";

export function getHtml(
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
