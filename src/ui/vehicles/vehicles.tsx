"use client";

import { getVehicles, Vehicles as VehiclesType } from "@/lib/data/get-vehicles";
import {
  FilterOptions,
  SearchParams,
  VEHICLES_PER_PAGE,
} from "@/lib/definitions";
import { toURLSearchParams } from "@/lib/server-utils";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import Filters from "../filters/filters";
import LoadMoreButton from "./load-more-button";
import VehicleCard from "./vehicle-card";
import VehicleSkeleton from "./vehicle-skeleton";

type VehiclesProps = {
  searchParams: SearchParams;
  initialVehicles: VehiclesType;
  makes: FilterOptions[] | null;
};

export default function Vehicles({
  searchParams,
  initialVehicles,
  makes,
}: VehiclesProps) {
  const [page, setPage] = useState(1);
  const [vehicles, setVehicles] = useState(initialVehicles.results || []);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const params = useMemo(() => toURLSearchParams(searchParams), [searchParams]);
  const remainingItems = Math.min(
    VEHICLES_PER_PAGE,
    initialVehicles.count - vehicles.length,
  );
  const canLoadMore = remainingItems > 0;

  useEffect(() => {
    setVehicles(initialVehicles.results || []);
    setPage(1);
    setError(null);
  }, [initialVehicles]);

  const handleLoadMore = useCallback(() => {
    startTransition(async () => {
      try {
        const nextPage = page + 1;
        params.set("page", nextPage.toString());
        const result = await getVehicles(params);
        if (!result?.results || result.results.length === 0) {
          setError("No more vehicles to load.");
          return;
        }
        setPage(nextPage);
        setVehicles((prev) => [...prev, ...result.results]);
        setError(null);
      } catch {
        setError("Failed to load more vehicles. Please try again.");
      }
    });
  }, [page, params]);

  return (
    <>
      <div className="mt-1 flex flex-col flex-wrap justify-between gap-x-4 md:flex-row md:items-center lg:mt-4">
        <h1 className="text-[40px]/10 font-medium text-white lg:text-[50px]/12.5">
          Inventory
        </h1>
        <div className="text-lg text-white md:order-3 md:basis-full">
          {initialVehicles.count || 0} Vehicles found
        </div>
        <Filters makes={makes} />
      </div>
      <div className="mt-10 lg:mt-7.5">
        {error && <p className="text-center text-lg text-red-500">{error}</p>}
        {vehicles.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
              {isPending && (
                <>
                  {[...Array(remainingItems)].map((_, i) => (
                    <VehicleSkeleton key={`skeleton-${i}`} />
                  ))}
                </>
              )}
            </div>
            {canLoadMore && (
              <LoadMoreButton
                remainingItems={remainingItems}
                handleLoadMore={handleLoadMore}
                pending={isPending}
              />
            )}
          </>
        ) : (
          <p className="mt-24 text-center text-3xl font-medium text-white lg:mt-28 lg:text-4xl">
            No vehicles found
          </p>
        )}
      </div>
    </>
  );
}
