"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { IconArrowDown } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

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
  const comboboxRef = useRef<HTMLDivElement>(null);
  const [optionsWidth, setOptionsWidth] = useState<string>("100%");

  useEffect(() => {
    const updateWidth = () => {
      if (comboboxRef.current) {
        const width = comboboxRef.current.offsetWidth;
        setOptionsWidth(`${width}px`);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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
      <div
        ref={comboboxRef}
        className="ring-subtitle bg-card border-subtitle relative flex h-10 w-full items-center justify-between gap-x-4 border pr-0.5 pl-4 text-base text-white focus-within:border-white focus-within:ring-3 focus-within:ring-white/50 focus-within:outline-none in-data-focus:bg-black"
      >
        <ComboboxInput
          aria-label={placeholder}
          className="placeholder:text-subtitle w-full bg-transparent text-base text-white focus:outline-none"
          displayValue={(option: FilterOptions | null) => option?.label || ""}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
        <ComboboxButton className="flex items-center px-2.5">
          <IconArrowDown
            strokeWidth={3}
            className="text-subtitle size-4.5 transition-transform duration-300 in-data-[open]:rotate-180"
          />
        </ComboboxButton>
      </div>
      <ComboboxOptions
        anchor={{
          to: "bottom start",
          gap: "16px",
        }}
        className="border-subtitle bg-card z-60 -ml-4 max-h-56 overflow-y-auto border py-1 empty:invisible"
        style={{ width: optionsWidth }}
      >
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.value}
            value={option}
            className="text-border hover:bg-bg/80 data-[focus]:bg-bg/70 cursor-pointer px-4 py-2 text-sm"
          >
            {option.label}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
