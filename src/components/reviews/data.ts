import reviewedTitlesJson from "@/data/reviewedTitlesJson";
import type { ReviewsProps } from "./Reviews";

function formatDate(reviewDate: Date) {
  const day = `0${reviewDate.getUTCDate()}`.slice(-2);
  const month = `0${reviewDate.getUTCMonth()}`.slice(-2);

  return `${reviewDate.getUTCFullYear()}-${month}-${day}`;
}

export default async function getReviewedTitles(): Promise<ReviewsProps> {
  const json = await reviewedTitlesJson();

  json.sort((a, b) => b.sortTitle.localeCompare(a.sortTitle));

  const genres = new Set<string>();
  const releaseYears = new Set<string>();
  const reviewYears = new Set<string>();

  json.sort((a, b) => a.sortTitle.localeCompare(b.sortTitle));

  const data = json.map((title) => {
    const reviewDate = new Date(title.reviewDate);
    title.genres.forEach((genre) => genres.add(genre));
    releaseYears.add(title.year);
    reviewYears.add(title.reviewYear);

    const itemData: ReviewsProps["data"][0] = {
      imdbId: title.imdbId,
      releaseSequence: title.sequence,
      title: title.title,
      year: title.year,
      reviewDate: formatDate(reviewDate),
      reviewYear: reviewDate.getUTCFullYear().toString(),
      reviewMonth: reviewDate.toLocaleString("default", {
        month: "long",
        timeZone: "UTC",
      }),
      sortTitle: title.sortTitle,
      slug: title.slug,
      grade: title.grade,
      gradeValue: title.gradeValue,
      genres: title.genres,
    };

    return itemData;
  });

  return {
    distinctGenres: Array.from(genres).toSorted(),
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
    distinctReviewYears: Array.from(reviewYears).toSorted(),
    data,
    initialSort: "title-asc",
  };
}
