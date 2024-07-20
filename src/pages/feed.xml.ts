import rss from "@astrojs/rss";
import { getImage } from "astro:assets";
import {
  loadExcerptHtml,
  mostRecentReviews,
  type ReviewWithExcerpt,
} from "src/api/reviews";
import { getStillImagePath, images } from "src/api/stills";
import { normalizeSources } from "src/utils";
import { textStarsForGrade } from "src/utils/textStarsForGrade";

function addMetaToExcerpt(excerpt: string, review: ReviewWithExcerpt) {
  const meta = `${textStarsForGrade(
    review.grade,
  )} D: ${review.directorNames.join(
    ", ",
  )}. ${review.principalCastNames.join(", ")}.`;

  return `<p>${meta}</p>${excerpt}`;
}

export async function GET() {
  const reviews = await mostRecentReviews(10);

  const rssItems = await Promise.all(
    reviews.map(async (review) => {
      return await loadExcerptHtml(review);
    }),
  );

  return rss({
    // `<title>` field in output xml
    title: "Frank's Movie Log",
    // `<description>` field in output xml
    description: "Reviews of current, cult, classic, and forgotten films.",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: "https://www.franksmovielog.com",
    customData:
      "<image><url>https://www.franksmovielog.com/assets/favicon-128.png</url><title>Frank's Movie Log</title><link>https://www.franksmovielog.com/</link></image>",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: await Promise.all(
      rssItems.map(async (item) => {
        const imagePath = getStillImagePath(item.slug);
        const stillFile = await images[imagePath]();

        const optimizedImage = await getImage({
          src: stillFile.default,
          width: 1200,
          height: 675,
          format: "jpeg",
          quality: 80,
        });

        const still = normalizeSources(optimizedImage.src);

        return {
          title: `${item.title} (${item.year})`,
          pubDate: item.date,
          link: `https://www.franksmovielog.com/reviews/${item.slug}/`,
          content: `<img src="${
            still
          }" alt="A still from ${item.title}">${addMetaToExcerpt(
            item.excerpt,
            item,
          )}`,
        };
      }),
    ),
  });
}
