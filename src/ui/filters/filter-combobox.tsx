"use client";

import { FilterOptions } from "@/lib/definitions";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { IconArrowDown } from "@tabler/icons-react";
import { useState } from "react";

type FilterComboboxProps = {
  placeholder: string;
  options: FilterOptions[] | null;
  selected: FilterOptions | null;
  onChange: (value: FilterOptions | null) => void;
  disabled?: boolean;
};

export default function FilterCombobox({
  placeholder,
  options = [],
  selected,
  onChange,
  disabled = false,
}: FilterComboboxProps) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options?.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selected}
      onChange={onChange}
      onClose={() => setQuery("")}
      virtual={{ options: filteredOptions || [] }}
      disabled={disabled}
    >
      <div className="relative">
        <ComboboxInput
          aria-label={placeholder}
          className="placeholder:text-subtitle bg-card outline-subtitle border-subtitle h-10 w-full border pr-0.5 pl-4 text-white outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus:border-white"
          displayValue={(option: FilterOptions | null) => option?.label || ""}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
        <div className="group absolute inset-y-0 right-1.25">
          <ComboboxButton className="block h-10 cursor-pointer px-2.75">
            <IconArrowDown
              strokeWidth={3}
              className="text-subtitle size-4.5 transition-transform duration-300 group-hover:text-white in-data-open:rotate-180"
            />
          </ComboboxButton>
        </div>
      </div>
      <ComboboxOptions
        anchor={{ to: "bottom", gap: 8, padding: 16 }}
        className="border-subtitle bg-card z-60 max-h-56 w-(--input-width) overflow-y-auto border py-1 empty:invisible"
        onWheel={(e) => e.stopPropagation()}
      >
        {({ option }) => (
          <ComboboxOption
            key={option.value}
            value={option}
            className="text-border hover:bg-bg/80 data-focus:bg-bg/70 w-full cursor-pointer px-4 py-2 text-sm"
          >
            {option.label}
          </ComboboxOption>
        )}
      </ComboboxOptions>
    </Combobox>
  );
}
