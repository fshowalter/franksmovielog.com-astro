interface Frontmatter {
  grade: string;
}

export interface StructuredDataData {
  title: string;
  imdbId: string;
  directorNames: string[];
  year: string;
  frontmatter: Frontmatter;
}

const gradeMap: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  F: 1,
};

export function StructuredData({ data }: { data: StructuredDataData }) {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Movie",
      name: data.title,
      sameAs: `http://www.imdb.com/title/${data.imdbId}/`,
      dateCreated: data.year,
      director: {
        "@type": "Person",
        name: data.directorNames[0],
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: gradeMap[data.frontmatter.grade[0]],
    },
    author: {
      "@type": "Person",
      name: "Frank Showalter",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
