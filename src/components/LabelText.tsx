import type { ElementType } from "react";

export function LabelText({
  text,
  htmlFor,
  as = "span",
}: {
  text: string;
  htmlFor?: string;
  as?: ElementType;
}) {
  const Componet = as;

  return (
    <Componet
      className="inline-block h-6 text-left text-sm font-semibold leading-none tracking-0.5px"
      htmlFor={htmlFor}
    >
      {text}
    </Componet>
  );
}
