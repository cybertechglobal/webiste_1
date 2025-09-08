import { getMakes } from "@/lib/data/get-makes";
import { getVehicles } from "@/lib/data/get-vehicles";
import type { SearchParamsPromise } from "@/lib/definitions";
import { toURLSearchParams } from "@/lib/server-utils";
import GoBackButton from "@/ui/components/go-back-button";
import Vehicles from "@/ui/vehicles/vehicles";
import VehiclesSkeleton from "@/ui/vehicles/vehicles-skeleton";

import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Explore our wide selection of vehicles at [Dealership Name]. Browse new and used cars, trucks, SUVs, and more, with detailed specs and pricing to find your perfect ride.",
  keywords:
    "vehicles, cars for sale, used cars, new cars, trucks, SUVs, car dealership, [Dealership Name], buy a car, vehicle inventory",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) {
  const params = await searchParams;
  const newParams = toURLSearchParams(params);
  newParams.set("page", "1");
  const vehicles = await getVehicles(newParams);
  const makes = await getMakes();

  return (
    <main className="relative grow">
      <div className="mt-5 mb-14 px-4 lg:px-6">
        <div className="max-w-7xl md:mx-auto">
          <GoBackButton />
          <Suspense fallback={<VehiclesSkeleton />}>
            <Vehicles
              initialVehicles={vehicles ?? { count: 0, results: [] }}
              searchParams={params}
              makes={makes}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
