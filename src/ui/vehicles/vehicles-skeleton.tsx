import { VEHICLES_PER_PAGE } from "@/lib/definitions";
import VehicleSkeleton from "./vehicle-skeleton";

export default function VehiclesSkeleton() {
  return (
    <>
      <div className="mt-1 flex flex-col flex-wrap justify-between gap-x-4 md:flex-row md:items-center lg:mt-4">
        <div className="h-10 w-40 animate-pulse bg-zinc-700 lg:h-12 lg:w-54.5" />
        <div className="relative mt-2 h-6 w-34 md:order-3 md:basis-full">
          <div className="absolute inset-0 w-36 animate-pulse bg-zinc-700"></div>
        </div>
        <div className="mt-7.5 h-10 w-full animate-pulse bg-zinc-700 md:mt-0 md:w-44" />
      </div>

      <div className="mt-10 lg:mt-7.5">
        <div className="grid gap-5 sm:grid-cols-2">
          {[...Array(VEHICLES_PER_PAGE)].map((_, i) => (
            <VehicleSkeleton key={i} />
          ))}
        </div>
        <div className="mx-auto mt-10 h-11 w-70 animate-pulse bg-zinc-700 lg:mt-15" />
      </div>
    </>
  );
}
