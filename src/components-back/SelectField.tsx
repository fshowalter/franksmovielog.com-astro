import type { ChangeEvent } from "react";
import { LabelText } from "@/components/LabelText.tsx";
import { SelectInput } from "@/components/SelectInput.tsx";
import { twMerge } from "tailwind-merge";

export function SelectField({
  label,
  value,
  onChange,
  children,
  className,
}: {
  label: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <label className={twMerge("flex flex-col", className)}>
      <LabelText as="span" text={label} />
      <SelectInput value={value?.toString() || 0} onChange={onChange}>
        {children}
      </SelectInput>
    </label>
  );
}
