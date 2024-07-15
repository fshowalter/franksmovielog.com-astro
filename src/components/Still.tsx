import type { StillImageData } from "src/api/stills";

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
  sizes,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  ...rest
}: Props): JSX.Element {
  return (
    <img
      {...imageData}
      width={width}
      height={height}
      alt={`A still from ${title} (${year})`}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}
