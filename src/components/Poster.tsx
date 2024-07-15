import type { PosterImageData } from "src/api/posters";

interface PosterProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  title: string;
  year: string | number;
  imageData: PosterImageData | undefined;
  sizes: string;
  width: number;
  height: number;
  loading: "lazy" | "eager";
  decoding: "async" | "auto" | "sync";
}

export function Poster({
  title,
  year,
  imageData,
  sizes,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  ...rest
}: PosterProps): JSX.Element {
  return (
    <img {...imageData} alt={`A poster from ${title} (${year})`} {...rest} />
  );
}
