"use client";

import { VEHICLE_FILTERS } from "@/lib/data/static";
import FilterCombobox from "@/ui/components/filter-combobox";
import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";

export default function FiltersModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="btn-secondary mt-7.5 h-11 px-14 text-lg lg:mt-0"
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
          className="data-[state=open]:animate-contentShow bg-card fixed top-1/2 left-1/2 z-50 w-[calc(100%-32px)] max-w-7xl -translate-1/2 transform overflow-y-auto p-5 ring-1 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] ring-black/5 ring-inset focus:outline-hidden md:left-1/2 lg:w-[calc(100%-48px)]"
        >
          <div className="flex items-center justify-between gap-x-6">
            <Dialog.Title className="text-3xl font-semibold text-white uppercase">
              Filters:
            </Dialog.Title>

            <Dialog.Close
              className="-mr-2 flex cursor-pointer items-center justify-center p-1.5 text-white"
              aria-label="Close Modal"
            >
              <IconX className="size-6.5" />
            </Dialog.Close>
          </div>

          <div className="mt-5 grid gap-x-4 gap-y-3.75 md:[grid-template-columns:repeat(4,minmax(0,284px))] lg:gap-x-5">
            <FilterCombobox placeholder="Make" />
            <FilterCombobox placeholder="Model" />
            <FilterCombobox
              placeholder="Price from"
              options={VEHICLE_FILTERS.priceFrom}
            />
            <FilterCombobox
              placeholder="Price to"
              options={VEHICLE_FILTERS.priceTo}
            />
          </div>
          <div className="mt-3.75 grid gap-x-4 gap-y-3.75 md:[grid-template-columns:repeat(4,minmax(0,284px))] lg:gap-x-5">
            <FilterCombobox placeholder="Gear" />
            <FilterCombobox placeholder="Fuel" />
            <FilterCombobox
              placeholder="Mileage from"
              options={VEHICLE_FILTERS.mileageFrom}
            />
            <FilterCombobox
              placeholder="Mileage to"
              options={VEHICLE_FILTERS.mileageTo}
            />
          </div>

          <div className="bg-subtitle mt-5 h-px w-full" aria-hidden />

          <div className="mt-5 ml-auto grid gap-5 md:[grid-template-columns:repeat(4,minmax(0,284px))]">
            <Dialog.Trigger className="btn-tertiary h-11 text-lg md:col-start-3">
              Reset filters
            </Dialog.Trigger>
            <Dialog.Trigger className="btn-primary h-11 text-lg md:col-start-4">
              Apply filters
            </Dialog.Trigger>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
