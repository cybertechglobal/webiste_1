"use client";

import { getModels } from "@/lib/data/get-models";
import type { FilterOptions, FiltersState } from "@/lib/definitions";
import { initialFilters, VEHICLE_FILTERS } from "@/lib/definitions";

import FilterCombobox from "@/ui/filters/filter-combobox";
import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import SelectedFilters from "./selected-filters";

export default function Filters({ makes }: { makes: FilterOptions[] | null }) {
  const [filters, setFilters] = useState(initialFilters);
  const [modelOptions, setModelOptions] = useState<FilterOptions[] | null>([]);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (
    filterKey: keyof FiltersState,
    value: FilterOptions | null,
  ) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
    if (filterKey !== "make") return;
    if (!value) {
      setModelOptions([]);
      return;
    }

    startTransition(async () => {
      const models = await getModels(value.value);
      setModelOptions(models);
    });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setModelOptions([]);
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger
          className="btn-secondary mt-7.5 h-11 text-lg md:mt-0 md:ml-auto md:w-45.5"
          aria-label="Filters Modal"
          onClick={() => {
            //Hack to allow clicking inside of portals inside the modal
            setTimeout(() => (document.body.style.pointerEvents = ""), 0);
          }}
        >
          Filters
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=closed]:animate-overlayExit data-[state=open]:animate-overlayShow bg-bg/80 fixed inset-0 z-50 cursor-pointer" />
          <Dialog.Content
            aria-describedby={undefined}
            className="data-[state=open]:animate-contentShow bg-card fixed top-1/2 left-1/2 z-50 max-h-[95vh] w-[calc(100%-32px)] max-w-7xl -translate-1/2 transform overflow-y-auto p-5 md:left-1/2 lg:w-[calc(100%-48px)]"
          >
            <div className="flex items-center justify-between gap-x-6">
              <Dialog.Title className="text-3xl font-semibold text-white uppercase">
                Filters:
              </Dialog.Title>

              <Dialog.Close
                className="-mr-2 flex cursor-pointer items-center justify-center p-1.5 text-white hover:text-gray-300"
                aria-label="Close Modal"
              >
                <IconX className="size-6.5" />
              </Dialog.Close>
            </div>

            <div className="mt-5 grid gap-x-4 gap-y-3.75 md:grid-cols-4 lg:gap-x-5">
              <FilterCombobox
                placeholder="Make"
                options={makes}
                selected={filters.make}
                onChange={async (value) => {
                  handleFilterChange("make", value);
                  handleFilterChange("model", null);
                }}
              />
              <FilterCombobox
                placeholder="Model"
                options={modelOptions}
                selected={filters.model}
                onChange={(value) => handleFilterChange("model", value)}
                disabled={isPending}
              />
              <FilterCombobox
                placeholder="Price from"
                options={VEHICLE_FILTERS.priceFrom}
                selected={filters.priceFrom}
                onChange={(value) => handleFilterChange("priceFrom", value)}
              />
              <FilterCombobox
                placeholder="Price to"
                options={VEHICLE_FILTERS.priceTo}
                selected={filters.priceTo}
                onChange={(value) => handleFilterChange("priceTo", value)}
              />
            </div>
            <div className="mt-3.75 grid gap-x-4 gap-y-3.75 md:grid-cols-4 lg:gap-x-5">
              <FilterCombobox
                placeholder="Gear"
                options={VEHICLE_FILTERS.transmission}
                selected={filters.transmission}
                onChange={(value) => handleFilterChange("transmission", value)}
              />
              <FilterCombobox
                placeholder="Fuel"
                options={VEHICLE_FILTERS.fuel}
                selected={filters.fuel}
                onChange={(value) => handleFilterChange("fuel", value)}
              />
              <FilterCombobox
                placeholder="Mileage from"
                options={VEHICLE_FILTERS.mileageFrom}
                selected={filters.mileageFrom}
                onChange={(value) => handleFilterChange("mileageFrom", value)}
              />
              <FilterCombobox
                placeholder="Mileage to"
                options={VEHICLE_FILTERS.mileageTo}
                selected={filters.mileageTo}
                onChange={(value) => handleFilterChange("mileageTo", value)}
              />
            </div>

            <div className="bg-subtitle mt-5 h-px w-full" aria-hidden />

            <div className="mt-5 ml-auto grid gap-5 md:grid-cols-4">
              <button
                className="btn-tertiary flex h-11 items-center justify-center text-lg md:col-start-3"
                onClick={handleResetFilters}
              >
                Reset filters
              </button>
              <Dialog.Trigger asChild>
                <Link
                  href={{
                    pathname: "/vehicles",
                    query: {
                      page: 1,
                      ...(filters.make && { make: filters.make.value }),
                      ...(filters.model && { model: filters.model.value }),
                      ...(filters.priceFrom && {
                        priceFrom: filters.priceFrom.value,
                      }),
                      ...(filters.priceTo && {
                        priceTo: filters.priceTo.value,
                      }),
                      ...(filters.transmission && {
                        transmission: filters.transmission.value,
                      }),
                      ...(filters.fuel && { fuel: filters.fuel.value }),
                      ...(filters.mileageFrom && {
                        mileageFrom: filters.mileageFrom.value,
                      }),
                      ...(filters.mileageTo && {
                        mileageTo: filters.mileageTo.value,
                      }),
                    },
                  }}
                  className="btn-primary hover:bg-primary-600 flex h-11 items-center justify-center text-lg md:col-start-4"
                >
                  Apply filters
                </Link>
              </Dialog.Trigger>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <SelectedFilters
        handleFilterChange={handleFilterChange}
        handleResetFilters={handleResetFilters}
      />
    </>
  );
}
