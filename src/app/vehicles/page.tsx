import { SearchParamsPromise } from "@/lib/definitions";
import GoBackButton from "@/ui/components/go-back-button";
import Vehicles from "@/ui/vehicles/vehicles";
import VehiclesSkeleton from "@/ui/vehicles/vehicles-skeleton";

import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Vehicles Page",
  description: "This is the vehicles page description",
  keywords: "These, are, the, vehicles, page, keywords",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) {
  const params = await searchParams;

  return (
    <main className="relative grow">
      <div className="mt-5 mb-14 px-4 lg:px-6">
        <div className="max-w-7xl md:mx-auto">
          <GoBackButton />
          <Suspense fallback={<VehiclesSkeleton />}>
            <Vehicles searchParams={params} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
