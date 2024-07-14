import { Grade } from "@/components/Grade";
import Link from "next/link";
import { Still } from "@/components/Still";

export interface StillListItemData {
  title: string;
  grade: string;
  slug: string;
  year: string;
  genres: string[];
}

export function StillListItem({ data }: { data: StillListItemData }) {
  return (
    <li className="flow-root w-full px-gutter py-6 even:bg-subtle tablet:grid tablet:max-w-[312px] tablet:grid-rows-[auto_auto_1fr_auto] tablet:gap-y-2 tablet:overflow-hidden tablet:rounded-lg tablet:bg-default tablet:p-0 tablet:pb-8 tablet:shadow-all tablet:shadow-border tablet:even:bg-default">
      <div className="row-start-1 row-end-1">
        <Link
          href={`/reviews/${data.slug}/`}
          className="safari-border-radius-fix float-right mb-2 ml-6 block w-[calc(50%_-_12px)] max-w-[312px] overflow-hidden rounded-lg tablet:float-none tablet:m-0 tablet:w-auto tablet:rounded-none"
        >
          <Still
            slug={data.slug}
            title={data.title}
            year={data.year}
            width={312}
            height={175.5}
            className="h-auto"
          />
        </Link>
      </div>
      <div className="row-start-2 mb-2 tablet:m-0 tablet:px-6">
        <Link
          href={`/reviews/${data.slug}/`}
          className="block text-md text-default"
        >
          {data.title}{" "}
          <span className="text-sm font-light leading-none text-muted">
            {data.year}
          </span>
        </Link>
      </div>
      <div className="mb-6 tablet:m-0 tablet:px-6 tablet:pb-6">
        <Grade grade={data.grade} height={16} />
      </div>
      <div className="tablet:px-6">
        <Genres genres={data.genres} />
      </div>
    </li>
  );
}

function Genres({ genres }: { genres: readonly string[] }): JSX.Element | null {
  return (
    <div className="text-sm leading-4 tracking-0.5px text-subtle">
      {genres.map((genre, index) => {
        if (index === 0) {
          return <span key={genre}>{genre}</span>;
        }

        return <span key={genre}> | {genre}</span>;
      })}
    </div>
  );
}
