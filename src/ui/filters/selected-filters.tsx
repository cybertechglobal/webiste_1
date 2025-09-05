"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";

import { formatMileage, formatPrice } from "@/lib/client-utils";
import { FilterOptions, FiltersState } from "@/lib/definitions";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";

const EXCLUDED_KEYS = ["page"];

type SelectedFiltersProps = {
  handleResetFilters: () => void;
  handleFilterChange: (
    filterKey: keyof FiltersState,
    value: FilterOptions | null,
  ) => void;
};

export default function SelectedFilters({
  handleResetFilters,
  handleFilterChange,
}: SelectedFiltersProps) {
  const params = useSearchParams();
  const { push } = useRouter();

  const [, startTransition] = useTransition();
  const [optimisticParams, setOptimisticParams] = useOptimistic(
    new URLSearchParams(params),
  );

  const filteredParamsCount = Array.from(optimisticParams.entries()).filter(
    ([key]) => !EXCLUDED_KEYS.includes(key),
  ).length;

  if (filteredParamsCount === 0) {
    return null;
  }

  return (
    <div className="order-4 mt-6 flex basis-full flex-wrap items-center gap-2">
      {Array.from(optimisticParams.entries()).map(([key, value], index) => {
        if (EXCLUDED_KEYS.includes(key)) return null;

        let renderValue = value;

        if (key === "priceFrom") {
          renderValue = `From: ${formatPrice(Number(value))}`;
        }

        if (key === "priceTo") {
          renderValue = `To: ${formatPrice(Number(value))}`;
        }

        if (key === "mileageFrom") {
          renderValue = `From: ${formatMileage(Number(value))}`;
        }

        if (key === "mileageTo") {
          renderValue = `To: ${formatMileage(Number(value))}`;
        }

        return (
          <button
            onClick={() => {
              const params = new URLSearchParams(optimisticParams);
              params.delete(key, value);

              handleFilterChange(key as keyof FiltersState, null);

              startTransition(() => {
                setOptimisticParams(params);
                push(`?${params.toString()}`, { scroll: false });
              });
            }}
            key={index}
            className="text-subtitle group flex cursor-pointer items-center gap-x-1 rounded-md border border-gray-400 px-2.5 py-1.5 pr-1.5 text-sm font-medium capitalize"
          >
            <span>{renderValue}</span>
            <IconX
              className="text-subtitle size-4 group-hover:text-white"
              strokeWidth={2}
            />
          </button>
        );
      })}
      <Link
        href="?page=1"
        className="ml-2 text-sm font-medium text-white decoration-white underline-offset-[3px] hover:underline"
        onClick={handleResetFilters}
      >
        Reset Filters
      </Link>
    </div>
  );
}
