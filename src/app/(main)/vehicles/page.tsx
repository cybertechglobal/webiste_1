import { getVehicles } from "@/lib/data/get-vehicles";
import FiltersModal from "@/ui/components/filters-modal";
import GoBack from "@/ui/components/go-back";
import VehicleCard from "@/ui/components/vehicle-card";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicles Page",
  description: "This is the vehicles page description",
  keywords: "These, are, the, vehicles, page, keywords",
};

export default async function Page() {
  const vehiclesData = await getVehicles();

  return (
    <main className="relative grow">
      <div className="mt-5 mb-14 px-4 lg:px-6">
        <div className="max-w-7xl md:mx-auto">
          <GoBack />
          <div className="mt-1 flex flex-col justify-between gap-x-4 md:flex-row md:items-center lg:mt-4">
            <h1 className="text-[40px]/10 font-medium text-white lg:text-[50px]/12.5">
              Inventory
            </h1>
            <div className="text-lg text-white md:hidden">
              {vehiclesData?.count || 0} Vehicles found
            </div>
            <FiltersModal />
          </div>
          <div className="hidden text-lg text-white md:block">
            {vehiclesData?.count || 0} Vehicles found
          </div>
          <div className="mt-10 lg:mt-7.5">
            {vehiclesData?.results?.length &&
            vehiclesData.results.length > 0 ? (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  {vehiclesData.results.map(
                    ({
                      id,
                      make,
                      model,
                      typeName,
                      mileage,
                      retailPrice,
                      prices,
                      technicalData,
                      previewPhoto,
                    }) => (
                      <VehicleCard
                        key={id}
                        id={id}
                        make={make}
                        model={model}
                        typeName={typeName}
                        mileage={mileage}
                        retailPrice={retailPrice}
                        prices={prices}
                        technicalData={technicalData}
                        previewPhoto={previewPhoto}
                      />
                    ),
                  )}
                </div>
                <button className="btn-primary mx-auto mt-10 block h-11 px-20 lg:mt-15">
                  Load x More
                </button>
              </>
            ) : (
              <>
                <p className="mt-24 text-center text-3xl font-medium text-white lg:mt-28 lg:text-4xl">
                  No vehicles found
                </p>
                <button className="btn-primary mx-auto mt-6 block px-4 py-2">
                  Clear Filters
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
