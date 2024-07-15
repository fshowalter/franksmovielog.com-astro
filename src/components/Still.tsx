import type { StillImageData } from "@/api/stills";
import { twMerge } from "tailwind-merge";

interface StillProps extends React.ImgHTMLAttributes<HTMLImageElement> {
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
  className,
  ...rest
}: StillProps): JSX.Element {
  return (
    <img
      {...imageData}
      alt={`A still from ${title} (${year})`}
      className={twMerge("w-full", className)}
      style={{ maxWidth: `${width}px` }}
      {...rest}
    />
  );
}
