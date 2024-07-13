import { twMerge } from "tailwind-merge";

export function ListItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={twMerge(
        "tablet:gap-x-6 even:bg-subtle px-gutter tablet:px-6 flex flex-row gap-x-4 py-4",
        className,
      )}
    >
      {children}
    </li>
  );
}
