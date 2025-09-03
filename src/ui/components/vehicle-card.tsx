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
    <div className="bg-card group relative p-3.75 transition-colors">
      <div className="flex h-full flex-col gap-x-3.5 lg:grid lg:[grid-template-columns:minmax(0,296px)_249px]">
        <div className="flex shrink-0 justify-center overflow-hidden lg:place-self-center">
          <Image
            src={imgSrc || "/vehicles-page/placeholder.png"}
            alt={title}
            className="size-full object-contain object-center transition-transform duration-200 group-hover:scale-110"
            height={222}
            width={296}
            loading="eager"
          />
        </div>

        <div className="flex h-full grow flex-col justify-between">
          <div className="flex grow flex-col justify-between">
            <Link href={href || "#"}>
              <span className="absolute inset-0"></span>
              <h2 className="mt-2.5 line-clamp-3 text-xl font-medium text-white lg:mt-0">
                {title}
              </h2>
            </Link>
            <div className="text-subtitle line-clamp-1 text-lg/5">{desc}</div>
          </div>
          <div className="text-primary-500 mt-2.25 text-3xl font-bold">
            {price}
          </div>
          <div className="mt-3 space-y-1.75 font-medium text-white">
            <div>
              Mileage: <span className="font-light">{mileage}</span>
            </div>
            <div>
              Gear: <span className="font-light">{gear}</span>
            </div>
            <div>
              Power: <span className="font-light">{power}</span>
            </div>
            <div>
              Fuel: <span className="font-light">{fuel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
