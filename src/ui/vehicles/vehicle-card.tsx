import {
  formatMileage,
  formatPowerText,
  formatPrice,
} from "@/lib/client-utils";
import { Vehicle } from "@/lib/data/get-vehicles";
import Image from "next/image";
import Link from "next/link";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const priceValue =
    vehicle.retailPrice ??
    vehicle.prices.find(
      (p: { type: string; value: number }) => p.type === "retail",
    )?.value ??
    vehicle.prices[0]?.value ??
    null;

  return (
    <div className="bg-card group relative p-3.75">
      <div className="grid h-full gap-x-3.5 sm:[grid-template-rows:1fr_min-content] lg:[grid-template-columns:minmax(0,296px)_249px] lg:grid-rows-1">
        <div className="shrink-0 overflow-hidden lg:place-self-center">
          <Image
            src={vehicle.previewPhoto?.url || "/vehicles-page/placeholder.png"}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="size-full object-contain object-center transition-[scale] duration-200 group-hover:scale-110 sm:object-cover lg:object-contain"
            height={222}
            width={296}
            loading="eager"
          />
        </div>

        <div className="flex h-full grow flex-col justify-between">
          <div>
            <Link href={`/vehicles/${vehicle.id}`}>
              <span className="absolute inset-0"></span>
              <h2 className="mt-2.5 line-clamp-3 text-xl font-medium text-white lg:mt-0">
                {vehicle.make} {vehicle.model}
              </h2>
            </Link>
            <div className="text-subtitle line-clamp-1 text-lg/5">
              {vehicle.typeName}
            </div>
          </div>
          <div className="text-primary-500 mt-2.25 line-clamp-1 text-3xl font-bold">
            {formatPrice(priceValue)}
          </div>
          <div className="mt-3 space-y-1.75 font-medium text-white">
            <div className="line-clamp-1">
              Mileage:&nbsp;
              <span className="font-light">
                {vehicle.mileage ? formatMileage(vehicle.mileage) : "--"}
              </span>
            </div>
            <div className="line-clamp-1">
              Gear:&nbsp;
              <span className="font-light capitalize">
                {vehicle.technicalData.transmission}
              </span>
            </div>
            <div className="line-clamp-1">
              Power:&nbsp;
              <span className="font-light">
                {formatPowerText(
                  Number(vehicle.technicalData.power),
                  vehicle.technicalData.powerUnit,
                )}
              </span>
            </div>
            <div className="line-clamp-1">
              Fuel:&nbsp;
              <span className="font-light capitalize">
                {vehicle.technicalData.fuel !== "no_information"
                  ? vehicle.technicalData.fuel
                  : "--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
