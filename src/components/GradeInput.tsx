import { useState } from "react";
import { SelectInput } from "@/components/SelectInput.tsx";

const options = [
  <option key={13} value={13}>
    A+
  </option>,
  <option key={12} value={12}>
    A
  </option>,
  <option key={11} value={11}>
    A-
  </option>,
  <option key={10} value={10}>
    B+
  </option>,
  <option key={9} value={9}>
    B
  </option>,
  <option key={8} value={8}>
    B-
  </option>,
  <option key={7} value={7}>
    C+
  </option>,
  <option key={6} value={6}>
    C
  </option>,
  <option key={5} value={5}>
    C-
  </option>,
  <option key={4} value={4}>
    D+
  </option>,
  <option key={3} value={3}>
    D
  </option>,
  <option key={2} value={2}>
    D-
  </option>,
  <option key={1} value={1}>
    F
  </option>,
];

export function GradeInput({
  label,
  onGradeChange,
}: {
  label: string;
  onGradeChange: (values: [number, number]) => void;
}): JSX.Element {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(13);

  const handleMinChange = (value: string) => {
    const newMin = parseInt(value, 10);
    setMinValue(newMin);

    if (newMin <= maxValue) {
      onGradeChange([newMin, maxValue]);
    } else {
      onGradeChange([maxValue, newMin]);
    }
  };

  const handleMaxChange = (value: string) => {
    const newMax = parseInt(value, 10);
    setMaxValue(newMax);

    if (minValue <= newMax) {
      onGradeChange([minValue, newMax]);
    } else {
      onGradeChange([newMax, minValue]);
    }
  };

  return (
    <fieldset>
      <legend className="text-subtle tracking-0.5px h-6 text-left text-sm font-bold">
        {label}
      </legend>
      <div className="flex flex-wrap items-baseline">
        <label className="flex flex-1 items-center gap-x-[.5ch]">
          <span className="tracking-0.5px min-w-10 text-left text-sm">
            From
          </span>
          <SelectInput
            value={minValue}
            onChange={(e) => handleMinChange(e.target.value)}
          >
            {options.slice().reverse()}
          </SelectInput>
        </label>
        <label className="flex flex-1 items-center">
          <span className="tracking-0.5px min-w-10 text-center text-sm">
            to
          </span>
          <SelectInput
            value={maxValue}
            onChange={(e) => handleMaxChange(e.target.value)}
          >
            {options.slice()}
          </SelectInput>
        </label>
      </div>
    </fieldset>
  );
}
