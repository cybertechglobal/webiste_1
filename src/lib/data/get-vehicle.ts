import { redirect } from "next/navigation";
import { z } from "zod";
import { login } from "../login";
import { fetchServerSide } from "../server-utils";

const schema = z.object({
  id: z.string(),
  make: z.string(),
  model: z.string(),
  typeName: z.string().nullable(),
  mileage: z.number().nullable(),
  retailPrice: z.number().nullable(),
  prices: z.array(
    z.object({
      type: z.literal(["retail", "export", "purchase"]),
      value: z.number(),
    }),
  ),
  technicalData: z
    .object({
      fuel: z.string(),
      transmission: z.string(),
      power: z.string(),
      powerUnit: z.literal(["hp", "kw"]),
      engineVolume: z.number().nullable(),
      drivetrain: z.string(),
      seats: z.number().nullable(),
      doors: z.number().nullable(),
    })
    .nullable(),
  productionDate: z.string().nullable(),
  firstRegistration: z.string().nullable(),
  bodyType: z.string(),
  equipmentItems: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  description: z.string().nullable(),
  previewPhoto: z.object({
    url: z.string(),
  }),
});

export type Vehicle = z.infer<typeof schema>;

export async function getVehicle(vehicleId: string): Promise<Vehicle | null> {
  const { token: bearer, id: autoHouseId } = await login();

  if (!bearer || !autoHouseId) {
    return null;
  }

  const response = await fetchServerSide<Vehicle>(
    `/v1/auto-houses/${autoHouseId}/vehicles/${vehicleId}`,
    schema,
    {
      next: {
        tags: ["vehicle"],
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
