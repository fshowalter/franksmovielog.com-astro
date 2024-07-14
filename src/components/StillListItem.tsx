import { Grade } from "@/components/Grade";
import { Still } from "@/components/Still";
import type { StillImageData } from "@/api/stills";

export const StillListItemImageConfig = {
  width: 312,
  height: 175.5,
  sizes:
    "(min-width: 706px) 312px, (min-width: 1280) 25vw, (min-width: 1472px) 312px, 50vw",
  quality: 80,
};

export interface StillListItemData {
  title: string;
  grade: string;
  slug: string;
  year: string;
  genres: string[];
}

export function StillListItem({
  title,
  imageData,
}: {
  title: StillListItemData;
  imageData: StillImageData;
}) {
  return (
    <li className="flow-root w-full px-gutter py-6 even:bg-subtle tablet:grid tablet:max-w-[312px] tablet:grid-rows-[auto_auto_1fr_auto] tablet:gap-y-2 tablet:overflow-hidden tablet:rounded-lg tablet:bg-default tablet:p-0 tablet:pb-8 tablet:shadow-all tablet:shadow-border tablet:even:bg-default">
      <div className="row-start-1 row-end-1">
        <a
          href={`/reviews/${title.slug}/`}
          className="safari-border-radius-fix float-right mb-2 ml-6 block w-[calc(50%_-_12px)] max-w-[312px] overflow-hidden rounded-lg tablet:float-none tablet:m-0 tablet:w-auto tablet:rounded-none"
        >
          <Still
            title={title.title}
            year={title.year}
            imageData={imageData}
            width={StillListItemImageConfig.width}
            height={StillListItemImageConfig.height}
            className="h-auto"
            loading="lazy"
            decoding="async"
            sizes={StillListItemImageConfig.sizes}
          />
        </a>
      </div>
      <div className="row-start-2 mb-2 tablet:m-0 tablet:px-6">
        <a
          href={`/reviews/${title.slug}/`}
          className="block text-md text-default"
        >
          {title.title}{" "}
          <span className="text-sm font-light leading-none text-muted">
            {title.year}
          </span>
        </a>
      </div>
      <div className="mb-6 tablet:m-0 tablet:px-6 tablet:pb-6">
        <Grade grade={title.grade} height={16} />
      </div>
      <div className="tablet:px-6">
        <Genres genres={title.genres} />
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
