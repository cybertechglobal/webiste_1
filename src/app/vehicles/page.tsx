import FiltersModal from "@/ui/components/filters-modal";
import GoBack from "@/ui/components/go-back";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicles Page",
  description: "This is the vehicles page description",
  keywords: "These, are, the, vehicles, page, keywords",
};

export default function Page() {
  return (
    <main className="relative mt-5 mb-14 max-w-7xl grow px-4 md:mx-auto lg:mb-15 lg:px-6">
      <GoBack />
      <div className="mt-1 flex w-full flex-col justify-between gap-x-4 md:flex-row md:items-center lg:mt-4">
        <h1 className="text-[40px]/10 font-medium text-white lg:text-[50px]/12.5">
          Inventory
        </h1>
        <div className="text-lg text-white md:hidden">42 Vehicles found</div>
        <FiltersModal />
      </div>
      <div className="hidden text-lg text-white md:block">
        42 Vehicles found
      </div>
    </main>
  );
}
