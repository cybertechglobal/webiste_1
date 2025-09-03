import Image from "next/image";
import Link from "next/link";

type VehicleCardsProps = {
  title: string;
  desc?: string;
  price?: string;
  mileage?: string;
  gear?: string;
  power?: string;
  fuel?: string;
  imgSrc?: string;
  href?: string;
};

export default function VehicleCard({
  title,
  desc,
  price,
  mileage,
  gear,
  power,
  fuel,
  imgSrc,
  href,
}: VehicleCardsProps) {
  return (
    <div className="bg-card group relative p-4">
      <div className="flex flex-col gap-x-4 lg:flex-row">
        <div className="flex max-w-full justify-center overflow-hidden">
          <Image
            src={imgSrc || "/vehicles-page/car.png"}
            alt={title}
            className="size-full object-contain object-center"
            height={222}
            width={296}
          />
        </div>

        <div>
          <Link href={href || "#"}>
            <span className="absolute inset-0"></span>
            <h2 className="mt-2.5 text-xl/4 font-medium text-white lg:mt-0">
              {title}
            </h2>
          </Link>
          <div
            className="text-subtitle line-clamp-1 max-w-65.5 text-lg"
            title={desc}
          >
            {desc}
          </div>
          <div className="text-primary-500 mt-2.5 text-3xl font-bold">
            {price}
          </div>
          <div className="mt-3 font-medium text-white">
            Mileage: <span className="font-light">{mileage}</span>
          </div>
          <div className="mt-2 font-medium text-white">
            Gear: <span className="font-light">{gear}</span>
          </div>
          <div className="mt-2 font-medium text-white">
            Power: <span className="font-light">{power}</span>
          </div>
          <div className="mt-2 font-medium text-white">
            Fuel: <span className="font-light">{fuel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
