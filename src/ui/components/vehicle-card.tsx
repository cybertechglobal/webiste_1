import { convertPower, formatMileage, formatPrice } from "@/lib/client-utils";
import { Vehicle } from "@/lib/data/get-vehicles";
import Image from "next/image";
import Link from "next/link";

export default function VehicleCard({
  id,
  make,
  model,
  typeName,
  mileage,
  retailPrice,
  prices,
  technicalData,
  previewPhoto,
}: Vehicle) {
  const priceValue =
    retailPrice ??
    prices.find((p: { type: string; value: number }) => p.type === "retail")
      ?.value ??
    prices[0]?.value ??
    null;

  return (
    <div className="bg-card group relative p-3.75 transition-colors">
      <div className="flex h-full flex-col gap-x-3.5 lg:grid lg:[grid-template-columns:minmax(0,296px)_249px]">
        <div className="flex shrink-0 justify-center overflow-hidden lg:place-self-center">
          <Image
            src={previewPhoto?.url || "/vehicles-page/placeholder.png"}
            alt={`${make} ${model}`}
            className="size-full object-contain object-center transition-transform duration-200 group-hover:scale-110"
            height={222}
            width={296}
            loading="eager"
          />
        </div>

        <div className="flex h-full grow flex-col justify-between">
          <div className="flex grow flex-col justify-between">
            <Link href={`/vehicles/${id}`}>
              <span className="absolute inset-0"></span>
              <h2 className="mt-2.5 line-clamp-3 text-xl font-medium text-white lg:mt-0">
                {make} {model}
              </h2>
            </Link>
            <div className="text-subtitle line-clamp-1 text-lg/5">
              {typeName}
            </div>
          </div>
          <div className="text-primary-500 mt-2.25 text-3xl font-bold">
            {formatPrice(priceValue)}
          </div>
          <div className="mt-3 space-y-1.75 font-medium text-white">
            <div>
              Mileage:&nbsp;
              <span className="font-light">
                {mileage ? formatMileage(mileage) : "--"}
              </span>
            </div>
            <div>
              Gear:&nbsp;
              <span className="font-light capitalize">
                {technicalData.transmission}
              </span>
            </div>
            <div>
              <>
                Power:&nbsp;
                <span className="font-light">
                  {formatPowerText(
                    Number(technicalData.power),
                    technicalData.powerUnit,
                  )}
                </span>
              </>
            </div>
            <div>
              Fuel:&nbsp;
              <span className="font-light capitalize">
                {technicalData.fuel !== "no_information"
                  ? technicalData.fuel
                  : "--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatPowerText(power: number, powerUnit: "hp" | "kw") {
  let powerInHp;
  let powerInKw;
  const convertedPower = convertPower(power, powerUnit);

  if (powerUnit === "hp") {
    powerInHp = power;
    powerInKw = convertedPower;
  } else if (powerUnit === "kw") {
    powerInKw = power;
    powerInHp = convertedPower;
  }

  return `${powerInKw} kw (${powerInHp} HP)`;
}
