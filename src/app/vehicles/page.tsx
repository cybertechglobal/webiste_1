import FiltersModal from "@/ui/components/filters-modal";
import GoBack from "@/ui/components/go-back";
import VehicleCard from "@/ui/components/vehicle-card";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicles Page",
  description: "This is the vehicles page description",
  keywords: "These, are, the, vehicles, page, keywords",
};

const vehicles = [
  {
    id: 1,
    title: "Porsche Cayenne",
    desc: "2.0 Turbo PDK - pano - CC - 360° camera - Bose",
    price: "€59,995",
    mileage: "44,090km",
    gear: "Automatic",
    power: "195 kW (265 HP)",
    fuel: "Gasoline",
    imgSrc: "/vehicles-page/car.png",
    href: "",
  },
  {
    id: 2,
    title: "BMW 750",
    desc: "3.0. Turbo V6 - Harman & Cordon",
    price: "€89,990",
    mileage: "20,005km",
    gear: "Automatic",
    power: "230 kW (313 HP)",
    fuel: "Electro/Gasoline",
    imgSrc: "/vehicles-page/car.png",
    href: "",
  },
  {
    id: 3,
    title: "Maserati Ghibli",
    desc: "3.0 Turbo V6 - Harman & Cor -",
    price: "€41,490",
    mileage: "98,443km",
    gear: "Automatic",
    power: "195 kW (265 HP)",
    fuel: "Diesel",
    imgSrc: "/vehicles-page/car.png",
    href: "",
  },
  {
    id: 4,
    title: "Mercedes-Benz GLA 45",
    desc: "AMG 4-Matic - ACC - Sportuit -",
    price: "€35,000",
    mileage: "65,954km",
    gear: "Automatic",
    power: "280 kW (381 HP)",
    fuel: "Gasoline",
    imgSrc: "/vehicles-page/car.png",
    href: "",
  },
  {
    id: 5,
    title: "Audi e-tron GT",
    desc: "RS 934 kWh Quattro - 100% -",
    price: "€67,000",
    mileage: "25,070km",
    gear: "Automatic",
    power: "440 kW (598 HP)",
    fuel: "Electro",
    imgSrc: "/vehicles-page/car.png",
    href: "",
  },
  {
    id: 6,
    title: "DS Automobiles DS7",
    desc: "1.6 E-TENSE PHEV Bastile -",
    price: "€29,900",
    mileage: "112,343km",
    gear: "Automatic",
    power: "195 kW (265 HP)",
    fuel: "Electro",
    imgSrc: "/vehicles-page/car.png",
    href: "",
  },
  {
    id: 7,
    title: "Porsche Cayenne",
    desc: "2.0 Turbo PDK - pano - CC - 3",
    price: "€59,995",
    mileage: "44,090km",
    gear: "Automatic",
    power: "195 kW (265 HP)",
    fuel: "Gasoline",
    imgSrc: "/vehicles-page/car.png",
    href: "",
  },
  {
    id: 8,
    title: "BMW 750",
    desc: "e - PHEV - Bowers & Wilkins -",
    price: "€89,990",
    mileage: "20,005km",
    gear: "Automatic",
    power: "230 kW (313 HP)",
    fuel: "Electro/Gasoline",
    imgSrc: "",
    href: "",
  },
];

export default function Page() {
  return (
    <main className="relative grow">
      <div className="mt-5 mb-14 px-4 lg:px-6">
        <div className="max-w-7xl md:mx-auto">
          <GoBack />
          <div className="mt-1 flex flex-col justify-between gap-x-4 md:flex-row md:items-center lg:mt-4">
            <h1 className="text-[40px]/10 font-medium text-white lg:text-[50px]/12.5">
              Inventory
            </h1>
            <div className="text-lg text-white md:hidden">
              42 Vehicles found
            </div>
            <FiltersModal />
          </div>
          <div className="hidden text-lg text-white md:block">
            42 Vehicles found
          </div>
          <div className="mt-10 lg:mt-7.5">
            {vehicles.length > 0 ? (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  {vehicles.map(
                    ({
                      id,
                      title,
                      desc,
                      price,
                      mileage,
                      gear,
                      power,
                      fuel,
                      imgSrc,
                      href,
                    }) => (
                      <VehicleCard
                        key={id}
                        title={title}
                        desc={desc}
                        price={price}
                        mileage={mileage}
                        gear={gear}
                        power={power}
                        fuel={fuel}
                        imgSrc={imgSrc}
                        href={href}
                      />
                    ),
                  )}
                </div>
                <button className="btn-primary mx-auto mt-10 block h-11 px-20 lg:mt-15">
                  Load x More
                </button>
              </>
            ) : (
              <>
                <p className="mt-24 text-center text-3xl font-medium text-white lg:mt-28 lg:text-4xl">
                  No vehicles found
                </p>
                <button className="btn-primary mx-auto mt-6 block px-4 py-2">
                  Clear Filters
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
