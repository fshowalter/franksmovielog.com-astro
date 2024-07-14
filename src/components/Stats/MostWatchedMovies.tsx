import Image from "next/image";
import Link from "next/link";
import { ListItemTitle } from "@/components/ListItemTitle";
import { StatHeading } from "@/components/StatHeading";
import { twMerge } from "tailwind-merge";

export interface MostWatchedMovieListItemData {
  imdbId: string;
  title: string;
  year: string;
  slug: string | null;
  count: number;
}

export function MostWatchedMovies({
  data,
}: {
  data: readonly MostWatchedMovieListItemData[];
}): JSX.Element | null {
  if (data.length === 0) {
    return null;
  }

  return (
    <section>
      <StatHeading>Most Watched Movies</StatHeading>
      <div>
        <div className="tablet:spacer-y-4" />
        <List>
          {data.map((movie) => {
            return <ListItem data={movie} key={movie.imdbId} />;
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
  data,
}: {
  data: MostWatchedMovieListItemData;
}): JSX.Element {
  return (
    <li className="flex items-center gap-x-6 px-gutter py-4 even:bg-subtle tablet:flex-col tablet:p-0 tablet:even:bg-unset">
      <Poster data={data} className="shrink-0" />
      <div className="grow tablet:w-full">
        <div className="tablet:hidden">
          <div className="tablet:spacer-y-1" />
          <ListItemTitle title={data.title} year={data.year} slug={data.slug} />
          <div className="spacer-y-1 tablet:spacer-y-2" />
        </div>
        <div className="flex justify-start text-base text-subtle tablet:justify-center">
          <div>{data.count.toLocaleString()} times</div>
        </div>
        <div className="spacer-y-1 tablet:spacer-y-0" />
      </div>
    </li>
  );
}

function Poster({
  data,
  className,
}: {
  data: MostWatchedMovieListItemData;
  className?: string;
}) {
  if (data.slug) {
    return (
      <Link
        href={`/reviews/${data.slug}/`}
        className={twMerge(
          "safari-border-radius-fix min-w-12 max-w-12 overflow-hidden rounded-lg shadow-all tablet:max-w-poster",
          className,
        )}
      >
        <Image
          src={`/assets/posters/${data.slug}.png`}
          alt={`A poster from ${data.title} (${data.year})`}
          width={200}
          height={300}
          className="h-auto"
        />
      </Link>
    );
  }

  return (
    <div
      className={twMerge(
        "safari-border-radius-fix min-w-12 max-w-12 overflow-hidden rounded-lg shadow-all tablet:max-w-poster",
        className,
      )}
    >
      <Image
        src={`/assets/posters/default.png`}
        alt={`${data.title} (${data.year})`}
        title={`${data.title} (${data.year})`}
        width={200}
        height={300}
        className="h-auto"
      />
    </div>
  );
}
