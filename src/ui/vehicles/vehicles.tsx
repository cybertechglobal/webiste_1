import { getVehicles } from "@/lib/data/get-vehicles";
import { SearchParams, VEHICLES_PER_PAGE } from "@/lib/definitions";
import { toURLSearchParams } from "@/lib/server-utils";
import FiltersWrapper from "../filters/filters-wrapper";
import LoadMoreButton from "./load-more-button";
import VehicleCard from "./vehicle-card";

export default async function Vehicles({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = toURLSearchParams(searchParams);
  const page = parseInt(params.get("page") || "1", 10);
  const range = Array.from({ length: page }, (_, i) => i + 1);

  const pagedVehicles = await Promise.all(
    range.map(async (page) => {
      const newParams = new URLSearchParams(params);
      newParams.set("page", page.toString());
      return await getVehicles(newParams);
    }),
  );

  if (pagedVehicles.some((data) => data === null)) {
    return (
      <div className="mt-24 text-center text-3xl font-medium text-white lg:mt-28 lg:text-4xl">
        Error loading vehicles
      </div>
    );
  }

  const totalShowed = pagedVehicles.reduce(
    (acc, data) => acc + (data?.results.length || 0),
    0,
  );

  const [{ count }] = pagedVehicles as NonNullable<(typeof pagedVehicles)[0]>[];

  const maxPage = Math.ceil(count / VEHICLES_PER_PAGE);

  return (
    <>
      <div className="mt-1 flex flex-col flex-wrap justify-between gap-x-4 md:flex-row md:items-center lg:mt-4">
        <h1 className="text-[40px]/10 font-medium text-white lg:text-[50px]/12.5">
          Inventory
        </h1>
        <div className="text-lg text-white md:order-3 md:basis-full">
          {count || 0} Vehicles found
        </div>
        <FiltersWrapper />
      </div>
      <div className="mt-10 lg:mt-7.5">
        {totalShowed > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {pagedVehicles.map((data, pageIndex) =>
                data?.results.map((vehicle) => (
                  <VehicleCard
                    key={`${vehicle.id}-${pageIndex}`}
                    vehicle={vehicle}
                  />
                )),
              )}
            </div>
            {count > totalShowed && (
              <LoadMoreButton
                currentPage={page}
                maxPage={maxPage}
                count={count}
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
