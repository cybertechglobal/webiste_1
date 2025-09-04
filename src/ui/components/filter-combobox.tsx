"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { IconArrowDown } from "@tabler/icons-react";
import { useState } from "react";

type FilterOptions = {
  label: string;
  value: string;
};

interface FilterComboboxProps {
  placeholder: string;
  options?: FilterOptions[];
}

export default function FilterCombobox({
  placeholder,
  options = [],
}: FilterComboboxProps) {
  const [selected, setSelected] = useState<FilterOptions | null>(null);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selected}
      onChange={setSelected}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        <ComboboxInput
          aria-label={placeholder}
          className="placeholder:text-subtitle bg-card border-subtitle ring-subtitle h-10 w-full items-center justify-between border pr-0.5 pl-4 text-white transition-[border-color,box-shadow] focus-within:border-white focus-within:ring-3 focus-within:ring-white/50 focus-within:outline-none"
          displayValue={(option: FilterOptions | null) => option?.label || ""}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2">
          <ComboboxButton className="block cursor-pointer p-2">
            <IconArrowDown
              strokeWidth={3}
              className="text-subtitle size-4.5 transition-transform duration-300 in-data-open:rotate-180"
            />
          </ComboboxButton>
        </div>
      </div>
      <ComboboxOptions
        anchor={{
          to: "bottom start",
          gap: "8px",
        }}
        className="border-subtitle bg-card left-15 z-60 max-h-56 w-(--input-width) overflow-y-auto border py-1 empty:invisible"
      >
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.value}
            value={option}
            className="text-border hover:bg-bg/80 data-focus:bg-bg/70 cursor-pointer px-4 py-2 text-sm"
          >
            {option.label}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
