import type { AvatarImageData } from "@/api/avatars";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  imageData: AvatarImageData;
  width: number;
  height: number;
  loading: "lazy" | "eager";
  decoding: "async" | "auto" | "sync";
  className?: string;
}

export function Avatar({
  name,
  imageData,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  className,
  ...rest
}: AvatarProps): JSX.Element {
  if (imageData.src) {
    return <img alt={name} {...imageData} {...rest} />;
  }

  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="var(--bg-stripe)"
        width="100%"
      >
        <path
          clip-rule="evenodd"
          d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zM8 9a5 5 0 00-4.546 2.916A5.986 5.986 0 008 14a5.986 5.986 0 004.546-2.084A5 5 0 008 9z"
          fill-rule="evenodd"
        />
      </svg>
    </div>
  );
}
