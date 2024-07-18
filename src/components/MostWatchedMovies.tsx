import type { PosterImageData } from "src/api/posters";
import { twMerge } from "tailwind-merge";

import { ListItemTitle } from "./ListItemTitle";
import { Poster } from "./Poster";
import { StatHeading } from "./StatHeading";

export const MostWatchedMoviesPosterConfig = {
  width: 200,
  height: 300,
  sizes:
    "(min-width: 510px) 33vw, (min-width: 633px) 25vw, (min-width: 784px) 20vw, (min-width: 936px) 16vw, 48px",
};

interface ListItemValue {
  imdbId: string;
  title: string;
  year: string;
  slug: string | null;
  count: number;
}

export function MostWatchedMovies({
  values,
  posters,
}: {
  values: readonly ListItemValue[];
  posters: Record<string, PosterImageData>;
}): JSX.Element | null {
  if (values.length === 0) {
    return null;
  }

  return (
    <section>
      <StatHeading>Most Watched Movies</StatHeading>
      <div>
        <div className="tablet:spacer-y-4" />
        <List>
          {values.map((value) => {
            return (
              <ListItem
                value={value}
                key={value.imdbId}
                imageData={posters[value.slug || "default"]}
              />
            );
          })}
        </List>
        <div className="tablet:spacer-y-4" />
      </div>
    </section>
  );
}

function List({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ol className="grid-cols-[repeat(auto-fill,_minmax(128px,_1fr))] gap-x-6 gap-y-8 tablet:grid">
      {children}
    </ol>
  );
}

function ListItem({
  value,
  imageData,
}: {
  value: ListItemValue;
  imageData: PosterImageData;
}): JSX.Element {
  return (
    <li className="flex items-center gap-x-6 px-gutter py-4 even:bg-subtle tablet:flex-col tablet:p-0 tablet:even:bg-unset">
      <FluidListItemPoster
        title={value.title}
        year={value.year}
        slug={value.slug}
        imageData={imageData}
        className="shrink-0"
      />
      <div className="grow tablet:w-full">
        <div className="tablet:hidden">
          <div className="tablet:spacer-y-1" />
          <ListItemTitle
            title={value.title}
            year={value.year}
            slug={value.slug}
          />
          <div className="spacer-y-1 tablet:spacer-y-2" />
        </div>
        <div className="flex justify-start text-base text-subtle tablet:justify-center">
          <div>{value.count.toLocaleString()} times</div>
        </div>
        <div className="spacer-y-1 tablet:spacer-y-0" />
      </div>
    </li>
  );
}

function FluidListItemPoster({
  title,
  slug,
  year,
  className,
  imageData,
}: {
  title: string;
  slug: string | null;
  year: string;
  className?: string;
  imageData: PosterImageData;
}) {
  if (slug) {
    return (
      <a
        href={`/reviews/${slug}/`}
        className={twMerge(
          "safari-border-radius-fix w-full min-w-12 max-w-12 overflow-hidden rounded-lg shadow-all tablet:max-w-poster",
          className,
        )}
      >
        <Poster
          imageData={imageData}
          title={title}
          year={year}
          width={MostWatchedMoviesPosterConfig.width}
          height={MostWatchedMoviesPosterConfig.height}
          sizes={MostWatchedMoviesPosterConfig.sizes}
          loading="lazy"
          decoding="async"
        />
      </a>
    );
  }

  return (
    <div
      className={twMerge(
        "safari-border-radius-fix min-w-12 max-w-12 overflow-hidden rounded-lg shadow-all tablet:max-w-poster",
        className,
      )}
    >
      <Poster
        imageData={imageData}
        title={title}
        year={year}
        width={MostWatchedMoviesPosterConfig.width}
        height={MostWatchedMoviesPosterConfig.height}
        sizes={MostWatchedMoviesPosterConfig.sizes}
        loading="lazy"
        decoding="async"
        className="h-auto"
        alt={`${title} (${year})`}
      />
    </div>
  );
}
