import { promises as fs } from "node:fs";
import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";

const pagesMarkdownDirectory = join(process.cwd(), "content", "pages");

function getHtml(content: string) {
  return remark()
    .use(remarkGfm)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content)
    .toString();
}

interface MarkdownPage {
  slug: string;
  title: string;
  content: string;
}

const DataSchema = z.object({
  title: z.string(),
  slug: z.string(),
});

let allPagesMarkdown: MarkdownPage[];

async function parseAllPagesMarkdown() {
  const dirents = await fs.readdir(pagesMarkdownDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((item) => !item.isDirectory() && item.name.endsWith(".md"))
      .map(async (item) => {
        const fileContents = await fs.readFile(
          `${pagesMarkdownDirectory}/${item.name}`,
          "utf8",
        );

        const { data, content } = matter(fileContents);
        const greyMatter = DataSchema.parse(data);

        const markdownPage: MarkdownPage = {
          slug: greyMatter.slug,
          title: greyMatter.title,
          content: getHtml(content),
        };

        return markdownPage;
      }),
  );
}

export default async function pagesMarkdown(): Promise<MarkdownPage[]> {
  if (!allPagesMarkdown) {
    allPagesMarkdown = await parseAllPagesMarkdown();
  }

  return allPagesMarkdown;
}
