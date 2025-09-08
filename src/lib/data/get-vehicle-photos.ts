import { redirect } from "next/navigation";
import { z } from "zod";
import { login } from "../login";
import { fetchServerSide } from "../server-utils";

const schema = z.array(
  z.object({
    url: z.string(),
    thumbnailUrl: z.string(),
    id: z.string(),
    originalName: z.string(),
  }),
);

export type VehiclePhotos = z.infer<typeof schema>;
export type VehiclePhoto = VehiclePhotos[number];

export async function getVehiclePhotos(
  vehicleId: string,
): Promise<VehiclePhotos | null> {
  const { token: bearer, id: autoHouseId } = await login();

  if (!bearer || !autoHouseId) {
    return null;
  }

  const response = await fetchServerSide<VehiclePhotos>(
    `/v1/auto-houses/${autoHouseId}/vehicles/${vehicleId}/photos`,
    schema,
    {
      next: {
        tags: ["vehicle-photos"],
        revalidate: 60 * 60,
      },
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    },
  );

  if (response instanceof Response) {
    const result = await response.json();
    if (result.status === 401) redirect("/unauthorized");
    return null;
  }

  return response;
}
