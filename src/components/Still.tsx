import type { StillImageData } from "@/api/stills";

interface StillProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  title: string;
  year: string | number;
  imageData: StillImageData;
  sizes: string;
  width: number;
  height: number;
  loading: "lazy" | "eager";
  decoding: "async" | "auto" | "sync";
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
}: StillProps): JSX.Element {
  return (
    <img {...imageData} {...rest} alt={`A still from ${title} (${year})`} />
  );
}
