import {
  formatMileage,
  formatPowerText,
  formatPrice,
} from "@/lib/client-utils";
import { getVehicle } from "@/lib/data/get-vehicle";
import { getVehiclePhotos } from "@/lib/data/get-vehicle-photos";
import GoBackButton from "@/ui/components/go-back-button";
import VehicleEquipment from "@/ui/vehicle/equipment";
import Gallery from "@/ui/vehicle/gallery";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const vehicle = await getVehicle(id);

  if (vehicle === null) return {};

  const title = `${vehicle.make} ${vehicle.model}`;

  const description =
    vehicle.description || `${vehicle.make} ${vehicle.model} for sale.`;

  const images = vehicle.previewPhoto.url || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const [vehicle, vehiclePhotos] = await Promise.all([
    getVehicle(id),
    getVehiclePhotos(id),
  ]);

  if (!vehicle) notFound();

  const priceValue =
    vehicle.retailPrice ??
    vehicle.prices.find(
      (p: { type: string; value: number }) => p.type === "retail",
    )?.value ??
    vehicle.prices[0]?.value ??
    null;

  function formatRegistration(dateString: string | null) {
    if (!dateString) return "--";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  }

  return (
    <main className="relative grow">
      <div className="mt-5 mb-14 px-4 lg:mb-15 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <GoBackButton />

          <div className="mt-10 grid gap-x-5 lg:[grid-template-columns:minmax(auto,630px)_minmax(360px,auto)]">
            <Gallery vehiclePhotos={vehiclePhotos} vehicle={vehicle} />
            <div>
              <h1 className="mt-6 mb-1 shrink text-3xl font-medium text-white lg:mt-0">
                {vehicle.make} {vehicle.model}
              </h1>
              <h2 className="text-lg text-white">{vehicle.typeName || "--"}</h2>
              <div className="text-primary-500 mt-3.5 text-[50px]/16 font-bold">
                {formatPrice(priceValue)}
              </div>
              <div className="mt-3.5 line-clamp-1 font-medium text-white">
                ID:&nbsp;
                <span className="font-light">{vehicle.id}</span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Mileage:&nbsp;
                <span className="font-light capitalize">
                  {vehicle.mileage ? formatMileage(vehicle.mileage) : "--"}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Gear:&nbsp;
                <span className="font-light capitalize">
                  {vehicle.technicalData
                    ? vehicle.technicalData.transmission
                    : "--"}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Power:&nbsp;
                <span className="font-light">
                  {vehicle.technicalData
                    ? formatPowerText(
                        Number(vehicle.technicalData.power),
                        vehicle.technicalData.powerUnit,
                      )
                    : "--"}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Fuel:&nbsp;
                <span className="font-light capitalize">
                  {vehicle.technicalData &&
                  vehicle.technicalData.fuel !== "no_information"
                    ? vehicle.technicalData.fuel
                    : "--"}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Production date:&nbsp;
                <span className="font-light capitalize">
                  {vehicle.productionDate
                    ? new Date(vehicle.productionDate).getFullYear()
                    : "--"}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                First registration:&nbsp;
                <span className="font-light capitalize">
                  {formatRegistration(vehicle.firstRegistration)}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Engine size:&nbsp;
                <span className="font-light">
                  {vehicle.technicalData && vehicle.technicalData.engineVolume
                    ? `${vehicle.technicalData.engineVolume} cc`
                    : "--"}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Body type:&nbsp;
                <span className="font-light capitalize">
                  {vehicle.bodyType}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Drivetrain:&nbsp;
                <span className="font-light capitalize">
                  {vehicle.technicalData && vehicle.technicalData.drivetrain}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Seats:&nbsp;
                <span className="font-light">
                  {(vehicle.technicalData && vehicle.technicalData.seats) ||
                    "--"}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 font-medium text-white">
                Doors:&nbsp;
                <span className="font-light">
                  {(vehicle.technicalData && vehicle.technicalData.doors) ||
                    "--"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-7.5 grid gap-x-5 lg:mt-10 lg:grid-cols-2">
            <div>
              <div className="text-lg font-medium text-white uppercase">
                Description:
              </div>
              <p className="mt-2.5 text-base/7 font-light text-white">
                {vehicle.description || "--"}
              </p>
            </div>
            <VehicleEquipment items={vehicle.equipmentItems} />
          </div>
        </div>
      </div>
    </main>
  );
}
