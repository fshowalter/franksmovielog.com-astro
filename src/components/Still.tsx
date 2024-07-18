import type { StillImageData } from "src/api/stills";
import { twJoin } from "tailwind-merge";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  title: string;
  year: string | number;
  imageData: StillImageData;
  sizes: string;
  width: number;
  height: number;
  loading: "lazy" | "eager";
  decoding: "async" | "auto" | "sync";
  className?: string;
}

export function Still({
  title,
  year,
  imageData,
  loading = "lazy",
  decoding = "async",
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <img
      {...imageData}
      alt={`A still from ${title} (${year})`}
      loading={loading}
      decoding={decoding}
      {...rest}
      className={twJoin("aspect-[1.77777778]", className)}
    />
  );
}
