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
      <div className="flex gap-x-4">
        <div className="relative aspect-[1.33] w-74 shrink-0 overflow-hidden">
          <Image
            src={imgSrc || "/vehicles-page/car.png"}
            alt={title}
            className="transition-transform duration-200 group-hover:scale-110"
            fill
          />
        </div>

        <div>
          <Link href={href || "#"} className="text-xl/2 font-medium text-white">
            <span className="absolute inset-0"></span>
            {title}
          </Link>
          <div className="text-subtitle line-clamp-1 text-lg/6" title={desc}>
            {desc}
          </div>
          <div className="text-primary-500 mt-3 text-3xl font-bold">
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
