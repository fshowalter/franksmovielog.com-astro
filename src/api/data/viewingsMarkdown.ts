import { promises as fs } from "node:fs";

import matter from "gray-matter";
import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const viewingsMarkdownDirectory = getContentPath("viewings");

const DataSchema = z.object({
  imdbId: z.string(),
  date: z.date(),
  sequence: z.number(),
  venue: z.nullable(z.string()),
  medium: z.nullable(z.string()),
  venueNotes: z.nullable(z.string()),
  mediumNotes: z.nullable(z.string()),
});

export interface MarkdownViewing {
  sequence: number;
  imdbId: string;
  date: Date;
  venue: string | null;
  venueNotesRaw: string | null;
  medium: string | null;
  mediumNotesRaw: string | null;
  viewingNotesRaw: string | null;
}

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

        const markdownViewing: MarkdownViewing = {
          sequence: greyMatter.sequence,
          date: greyMatter.date,
          venue: greyMatter.venue,
          imdbId: greyMatter.imdbId,
          medium: greyMatter.medium,
          venueNotesRaw: greyMatter.venueNotes,
          mediumNotesRaw: greyMatter.mediumNotes,
          viewingNotesRaw: content,
        };

        return markdownViewing;
      }),
  );
}

export async function allViewingsMarkdown(): Promise<MarkdownViewing[]> {
  return await parseAllViewingsMarkdown();
}
